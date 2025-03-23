<template>
  <div id="model" @click="onMouseClick">
  </div>
 
  <div class="back">
    <img src="@/assets/images/恢复视角.png" @click="back">
    <div>恢复视角</div>
  </div>
  <div class="in">
    <img src="@/assets/images/进入工厂.png" @click="inFactory1">
    <div>进入工厂</div>
  </div>
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

export default {
   data() {
      return {
        publicPath: process.env.BASE_URL,
        renderer: null,
        labelRenderer:null,
        controls: null,
        light:null,
        light2:null,
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
        mods:[]
      }
   },
   created(){
   },
   computed:{
   },
   components:{
   },
   mounted() {
    this.init();
   },
   methods:{
    // 创建模型试图
    initScene() {
      this.scene = new THREE.Scene();
    },
    // 初始化相机
    initCamera() {
      this.camera = new THREE.PerspectiveCamera(30,window.innerWidth / window.innerHeight,1, 3000);
      this.camera.position.set(200, 150, 100);
    },
    // 初始化灯光
    initLight() {
      this.light = new THREE.AmbientLight(0xffffff, 1)
      this.scene.add(this.light); //点光源添加到场景中
      this.light2 = new THREE.DirectionalLight(0xffffff, 1);
      this.light2.position.set(400, 200, 300);
      this.scene.add(this.light2);
    },
    // 加载渲染器
    initRender() {
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize(window.innerWidth*0.95, window.innerHeight*0.8); // 设置渲染区域尺寸
      // this.renderer.outputEncoding = THREE.sRGBEncoding;
      document.getElementById("model").appendChild(this.renderer.domElement);

      // 初始化标签
      this.labelRenderer = new CSS2DRenderer();
      this.labelRenderer.setSize(window.innerWidth*0.95, window.innerHeight*0.8);
      this.labelRenderer.domElement.style.position = "absolute";
      this.labelRenderer.domElement.style.top = 0;
      this.labelRenderer.domElement.style.pointerEvents = 'none';
      this.labelRenderer.domElement.className = "allLabel"
      document.getElementById("model").appendChild(this.labelRenderer.domElement);
    },
    // 加载模型
    initModel() {
      const loader = new GLTFLoader(); //创建一个GLTF加载器
      loader.load("model/工厂/工厂.gltf",(gltf)=>{
        let model = gltf.scene;
        this.scene.add(model);
      })
      console.log(this.scene);
      // let label1 = this.createLabelObj('-储罐01-',{x:-5,y:7,z:40})
      // this.scene.add(label1)
      // let label2 = this.createLabelObj('-储罐02-',{x:20,y:7,z:40})
      // this.scene.add(label2)
      let label1 = this.createLableObj1('-储罐01-',{x:5,y:3,z:40})
      this.scene.add(label1)
      let label2 = this.createLableObj1('-储罐02-',{x:25,y:3,z:40})
      this.scene.add(label2)
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
        new THREE.Vector2(window.innerWidth*0.95, window.innerHeight*0.8),
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
      // console.log(event);
      
      // console.log(event.srcElement.type);
      // if(event.srcElement.type!=='div'){
      //   return
      // }
      // this.renderer.outputEncoding = THREE.sRGBEncoding;
      //通过鼠标点击的位置计算出raycaster所需要的点的位置，以屏幕中心为原点，值的范围为-1到1
      this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(event.clientY / (window.innerHeight - 50)) * 2 + 1;
      // 通过鼠标点的位置和当前相机的矩阵计算出raycaster
      this.raycaster.setFromCamera(this.mouse, this.camera);
      // 获取raycaster直线和所有模型相交的数组集合
      let intersects = this.raycaster.intersectObjects(this.scene.children);
      if (!intersects[0]) {
        return;
      } else {
        console.log(intersects[0].object.name,this.loader,this.scene.getObjectByName('大货车'));
        this.moveCar = [];
        this.mods.push(this.scene.getObjectByName('大货车'));
        this.moveCar.push(this.scene.getObjectByName('大货车'));
        // this.outlineObj(this.moveCar);
      if (!intersects[0].object.name == "") {
        if((intersects[0].object.name == "柱体013")||(intersects[0].object.name == "柱体")) {
          console.log(intersects[0].object.name);
        this.selectedObjects = [];
        this.selectedObjects.push(intersects[0].object);
        // console.log(this.selectedObjects);
        this.outlineObj(this.selectedObjects);
        this.positionObj = {
            x: intersects[0].object.position.x,
            y: intersects[0].object.position.y,
            z: intersects[0].object.position.z,
        };

        //点击设计标签
        // let pointLabelDom = this.createLableObj1(intersects[0].object.name, intersects[0].point)
        // this.scene.add(pointLabelDom)

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
    // 使用OrbitControls控制三维场景缩放和旋转等功能
    initControls(){
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      // this.controls = new OrbitControls(this.camera, this.labelRenderer.domElement);
      // AxesHelper：辅助观察的坐标系
      this.controls.target = new THREE.Vector3(30,-25,-25)
      let axesHelper = new THREE.AxesHelper(100);
      // this.scene.add(axesHelper);
      // console.log(this.camera.position);
    },
    // 初始化运动轨迹
    initCurve(){
      const curve = new THREE.CatmullRomCurve3([new THREE.Vector3(-37.8, 0, 81),new THREE.Vector3(38.5, 0, 81),new THREE.Vector3(38.5, 0, -80),new THREE.Vector3(-37.8, 0, -80)])
      curve.curveType = "catmullrom"
      curve.closed = true // 设置是否闭环
      curve.tension = 0
      // 为曲线添加材质在场景中显示出来，不显示也不会影响运动轨迹，相当于一个Helper
      const points = curve.getPoints(50);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({ color: 0x000000 });

      // Create the final object to add to the scene
      const curveObject = new THREE.Line(geometry, material);
      this.scene.add(curveObject)
      this.curve = curve
    },
    // 物体沿线移动方法
    moveOnCurve(){
      var model = this.moveCar[0] 
      if (this.curve == null) {
        console.log("Loading")
      } else {
        if (this.progress <= 1 - this.velocity) {
          const point = this.curve.getPointAt(this.progress); //获取样条曲线指定点坐标
          const pointBox = this.curve.getPointAt(this.progress + this.velocity); //获取样条曲线指定点坐标

          if (point && pointBox) {
            model.position.set(point.x, point.y, point.z);
            // model.lookAt(pointBox.x, pointBox.y, pointBox.z); //因为这个模型加载进来默认面部是正对Z轴负方向的，所以直接lookAt会导致出现倒着跑的现象，这里用重新设置朝向的方法来解决。

            var targetPos = pointBox   //目标位置点
            var offsetAngle = 3.14 //目标移动时的朝向偏移

            // //以下代码在多段路径时可重复执行
            var mtx = new THREE.Matrix4()  //创建一个4维矩阵
            // .lookAt ( eye : Vector3, target : Vector3, up : Vector3 ) : this,构造一个旋转矩阵，从eye 指向 target，由向量 up 定向。
            mtx.lookAt(model.position, targetPos, model.up) //设置朝向
            mtx.multiply(new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(0, offsetAngle, 0)))
            var toRot = new THREE.Quaternion().setFromRotationMatrix(mtx)  //计算出需要进行旋转的四元数值
            model.quaternion.slerp(toRot, 0.2)
          }

          this.progress += this.velocity;
        } else {
          this.progress = 0;
        }
	    }
    },
    // 运动动画
    animate(){
      TWEEN.update();
      // console.log(this.controls.target);
      if(this.moveCar.length!==0){
        // console.log(this.moveCar[0].position);
        this.moveOnCurve();
        // this.moveCar[0].position.set(this.moveCar[0].position.x,this.moveCar[0].position.y+0.1,this.moveCar[0].position.z)
      }
      this.renderer.render(this.scene, this.camera);
      this.labelRenderer.render(this.scene, this.camera);
      
      this.controls.update();
      if (this.composer) {
        this.composer.render();
      }
      requestAnimationFrame(this.animate);
    },
    //初始化函数，页面加载完成是调用
    init() {
      this.initScene();
      this.initCamera();
      this.initLight();
      this.initRender();
      this.initModel();
      this.initControls();
      this.initCurve();
      this.animate();
      // this.clickEvents();
      window.onresize = this.onWindowResize;
      // window.onclick = this.onMouseClick;
    },
    //根据浏览器窗口自适应
    onWindowResize() {
      this.renderer.setSize(window.innerWidth*0.95, window.innerHeight*0.8);
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
    },
    // 2d创建标签
    // createLabelObj(text, vector){
    //   let labelDiv = document.createElement('div'); // 创建div容器
    //   labelDiv.className = 'label_name';
    //   // labelDiv.style.border = '1px solid red';
    //   labelDiv.style.color='#fff';
    //   labelDiv.style.backgroundImage='url('+require('../static/images/page_2.png')+')'
    //   labelDiv.style.backgroundSize = '100% 100%'
    //   // labelDiv.style.marginleft='80px'
    //   labelDiv.id = text;
    //   labelDiv.textContent = text + '\n' + "余量：123";
    //   let pointLabel = new CSS2DObject(labelDiv);   
    //   pointLabel.position.set(vector.x, vector.y, vector.z);
    //   return pointLabel;
    // },
    // 创建标签
    createLableObj1 (text, vector) {
      let laberDiv = document.createElement('div');//创建div容器
      laberDiv.className = 'laber_name';
      laberDiv.id = 'tag'
      // laberDiv.textContent = text;
      laberDiv.innerHTML = `
          <div class='label_count'>
              ${text}
          </div>
      `
      // 给标签设置坐标位置
      laberDiv.setAttribute("data-point", JSON.stringify(this.camera.position))
      // laberDiv.setAttribute("data-place", JSON.stringify(this.controls.target))
      let pointLabel = new CSS2DObject(laberDiv);
      pointLabel.position.set(vector.x, vector.y, vector.z);
      return pointLabel;
    },
    // 鼠标点击创建标签
    // clickEvents (e) {
    //   this.onMouseClick(e)
    //   // window.addEventListener('click', this.onMouseClick);
    //   // console.log("点击了");
    // },


    // 返回主视角
    back(){
      this.initTween(100,130,150)
    },
    Displaytag(){
      if(this.flagShowTag == true){
        var label = document.getElementsByClassName('laber_name')
        for(var i=0;i<label.length;i++){
          document.getElementsByClassName('laber_name')[i].style.visibility="hidden"
        }
        this.flagShowTag = false
      }else{
        var label = document.getElementsByClassName('laber_name')
        for(var i=0;i<label.length;i++){
          document.getElementsByClassName('laber_name')[i].style.visibility="visible"
        }
        this.flagShowTag = true
      }
      
      // document.getElementsByClassName('laber_name').style.visibility="hidden"
      // document.getElementById('tag').style.visibility="hidden"
      // console.log('display');
    },
    DisplayVedio(){
      if(this.flagShowVedio == true){
        this.flagShowVedio = false
      }else{
        this.flagShowVedio = true
      }
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
      .to({ x: 0, y: 8, z: -5}, 2000)
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
      
    }
   },
}
</script>
<style lang="less" scoped>
#model {
  width: 95vw;
  height: 80vh;
  margin-top: 2vh;
  margin-left: 2.5vw;
}
/deep/ .laber_name{
    width: 6vh;
    height: 3vh;
    margin-top: 30px;
    background: url(@/assets/images/tag.png) no-repeat;
    background-size: 100% 100%;
    .label_count{
      margin-left: 20px;
      margin-top: -45px;
      color: rgb(255, 192, 0);
    }
  }

.back{
  z-index: 2;
  position: absolute;

  left:5vw;
  top: 15vh;
  img {
    width: 4vw;
    height: 5vh;
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
  left:4.6vw;
  top: 25vh;
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
</style>
