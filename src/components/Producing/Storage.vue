<template>
  <div style="">
    <h2 style="text-align: center; color: rgb(255, 255, 255);height:0.34rem;line-height: 0.45rem;"><span style="font-size: 1.3vw;">重要物资库存情况</span></h2>
  </div>
  <section style="margin-left: 1.05rem; margin-top: 0.3rem; height: 0.1rem;">
    <span id="wuzhi1" style="color: rgb(255, 255, 255); margin-left: 0.2rem"></span>
    <span id="wuzhi2" style="color: rgb(255, 255, 255); margin-left: 2.3rem"></span>
    <span id="wuzhi3" style="color: rgb(255, 255, 255); margin-left: 2.2rem"></span>
    <span id="wuzhi4" style="color: rgb(255, 255, 255); margin-left: 2.2rem"></span>
  </section>
  <div class="chart">
    <div id="StorageChart" :style="{ height: '3rem' }"></div>
  </div>
</template>

<script setup>
import * as echarts from "echarts";
import "echarts-liquidfill";
import { onMounted, onUnmounted, nextTick, ref } from "vue";
import axios from "axios";

// 使用 ref 管理响应式数据
const inputdata = ref({});
for (let i = 0; i < 4; i++) {
  inputdata.value[`data${i}`] = [];
}

const chart = ref(null);
let resizeHandler;

// 生成图表配置的函数
const getChartOptions = () => {
  return {
    series: [
      {
        type: "liquidFill",
        center: ["12.5%", "35%"],
        outline: {
          show: false,
        },
        waveAnimation: false,
        animationDuration: 0,
        animationDurationUpdate: 0,
        name: `${inputdata.value['data0'][1]}吨`,
        data: [
          0.85,
          {
            value: 0.75,
            direction: "left",
            itemStyle: {
              color: "#ADEAEA",
            },
          },
        ],
        color: ["#70DBDB"],
        label: {
          formatter: "{a}\n{b}",
          fontSize: 12,
          position: ["50%", "60%"],
        },
      },
      {
        type: "liquidFill",
        center: ["37.5%", "35%"],
        outline: {
          show: false,
        },
        waveAnimation: false,
        animationDuration: 0,
        animationDurationUpdate: 0,
        name: `${inputdata.value['data1'][1]}吨`,
        data: [
          0.8,
          {
            value: 0.75,
            direction: "left",
            itemStyle: {
              color: "#EAEAAE",
            },
          },
        ],
        color: ["#CFB53B"],
        label: {
          formatter: "{a}\n{b}",
          fontSize: 12,
          position: ["50%", "60%"],
        },
      },
      {
        type: "liquidFill",
        center: ["62.5%", "35%"],
        outline: {
          show: false,
        },
        waveAnimation: false,
        animationDuration: 0,
        animationDurationUpdate: 0,
        name: `${inputdata.value['data2'][1]}吨`,
        data: [
          0.85,
          {
            value: 0.75,
            direction: "left",
            itemStyle: {
              color: "#EBC79E",
            },
          },
        ],
        color: ["#9F9F5F"],
        label: {
          formatter: "{a}\n{b}",
          fontSize: 12,
          position: ["50%", "60%"],
        },
      },
      {
        type: "liquidFill",
        center: ["87.5%", "35%"],
        outline: {
          show: false,
        },
        waveAnimation: false,
        animationDuration: 0,
        animationDurationUpdate: 0,
        name: `${inputdata.value['data3'][1]}吨`,
        data: [
          0.8,
          0.85,
          {
            value: 0.75,
            direction: "left",
            itemStyle: {
              color: "#8FBC8F",
            },
          },
        ],
        color: ["#32CD99"],
        label: {
          formatter: "{a}\n{b}",
          fontSize: 12,
          position: ["50%", "60%"],
        },
      },
    ],
  };
};

// 初始化图表的函数
const initChart = () => {
  const targetElement = document.getElementById("StorageChart");
  if (!targetElement) return;

  chart.value = echarts.init(targetElement);
  chart.value.setOption(getChartOptions());

  resizeHandler = () => {
    if (chart.value) {
      chart.value.resize();
    }
  };
  window.addEventListener("resize", resizeHandler);
};

// 获取数据的函数
const getvitalstockList = async () => {
  try {
    const res = await axios.get("/vitalstock");
    for (let i = 0; i < 4; i++) {
      const datalist = res.data[i];
      inputdata.value[`data${i}`].push(datalist["name"]);
      inputdata.value[`data${i}`].push(datalist["stock"]);
    }

    document.getElementById("wuzhi1").innerText = inputdata.value["data0"][0];
    document.getElementById("wuzhi2").innerText = inputdata.value["data1"][0];
    document.getElementById("wuzhi3").innerText = inputdata.value["data2"][0];
    document.getElementById("wuzhi4").innerText = inputdata.value["data3"][0];

    nextTick(() => {
      const storageChart = document.getElementById("StorageChart");
      if (storageChart && storageChart.clientWidth !== 0 && storageChart.clientHeight !== 0) {
        initChart();
      } else {
        console.error("DOM width or height is 0");
      }
    });
  } catch (error) {
    console.error("获取重要物资库存数据失败:", error);
  }
};

onMounted(() => {
  getvitalstockList();
});

onUnmounted(() => {
  if (resizeHandler) {
    window.removeEventListener("resize", resizeHandler);
  }
  if (chart.value) {
    chart.value.dispose();
  }
});
</script>

<style scoped>
.chart {
  margin-top: 0.125rem;
}
</style>