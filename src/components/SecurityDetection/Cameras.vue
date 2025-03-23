<template>
  <div class="recall">
    <div class="title" style="text-align: center;padding-top:0.5em;">监控画面</div>
    <div class="cameras">
      <!-- <img src="@/assets/images/多晶硅1.png" style="width:19vw;height: 20vh;"> -->
      <div class="myVideo"><VideoJs :videoSrc="data.videoSrc" autoPlay /></div>
      <div class="myVideo"><VideoJs :videoSrc="data.videoSrc" autoPlay /></div>
      <!-- <img src="@/assets/images/多晶硅2.png" style="width:19vw;height: 20vh;"> -->
      <div class="myVideo"><VideoJs :videoSrc="data.videoSrc" autoPlay /></div>
      <!-- <img src="@/assets/images/多晶硅3.png" style="width:19vw;height: 20vh;"> -->
    </div>
  </div>
</template>

<script setup>

import * as echarts from "echarts";
import {reactive,ref} from 'vue';
import { onMounted, onUnmounted } from "@vue/runtime-core";
import VideoJs from "@/components/SecurityDetection/Video.vue";
const data = reactive({
  videoSrc: "https://www.w3schools.com/html/movie.mp4",
});
</script>

<style lang="less" scoped>
.recall {
  width: 60vw;
  height: 26.2vh;
  margin-top: 2vh;
  margin-left: 1vw;
  // margin-top: 1vh;
  border: 0.2vw solid rgb(5, 38, 85);
}
.title{
  width: 59.7vw;
  height: 5vh;
  background: url('@/assets/images/bgtitle.png') no-repeat;
  background-size: 100% 100%;
  color: #fff;
  font-size: 18px;
  font-weight: 700;
}
.cameras {
  margin-top: 0vh;
  // padding-top: 1vh;
  height: 20.7vh;
  width: 59.7vw;
  background-color: rgba(11, 18, 52,0.5);
  background-size: 100% 100%;
  img {
    margin-left: 0.7vw;
    margin-top: 0.25vh;
  }
  .myVideo{
    margin-left: 0.7vw;
    margin-top: 0.25vh;
    width:19vw;
    height: 20vh;
    display: inline-block;
  }
}
</style>