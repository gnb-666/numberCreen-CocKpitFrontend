<template>
  <div class="chart" id="chart_his"></div>
</template>

<script setup>
import * as echarts from "echarts";
import { reactive, ref } from 'vue';
import { onMounted, onUnmounted } from "vue";
import axios from '@/axios';

let echart = echarts;
const type = ref([]);
const number = ref([]);
const option = {
  title: {
    text: '事故统计',
    textStyle: {
      color: '#fff',
      fontSize: '1.3vw'
    },
    left: 'center',
    top: '20px'
  },
  xAxis: {
    type: 'category',
    data: type.value
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: number.value,
      type: 'bar'
    }
  ]
};

let chart = null; // 声明变量用于存储 ECharts 实例

onMounted(() => {
  accident_numberList();
});

onUnmounted(() => {
  if (chart) {
    chart.dispose(); // 销毁 ECharts 实例
    chart = null; // 重置 chart 变量
  }
});

function initChart() {
  if (!chart) {
    chart = echart.init(document.getElementById("chart_his"));
  }
  chart.setOption(option);

  window.onresize = function () {
    chart.resize();
  };
}

const accident_numberList = async () => {
  try {
    const res = await axios.get('/accident_number');
    res.forEach((datalist) => {
      type.value.push(datalist.type);
      number.value.push(datalist.number);
    });
    initChart();
  } catch (error) {
    console.error(error);
  }
};
</script>

<style lang="less" scoped>
.chart {
  height: 46vh;
  width: 66vw;
  background-color: #0b1a41;
  background-size: 100% 100%;
}
</style>