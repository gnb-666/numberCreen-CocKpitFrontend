<template style="white-space:pre-line;z-index: 0;">
  <div id="model" @click="onMouseClick">
  </div>
  <div class="back">
    <img src="@/assets/images/恢复视角.png" @click="back">
    <div style="font-size:1vw;">恢复视角</div>
  </div>
  <!-- <div class="in">
    <img src="@/assets/images/进入工厂.png" @click="inFactory1">
    <div>进入工厂</div>
  </div> -->
  <!-- <div class="detect">
    <img src="@/assets/images/检测.png" @click="detect"> 
    <div>
      异常检测
      <el-switch v-model="ontect" active-text="开" inactive-text="关" />
    </div>
  </div> -->
  <div id="jindu-text-con">
    正在加载模型请稍等：<span id="jindu-text"></span>
    <div class="jindu-con">
        <div id="jindu"></div>
    </div>
  </div>
  <div class="tank" id="tank" :style="{left:left+'px',top:top+'px'}" v-show="visible">
    <div class="tanktitle">中间罐区</div>
    <el-table  :data="tableData" style="width: 80%">
      <el-table-column prop="index" label="序号"  />
      <el-table-column prop="name" label="罐名"  />
      <el-table-column prop="rank" label="罐内百分比" />
      <el-table-column prop="score" label="罐内余量" />
    </el-table>
  </div>
  <el-dialog title="氢化111A监控点" v-model="dialogVisible" style="width:450px">
      <Camera class="cameras"></Camera>
      <el-button @click="dialogVisible=false" type="primary" style="margin-left:350px;">确认</el-button>
  </el-dialog>
</template>
<script>
import Camera from '@/components/SecurityDetection/Camera.vue'
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass.js";

import TWEEN from "@tweenjs/tween.js";
// 引入gltf模型加载库GLTFLoader.js
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { ElNotification } from 'element-plus'
import Stats from 'three/examples/jsm/libs/stats.module.js'

// 抗锯齿
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js'
import {SMAAPass} from 'three/examples/jsm/postprocessing/SMAAPass.js';
import { TAARenderPass } from 'three/examples/jsm/postprocessing/TAARenderPass.js';
import { SSAARenderPass } from 'three/examples/jsm/postprocessing/SSAARenderPass.js';
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader.js';

export default {
   data() {
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
        curve:null,
        velocity:0.002,
        progress:0,
        mods:[],
        stats:'',
        left:0,
        top:0,
        visible:false,
        dialogVisible:false,
        tableData:[
        {
          index:'1',
          name:'TK01',
          rank:'30.9%',
          score:'218.03t'
        },
        {
          index:'2',
          name:'TK02',
          rank:'49.3%',
          score:'317.16t'
        },
        {
          index:'3',
          name:'TK03',
          rank:'48.3%',
          score:'311.79t'
        },
        {
          index:'4',
          name:'TK04',
          rank:'29.9%',
          score:'228.75t'
        },
        ],
        group:[],
        material:[],
        // cylinderMesh: new THREE.Mesh(),
        cylinderRadius:0,
        cylinderOpacity:1,
        ontect:false,
        animateId:''
      }
   },
   created(){
    console.log('created....');
   },
   computed:{
   },
   components:{
    Camera
   },
   mounted() {
    this.init()
   },
   unmounted(){
    console.log('this.renderer.info--安全系统',this.renderer.info)
    this.beforeDestroy()
   },
   methods:{
    //初始化场景
    initScene() {
      this.scene = new THREE.Scene();
    },
    // 初始化相机
    initCamera() {
      this.camera = new THREE.PerspectiveCamera(75,(window.innerWidth*0.9) / (window.innerHeight*0.8),0.1, 1000);
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
      this.composer.addPass( ssAARenderPass );
      // 物体边缘发光通道
      console.log(selectedObjects);
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
      console.log(window.devicePixelRatio);
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
      
      console.log(this.composer);

      const effectColorSpaceConversion = new ShaderPass( GammaCorrectionShader );
      // this.composer.addPass( effectColorSpaceConversion );
    },
    // 鼠标点击模型
    onMouseClick(event) {
      const offsetHeight = event.srcElement.offsetHeight
      const offsetWidth = event.srcElement.offsetWidth
      //通过鼠标点击的位置计算出raycaster所需要的点的位置，以屏幕中心为原点，值的范围为-1到1
      this.mouse.x = (event.offsetX / offsetWidth) * 2 - 1;
      this.mouse.y = -(event.offsetY / offsetHeight) * 2 + 1;
      //通过鼠标点击的位置计算出raycaster所需要的点的位置，以屏幕中心为原点，值的范围为-1到1
      // this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      // this.mouse.y = -(event.clientY / (window.innerHeight)) * 2 + 1;
      // 通过鼠标点的位置和当前相机的矩阵计算出raycaster
      this.raycaster.setFromCamera(this.mouse, this.camera);
      // 获取raycaster直线和所有模型相交的数组集合
      let intersects = this.raycaster.intersectObjects(this.scene.children);
      console.log(this.mouse.x,this.mouse.y,intersects[0]);
      if (!intersects[0]) {
        this.selectedObjects=[]
        // this.outlineObj(this.selectedObjects)
        return;
      } else {
        console.log(this.camera.position);
        console.log(intersects[0].object,intersects[0].object instanceof THREE.Sprite);
      if(intersects[0].object.name=="中间罐区1"){
        this.selectedObjects = [];
        this.selectedObjects.push(this.scene.getObjectByName('obj_245'));
        // this.outlineObj(this.selectedObjects)
        this.initTween(
            20,
            28,
            31
        );
      }else if(intersects[0].object.name=="精馏塔1"){
        this.selectedObjects = [];
        this.selectedObjects.push(this.scene.getObjectByName('obj_031'));
        // this.outlineObj(this.selectedObjects)
        this.initTween(
          90,127,12
        );
      }else if(intersects[0].object.name=="还原A"){
        this.initTween(
          -353,81,-223
        );
      }else if(intersects[0].object.name=="摄像头1"){
        this.dialogVisible=true
      }
      if (!intersects[0].object.name == "") {
        console.log(intersects[0].object.name);
        if((intersects[0].object.name == "obj_245")||(intersects[0].object.name == "obj_353")) {
          console.log(intersects[0].object.name,intersects[0].object);
        this.selectedObjects = [];
        this.selectedObjects.push(intersects[0].object);
        console.log(this.selectedObjects,intersects[0].object.position.x,intersects[0].object.position.y,intersects[0].object.position.z);
        // this.outlineObj(this.selectedObjects);
        this.positionObj = {
            x: intersects[0].object.position.x,
            y: intersects[0].object.position.y,
            z: intersects[0].object.position.z,
        };
        this.left=event.layerX
        this.top=event.layerY
        // console.log(event,event.clientX);
        this.visible=true
        console.log(this.positionObj.x);
        console.log(this.positionObj.y);
        console.log(this.positionObj.z);
        }else if(intersects[0].object.name == "obj_270"){
          this.left=event.layerX
          this.top=event.layerY
          this.visible=true
        }else{
          this.visible=false
          this.selectedObjects = [];
          // this.outlineObj(this.selectedObjects);
        }

      }
    }
    },
    // 相机移动动画
    initTween(targetX, targetY, targetZ) {
      // 需要保留this
      let initPosition = {
      x: this.camera.position.x,
      y: this.camera.position.y,
      z: this.camera.position.z,
      };
      // console.log(initPosition);
      let tween = new TWEEN.Tween(initPosition)
      .to({ x: targetX, y: targetY, z: targetZ }, 2000)
      .easing(TWEEN.Easing.Sinusoidal.InOut);
      let onUpdate = (pos) => {
      let x = pos.x;
      let y = pos.y;
      let z = pos.z;
      if (pos.z < 0) {
        this.camera.position.set(x+50, y+20, z-50);
        // this.camera.position.set(0, 2, 0);
      } else {
        this.camera.position.set(x+50, y+20, z+50);
        // this.camera.position.set(0, 2, 0);
      }
      };
      tween.onUpdate(onUpdate);
      tween.start();
      // this.controls.target.set(0, 0, 0);
      if (this.positionObj.z < 0) {
      this.controls.target.set(
        this.positionObj.x,
        this.positionObj.y - 0.4,
        -12
      );
      } else {
      this.controls.target.set(
        this.positionObj.x,
        this.positionObj.y - 0.4,
        12
      );
      }
    },
    // 初始化水面
    initWater(){
      // setTimeout(()=>{
      //   this.waterT = this.scene.getObjectByName('obj_439').material.map
      //   console.log(this.waterT,this.scene.getObjectByName('obj_439').material,'222')
      // },5000)  
  },
    // 加载渲染器
    initRender() {
      this.renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true ,
      logarithmicDepthBuffer: true
     } );
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(window.innerWidth*0.9, window.innerHeight*0.8); // 设置渲染区域尺寸
      //将webgl渲染的canvas内容添加到body 
      this.renderer.outputEncoding = THREE.sRGBEncoding; 
      document.getElementById("model").appendChild(this.renderer.domElement);
    },
    // 加载模型
    initModel() {
      const loader = new GLTFLoader(); //创建一个GLTF加载器    
      // Draco 解码库   
      const dracoLoader = new DRACOLoader();    
      dracoLoader.setDecoderPath('/draco/gltf/');      
      dracoLoader.setDecoderConfig({ type: 'js' });      
      dracoLoader.preload();     
      loader.setDRACOLoader(dracoLoader);

      // 进度条
      var jindu_text_con = document.getElementById('jindu-text-con');
      var jindu_text = document.getElementById('jindu-text');
      var jindu = document.getElementById('jindu');

      loader.load("model/modelDraco.glb",(gltf)=>{
        let model = gltf.scene;
        model.scale.set(0.2,0.2,0.2)
        this.scene.add(model);
      },
        ( xhr ) => {
          // called while loading is progressing
          var _onProgress = Math.floor(xhr.loaded / 31376704 * 100)
          jindu_text.innerText = _onProgress + '%';
          jindu.style.width = _onProgress + '%'
          if (_onProgress == 100) {
              jindu_text_con.style.display = 'none'
          }
        })
         
       // 加载一个背景透明的圆形贴图，矩形精灵显示为圆形效果
      var texture = new THREE.TextureLoader().load("images/厂区.png");
      // let canvas = document.createElement("canvas");
      // canvas.width = 200;
      // canvas.height = 600;
      // var context = canvas.getContext('2d');
      // context.fillText('55555',4,22);
      // context.fillStyle = "rgba(0, 0, 0, 1.0)";
      // canvas.style.backgroundColor=''
      // var Texture = new THREE.Texture(canvas);
      var spriteMaterial = new THREE.SpriteMaterial({
        map: texture, //设置精灵纹理贴图
        transparent: true,
        opacity: 1,
        rotation: 0,
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
    // 使用OrbitControls控制三维场景缩放和旋转等功能
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
      // this.cylinderAnimate(); //圆柱光圈扩散更新
      // this.water.material.uniforms[ 'time' ].value += 1.0 / 60.0;
      this.animateId = requestAnimationFrame(this.animate);
    },
      /* 性能插件 */
    initStats() {

      this.stats = new Stats();
      // 设置监视器位置
      // this.stats.domElement.style.position = 'absolute'
      this.stats.domElement.style.left = '50px'
      this.stats.domElement.style.top = '1.5rem'
      document.body.appendChild(this.stats.domElement);

      // return this.stats;

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
      this.initWater()
      this.animate(); //渲染代码

      // document.getElementById("model").onmousemove = this.onDocumentMouseMove
      // window.addEventListener( 'mousemove', this.onDocumentMouseMove, false );
    },
    // 返回主视角
    back(){
      this.initTween(200,200,200)
    },
    // 进去厂区1
    inFactory1(){
      // 需要保留this
      let initPosition = {
      x: this.camera.position.x,
      y: this.camera.position.y,
      z: this.camera.position.z,
      };
      // console.log(initPosition);
      let tween = new TWEEN.Tween(initPosition)
      .to({ x: -253, y: 8, z: -100}, 2000)
      .easing(TWEEN.Easing.Sinusoidal.InOut);
      let onUpdate = (pos) => {
      let x = pos.x;
      let y = pos.y;
      let z = pos.z;
      if (pos.z < 0) {
        this.camera.position.set(x, y, z);
        // this.camera.position.set(0, 2, 0);
      } else {
        this.camera.position.set(x, y, z);
        // this.camera.position.set(0, 2, 0);
      }
      };
      tween.onUpdate(onUpdate);
      tween.start();
      // this.controls.target.set(0, 0, 0);
      if (this.positionObj.z < 0) {
      this.controls.target.set(
        this.positionObj.x,
        this.positionObj.y - 0.4,
        -12
      );
      } else {
      this.controls.target.set(
        this.positionObj.x,
        this.positionObj.y - 0.4,
        12
      )
    }
      
    },
    detect(){
      console.log(this.scene.children);
     this.ontect = !this.ontect
     if(this.ontect){
      console.log(this.renderer.antialias);
        this.selectedObjects = [];
        this.selectedObjects.push(this.scene.getObjectByName('obj_270'));
        this.outlineObj(this.selectedObjects,'0xc00000')
        ElNotification({
          title: 'Error',
          message: '储罐超限',
          type: 'error',
          duration: 0
        })
        this.scene.children[4].material.visible = false
        this.scene.children[5].material.visible = false
        this.scene.children[6].material.visible = false
        this.scene.children[7].material.visible = false
        this.scene.children[8].material.visible = false
        this.scene.children[9].material.visible = false
        this.scene.children[10].material.visible = false
        this.scene.children[11].material.visible = false
        this.scene.children[12].material.visible = false
        this.scene.children[13].material.visible = false

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

        this.scene.children[this.scene.children.length-1].traverse((e)=>{
          e.material = buildMaterial;             // 赋模型材质
        
          if (e.geometry) {
            const edges = new THREE.EdgesGeometry(
                e.geometry
            );
            const line = new THREE.LineSegments(
                edges,
                lineMaterial                      // 赋线条材质
            );
            line.scale.set(0.005,0.005,0.005)
            this.scene.children[this.scene.children.length-1].add(line);
            // console.log(e.geometry,edges,line);
          }
        })
      console.log(this.material);
      this.initWave()
     }else{
      console.log(this.scene.children);
      // this.renderer.antialias = true,
      console.log(this.scene.children[this.scene.children.length-2].children,this.material,this.material.length);
      this.scene.children[this.scene.children.length-2].children.splice(this.material.length,this.scene.children[this.scene.children.length-2].children.length-this.material.length)
      console.log(this.scene.children,this.material);
      // this.scene.children[this.scene.children.length-2].children =this.material
      let i = 0

      this.scene.children[this.scene.children.length-2].children.forEach((e)=>{
        e.material=this.material[i]
        i++
      })
      this.scene.children.splice(this.scene.children.length-1)
      // const loader = new THREE.ObjectLoader();
      // object 指 场景中的某个模型对象
      // this.scene.children[this.scene.children.length-2]=loader.parse(this.material[0].toJSON())
      this.scene.children[4].material.visible = true
      this.scene.children[5].material.visible = true
      this.scene.children[6].material.visible = true
      this.scene.children[7].material.visible = true
      this.scene.children[8].material.visible = true
      this.scene.children[9].material.visible = true
      this.scene.children[10].material.visible = true
      this.scene.children[11].material.visible = true
      this.scene.children[12].material.visible = true
      // this.group==[]?1:this.scene.children[this.scene.children.length-1]=this.group
      // initRender()

    }
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
      this.cylinderRadius += 0.5;
      this.cylinderOpacity -= 0.00001;
      if (this.cylinderRadius > 100) {
        this.cylinderRadius = 0;
        this.cylinderOpacity = 1;
      }
      if (this.cylinderMesh) {
        this.cylinderMesh.scale.set(1 + this.cylinderRadius, 1, 1 + this.cylinderRadius); //圆柱半径增大
        this.cylinderMesh.material[0].opacity = this.cylinderOpacity; //圆柱可见度减小
      }
    },
    beforeDestroy(){
      this.clearScene()
    },
    clearScene() {
      cancelAnimationFrame(this.animateId);
      this.scene.traverse((child) => {
        if (child.material) {
          if(child.material.map){
            child.material.map.dispose()      
          }
          child.material.dispose();
        }
        if (child.geometry) {
          child.geometry.dispose();
        }
        child = null;
      });
      // this.sceneDomElement.innerHTML = '';
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
      
      console.log('clearScene',this.renderer.info);
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
   }
}
</script>
<style lang="less" scoped>
#model {
  width: 95vw;
  height: 80vh;
  // margin-top: 2vh;
  // margin-left: 2.5vw;
}
.back{
  z-index: 2;
  position: absolute;

  left:3vw;
  top: 3vh;
  img {
    width: 4vw;
    height: 5vh;
    cursor: pointer;
  }
  div {
    width: 4vw;
    text-align: center;
    font-size: 18px;
    font-weight: 600;
    color: #fff;
  }
}
.in {
  z-index: 2;
  position: absolute;
  left:8vw;
  top: 25vh;
  cursor: pointer;
  img{
    width: 4vw;
    height: 5vh;
  }
  div{
    width: 4.7vw;
    text-align: center;
    font-size: 18px;
    font-weight: 600;
    color: #fff;
  }
}
.detect {
  z-index: 2;
  position: absolute;
  left:8vw;
  top: 35vh;
  cursor: pointer;
  img{
    width: 4.7vw;
    height: 5vh;
  }
  div{
    width: 4.7vw;
    text-align: center;
    font-size: 18px;
    font-weight: 600;
    color: #fff;
  }
}
.jindu-con {
    width: 300px;
    height: 10px;
    border-radius: 50px;
    background-color: white;
    margin-top: 10px;
    overflow: hidden;
}

#jindu {
    height: inherit;
    background-color: #007bff;
    width: 0;
}

#jindu-text-con {
    width: 320px;
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    top: 15%;
    text-align: center;
    background-color: rgba(255, 255, 255, .5);
    padding: 10px;
}

.tank{
  width: 500px;
  height: 250px;
  // background-color: rgb(18, 150, 219);
  // opacity: 0.2;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 3;
  background: url(../../assets/images/Background2.jpg) no-repeat;
  background-size: 100% 100%;
  .tanktitle{
    text-align: center;
    color: #fff;
    opacity: 1;
    padding-top: 20px;
    height: 20px;
    line-height: 20px;
    font-size: 16px;
    font-weight: 700;
    z-index: 4;
  }
  /deep/ .el-table{
        margin: 0 auto;
        --el-table-border-color:transparent;
        --el-table-border:0px solid;
        --el-table-text-color:#fff;
        --el-table-header-bg-color:transparent;
        --el-table-bg-color:transparent;
        --el-table-tr-bg-color:transparent;
      }
      /deep/ .el-table tbody tr:hover>td {
        background-color:transparent;
      }
}
.smallmap{
  width: 200px;
  height: 112.5px;
  position: absolute;
  z-index: 3;
  background-color: #fff;
  top: 0;
  right: 0;
}
.cameras{
  width: 400px;
  height: 250px;
}
</style>
