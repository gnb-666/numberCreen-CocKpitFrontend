<template>
  <div>
    <div class="title">
      <div class="detectbox">
        <div><img src="@/assets/images/security/cvd/三角.png" style="width:1.2vw;height: 1.2vw;"><div class="text">{{ $store.state.section }}报警</div></div>
        <div class="detectbtnBox">
          <el-button class="detectbtn" id="1" link :style="{backgroundColor:(activebtn==true?'#33e1ff':'#0b1a41')}" @click="toggle()">{{ $store.state.section }}监控报警</el-button>
          <el-button class="detectbtn" id="2" link :style="{backgroundColor:(activebtn==false?'#33e1ff':'#0b1a41')}" @click="toggle()">{{ $store.state.section }}报警点位</el-button>
        </div>
        <div class="detectinfo">
          <div class="infoline" v-for="(item) in warninglist" :style="Bcolor(item.warningLevel)" v-if="activebtn">
            <div class="infotitle">{{ item.describe }}</div>
            <div class="infotype">{{ item.realTime }}</div>
          </div>
          <div class="infoline" v-for="(item) in infolist" :style="Bcolor(item.warningLevel)" v-else>
            <div class="infotitle">{{ item.describe }}</div>
            <div class="infotype">{{ item.type }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {reactive,ref,computed,onMounted,watch } from 'vue';
import store from '@/store/index'
import axios from '@/axios';

const infolist = ref([])

const warninglist = ref([])

const activebtn = ref(true)

const toggle= ()=>{
  activebtn.value = !activebtn.value
}

const Bcolor = computed (()=> { 
 		return  function (item) {
      // console.log(item);
      if(item==0){
        return 'color:#ff0000'
      }else if(item==1){
        return 'color:#ffc000'
      }else if(item==2){
        return 'color:#ffff00'
      }else{
        return 'color:#0070c0'
      }
 			
 		} 
})

const getinfoList = ()=>{
  let type = ''
  switch(store.state.section){
    case '氢化工段':
      type='QH'
      break;
    case '净化工段':
      type='JH'
      break;
    case '渣浆高沸工段':
      type='ZJ'
      break;
    case '还原工段':
      type='HY'
      break;
    case '公用工程工段':
      type='GYGC' 
      break;
  }
  axios.get(`/infolist/${type}`).then(res=>{
    // console.log(res);
    infolist.value = res
    return res
  })
  // console.log(data);
} 

const getwarningList = ()=>{
  let type = ''
  switch(store.state.section){
    case '氢化工段':
      type='QH'
      break;
    case '净化工段':
      type='JH'
      break;
    case '渣浆高沸工段':
      type='ZJ'
      break;
    case '还原工段':
      type='HY'
      break;
    case '公用工程工段':
      type='GYGC' 
      break;
  }
  axios.get(`/warninglist/${type}`).then(res=>{
    warninglist.value = res
    return res
  })
} 

const section = computed (()=>{
  return store.state.section
})

watch(section,(newVal,oldVal)=>{
  getwarningList()
  getinfoList()
})
// watch(section, (newVal, oldVal) => {
// 	console.log('newVal, oldVal', newVal, oldVal)
// }, {immediate:true,deep:true});

onMounted(()=>{
  getwarningList()
  getinfoList()
})

</script>
<style lang="less" scoped>
.title{
  height: 60vh;
  width: 25vw;
//  background-color: #fff;
  .text{
    height: 2.1vw;
    font-size: 20px;
    vertical-align: middle;
    color: #fff;
    font-weight: 600;
    display: inline-block;
    margin-left: 1vw;
  }
  .detectbox{
    margin-top: 2vh;
    height: 40vh;
    // background-color: #fff;
    
    .detectbtnBox{
      height: 5vh;
      .detectbtn{
        width: 12vw;
        height: 5vh;
        font-size: 20px;
        color: #fff;
      }
    }
    .detectinfo{
      // background-color: #fff;
      margin-top: 1vh;
      height: 50vh;
      overflow: auto;
      position: absolute;
  /*定义整体的宽度*/
    &::-webkit-scrollbar {
        width: 10px;
      }
      /*定义滚动条轨道*/
      &::-webkit-scrollbar-track {
        border-radius: 5px;
      }
      /*定义滑块*/
      &::-webkit-scrollbar-thumb {
        border-radius: 5px;
        background: rgba(27, 140, 236, 0.5);
      }
      .infoline{
        height: 4vh;
        background-color: #0b1a41;
        width: 25vw;
        .infotitle{
        // width: 25w;
        display: inline-block;
        font-size: 16px;
        font-weight:700;
        line-height: 4vh;
        position: absolute;
        left: 1vw;
      }
      .infotype{
        display: inline-block;
        position: absolute;
        right: 2vw;
        line-height: 4vh;
        font-size: 16px;
        font-weight:700;
      }
      }
      
    }
  }
}
</style>
