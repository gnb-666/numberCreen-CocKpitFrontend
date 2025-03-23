<template>
  <div>
    <div class="chart" id="chart1"></div>
  </div>
</template>
<script setup>
import * as echarts from "echarts";
import { reactive, ref } from 'vue';
import { onMounted, onUnmounted } from "vue";

let echart = echarts;
let chart;

// 计算基于视口宽度的 1.3vw 字体大小
const calculateFontSize = () => {
  const viewportWidth = window.innerWidth;
  return viewportWidth * 0.013;
};

const option = reactive({
  title: {
    left: "center",
    top: '0%',
    text: 'H2阀门开度',
    textStyle: {
      // 初始字体大小
      fontSize: calculateFontSize(),
      color: '#fff'
    },
  },
  series: [
    {
      type: 'gauge',
      progress: {
        show: true,
        width: 18
      },
      axisLine: {
        lineStyle: {
          width: 18
        }
      },
      axisTick: {
        show: false
      },
      splitLine: {
        length: 15,
        lineStyle: {
          width: 2,
          color: '#999'
        }
      },
      axisLabel: {
        distance: 25,
        color: '#999',
        fontSize: 0
      },
      anchor: {
        show: true,
        showAbove: true,
        size: 25,
        itemStyle: {
          borderWidth: 10
        }
      },
      detail: {
        valueAnimation: true,
        // 初始字体大小
        fontSize: calculateFontSize(),
        color: '#fff',
        formatter: "{value}%",
        // 设置偏移量，将数值向下移动，这里第二个值为正表示向下偏移
        offsetCenter: [0, '70%'] 
      },
      data: [
        {
          value: '50',
        }
      ]
    }
  ]
});

onMounted(() => {
  chart = echart.init(document.getElementById("chart1"));
  initChart();

  window.onresize = function () {
    const fontSize = calculateFontSize();
    option.title.textStyle.fontSize = fontSize;
    option.series[0].detail.fontSize = fontSize;
    chart.setOption(option);
    chart.resize();
  };
});

onUnmounted(() => {
  echart.dispose(chart);
});

// 基础配置一下 Echarts
function initChart() {
  chart.setOption(option);
}
</script>
<style lang="less" scoped>
.chart {
  margin-top: 0vh;
  padding-top: 1vh;
  height: 20vh;
  width: 12.5vw;
}
</style>    