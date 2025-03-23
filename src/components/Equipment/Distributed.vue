<template>
  <div class="test">
    <h2 style="text-align: center; color: rgb(255, 255, 255);height:0.3rem;line-height: 0.5rem;">
      <span style="font-size: 1.3vw;">设备分布情况</span>
    </h2>
    <div class="chart">
      <div ref="chartRef" :style="{ height: '3.3rem' }"></div>
    </div>
  </div>
</template>

<script setup>
import * as echarts from "echarts";
import { onMounted, onUnmounted, ref } from "vue";
import axios from '@/axios';

// 使用 ref 管理响应式数据
const chartRef = ref(null);
let chartInstance = null;
const workshops = ref({});
for (let i = 0; i < 4; i++) {
  workshops.value[`workshop${i}`] = [];
}

// 提取图表配置函数
const getChartOption = () => ({
  legend: {
    top: "5%",
    textStyle: {
      fontSize: 8,
      color: "white",
    },
  },
  dataset: {
    source: [
      ["location", "氢化工段设备", "净化工段设备", "渣浆高沸工段设备", "还原工段设备", "公用工段设备"],
      workshops.value['workshop0'],
      workshops.value['workshop1'],
      workshops.value['workshop2'],
      workshops.value['workshop3'],
    ],
  },
  xAxis: {
    type: "category",
    axisLabel: {
      fontSize: '0.3vw',
      textStyle: {
        color: "white",
      },
    },
  },
  yAxis: {
    axisLine: {
      lineStyle: {
        color: "#FFF",
        width: 0.5,
      },
    },
    axisLabel: {
      fontSize: 8,
      textStyle: {
        color: "white",
      },
    },
    splitLine: {
      lineStyle: {
        color: '#2F2F4F',
      },
    },
  },
  series: [
    {
      type: "bar",
      label: {
        show: false,
        position: "top",
        fontSize: '1vw',
        color: "white",
      },
    },
    {
      type: "bar",
      label: {
        show: false,
        position: "top",
        fontSize: '0.9vw',
        color: "white",
      },
    },
    {
      type: "bar",
      label: {
        show: false,
        position: "top",
        fontSize: '0.9vw',
        color: "white",
      },
    },
    {
      type: "bar",
      label: {
        show: false,
        position: "top",
        fontSize: '0.9vw',
        color: "white",
      },
    },
    {
      type: "bar",
      label: {
        show: false,
        position: "top",
        fontSize: '0.9vw',
        color: "white",
      },
    },
  ],
});

// 初始化图表函数
const initChart = () => {
  if (chartRef.value) {
    if (chartInstance) {
      chartInstance.dispose(); // 销毁旧的图表实例
    }
    chartInstance = echarts.init(chartRef.value); // 初始化新的图表实例
    chartInstance.setOption(getChartOption());

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

// 获取数据函数
const getWorkshopsList = async () => {
  try {
    const res = await axios.get('/devicedistribution');
    for (let i = 0; i < 4; i++) {
      const datalist = res[i];
      workshops.value[`workshop${i}`] = [
        datalist['workshopname'],
        datalist['hydrogenationsection'],
        datalist['purificationsection'],
        datalist['slurryhighboilingsection'],
        datalist['reductionsection'],
        datalist['commonstation'],
      ];
    }
    initChart(); // 确保数据填充完毕后再初始化图表
  } catch (error) {
    console.error('获取设备分布数据失败:', error);
  }
};

onMounted(() => {
  getWorkshopsList();
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
  height: 3.3rem; /* 确保容器有明确的高度 */
}
</style>