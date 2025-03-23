<template>
  <router-view />
</template>

<script>
import { provide } from "vue";
import * as echarts from "echarts";
import axios from "axios";
export default {
  setup() {
    provide("echarts", echarts);
    provide("axios", axios);
  },
};
</script>

<style lang="less">
// :root {
//         --background-color1: rgba(0, 105, 173);
//         --background-color2: rgba(65 235 31);
//         --background-color3: rgba(214 0 6);
//         }

body {
  overflow:hidden;
  
  // background-color: var(--background-color3);
  // background-color:rgba(0, 105, 173);
  background-color:rgba(16, 11, 43);
  background-size: 100% 100%;
  background-attachment: fixed;
}
* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}
</style>
