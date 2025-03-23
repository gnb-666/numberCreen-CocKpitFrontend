<template>
    <h2 style="text-align: center; color: rgb(255, 255, 255);height:0.3rem;line-height: 0.5rem;"><span
      style="font-size: 1.3vw;">危险预警</span></h2>
  <div class="box">
    <div class="inner-container">
      <p class="text" v-for="(text, index) in arr" :key="index">{{ text }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      arr: [
        "气体泄漏警示：仔细检查还原炉的气体管道和接口，确保密封完好，没有明显损坏或泄漏现象。在操作前，检查气体供应系统的阀门、管道和连接处，确保所有设备正常工作。如果发现气体泄漏或可疑气味，请立即报告上级并采取紧急撤离措施，确保人员安全，并等待专业人员进行处理。",
      ],
    };
  },
};
</script>

<style scoped>
.box{
    position: relative;
    top: 6%;
    left: 3%;
    height: 70%;
    width: 94%;
    /* border: 1px solid red; */
    overflow: hidden;
}
.inner-container {
  animation: myMove 20s linear infinite;
  animation-fill-mode: forwards;
  animation-delay: 2s;
}
/*文字无缝滚动*/
@keyframes myMove {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-150px);
  }
}
.text{
color: white;
}
p {
  line-height: 1.8; /* 设置行间距 */
  font-size: 0.25rem; /* 设置字体大小 */
  text-indent: 2em;
}
</style>