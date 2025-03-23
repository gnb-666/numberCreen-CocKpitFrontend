<template>
  <div id="model">

  </div>
  <div class="table" >
    <el-table :data="tableData">
    <el-table-column prop="name" label="指标名称" />
    <el-table-column prop="ph" label="pH" />
    <el-table-column prop="no" label="氮氧(mg/L)" />
    <el-table-column prop="cod" label="COD(mg/L)" />
    <el-table-column prop="p" label="总磷(mg/L)" />
    <el-table-column prop="n" label="总氮(mg/L)" />
    </el-table>
  </div>
</template>
<script setup>
import * as THREE from "three";
import axios from '@/axios'
import {reactive,ref,onMounted,nextTick} from 'vue';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// 引入gltf模型加载库GLTFLoader.js
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

let tableData = ref([{
  name:'标准值',
  ph:'6-9',
  no:25,
  cod:150,
  p:1,
  n:70
}])
//创建一个三维场景
const scene = new THREE.Scene()
//添加光源
const ambient = new THREE.AmbientLight(0xffffff, 1)
const light1 = new THREE.DirectionalLight(0xffffff, 1)
scene.add(ambient)
light1.position.set(400, 200, 300)
scene.add(light1)

//创建一个透视相机
const width = window.innerWidth*0.45, height = window.innerHeight*0.45  ,
camera = new THREE.PerspectiveCamera(45, width/height, 1, 1000)
//设置相机位置
camera.position.set(120,120,120) 
//设置相机方向
// camera.lookAt(0,0,0)
//创建辅助坐标轴
const axesHelper = new THREE.AxesHelper(100)
// scene.add(axesHelper)


const loader = new GLTFLoader(); //创建一个GLTF加载器
  loader.load("model/工厂/工厂.gltf",(gltf)=>{
  let model = gltf.scene;
  scene.add(model);
})

//创建一个WebGL渲染器
const renderer = new THREE.WebGLRenderer()
renderer.setSize(width,height)
renderer.render(scene,camera)
// renderer.outputEncoding = THREE.sRGBEncoding;
const controls = new OrbitControls(camera, renderer.domElement)
controls.target.set(0,0,0)

const animate = ()=>{
  renderer.render(scene,camera)
  requestAnimationFrame(animate)
}
const onWindowResize=()=>{
  renderer.setSize(window.innerWidth*0.45, window.innerHeight*0.45);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}
const getindicatorLIst = ()=>{
  axios.get('/indicator').then((res)=>{
    tableData.value = res
  })
}
onMounted(()=>{
  getindicatorLIst()
  animate()
  document.getElementById('model')?.appendChild(renderer.domElement)
  window.onresize = onWindowResize
})
</script>
<style lang="less" scoped>
#model {
  margin-left: 5vw;
  margin-top: 1vh;
  width: 45vw;
  height: 45vh;
  z-index: 1;
  background-color: #fff;
}
.table {
  position: absolute;
  width: 20vw;
  height: 40vh;
  right: 5vw;
  top: 15vh;
}
/deep/ .el-table tr {
  background-color: transparent;
}
/deep/ .el-table{
  background-color: transparent;
  --el-table-border: 0px solid;
  --el-table-header-bg-color: transparent;
  --el-table-border-color: transparent;
  --el-table-header-text-color: #fff;
  color: rgb(255, 192, 0);
}
</style>
