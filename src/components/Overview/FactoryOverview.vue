<template>
  <!-- <h2 style="text-align: center; color: rgb(255, 255, 255);height:0.3rem;line-height: 0.5rem;">厂区全览</h2> -->
  <h2 style="text-align: center; color: rgb(255, 255, 255);height:0.3rem;line-height: 0.5rem;"><span
    style="font-size: 1.3vw;">厂区全览</span></h2>
  <div class="threedi" id="model1" @click="onMouseClick"></div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass.js";
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import TWEEN from "@tweenjs/tween.js";
// 引入gltf模型加载库GLTFLoader.js
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

export default {
  data() {
      return {
        // scene:null
        // 选中的模型
        selectedObjects: [],
        moveCar:[],
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
        animateid:''
      }
   },
   created(){
   },
   computed:{
   },
   components:{
   },
   mounted() {
    this.init()
   },
   unmounted(){
    console.log('this.renderer.info--全厂预览',this.renderer.info)
    this.beforeDestroy()
   },
   methods:{
    beforeDestroy(){
      this.clearScene()
      // this.clearThree(this.scene[this.scene.length-1])
    },
    clearScene() {
      cancelAnimationFrame(this.animateid);
      this.scene.traverse((child) => {

        if (child.material) {
          // console.log(child.material);
          if(child.material.map){
            console.log(child.material.map.dispose);
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
      this.renderer = null;
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
      this.camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1, 1000);
      this.camera.position.set(-287, 92, 366);
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
    outlineObj(selectedObjects) {
      // 创建一个EffectComposer（效果组合器）对象，然后在该对象上添加后期处理通道。
      this.composer = new EffectComposer(this.renderer);
      // 新建一个场景通道  为了覆盖到原理来的场景上    
      this.renderPass = new RenderPass(this.scene, this.camera);
      this.composer.addPass(this.renderPass);
      // 物体边缘发光通道
      console.log(selectedObjects);
      this.outlinePass = new OutlinePass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        this.scene,
        this.camera,
        selectedObjects
      );
      this.outlinePass.edgeStrength = 8.0; // 高光边缘边框的亮度
      this.outlinePass.edgeGlow = 1; // 光晕[0,1]  边缘微光强度 
      this.outlinePass.usePatternTexture = false; // 是否使用父级的材质，纹理覆盖
      this.outlinePass.edgeThickness = 3; // 边框宽度，高光厚度
      this.outlinePass.downSampleRatio = 1; // 边框弯曲度
      this.outlinePass.pulsePeriod = 2; // 呼吸闪烁的速度，数值越大，律动越慢
      this.outlinePass.visibleEdgeColor.set(parseInt(0x00f6ff)); // 呼吸显示的颜色
      this.outlinePass.hiddenEdgeColor = new THREE.Color(0, 0, 0); // 呼吸消失的颜色
      // this.outlinePass.clear = true
      this.composer.addPass(this.outlinePass); // 加入高光特效
      this.outlinePass.selectedObjects = selectedObjects; // 需要高光的模型
    },
    // 鼠标点击模型
    onMouseClick(event) {
      const left = event.offsetLeft
      const top = event.offsetTop
      const offsetHeight = event.srcElement.offsetHeight
      const offsetWidth = event.srcElement.offsetWidth
      //通过鼠标点击的位置计算出raycaster所需要的点的位置，以屏幕中心为原点，值的范围为-1到1
      this.mouse.x = (event.offsetX / offsetWidth) * 2 - 1;
      this.mouse.y = -(event.offsetY / offsetHeight) * 2 + 1;
     
      // 通过鼠标点的位置和当前相机的矩阵计算出raycaster
      this.raycaster.setFromCamera(this.mouse, this.camera);
      // 获取raycaster直线和所有模型相交的数组集合
      let intersects = this.raycaster.intersectObjects(this.scene.children);
      if (!intersects[0]) {
        return;
      } else {
        // console.log(intersects[0].object.name);
        // this.outlineObj(this.moveCar);
      if (!intersects[0].object.name == "") {
        if((intersects[0].object.name == "obj_245")||(intersects[0].object.name == "obj_353")) {
        this.selectedObjects = [];
        this.selectedObjects.push(intersects[0].object);
        // console.log(this.selectedObjects);
        // this.outlineObj(this.selectedObjects);
        this.positionObj = {
            x: intersects[0].object.position.x,
            y: intersects[0].object.position.y,
            z: intersects[0].object.position.z,
        };

        this.initTween(
            this.positionObj.x,
            this.positionObj.y,
            this.positionObj.z
        );
        console.log(this.positionObj.x);
        console.log(this.positionObj.y);
        console.log(this.positionObj.z);
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
      console.log(initPosition);
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
    // 加载渲染器
    initRender() {
      this.renderer = new THREE.WebGLRenderer(
        {
          antialias: true,
          // alpha: true ,
          logarithmicDepthBuffer: true
        }
      );
      this.renderer.setSize(window.innerWidth*0.453, window.innerHeight*0.457); // 设置渲染区域尺寸
      //将webgl渲染的canvas内容添加到body 
      this.renderer.outputEncoding = THREE.sRGBEncoding;
      document.getElementById("model1").appendChild(this.renderer.domElement);
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
      loader.load("model/modelDraco.glb",(gltf)=>{
          let model = gltf.scene;
          model.scale.set(0.2,0.2,0.2)
          this.scene.add(model);
        })
    },
    // 使用OrbitControls控制三维场景缩放和旋转等功能
    initControls(){
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      this.controls.update();
      this.controls.target = new THREE.Vector3(-138,-181,41)
      //添加坐标轴辅助器
      // this.axesHelper = new THREE.AxesHelper(5);
      // this.scene.add(this.axesHelper);
    },
    //渲染场景以及控制
    animate(){
      TWEEN.update();
      this.renderer.render(this.scene, this.camera);
      this.controls.update();
      if (this.composer) {
        this.composer.render();
      }
      this.animateid = requestAnimationFrame(this.animate);
    },
    //初始化函数，页面加载完成时调用
    init() {
      this.initScene();
      this.initCamera();
      this.initLight();
      this.initRender();
      this.initModel(); //加载3D模型
      this.initControls(); //控制代码
      this.animate(); //渲染代码
    },
   }
}
</script>

<style lang="less" scoped>
.threedi{
  width: 98%;
  height: 90%;
  margin-left: 1%;
  margin-top: 2%;
  // background-color: #fff;
}

</style>