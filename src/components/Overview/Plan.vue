<template>
  <h2 style="text-align: center; color: rgb(255, 255, 255); height: 0.3rem; line-height: 0.5rem;">
    <span style="font-size: 1.3vw;">计划执行情况</span>
  </h2>
  <div class="chart">
    <div id="Plan" :style="{ height: '3rem' }"></div>
  </div>
</template>

<script setup>
import * as echarts from "echarts";
import { onMounted, onUnmounted, ref } from "vue";
import axios from '@/axios';

// 图表实例和数据
const chartInstance = ref(null);
const sourceData = ref([["product", "产量", "计划"]]);

// 初始化图表
const initChart = () => {
  const chartDom = document.getElementById('Plan');
  if (!chartDom) return;

  // 销毁旧实例
  if (chartInstance.value) {
    chartInstance.value.dispose();
  }

  // 创建新实例
  chartInstance.value = echarts.init(chartDom);

  // 图表配置
  const option = {
    legend: {
      top: "5%",
      textStyle: { color: "white" }
    },
    grid: {
      left: "3%",
      right: "3%",
      bottom: "20%",
      containLabel: true
    },
    color: ["#ADEAEA", "#ED7C30"],
    dataset: { source: sourceData.value },
    xAxis: {
      type: "category",
      axisLabel: {
        color: "white",
        rotate: 30,
        interval: 0
      },
      axisLine: {
        lineStyle: {
          color: "#FFF",
          width: 1
        }
      }
    },
    yAxis: {
      name: "产量(万吨)",
      nameTextStyle: { color: 'white' },
      min: 0,
      max: 400,
      interval: 100,
      splitLine: {
        lineStyle: { color: '#2F2F4F' }
      },
      axisLabel: { color: "white" },
      axisLine: {
        lineStyle: {
          color: "#FFF",
          width: 1
        }
      }
    },
    series: [
      {
        type: "bar",
        label: {
          show: true,
          color: "white",
          position: "top",
          formatter: params => params.value[1]
        }
      },
      {
        type: "bar",
        label: {
          show: true,
          color: "white",
          position: "top",
          formatter: params => params.value[2]
        }
      }
    ],
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' }
    }
  };

  chartInstance.value.setOption(option);
  window.addEventListener('resize', resizeChart);
};

// 图表自适应
const resizeChart = () => {
  chartInstance.value?.resize();
};

// 获取数据
const getplandetailList = async () => {
  try {
    const res = await axios.get('/plandetail');
    sourceData.value = [["product", "产量", "计划"]];
    
    [...res]
      .sort((a, b) => parseInt(a.year) - parseInt(b.year))
      .forEach(item => {
        sourceData.value.push([
          item.year,
          item.actualproduction,
          item.planproduction
        ]);
      });
    
    initChart();
  } catch (error) {
    console.error('获取数据失败:', error);
  }
};

// 生命周期
onMounted(getplandetailList);
onUnmounted(() => {
  window.removeEventListener('resize', resizeChart);
  chartInstance.value?.dispose();
});
</script>

<style scoped>
.chart {
  margin-top: 0.125rem;
}
</style>