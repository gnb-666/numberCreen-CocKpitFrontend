<template>
  <div class="waterDetection">
    <div class="title" style="text-align: center;padding-top:0.5em;" @click="toRisk">风险管控</div>
    <div class="chart" id="chart">
      <img src="@/assets/images/security/风险管控.png">
      <div class="major_risk" @click="major_click">
        <div class="titletext">重大风险</div>
        <div class="text">{{ riskCount.major }}</div>
      </div>
      <div class="greater_risk">
        <div class="titletext">较大风险</div>
        <div class="text">{{ riskCount.greater }}</div>
      </div>
      <div class="common_risk">
        <div class="titletext">一般风险</div>
        <div class="text">{{ riskCount.common }}</div>
      </div>
      <div class="low_risk">
        <div class="titletext">低风险</div>
        <div class="text">{{ riskCount.low }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import * as echarts from "echarts";
import { reactive, ref, watch } from 'vue';
import { onMounted, onUnmounted } from "@vue/runtime-core";
import { useRouter } from "vue-router";
const router = useRouter();
let props = defineProps(['tableData'])
const riskCount = reactive({
  major: 0,
  greater: 0,
  common: 0,
  low: 0
})
watch(
  () => props.tableData,
  (newVal) => {
    console.log('tableData 更新:', newVal); // 数据更新时会触发
    if (newVal && newVal.length > 0) {
      riskCount.major = 0;
      riskCount.greater = 0;
      riskCount.common = 0;
      riskCount.low = 0;

      // 确保 newVal 是数组
      if (Array.isArray(newVal)) {
        // 遍历数据并计数
        newVal.forEach(item => {
          const level = parseInt(item.level); // 将 "2.0" 转换为 2
          if (level === 1) {
            riskCount.major++;
          } else if (level === 2) {
            riskCount.greater++;
          } else if (level === 3) {
            riskCount.common++;
          } else if (level === 4) {
            riskCount.low++;
          }
        });
      } else {
        console.error('newVal is not an array:', newVal);
      }
    }
  },
  { immediate: true } // 立即执行一次
);
const toRisk = () => {
  router.push("/HomePage/SecurityDetection/risk")
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

.title {
  width: 25.85vw;
  height: 4vh;
  background: url('@/assets/images/bgtitle.png') no-repeat;
  background-size: 100% 100%;
  color: #fff;
  font-size: 1.3vw;
  font-weight: 700;
  cursor: pointer;
}

.chart {
  margin-top: 0vh;
  padding-top: 1vh;
  height: 30.7vh;
  width: 25.8vw;
  background-color: rgba(11, 18, 52, 0.8);
  // background: url('@/assets/images/bgimg.png') no-repeat;
  background-size: 100% 100%;

  img {
    margin-left: 1.3vw;
    width: 24vw;
    height: 28vh;
    opacity: 0.9;
  }

  .major_risk {
    width: 3.5vw;
    height: 6vh;
    // background-color: #fff;
    position: absolute;
    top: 13vh;
    left: 3.3vw;
    text-align: center;

    .titletext {
      color: #fff;
      font-size: 0.8vw;
      height: 2vh;
    }

    .text {
      padding-top: 0.2vh;
      color: #e60205;
      font-size: 1vw;
      font-weight: 700;
      height: 3vh;
    }
  }

  .greater_risk {
    width: 3.5vw;
    height: 6vh;
    // background-color: #fff;
    position: absolute;
    top: 20.4vh;
    left: 8.6vw;
    text-align: center;

    .titletext {
      color: #fff;
      font-size: 0.8vw;
      height: 2vh;
    }

    .text {
      padding-top: 0.2vh;
      color: #fac858;
      font-size: 1vw;
      font-weight: 700;
      height: 3vh;
    }
  }

  .common_risk {
    width: 3.5vw;
    height: 6vh;
    // background-color: #fff;
    position: absolute;
    top: 12.6vh;
    left: 13.8vw;
    text-align: center;

    .titletext {
      color: #fff;
      font-size: 0.8vw;
      height: 2vh;
    }

    .text {
      padding-top: 0.2vh;
      color: #e6e605;
      font-size:1vw;
      font-weight: 700;
      height: 3vh;
    }
  }

  .low_risk {
    width: 3.5vw;
    height: 6vh;
    // background-color: #fff;
    position: absolute;
    top: 20.4vh;
    left: 19.6vw;
    text-align: center;

    .titletext {
      color: #fff;
      font-size: 0.8vw;
      height: 2vh;
    }

    .text {
      padding-top: 0.2vh;
      color: #0266b0;
      font-size: 1vw;
      font-weight: 700;
      height: 3vh;
    }
  }
}
</style>