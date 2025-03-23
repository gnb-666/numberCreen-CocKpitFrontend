<template>
  <div>
    <div class="myVideo"><VideoJs :videoSrc="data.videoSrc" autoPlay /></div>
  </div>
</template>
<script setup>
import {reactive,ref} from 'vue';
import { onMounted, onUnmounted } from "@vue/runtime-core";
import VideoJs from "@/components/SecurityDetection/Video.vue";
const data = reactive({
  videoSrc: "http://kbs-dokdo.gscdn.com/dokdo_300/_definst_/dokdo_300.stream/playlist.m3u8",
});
</script>
<style lang="less" scoped>
.myVideo{
    margin-left: 0.7vw;
    margin-top: 0.25vh;
    width:19vw;
    height: 20vh;
    display: inline-block;
  }
</style>
