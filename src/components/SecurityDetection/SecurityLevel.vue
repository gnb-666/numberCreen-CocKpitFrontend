<template>
  <div class="waterDetection">
    <div class="title" style="text-align: center;padding-top:0.5em;" @click="toAlert">实时报警</div>
    <div class="table" id="table">
      <div class="tableLine" v-for="(item) in table"
      :style="{'color':item.color}">
        <div class="tableTitle">
          {{item.title}}
        </div>
        <div class="tableTime">
          {{item.time}}
        </div>
        <div class="tableBelong">
          {{item.belong}}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {reactive,ref} from 'vue';
import { onMounted, onUnmounted } from "@vue/runtime-core";
import { useRouter } from "vue-router";
const router = useRouter();

const table = reactive([{
  title:'氯硅烷进料泵P-01',
  time:'2023-05-07 23:01:45',
  belong:'氢化工段',
  color:'#e60205',
  id:0
},
])

const toAlert = () => {
  router.push("/HomePage/SecurityDetection/alert")
}
</script>

<style lang="less" scoped>
.waterDetection {
  width: 26vw;
  height: 35vh;
  margin-left: 1vw;
  margin-top: 1vh;
  border: 0.15vw solid rgb(5, 38, 85);
}
.title{
  width: 25.85vw;
  height: 4vh;
  background: url('@/assets/images/bgtitle.png') no-repeat;
  background-size: 100% 100%;
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  cursor :pointer;
}

.table {
  position: absolute;
  margin-top: 0vh;
  padding-top: 1vh;
  height: 30.7vh;
  width: 25.8vw;
  background-color: rgba(11, 18, 52,0.8);
  // background: url('@/assets/images/bgimg.png') no-repeat;
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
  .tableLine{
    margin-top: 0vh;
    width: 24vw;
    height: 4vh;
    line-height: 4vh;
    font-weight: 700;
    // background-color: #ffff;
    .tableTitle{
      display: inline-block;
      position: absolute;
      left: 2vw;
      font-size: 16px;
    }
    .tableTime{
      display: inline-block;
      position: absolute;
      left: 10vw;
      font-size: 16px;
    }
    .tableBelong{
      display: inline-block;
      position: absolute;
      left: 19vw;
      font-size: 16px;
    }
  }
}
</style>