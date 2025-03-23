<template>
  <div class="test">
    <h2 style="text-align: center; color: rgb(255, 255, 255);height:0.3rem;line-height: 0.5rem;">
      <span style="font-size: 1.3vw;">设备数字化改造计划投入</span>
    </h2>
    <div class="chart">
      <div ref="chartRef" :style="{ height: '3rem' }"></div>
    </div>
  </div>
</template>

<script setup>
import * as echarts from "echarts";
import { onMounted, onUnmounted, ref } from "vue";
import axios from '@/axios';

// 使用 ref 来引用图表 DOM 元素
const chartRef = ref(null);
let chartInstance = null;

// 初始化图表配置
const getChartOption = (plandata) => ({
  legend: {
    top: "5%",
    fontSize: 10,
    data: ["改造完成", "计划改造"],
    textStyle: {
      color: "white",
      fontSize: 10,
    },
  },
  color: ["#70DBDB", "#B87333"],
  xAxis: {
    name: "年份",
    nameTextStyle: { fontSize: 8 },
    type: "category",
    data: plandata['data0'],
    axisLine: {
      lineStyle: {
        color: "#FFF",
        width: 1,
      },
    },
    axisLabel: {
      color: "white",
    },
  },
  yAxis: {
    name: "数量",
    nameTextStyle: { fontSize: 5 },
    type: "value",
    axisLine: {
      lineStyle: {
        color: "#FFF",
        width: 1,
      },
    },
    axisLabel: {
      fontSize: 8,
      color: "white",
    },
    splitLine: {
      lineStyle: {
        color: "#2F2F4F",
      },
    },
  },
  series: [
    {
      name: '改造完成',
      data: plandata['data1'],
      type: "line",
      label: {
        fontSize: 8,
        show: true,
        color: "white",
        position: "bottom",
      },
    },
    {
      name: '计划改造',
      data: plandata['data2'],
      type: "line",
      label: {
        fontSize: 8,
        show: true,
        color: "white",
        position: "top",
      },
    },
  ],
});

// 初始化图表
const initChart = (plandata) => {
  if (chartRef.value) {
    if (chartInstance) {
      chartInstance.dispose(); // 销毁旧的图表实例
    }
    chartInstance = echarts.init(chartRef.value); // 初始化新的图表实例
    chartInstance.setOption(getChartOption(plandata));

    const resizeHandler = () => chartInstance.resize();
    window.addEventListener('resize', resizeHandler);

    // 返回一个清理函数
    return () => {
      window.removeEventListener('resize', resizeHandler);
      if (chartInstance) {
        chartInstance.dispose(); // 销毁图表实例
        chartInstance = null; // 将实例置空
      }
    };
  }
  return () => {}; // 如果 chartRef.value 不存在，返回一个空函数
};

// 获取数据
const getrenovationinputList = async () => {
  try {
    const res = await axios.get('/renovationinput');
    const resLength = res.length;
    res.sort((a, b) => parseInt(a.year) - parseInt(b.year));
    const plandata = { data0: [], data1: [], data2: [] };
    for (let i = 0; i < resLength; i++) {
      const datalist = res[i];
      plandata['data0'].push(datalist['year']);
      plandata['data1'].push(datalist['plancompletion']);
      plandata['data2'].push(datalist['completion']);
    }
    initChart(plandata); // 确保数据填充完毕后再初始化图表
  } catch (error) {
    console.error('获取数据失败:', error);
  }
};

onMounted(() => {
  getrenovationinputList();
});

onUnmounted(() => {
  if (chartInstance) {
    chartInstance.dispose(); // 销毁图表实例
    chartInstance = null; // 将实例置空
  }
});
</script>

<style scoped>
.chart {
  margin-top: 0.125rem;
  height: 3rem; /* 确保容器有明确的高度 */
}
</style>