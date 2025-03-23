<template>
  <div class="test">
    <h2 style="text-align: center; color: rgb(255, 255, 255);height:0.3rem;line-height: 0.5rem;">
      <span style="font-size: 1.3vw;">设备多组度健康分析</span>
    </h2>
    <div class="chart">
      <div ref="chartRef" :style="{ height: '6.3rem' }"></div>
    </div>
  </div>
</template>

<script setup>
import * as echarts from "echarts";
import { onMounted, onUnmounted, ref } from "vue";
import axios from '@/axios';

// 定义图标路径
const weatherIcons = {
  pressure: "~@assets/images/Equipment/Multipul_icon1.jpg",
  temprature: "~@assets/images/Equipment/Multipul_icon2.jpg",
  electronic: "~@assets/images/Equipment/Multipul_icon3.jpg",
  technology: "~@assets/images/Equipment/Multipul_icon4.jpg",
};

// 定义系列标签配置
const seriesLabel = {
  show: true,
};

// 使用 ref 引用图表 DOM 元素
const chartRef = ref(null);
let chartInstance = null;

// 定义数据数组
const bodydata = ref([]);
const healthdata = ref([]);
const unhealthdata = ref([]);

// 初始化图表配置
const getChartOption = () => ({
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
  legend: {
    data: ["健康占比（%）", "不健康占比（%）"],
    top: "5%",
    textStyle: {
      color: 'white',
    },
  },
  grid: {
    left: 100,
  },
  xAxis: {
    type: "value",
    axisLabel: {
      formatter: "{value}",
    },
    splitLine: {
      show: false,
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: "#FFF",
        width: 1,
      },
    },
  },
  yAxis: {
    type: "category",
    name: "设备本体",
    data: bodydata.value,
    axisLine: {
      lineStyle: {
        color: "#FFF",
        width: 1,
      },
    },
    axisLabel: {
      formatter: function (value) {
        return value;
      },
      margin: 20,
      rich: {
        value: {
          lineHeight: 30,
          align: "center",
        },
        pressure: {
          height: 40,
          align: "center",
          backgroundColor: {
            image: weatherIcons.pressure,
          },
        },
        temprature: {
          height: 40,
          align: "center",
          backgroundColor: {
            image: weatherIcons.temprature,
          },
        },
        electronic: {
          height: 40,
          align: "center",
          backgroundColor: {
            image: weatherIcons.electronic,
          },
        },
        technology: {
          height: 40,
          align: "center",
          backgroundColor: {
            image: weatherIcons.technology,
          },
        },
      },
    },
  },
  series: [
    {
      name: "健康占比（%）",
      type: "bar",
      showBackground: true,
      data: healthdata.value,
      label: seriesLabel,
      itemStyle: {
        color: "rgba(100, 219, 155, 0.12)",
        borderWidth: 1,
        borderColor: "#70DBDB",
      },
    },
    {
      name: "不健康占比（%）",
      type: "bar",
      showBackground: true,
      label: {
        ...seriesLabel,
        show: true,
        color: "white",
        position: "right",
      },
      itemStyle: {
        color: "rgba(100, 219, 155, 0.12)",
        borderWidth: 1,
        borderColor: "#B87333",
      },
      data: unhealthdata.value,
    },
  ],
});

// 初始化图表
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

// 获取数据
const getmulticomponenthealthList = async () => {
  try {
    const res = await axios.get('/multicomponenthealth');
    for (let i = 0; i < 4; i++) {
      const datalist = res[i];
      bodydata.value.push(datalist['devicebody']);
      const healthProportion = parseFloat(datalist['healthproportion']).toFixed(2);
      healthdata.value.push(healthProportion);
      const unhealthProportion = parseFloat(datalist['unhealthproportion']).toFixed(2);
      unhealthdata.value.push(unhealthProportion);
    }
    initChart(); // 确保数据填充完毕后再初始化图表
  } catch (error) {
    console.error('获取设备多组度健康数据失败:', error);
  }
};

onMounted(() => {
  getmulticomponenthealthList();
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
  height: 6.3rem; /* 确保容器有明确的高度 */
}
</style>