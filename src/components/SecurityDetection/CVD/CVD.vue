<template>
  <div class="cvdheader">{{$store.state.cvdName}}</div>
  <div class="cvdcontent">
    <div class="cvdbox"><div id="cvd" @click="onMouseClick"></div></div>
    <div class="cvdbtn">
      <el-button class="btn" link @click="refresh()">正常视图</el-button>
      <el-button class="btn" @click="inFactory1" link>查看炉内</el-button>
      <!-- <el-button class="btn" link>透明模式</el-button> -->
    </div>
  </div>

  <div class="rodsinfo" id="rodsinfo" :style="{left:left+'px',top:top+'px'}" v-show="visible">
    <div class="rodstitle">
      <div class="rodimg"></div><div class="rodtext">多晶硅棒</div>
    </div>
    <div class="rodstext">
      <div class="rods_T0">
        <div class="rods_title">硅棒表面温度</div>
        <div class="rods_T0_text">1239.2K</div>
      </div>
      <div class="rods_T1">
        <div class="rods_title">硅棒内芯温度</div>
        <div class="rods_T1_text">1576.7K</div>
      </div>
      <div class="rods_R0">
        <div class="rods_title">硅棒半径</div>
        <div class="rods_R0_text">70mm</div>
      </div>
      <div class="rods_V">
        <div class="rods_title">硅沉积速率</div>
        <div class="rods_V_text">8.09μm/min</div>
      </div>
      <div class="rods_I">
        <div class="rods_title">硅棒电流</div>
        <div class="rods_I_text">2038.85A</div>
      </div>
    </div>
  </div>

  <div class="cvdBottom" :style="{left:left+'px',top:top+'px'}" v-show="cvdBottomvisible">
    <div class="cvdBottomtitle">
      <div class="rodimg"></div><div class="rodtext">多晶硅底盘</div>
    </div>
  </div>

  <div class="cvdCover" :style="{left:left+'px',top:top+'px'}" v-show="cvdCovervisible">
    <div class="cvdCovertitle">
      <div class="rodimg"></div><div class="rodtext">多晶硅夹套</div>
    </div>
  </div>

</template>
<script >
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
import { ElNotification } from 'element-plus'
import { FORWARD } from "element-plus/es/components/virtual-list/src/defaults";
// import Stats from 'three/examples/jsm/libs/stats.module.js'

export default{
  data(){
    return { 
      // 选中的模型
      selectedObjects: [],
      mouse: new THREE.Vector2(),
      raycaster: new THREE.Raycaster(),
      // 物体
      ball:'',
      ball1:'',
      rod11:'',
      rods:[],
      left:0,
      top:0,
      visible:false,
      cvdBottomvisible:false,
      cvdCovervisible:false
    }
  },
  created(){
   },
   computed:{
    cvdName(){
      return this.$store.state.cvdName;
    }
   },
   watch:{
    cvdName(newVal, oldVal){
      this.refresh()
    }
   },
   components:{
   },
   mounted() {
    this.init()
   },
   methods:{
    init(){
      this.initScene();
      this.initCamera();
      this.initLight();
      this.initRender();
      this.initModel();
      this.initControls(); //控制代码
      this.animate(); //渲染代码
    },
    initScene(){
      this.scene = new THREE.Scene();
    },
    initCamera(){
      this.camera = new THREE.PerspectiveCamera(75,(window.innerWidth*0.2) / (window.innerHeight*0.6),0.1, 1000);
      this.camera.position.set(-15, 5, 4);
      this.scene.add(this.camera);
      // console.log(this.camera);
    },
    initLight(){
      this.light = new THREE.AmbientLight(0xffffff, 1)
      this.scene.add(this.light); //点光源添加到场景中
    },
    initRender(){
      this.renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true ,
      logarithmicDepthBuffer: true } );
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(window.innerWidth*0.4, window.innerHeight*0.70); // 设置渲染区域尺寸
      //将webgl渲染的canvas内容添加到body 
      // this.renderer.outputEncoding = THREE.sRGBEncoding;
      document.getElementById("cvd").appendChild(this.renderer.domElement);
    },
    initModel(){
      const loader = new GLTFLoader(); //创建一个GLTF加载器
      loader.load("model/CVD.glb",(gltf)=>{
        let model = gltf.scene;
        model.scale.set(5,5,5)
        this.scene.add(model);
      })
    },
    initControls(){
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      this.controls.update();
      this.controls.target =new THREE.Vector3(3.8,6.08,-0.8)  
    },
    animate(){
      // console.log(this.controls.target,this.camera);
      TWEEN.update();
      this.renderer.render(this.scene, this.camera);
      this.controls.update();
      if (this.composer) {
        this.composer.render();
      }
      this.rodsanimate()
      requestAnimationFrame(this.animate);
    },
    inFactory1(){
      this.ball = this.scene.getObjectByName('球体001_1')
      this.ball1 = this.scene.getObjectByName('球体001')
      for(let i=0;i<24;i++){
        
        if(i==0){
          this.rods[0] = this.scene.getObjectByName('柱体')
        }else if(i<=9){
          this.rods[i] = this.scene.getObjectByName(`柱体00${i}`)
        }else{
          this.rods[i] = this.scene.getObjectByName(`柱体0${i}`)
        }
      }
      // console.log(this.ball.position,this.ball1.position,this.bang11,this.scene);
      this.rod11 = this.scene.getObjectByName('柱体011')
      this.ObjectTween(this.ball,{x:0,y:3,z:0})
      this.ObjectTween(this.ball1,{x:0,y:3,z:0})

     
    },
    ObjectTween(object,to){
      var from = {
        x:object.position.x,
        y:object.position.y,
        z:object.position.z
      }
      var tween = new TWEEN.Tween(from).to(to, 100).easing(TWEEN.Easing.Quadratic.InOut)
      tween.onUpdate(() => {
        object.position.x = to.x
        object.position.y = to.y
        object.position.z = to.z
      })
      tween.start()
    },
    onMouseClick(event){
      
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
        this.visible=false
        this.cvdBottomvisible = false
        this.cvdCovervisible = false
        this.selectedObjects=[]
        if(this.composer !== undefined ){
          this.composer.passes.pop()
        }
        return;
      } else {
        this.left=event.clientX-120
        this.top=event.clientY-120
        // console.log(intersects[0].object);
        if(intersects[0].object.name=='还原炉底盘'){
          this.visible=false
          this.cvdBottomvisible=true
          this.cvdCovervisible = false
          this.selectedObjects = [];
          this.selectedObjects.push(intersects[0].object);
        // this.selectedObjects.push(this.ball1)
          this.outlineObj(this.selectedObjects);
        }else if(intersects[0].object.name=='球体001_1'){
          this.visible=false
          this.cvdBottomvisible = false
          this.cvdCovervisible = true
          this.selectedObjects = [];
          this.selectedObjects.push(intersects[0].object);
        this.outlineObj(this.selectedObjects);
        }else if(intersects[0].object.name=='球体001'){
          this.visible=false
          this.cvdBottomvisible = false
          this.cvdCovervisible = false
          return
        }else{
          this.selectedObjects = [];
          this.selectedObjects.push(intersects[0].object);
          // this.selectedObjects.push(this.ball1)
          this.outlineObj(this.selectedObjects);
          
          this.visible=true
          this.cvdBottomvisible = false
        }
        
      }
    },
    rodsanimate(){
      if(this.rods.length!==0){
        for(let i=0;i<this.rods.length;i++){
          // console.log(this.rods[i]);
          var x = this.rods[i].scale.x
          var y = this.rods[i].scale.y
          var z = this.rods[i].scale.z
          this.rods[i].scale.set(
            x+0.0001>0.1?x=0.005:x+0.0001,
            y,
            z+0.0001>0.1?z=0.005:z+0.0001,
          )
          // console.log(x,z);
        }
      }
    },
    //高亮显示模型（呼吸灯）
    outlineObj(selectedObjects,color) {
      
      // 创建一个EffectComposer（效果组合器）对象，然后在该对象上添加后期处理通道。
      this.composer = new EffectComposer(this.renderer);
      // 新建一个场景通道  为了覆盖到原理来的场景上
      
      this.renderPass = new RenderPass(this.scene, this.camera);
      this.composer.addPass(this.renderPass);

      //ssaa
      // 物体边缘发光通道
      
      this.outlinePass = new OutlinePass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        this.scene,
        this.camera,
        selectedObjects
      );
      // this.outlinePass.renderToScreen = true
      this.outlinePass.edgeStrength = 12.0; // 高光边缘边框的亮度
      this.outlinePass.edgeGlow = 1; // 光晕[0,1]  边缘微光强度 
      this.outlinePass.usePatternTexture = false; // 是否使用父级的材质，纹理覆盖
      this.outlinePass.edgeThickness = 3; // 边框宽度，高光厚度
      this.outlinePass.downSampleRatio = 1; // 边框弯曲度
      this.outlinePass.pulsePeriod = 2; // 呼吸闪烁的速度，数值越大，律动越慢
      color==null?this.outlinePass.visibleEdgeColor.set(parseInt(0x00f6ff)):this.outlinePass.visibleEdgeColor.set(parseInt(color)); // 呼吸显示的颜色 // 呼吸显示的颜色
      this.outlinePass.hiddenEdgeColor = new THREE.Color(0, 0, 0); // 呼吸消失的颜色
      // this.outlinePass.clear = true
      this.composer.addPass(this.outlinePass); // 加入高光特效
      this.outlinePass.selectedObjects = this.selectedObjects; // 需要高光的模型
      // console.log(this.scene);
    },
    refresh(){
      this.ball = this.scene.getObjectByName('球体001_1')
      this.ball1 = this.scene.getObjectByName('球体001')
      this.camera.position.set(-15, 5, 4);
      this.ObjectTween(this.ball,{x:0,y:0,z:0})
      this.ObjectTween(this.ball1,{x:0,y:0,z:0})
      this.composer.passes.pop()
      // console.log(this.composer.passes);

    }
  },
}
</script>
<style lang="less" scoped>
.cvdheader{
  width: 35vw;
  height: 5vh;
  text-align: center;
  // background-color: #fff;
  font-size: 3vw;
  color: #fff;
  position: absolute;
  top: 0vh;
  left: 28vw;
}
.cvdbox {
  width: 35vw;
  height: 70vh;
  position: absolute;
  top:5vh;
  left: 28vw;
  border-image-source: radial-gradient(68% 68%, transparent 0px, transparent 100%, cyan 100%);
  border-image-slice: 1;
  border-width: 3px;
  border-style: solid;
  border-image-outset: 0cm;
}
.cvdbtn{
  padding-top: 1vh;
  width: 40vw;
  height: 5vh;
  text-align: center;
  position: absolute;
  top: 76vh;
  left: 27vw;
  // background-color: #fff;
  .btn{
    width: 10vw;
    height: 5vh;
    background:  url("~@/assets/images/security/cvd/btn.png") top center no-repeat;
    color:#100b2b;
    font-size: 1.3vw;
    font-weight: 600;
  }
  .el-button{
    --el-button-hover-link-text-color:#fff;
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
.rodsinfo{
  width: 220px;
  height: 290px;
  background:url('@/assets/images/security/cvd/cvd背景.png') no-repeat;
  background-size: 100% 100%;
  position: absolute;

  .rodstitle{
    width: 220px;
    height: 70px;
    border-bottom: 2px solid #100b2b;
    .rodimg{
      width: 50px;
      height: 50px;
      margin-left: 10px;
      margin-top: 10px;
      background:url('@/assets/images/security/cvd/硅棒.png') no-repeat;
      background-size: 100% 100%;
      display: inline-block;
    }
    .rodtext {
      width: 100px;
      height: 60px;
      margin-left: 10px;
      display: inline-block;
      vertical-align:bottom;
      line-height: 60px;
      color: #fff;
      font-size: 18px;
    }
  }
  .rodstext{
    width: 200px;
    height: 130px;
    .rods_title{
        height: 20px;
        width: 120px;
        color: #fff;
        line-height: 20px;
        font-size: 16px;
        text-align: center;
        display: inline-block;
      }
    .rods_T0{
      width: 200px;
      height: 40px;
      margin-top: 10px;
     
      .rods_T0_text{
        height: 40px;
        width: 80px;
        line-height: 40px;
        font-size: 16px;
        font-weight: 700;
        text-align: center;
        display: inline-block;
        color: #ffc000;
      }
    }

    .rods_T1{
      width: 200px;
      height: 40px;
      .rods_T1_text{
        height: 40px;
        width: 80px;
        line-height: 40px;
        font-size: 16px;
        font-weight: 700;
        text-align: center;
        display: inline-block;
        color: #ff0000;
      }
    }

    .rods_R0{
      width: 200px;
      height: 40px;
      .rods_R0_text{
        height: 40px;
        width: 80px;
        line-height: 40px;
        font-size: 16px;
        font-weight: 700;
        text-align: center;
        display: inline-block;
        color: #fff;
      }
    }
    .rods_V{
      width: 200px;
      height: 40px;
      .rods_V_text{
        height: 40px;
        width: 80px;
        line-height: 40px;
        font-size: 16px;
        font-weight: 700;
        text-align: center;
        display: inline-block;
        color: red;
      }
    }
    .rods_I{
      width: 200px;
      height: 40px;
      .rods_I_text{
        height: 40px;
        width: 80px;
        line-height: 40px;
        font-size: 16px;
        font-weight: 700;
        text-align: center;
        display: inline-block;
        color: #fff;
      }
    }
  }
}

.cvdBottom{
  width: 200px;
  height: 290px;
  background:url('@/assets/images/security/cvd/cvd背景.png') no-repeat;
  background-size: 100% 100%;
  position: absolute;
  .cvdBottomtitle{
    width: 200px;
    height: 70px;
    border-bottom: 2px solid #100b2b;
    .rodimg{
      width: 50px;
      height: 50px;
      margin-left: 10px;
      margin-top: 10px;
      background:url('@/assets/images/security/cvd/硅棒.png') no-repeat;
      background-size: 100% 100%;
      display: inline-block;
    }
    .rodtext {
      width: 100px;
      height: 60px;
      margin-left: 10px;
      display: inline-block;
      vertical-align:bottom;
      line-height: 60px;
      color: #fff;
      font-size: 18px;
    }
  }
}

.cvdCover{
  width: 200px;
  height: 290px;
  background:url('@/assets/images/security/cvd/cvd背景.png') no-repeat;
  background-size: 100% 100%;
  position: absolute;

  .cvdCovertitle{
    width: 200px;
    height: 70px;
    border-bottom: 2px solid #100b2b;
    .rodimg{
      width: 50px;
      height: 50px;
      margin-left: 10px;
      margin-top: 10px;
      background:url('@/assets/images/security/cvd/硅棒.png') no-repeat;
      background-size: 100% 100%;
      display: inline-block;
    }
    .rodtext {
      width: 100px;
      height: 60px;
      margin-left: 10px;
      display: inline-block;
      vertical-align:bottom;
      line-height: 60px;
      color: #fff;
      font-size: 18px;
    }
  }
}
</style>
