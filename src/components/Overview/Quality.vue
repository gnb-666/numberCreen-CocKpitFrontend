<template>
  <h2 style="text-align: center; color: rgb(255, 255, 255); height: 0.3rem; line-height: 0.5rem;">
    <span style="font-size: 1.3vw;">产品质量</span>
  </h2>
  <div class="chart">
    <div id="Quality" :style="{ height: '3rem' }"></div>
  </div>
</template>

<script setup>
import * as echarts from "echarts";
import { onMounted, onUnmounted, ref } from "vue";
import axios from '@/axios';

// 图表实例
const chartInstance = ref(null);
// 图表数据
const sourceData = ref([["product", "致密料比例", "菜花料比例", "珊瑚料比例"]]);

// 必须在setup同步部分注册生命周期钩子
onMounted(() => {
  // 先初始化空图表
  initEmptyChart();
  // 然后加载数据
  loadChartData();
});

onUnmounted(() => {
  cleanupChart();
});

// 初始化空图表
const initEmptyChart = () => {
  const chartDom = document.getElementById('Quality');
  if (!chartDom) return;

  if (chartInstance.value) {
    chartInstance.value.dispose();
  }

  chartInstance.value = echarts.init(chartDom);
  window.addEventListener('resize', resizeChart);
};

// 加载图表数据
const loadChartData = async () => {
  try {
    const res = await axios.get('/productquality');
    
    sourceData.value = [["product", "致密料比例", "菜花料比例", "珊瑚料比例"]];
    
    [...res]
      .sort((a, b) => parseInt(a.year) - parseInt(b.year))
      .forEach(item => {
        sourceData.value.push([
          item.name,
          item.proportionofdensematerial,
          item.proportionofcauliflowermate,
          item.purificationsection
        ]);
      });

    updateChart();
  } catch (error) {
    console.error('获取数据失败:', error);
  }
};

// 更新图表配置
const updateChart = () => {
  if (!chartInstance.value) return;

  const option = {
    legend: {
      top: "5%",
      textStyle: {
        color: "white",
      },
    },
    dataset: {
      source: sourceData.value,
    },
    xAxis: {
      type: "category",
      axisLabel: {
        textStyle: {
          color: "white",
        },
        rotate: 30,
        interval: 0
      },
      axisLine: {
        lineStyle: {
          color: "#FFF",
          width: 1,
        },
      },
    },
    yAxis: {
      name: '比例(%)',
      nameTextStyle: {
        color: 'white'
      },
      min: 0,
      max: 50,
      interval: 10,
      splitLine: {
        lineStyle: {
          color: '#2F2F4F',
        },
      },
      axisLabel: {
        textStyle: {
          color: "white",
        },
      },
      axisLine: {
        lineStyle: {
          color: "#FFF",
          width: 1,
        },
      },
    },
    series: [
      {
        type: "bar",
        color: {
          type: "linear",
          x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: "#2F4F4F" },
            { offset: 1, color: "#8FBC8F" }
          ],
        },
      },
      {
        type: "bar",
        color: {
          type: "linear",
          x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: "#11d56d" },
            { offset: 1, color: "#83bff6" }
          ],
        },
      },
      {
        type: "bar",
        color: {
          type: "linear",
          x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: "#CD7F32" },
            { offset: 1, color: "#D8D8BF" }
          ],
        },
      }
    ],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    }
  };

  chartInstance.value.setOption(option);
};

// 图表自适应
const resizeChart = () => {
  chartInstance.value?.resize();
};

// 清理图表资源
const cleanupChart = () => {
  window.removeEventListener('resize', resizeChart);
  if (chartInstance.value) {
    chartInstance.value.dispose();
    chartInstance.value = null;
  }
};
</script>

<style scoped>
.chart {
  margin-top: 0.125rem;
}
</style>