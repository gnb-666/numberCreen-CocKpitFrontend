<template>
  <div class="test">
    <h2 style="text-align: center; color: rgb(255, 255, 255);height:0.3rem;line-height: 0.5rem;">
      <span style="font-size: 1.3vw;">A类设备健康状况</span>
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

// 使用 ref 管理响应式数据
const chartRef = ref(null);
let chartInstance = null;
const workshops = ref({});
for (let i = 0; i < 4; i++) {
  workshops.value[`workshop${i}`] = [];
}
const healthy = ref({});
for (let i = 0; i < 4; i++) {
  healthy.value[`health${i}`] = [];
}
const titleText = ref('');

// 提取图表配置函数
const getChartOption = () => ({
  title: {
    text: titleText.value,
    x: "13%",
    y: "70%",
    textStyle: {
      color: "white",
      fontSize: 12,
    },
  },
  legend: {
    top: "2%",
    textStyle: {
      color: "white",
    },
  },
  color: ["#70DBDB", "#B87333"],
  dataset: {
    source: [
      ["location", "健康", "不健康"],
      workshops.value['workshop0'],
      workshops.value['workshop1'],
      workshops.value['workshop2'],
      workshops.value['workshop3'],
    ],
  },
  xAxis: {
    name: "车间",
    type: "category",
    axisLine: {
      lineStyle: {
        color: "#FFF",
        width: 1,
      },
    },
  },
  yAxis: {
    name: "数量",
    axisLine: {
      lineStyle: {
        color: "#FFF",
        width: 1,
      },
    },
    splitLine: {
      lineStyle: {
        color: '#2F2F4F',
      },
    },
  },
  grid: { show: false, top: '20%', bottom: '40%' },
  series: [
    {
      type: "bar",
      barWidth: "25%",
      label: {
        show: true,
        color: "white",
        position: "top",
      },
    },
    {
      type: "bar",
      barWidth: "25%",
      label: {
        show: true,
        color: "white",
        position: "top",
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
    const res = await axios.get('/equipmenthealth');
    for (let i = 0; i < 4; i++) {
      const datalist = res[i];
      workshops.value[`workshop${i}`] = [
        datalist['workshopname'],
        datalist['healthnumber'],
        datalist['unhealthnumber'],
      ];
      // 将健康比例保留两位小数
      const healthProportion = parseFloat(datalist['healthproportion']).toFixed(2);
      healthy.value[`health${i}`] = healthProportion;
    }
    titleText.value = `健康设备占比: ${healthy.value['health0']}%   健康设备占比: ${healthy.value['health1']}%   健康设备占比: ${healthy.value['health2']}%   健康设备占比: ${healthy.value['health3']}%`;
    initChart(); // 确保数据填充完毕后再初始化图表
  } catch (error) {
    console.error('获取 A 类设备健康状况数据失败:', error);
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
  height: 3rem; /* 确保容器有明确的高度 */
}
</style>