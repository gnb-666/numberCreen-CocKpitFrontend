<template>
  <div>
    <div class="title">
      <div class="detectbox">
        <div><img src="@/assets/images/security/cvd/三角.png" style="width:1.2vw;height: 1.2vw;">
          <div class="text">{{ $store.state.section }}报警</div>
        </div>
        <div class="detectbtnBox">
          <el-button class="detectbtn" id="1" link
            :style="{ backgroundColor: (activebtn == true ? '#33e1ff' : '#0b1a41') }" @click="toggle()">{{
              $store.state.section }}监控报警</el-button>
          <el-button class="detectbtn" id="2" link
            :style="{ backgroundColor: (activebtn == false ? '#33e1ff' : '#0b1a41') }" @click="toggle()">{{
              $store.state.section }}报警点位</el-button>
        </div>
        <div class="detectinfo">
          <div class="infoline" v-for="(item) in warninglist" :style="Bcolor(item.level)" v-if="activebtn">
            <div class="infotitle">{{ item.describes }}</div>
            <div class="infotype">{{ item.realtimeval }}</div>
          </div>
          <div class="infoline" v-for="(item) in infolist" :style="Bcolor(item.level)" v-else>
            <div class="infotitle">{{ item.describes }}</div>
            <div class="infotype">{{ item.type }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref, computed, onMounted, watch } from 'vue';
import store from '@/store/index'
import axios from '@/axios';
import { proxyAxios } from '@/axios/iotdb';

const infolist = ref([])
const warninglist = ref([])

const activebtn = ref(true)

const toggle = () => {
  activebtn.value = !activebtn.value
}

const Bcolor = computed(() => {
  return function (item) {
    // console.log(item);
    if (item == 1) {
      return 'color:#ff0000'
    } else if (item == 2) {
      return 'color:#ffc000'
    } else if (item == 3) {
      return 'color:#ffff00'
    } else {
      return 'color:#0070c0'
    }
  }
})

const getinfoList = async () => {
  let type = '';
  let params = '';
  switch (store.state.section) {
    case '氢化工段':
      type = 'historyQH',
        params = 'apiToken=a67c4de4543d45dd87a4e37b3de530e4'
      break;
    case '净化工段':
      type = 'historyJH'
      params = 'apiToken=2c3eebe7eb0446e1bc075ede43ea366e'
      break;
    case '渣浆高沸工段':
      type = 'historyZJ'
      params = 'apiToken=389b6e1f9b9840299311fa31bf9d811f'
      break;
    case '还原工段':
      type = 'historyHY'
      params = 'apiToken=0e1c056dad19478899b8bbb39205e828'
      break;
    case '公用工程工段':
      type = 'historyGYGC'
      params = 'apiToken=6eddc3ad31c042329c5f21a27ac6bb24'
      break;
  }
  try {
    // 发起请求
    const res = await proxyAxios.get(`/${type}?${params}`);
    infolist.value = res.data.data; // 假设返回的数据在 res.data 中
  } catch (error) {
    console.error('Error fetching info list:', error);
  }
}

const getwarningList =async () => {
  let type = '';
  let params = '';
  switch (store.state.section) {
    case '氢化工段':
      type = 'historyQH',
        params = 'apiToken=a67c4de4543d45dd87a4e37b3de530e4'
      break;
    case '净化工段':
      type = 'historyJH'
      params = 'apiToken=2c3eebe7eb0446e1bc075ede43ea366e'
      break;
    case '渣浆高沸工段':
      type = 'historyZJ'
      params = 'apiToken=389b6e1f9b9840299311fa31bf9d811f'
      break;
    case '还原工段':
      type = 'historyHY'
      params = 'apiToken=0e1c056dad19478899b8bbb39205e828'
      break;
    case '公用工程工段':
      type = 'historyGYGC'
      params = 'apiToken=6eddc3ad31c042329c5f21a27ac6bb24'
      break;
  }
  try {
    // 发起请求
    const res = await proxyAxios.get(`/${type}?${params}`); 
    warninglist.value = res.data.data; // 假设返回的数据在 res.data 中
  } catch (error) {
    console.error('Error fetching info list:', error);
  }
}

const section = computed(() => {
  return store.state.section
})

watch(section, (newVal, oldVal) => {
  getwarningList()
  getinfoList()
})

onMounted(() => {
  getwarningList()
  getinfoList()
})
</script>
<style lang="less" scoped>
.title {
  height: 60vh;
  width: 25vw;
  .text {
    height: 2.1vw;
    font-size: 1.3vw;
    vertical-align: middle;
    color: #fff;
    font-weight: 600;
    display: inline-block;
    margin-left: 1vw;
  }
  .detectbox {
    margin-top: 2vh;
    height: 40vh;
    .detectbtnBox {
      height: 5vh;
      white-space: nowrap; // 添加这一行
      .detectbtn {
        width: 12vw;
        height: 5vh;
        font-size: 1.3vw;
        color: #fff;
      }
    }
    .detectinfo {
      margin-top: 1vh;
      height: 50vh;
      overflow: auto;
      position: absolute;
      &::-webkit-scrollbar {
        width: 10px;
      }
      &::-webkit-scrollbar-track {
        border-radius: 5px;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 5px;
        background: rgba(27, 140, 236, 0.5);
      }
      .infoline {
        height: 4vh;
        background-color: #0b1a41;
        width: 25vw;
        .infotitle {
          display: inline-block;
          font-size: 0.8vw;
          font-weight: 700;
          line-height: 4vh;
          position: absolute;
          left: 1vw;
        }
        .infotype {
          display: inline-block;
          position: absolute;
          right: 2vw;
          line-height: 4vh;
          font-size: 0.8vw;
          font-weight: 700;
        }
      }
    }
  }
}
</style>