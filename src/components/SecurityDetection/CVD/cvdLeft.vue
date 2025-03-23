<template>
  <div>
    <div class="title">
      <div><img src="@/assets/images/security/cvd/三角.png" style="width:1.2vw;height: 1.2vw;"><div class="text">还原炉选择</div></div>
      <div class="titlebox">
        <el-button class="btn" link v-for="item in cvdlist" @click="chooseCvd(item.text)">{{item.text}}</el-button>
      </div>
      <div class="detectbox">
        <div><img src="@/assets/images/security/cvd/三角.png" style="width:1.2vw;height: 1.2vw;"><div class="text">数据检测</div></div>
        <div class="detectbtnBox">
          <el-button class="detectbtn" id="1" link :style="{backgroundColor:(activebtn==true?'#33e1ff':'#0b1a41')}" @click="toggle()">实时报警信息</el-button>
          <el-button class="detectbtn" id="2" link :style="{backgroundColor:(activebtn==false?'#33e1ff':'#0b1a41')}" @click="toggle()">报警点位信息</el-button>
        </div>
        <div class="detectinfo">   
          <div class="infoline" v-for="(item) in warininglist" :style="{backgroundColor:(item.id%2==0?'#0b1a41':'#100b2b'),color:(item.warning==false?'#33e1ff':'#ffc000')}"  v-if="activebtn">
            <div class="infotitle">{{ item.describe }}</div>
            <div class="infotime">{{ item.type }}</div>
          </div>
          <div class="infoline" v-for="(item) in infolist" :style="{backgroundColor:(item.id%2==0?'#0b1a41':'#100b2b'),color:(item.warning==false?'#33e1ff':'#ffc000')}" v-else>
            <div class="infotitle">{{ item.describe }}</div>
            <div class="infotime">{{ item.type }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {reactive,ref,onMounted} from 'vue';
import store from '@/store/index'
import axios from '@/axios';

const cvdlist = reactive([
  {
    text:"1号炉",
    id:0
  },
  {
    text:"2号炉",
    id:1
  },
  {
    text:"3号炉",
    id:2
  },
  {
    text:"4号炉",
    id:3
  },
  {
    text:"5号炉",
    id:4
  },
  {
    text:"6号炉",
    id:5
  },
  {
    text:"7号炉",
    id:6
  },
  {
    text:"8号炉",
    id:7
  },
  {
    text:"9号炉",
    id:8
  },
  {
    text:"10号炉",
    id:9
  },
  {
    text:"11号炉",
    id:10
  },
  {
    text:"12号炉",
    id:11
  },
  {
    text:"13号炉",
    id:12
  },
  {
    text:"14号炉",
    id:13
  },
  {
    text:"15号炉",
    id:14
  },
  {
    text:"16号炉",
    id:15
  },
  {
    text:"17号炉",
    id:16
  },
  {
    text:"18号炉",
    id:17
  },
  {
    text:"19号炉",
    id:18
  },
  {
    text:"20号炉",
    id:19
  },
  {
    text:"21号炉",
    id:20
  },
  {
    text:"22号炉",
    id:21
  },
  {
    text:"23号炉",
    id:22
  },
  
])

const infolist = ref([{
  title:'炉温过高',
  time:'2023/06/27 12:50',
  id:0,
  warning:true
},{
  title:'炉温正常',
  time:'2023/06/27 12:51',
  id:1,
  warning:false
},
{
  title:'炉温正常',
  time:'2023/06/27 12:51',
  id:2,
  warning:false
},
{
  title:'炉温正常',
  time:'2023/06/27 12:51',
  id:3,
  warning:false
},
{
  title:'炉温异常',
  time:'2023/06/27 12:51',
  id:4,
  warning:true
},
{
  title:'炉温异常',
  time:'2023/06/27 12:51',
  id:5,
  warning:true
},
{
  title:'炉温异常',
  time:'2023/06/27 12:51',
  id:6,
  warning:true
},
{
  title:'炉温异常',
  time:'2023/06/27 12:51',
  id:7,
  warning:true
},
{
  title:'炉温异常',
  time:'2023/06/27 12:51',
  id:8,
  warning:true
},
{
  title:'炉温异常',
  time:'2023/06/27 12:51',
  id:9,
  warning:true
}
])

const warininglist = ref([{
  title:'炉温过高',
  time:'2023/06/27 12:50',
  id:0,
  warning:true
},
{
  title:'炉温异常',
  time:'2023/06/27 12:51',
  id:1,
  warning:true
},
{
  title:'炉温异常',
  time:'2023/06/27 12:51',
  id:2,
  warning:true
},
{
  title:'炉温异常',
  time:'2023/06/27 12:51',
  id:3,
  warning:true
},
{
  title:'炉温异常',
  time:'2023/06/27 12:51',
  id:4,
  warning:true
},
])

const activebtn = ref(true)

const toggle= ()=>{
  activebtn.value = !activebtn.value
}

const chooseCvd =(Name)=>{
  store.state.cvdName = Name
}

const getInfolist = ()=>{
  axios.get('/infolist/HY').then(res=>{
    // console.log(res);
    infolist.value = res
    return res
  })
}

const getWarninglist =()=>{
  axios.get('/warninglist/HY').then(res=>{
    // console.log(res);
    warininglist.value = res
    return res
  })
}
onMounted(()=>{
  getInfolist()
  getWarninglist()
})
</script>
<style lang="less" scoped>
.title{
  height: 1.2vw;
  .text{
    height: 2.1vw;
    font-size: 1.3vw;
    vertical-align: middle;
    color: #fff;
    font-weight: 600;
    display: inline-block;
    margin-left: 1vw;
  }
  .titlebox{
    width: 27vw;
    height: 30vh;
    background-size: 100% 100%;
    overflow: auto;
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

    .btn{
      width: 8vw;
      height: 5vh;
      background: url('@/assets/images/bg_box3.png') no-repeat ;
      background-size: 100% 100%;
      border-image-source: radial-gradient(55% 85%, transparent 0px, transparent 100%, cyan 100%);
      border-image-slice: 1;
      border-width: 3px;
      border-style: solid;
      border-image-outset: 0cm;
      color: #fff;
      font-size: 1.3vw;
      font-weight: 600;
      margin-right: 10px;
      margin-bottom: 10px;
    }
    .el-button{
      margin-left: 0px;
      --el-button-active-color: #a6231a;
    }
  }
  .detectbox{
    margin-top: 2vh;
    height: 45vh;
    // background-color: #fff;
    .detectbtnBox{
      height: 5vh;
      .detectbtn{
        width: 10vw;
        height: 5vh;
        font-size: 1.3vw;
        color: #fff;
      }
    }
    .detectinfo{
      // background-color: #fff;
      margin-top: 1vh;
      height: 32vh;
      overflow: auto;
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
        position: relative;
        height: 4vh;
        background-color: #fff;
        width: 25vw;
        overflow: auto;
      }
      .infotitle{
        display: inline-block;
        font-size: 0.8vw;
        line-height: 4vh;
        position: absolute;
        left: 1vw;
        margin-left: 1vw;
      }
      .infotime{
        display: inline-block;
        position: absolute;
        right: 2vw;
        line-height: 4vh;
        font-size: 0.8vw;
      }
    }
  }
}
</style>
