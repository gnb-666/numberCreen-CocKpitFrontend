<template>
  <div style="white-space: pre-line; z-index: 0">
    <div class="container">
      <left class="left"></left>
      <cvd class="cvd"></cvd>
      <right class="right"></right>
    </div>
  </div>
</template>
<script setup>
import left from '@/components/SecurityDetection/CVD/cvdLeft.vue'
import cvd from '@/components/SecurityDetection/CVD/CVD.vue'
import right from '@/components/SecurityDetection/CVD/cvdRight.vue'
</script>
<style lang="less" scoped>
.container {
  height:10.7rem;
  margin: 0 auto;
  margin-bottom: 110px;
  padding: -0.13rem 0.13rem 0;
  // display: flex;
  // background: url("~@/assets/images/background_under.png") top center no-repeat;
  // background-size: 100%;
  .left{
    width: 27vw;
    // background-color: #fff;
    height: 80vh;
    position: absolute;
    // left: 3vw;
  }
  .cvd{
    // width: 40vw;
    // height: 85vh;
    // position: absolute;
    // left: 30vw;
    // background-color: #fff;
  }
  .right{
    width: 27vw;
    // background-color: #fff;
    height: 80vh;
    position: absolute;
    right: -2vw;
  }
}
</style>
