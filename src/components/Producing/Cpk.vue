<template>
  <h2 style="text-align: center; color: rgb(255, 255, 255);height:0.34rem;line-height: 0.45rem;"><span style="font-size: 1.3vw;">质量-Cpk参数</span></h2>
  <div class="chart">
    <div id="TestChart" :style="{ height: '2.4rem' }"></div>
  </div>
</template>

<script setup>
import * as echarts from "echarts";
import { onMounted, onUnmounted, nextTick, ref } from "vue";
import axios from '@/axios';

// 使用 ref 管理响应式数据
const inputdata = ref({
  data0: [],
  data1: [],
  data2: [],
  data3: [],
});
const chart = ref(null); // 用于存储 ECharts 实例
let resizeHandler; // 用于存储 resize 事件处理函数

// 生成图表配置对象的函数
const getChartOptions = () => ({
  tooltip: {
    trigger: "axis",
  },
  legend: {
    top: "5%",
    data: ["A顶温", "B顶温", "C顶温"],
    textStyle: {
      color: "white",
    },
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  xAxis: {
    type: "category",
    data: inputdata.value.data0,
    axisLine: {
      lineStyle: {
        color: "#FFF",
        width: 1,
      },
    },
  },
  yAxis: {
    min: 90,
    max: 100,
    interval: 1,
    axisLine: {
      lineStyle: {
        color: "#FFF",
        width: 1,
      },
    },
  },
  series: [
    {
      name: "A顶温",
      type: "line",
      smooth: true,
      data: inputdata.value.data1,
    },
    {
      name: "B顶温",
      type: "line",
      smooth: true,
      data: inputdata.value.data2,
    },
    {
      name: "C顶温",
      type: "line",
      smooth: true,
      data: inputdata.value.data3,
    },
  ],
});

// 初始化图表函数
const initChart = () => {
  const targetElement = document.getElementById("TestChart");
  if (!targetElement) return;

  chart.value = echarts.init(targetElement);
  chart.value.setOption(getChartOptions());

  resizeHandler = () => {
    if (chart.value) {
      chart.value.resize();
    }
  };
  window.addEventListener('resize', resizeHandler);
};

// 获取数据函数
const getqualitycpkparamList = async () => {
  try {
    const res = await axios.get('/qualitycpkparam');

    res.sort((a, b) => {
      const dateA = new Date(a.time);
      const dateB = new Date(b.time);
      return dateA - dateB;
    });

    const recentData = res.slice(0, 7);

    recentData.forEach((datalist, index) => {
      const date = new Date(datalist['time']);
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const formattedDate = `${month}-${day}`;
      inputdata.value.data0.push(formattedDate);
      inputdata.value.data1.push(datalist['atemperature']);
      inputdata.value.data2.push(datalist['btemperature']);
      inputdata.value.data3.push(datalist['ctemperature']);
    });

    nextTick(() => {
      initChart();
    });
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  getqualitycpkparamList();
});

onUnmounted(() => {
  if (resizeHandler) {
    window.removeEventListener('resize', resizeHandler);
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