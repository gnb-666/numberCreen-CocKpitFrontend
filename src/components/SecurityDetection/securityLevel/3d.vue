<template>
  <div id="model"></div>
  <div class="hydriding_btn">
    <el-button class="btn" link @click="changeSection('氢化工段')"
    :style="{color: $store.state.section =='氢化工段'?'#d71e06':'#100b2b' }"
    >氢化工段</el-button>
    <el-button class="btn" link @click="changeSection('净化工段')"
    :style="{color: $store.state.section =='净化工段'?'#d71e06':'#100b2b' }"
    >净化工段</el-button>
    <el-button class="btn" link @click="changeSection('渣浆高沸工段')"
    :style="{color: $store.state.section =='渣浆高沸工段'?'#d71e06':'#100b2b' }"
    >渣浆高沸工段</el-button>
    <el-button class="btn" link @click="changeSection('还原工段')"
    :style="{color: $store.state.section =='还原工段'?'#d71e06':'#100b2b' }"
    >还原工段</el-button>
    <el-button class="btn" link @click="changeSection('公用工程工段')"
    :style="{color: $store.state.section =='公用工程工段'?'#d71e06':'#100b2b' }"
    >公用工程工段</el-button>
  </div>
</template>
<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass.js";

import TWEEN from "@tweenjs/tween.js";
// 引入gltf模型加载库GLTFLoader.js
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

export default {
  data(){
    return {
        // scene:null
        // 选中的模型
        selectedObjects: [],
        mouse: new THREE.Vector2(),
        raycaster: new THREE.Raycaster(),
        tween: null,
        positionObj: null,
        // 控制显示
        flagShowTag:true,
        flagShowVedio:true,
        velocity:0.002,
        progress:0,
        mods:[],
        visible:false,
        dialogVisible:false,
        group:[],
        material:[],
        // cylinderMesh: new THREE.Mesh(),
        cylinderRadius:0,
        cylinderOpacity:1,
        ontect:false,
        animateid:''
      }
  },
  created(){
   },
  mounted() {
    this.init()
  },
  beforeUnmount(){
  },
  unmounted(){
    // console.log('this.renderer.info--实时报警',this.renderer.info)
    this.beforeDestroy()
  },
  methods:{
    beforeDestroy(){
      this.clearScene()
    },
    clearScene() {
      cancelAnimationFrame(this.animateid);
      this.scene.traverse((child) => {
        if (child.geometry) {
          child.geometry.dispose();
        }
        if (child.material) {
          if(child.material.map){
            // console.log(child.material.map.dispose);
            child.material.map.dispose!==undefined?child.material.map.dispose(): 1      
          }
          child.material.dispose!==undefined?child.material.dispose(): 1;
        }
        child = null;
      });
      this.renderer.forceContextLoss();
      this.renderer.dispose();
      this.scene.clear();
      this.flows = [];
      this.renderer.content = null;
      // this.renderer = null;
      this.scene = null;
      this.camera = null;
      this.controls = null;
      this.renderer.domElement = null;
      // this.renderer = null;
      this.sceneDomElement = null;
      THREE.Cache.clear();
      THREE.Cache.files = {};
      THREE.Cache.geometries = {};
      THREE.Cache.materials = {};
      THREE.Cache.textures = {};
      
      // console.log('clearScene',this.renderer.info);
    },
    clearGroup(group) {
      const clearCache = (item) => {
        item.geometry.dispose();
        item.material.dispose();
      };
      const removeObj = (obj) => {
        let arr = obj.children.filter((x) =>!! x);
        arr.forEach((item) => {
          if (item.children.length) {
            removeObj(item);
          } else {
            clearCache(item);
            item.clear();
          }
        });
        obj.clear();
        arr = null;
      };
      removeObj(group);
    },
    //初始化场景
    initScene() {
      this.scene = new THREE.Scene();
    },
    // 初始化相机
    initCamera() {
      this.camera = new THREE.PerspectiveCamera(75,(window.innerWidth*0.35) / (window.innerHeight*0.4),0.1, 1000);
      this.camera.position.set(200, 200, 200);
      this.scene.add(this.camera);
    },
    // 初始化灯光
    initLight() {
      this.light = new THREE.AmbientLight(0xffffff, 1)
      // this.light.position.set(400, 200, 300);//偏移光源位置，观察渲染效果变化
      this.scene.add(this.light); //点光源添加到场景中
      this.light1 = new THREE.DirectionalLight(0xffffff, 0.5)
      this.light1.position.set(150,150,150)
      this.scene.add(this.light1)

      this.light2 = new THREE.DirectionalLight(0xffffff, 0.5)
      this.light2.position.set(0,0,0)
      this.scene.add(this.light2)
    },
    // 加载渲染器
    initRender() {
      this.renderer = new THREE.WebGLRenderer({ 
      // antialias: true,
      alpha: true ,
      // logarithmicDepthBuffer: true 
      });
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(window.innerWidth*0.35, window.innerHeight*0.4); // 设置渲染区域尺寸
      //将webgl渲染的canvas内容添加到body 
      // this.renderer.outputEncoding = THREE.sRGBEncoding;
      document.getElementById("model").appendChild(this.renderer.domElement);
      
    },
    // 加载模型
    initModel() {
      var buildMaterial = new THREE.MeshBasicMaterial({
          color: "#009EFF",     // 颜色
          transparent: true,    // 是否开启使用透明度
          opacity: 0.2,        // 透明度
          depthWrite: false,    // 关闭深度写入 透视效果
          // side: THREE.DoubleSide, // 双面显示
        });
      // 建筑线材质
      var lineMaterial = new THREE.LineBasicMaterial({
        color: "#36BCFF",
        transparent: true,
        opacity: 0.25,
        depthWrite: false,
        // side: THREE.DoubleSide,
      })
      const loader = new GLTFLoader(); //创建一个GLTF加载器
      
      // Draco 解码库
      
      const dracoLoader = new DRACOLoader();
      
      dracoLoader.setDecoderPath('/draco/gltf/');
        
      dracoLoader.setDecoderConfig({ type: 'js' });
        
      dracoLoader.preload();
        
      loader.setDRACOLoader(dracoLoader);

      // 进度条
      // var jindu_text_con = document.getElementById('jindu-text-con');
      // var jindu_text = document.getElementById('jindu-text');
      // var jindu = document.getElementById('jindu');

        loader.load("model/modelDraco.glb",(gltf)=>{
          let model = gltf.scene;
          model.scale.set(0.2,0.2,0.2)
        model.traverse((e)=>{
          // console.log(e.material);
          e.material = buildMaterial; 
          if (e.geometry) {
            const edges = new THREE.EdgesGeometry(
                e.geometry
            );
            const line = new THREE.LineSegments(
                edges,
                lineMaterial                      // 赋线条材质
            );
            line.scale.set(0.005,0.005,0.005)
            model.add(line);
            // console.log(e.geometry,edges,line);
          }
        })
        this.scene.add(model);
        },
        ( xhr ) => {
        })
      
      
       // 加载一个背景透明的圆形贴图，矩形精灵显示为圆形效果
      var texture = new THREE.TextureLoader().load("images/厂区.png");
      let canvas = document.createElement("canvas");
      canvas.width = 200;
      canvas.height = 600;
      var context = canvas.getContext('2d');
      context.fillText('55555',4,22);
      context.fillStyle = "rgba(0, 0, 0, 1.0)";
      canvas.style.backgroundColor=''
      var Texture = new THREE.Texture(canvas);
      var spriteMaterial = new THREE.SpriteMaterial({
        map: texture, //设置精灵纹理贴图
        transparent: true,
        opacity: 1,
        rotation: 0,
        depthTest: false
        // color: 0x00ff00
      });
      // 创建精灵模型对象
      var tank1 = new THREE.Sprite(spriteMaterial);
      tank1.name='中间罐区1'
      tank1.position.set(10,18,31)
      tank1.scale.set(25,25,1)
      this.scene.add(tank1);
      
      var sprite1 = new THREE.Sprite(spriteMaterial);
      sprite1.name='精馏塔1'
      sprite1.position.set(32,130,-82)
      sprite1.scale.set(25,25,1)
      this.scene.add(sprite1);

      var texture = new THREE.TextureLoader().load("images/摄像头.png");
      var spriteMaterial = new THREE.SpriteMaterial({
        map: texture, //设置精灵纹理贴图
        transparent: true,
        opacity: 1,
        rotation: 0,
        depthTest: false
        // color: 0x00ff00
      });
      var sprite2 = new THREE.Sprite(spriteMaterial);
      sprite2.name='摄像头1'
      sprite2.position.set(250,50,40)
      sprite2.scale.set(25,25,1)
      this.scene.add(sprite2);

      var sprite3 = new THREE.Sprite(spriteMaterial);
      sprite3.name='摄像头2'
      sprite3.position.set(250,50,120)
      sprite3.scale.set(25,25,1)
      this.scene.add(sprite3);

      var sprite4 = new THREE.Sprite(spriteMaterial);
      sprite4.name='摄像头3'
      sprite4.position.set(240,40,185)
      sprite4.scale.set(25,25,1)
      this.scene.add(sprite4);

      var texture = new THREE.TextureLoader().load("images/还原A.png");
      var spriteMaterial = new THREE.SpriteMaterial({
        map: texture, //设置精灵纹理贴图
        transparent: true,
        opacity: 1,
        rotation: 0,
        depthTest: false
        // color: 0x00ff00
      });
      var reductionA = new THREE.Sprite(spriteMaterial);
      reductionA.name='还原A'
      reductionA.position.set(-248,40,-98)
      reductionA.scale.set(25,40,1)
      this.scene.add(reductionA);

      var reductionB = new THREE.Sprite(spriteMaterial);
      reductionB.name='还原B'
      reductionB.position.set(-248,40,-20)
      reductionB.scale.set(25,40,1)
      this.scene.add(reductionB);

      var reductionC = new THREE.Sprite(spriteMaterial);
      reductionC.name='还原C'
      reductionC.position.set(-248,40,75)
      reductionC.scale.set(25,40,1)
      this.scene.add(reductionC);

      var reductionD = new THREE.Sprite(spriteMaterial);
      reductionD.name='还原D'
      reductionD.position.set(-248,40,150)
      reductionD.scale.set(25,40,1)
      this.scene.add(reductionD);

      const spriteTween = new TWEEN.Tween({
	      scale: 25
      }).to({
        scale: 20
      }, 1500).easing(TWEEN.Easing.Quadratic.Out);
      spriteTween.onUpdate(function(that) {
        tank1.scale.set(that.scale, that.scale, that.scale);
        sprite1.scale.set(that.scale, that.scale, that.scale);
        sprite2.scale.set(that.scale, that.scale, that.scale);
        reductionA.scale.set(that.scale, that.scale*2, that.scale);
      });
      spriteTween.yoyo(true);
      spriteTween.repeat(Infinity);
      spriteTween.start();
    },
    initControls(){
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      this.controls.update();
      //添加坐标轴辅助器
      this.axesHelper = new THREE.AxesHelper(5);
      this.scene.add(this.axesHelper);
    },
    //渲染场景以及控制
    animate(){
      // this.stats.update()
      TWEEN.update();
      if(this.waterT !== undefined){
          this.waterT.offset.x =  this.waterT.offset.x+0.001
          this.waterT.offset.y =  this.waterT.offset.y+0.001
          this.waterT.rotation = this.waterT.rotation+0.001
        }
      this.renderer.render(this.scene, this.camera);
      this.controls.update();
      if (this.composer) {
        this.composer.render();
      }
      this.cylinderAnimate(); //圆柱光圈扩散更新
      // this.water.material.uniforms[ 'time' ].value += 1.0 / 60.0;
      this.animateid = requestAnimationFrame(this.animate);
      
    },
    //高亮显示模型（呼吸灯）
    outlineObj(selectedObjects,color) {
      
      // 创建一个EffectComposer（效果组合器）对象，然后在该对象上添加后期处理通道。
      this.composer = new EffectComposer(this.renderer);
      // 新建一个场景通道  为了覆盖到原理来的场景上
      
      this.renderPass = new RenderPass(this.scene, this.camera);
      this.composer.addPass(this.renderPass);

      //ssaa
      var ssAARenderPass = new SSAARenderPass( this.scene, this.camera );
      ssAARenderPass.unbiased = true;
      ssAARenderPass.sampleLevel = 2;
      // this.composer.addPass( ssAARenderPass );
      // 物体边缘发光通道
      // console.log(selectedObjects);
      this.outlinePass = new OutlinePass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        this.scene,
        this.camera,
        selectedObjects
      );
      this.outlinePass.renderToScreen = true
      this.outlinePass.edgeStrength = 12.0; // 高光边缘边框的亮度
      this.outlinePass.edgeGlow = 1; // 光晕[0,1]  边缘微光强度 
      this.outlinePass.usePatternTexture = true; // 是否使用父级的材质，纹理覆盖
      this.outlinePass.edgeThickness = 3; // 边框宽度，高光厚度
      this.outlinePass.downSampleRatio = 1; // 边框弯曲度
      this.outlinePass.pulsePeriod = 2; // 呼吸闪烁的速度，数值越大，律动越慢
      color==null?this.outlinePass.visibleEdgeColor.set(parseInt(0x00f6ff)):this.outlinePass.visibleEdgeColor.set(parseInt(color)); // 呼吸显示的颜色 // 呼吸显示的颜色
      this.outlinePass.hiddenEdgeColor = new THREE.Color(0, 0, 0); // 呼吸消失的颜色
      // this.outlinePass.clear = true
      this.composer.addPass(this.outlinePass); // 加入高光特效
      this.outlinePass.selectedObjects = selectedObjects; // 需要高光的模型
      // console.log(this.composer);
      // 锯齿处理
      this.renderer.autoClear = false
      // var domData = document.getElementById('model')
      let fxaaPass = new ShaderPass(FXAAShader)
      const pixelRatio = this.renderer.getPixelRatio()
      // console.log(window.devicePixelRatio);
      this.composer.setPixelRatio( 1 )
      fxaaPass.material.uniforms[ 'resolution' ].value.x = 1 / (window.innerWidth* pixelRatio*1.5)
      fxaaPass.material.uniforms[ 'resolution' ].value.y = 1 / (window.innerHeight * pixelRatio*1.5)
      // this.composer.addPass(fxaaPass)
      const smaaPass = new SMAAPass(window.innerWidth*0.95* pixelRatio, window.innerHeight*0.8 * pixelRatio);
      // this.composer.addPass(smaaPass);

      var taaRenderPass = new TAARenderPass( this.scene, this.camera );
			taaRenderPass.unbiased = true;
      taaRenderPass.sampleLevel = 5;
		  this.accumulate = true;
			// this.composer.addPass( taaRenderPass );
      
      // console.log(this.composer);

      const effectColorSpaceConversion = new ShaderPass( GammaCorrectionShader );
      // this.composer.addPass( effectColorSpaceConversion );
    },
       //初始化函数，页面加载完成时调用
       init() {
      // this.initStats()
      this.initScene();
      this.initCamera();
      this.initLight();
      this.initRender();
      this.initModel(); //加载3D模型
      this.initControls(); //控制代码
      this.animate(); //渲染代码
      // this.initWave()
    },
    initWave(){
      //创建圆柱
      let geometry = new THREE.CylinderGeometry(4, 4, 70, 64,1,true);

      //加载纹理
      let texture = new THREE.TextureLoader().load('images/wave.png');
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping; //每个都重复
      texture.repeat.set(1, 1);
      texture.needsUpdate = true;

      let materials = [
        //圆柱侧面材质，使用纹理贴图
        new THREE.MeshBasicMaterial({
          map: texture,
          side: THREE.DoubleSide,
          transparent: true
        }),
        //圆柱顶材质
        new THREE.MeshBasicMaterial({
          transparent: true,
          opacity: 0,
          side: THREE.DoubleSide
        }),
        //圆柱底材质
        new THREE.MeshBasicMaterial({
          transparent: true,
          opacity: 0,
          side: THREE.DoubleSide
        })
      ];
      this.cylinderMesh = new THREE.Mesh(geometry, materials);
      this.scene.add(this.cylinderMesh);

    },
    cylinderAnimate() {
      this.cylinderRadius += 0.10;
      this.cylinderOpacity -= 0.001;
      if (this.cylinderRadius > 100) {
        this.cylinderRadius = 0;
        this.cylinderOpacity = 1;
      }
      if (this.cylinderMesh) {
        this.cylinderMesh.scale.set(1 + this.cylinderRadius, 1, 1 + this.cylinderRadius); //圆柱半径增大
        this.cylinderMesh.material[0].opacity = this.cylinderOpacity; //圆柱可见度减小
      }
    },
    changeSection(e){
      this.$store.state.section = e
    }
  }
}
</script>
<style lang="less" scoped>
#model{
  border-image-source: radial-gradient(68% 68%, transparent 0px, transparent 100%, cyan 100%);
  border-image-slice: 1;
  border-width: 3px;
  border-style: solid;
  border-image-outset: 0cm;
}
.hydriding_btn{
  width: 35vw;
  height: 15vh;
  padding-top: 5vh;
  // background-color: #fff;
  text-align: center;
  .btn{
    margin-top: 1vh;
  width: 10vw;
  height: 5vh;
  background:  url("~@/assets/images/security/cvd/btn.png") top center no-repeat;
  color:#100b2b;
  font-size: 1.3vw;
  font-weight: 600;
  display: inline-block;
}
.el-button{
    --el-button-hover-link-text-color:#fff;
  }
}

</style>
