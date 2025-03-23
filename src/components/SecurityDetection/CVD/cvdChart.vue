<template>
  <div>
    <div class="chart" id="cvdChart2"></div>
  </div>
</template>
<script setup>
import * as echarts from "echarts";
import { reactive, ref } from 'vue';
import { onMounted, onUnmounted } from "vue";
import axios from "@/axios";

/// 声明定义一下echart
let echart = echarts;
let chart;
const data1 = ref([]);

const data = [["2000-06-05", 116], ["2000-06-06", 129], ["2000-06-07", 135], ["2000-06-08", 86], ["2000-06-09", 73], ["2000-06-10", 85], ["2000-06-11", 73], ["2000-06-12", 68], ["2000-06-13", 92], ["2000-06-14", 130], ["2000-06-15", 245], ["2000-06-16", 139], ["2000-06-17", 115], ["2000-06-18", 111], ["2000-06-19", 309], ["2000-06-20", 206], ["2000-06-21", 137], ["2000-06-22", 128], ["2000-06-23", 85], ["2000-06-24", 94], ["2000-06-25", 71], ["2000-06-26", 106], ["2000-06-27", 84], ["2000-06-28", 93], ["2000-06-29", 85], ["2000-06-30", 73], ["2000-07-01", 83], ["2000-07-02", 125], ["2000-07-03", 107], ["2000-07-04", 82], ["2000-07-05", 44], ["2000-07-06", 72], ["2000-07-07", 106], ["2000-07-08", 107], ["2000-07-09", 66], ["2000-07-10", 91], ["2000-07-11", 92], ["2000-07-12", 113], ["2000-07-13", 107], ["2000-07-14", 131], ["2000-07-15", 111], ["2000-07-16", 64], ["2000-07-17", 69], ["2000-07-18", 88], ["2000-07-19", 77], ["2000-07-20", 83], ["2000-07-21", 111], ["2000-07-22", 57], ["2000-07-23", 55], ["2000-07-24", 60]];
const dateList = data.map(function (item) {
  // console.log(item);
  return item[0];
});
console.log(dateList);
const valueList = data.map(function (item) {
  return item[1];
});

// 计算基于视口宽度的 1.3vw 字体大小
const calculateFontSize = () => {
  const viewportWidth = window.innerWidth;
  return viewportWidth * 0.013;
};

const option = reactive({
  // Make gradient line here
  visualMap: [
    {
      show: false,
      type: 'continuous',
      seriesIndex: 0,
      min: 0,
      max: 400
    },
    {
      show: false,
      type: 'continuous',
      seriesIndex: 1,
      dimension: 0,
      min: 0,
      max: dateList.length - 1
    }
  ],
  title: [
    {
      top: '5%',
      left: 'center',
      text: 'H2预设值',
      textStyle: {
        color: '#fff',
        fontSize: calculateFontSize() // 使用动态计算的字体大小
      }
    },
    {
      top: '50%',
      left: 'center',
      text: 'TCS预设值',
      textStyle: {
        color: '#fff',
        fontSize: calculateFontSize() // 使用动态计算的字体大小
      }
    }
  ],
  tooltip: {
    trigger: 'axis'
  },
  xAxis: [
    {
      data: dateList
    },
    {
      data: dateList,
      gridIndex: 1
    }
  ],
  yAxis: [
    {},
    {
      gridIndex: 1
    }
  ],
  grid: [
    {
      bottom: '60%'
    },
    {
      top: '60%'
    }
  ],
  series: [
    {
      type: 'line',
      showSymbol: false,
      data: valueList
    },
    {
      type: 'line',
      showSymbol: false,
      data: valueList,
      xAxisIndex: 1,
      yAxisIndex: 1
    }
  ]
});

onMounted(() => {
  // initChart();
  chart = echart.init(document.getElementById("cvdChart2"));
  setChart();
  window.onresize = () => {
    const fontSize = calculateFontSize();
    option.title.forEach(t => t.textStyle.fontSize = fontSize);
    chart.setOption(option);
    //自适应大小
    chart.resize();
  };
});

onUnmounted(() => {
  echart.dispose(chart); // 正确调用销毁 ECharts 实例
});

// 基础配置一下Echarts
function initChart() {
  let chart = echart.init(document.getElementById("cvdChart2"));
  // 把配置和数据放这里
  chart.setOption(option)

  window.onresize = function () {
    //自适应大小
    chart.resize();
  };
}

const setChart = async () => {
  await axios.get('/cvdChart').then(res => {
    data1.value = res
  });
  chart.setOption({
    // Make gradient line here
    visualMap: [
      {
        show: false,
        type: 'continuous',
        seriesIndex: 0,
        min: 0,
        max: 400
      },
      {
        show: false,
        type: 'continuous',
        seriesIndex: 1,
        dimension: 0,
        min: 0,
        max: data1.value.dateList.length - 1
      }
    ],
    title: [
      {
        top: '5%',
        left: 'center',
        text: 'H2预设值',
        textStyle: {
          color: '#fff',
          fontSize: calculateFontSize() // 使用动态计算的字体大小
        }
      },
      {
        top: '50%',
        left: 'center',
        text: 'TCS预设值',
        textStyle: {
          color: '#fff',
          fontSize: calculateFontSize() // 使用动态计算的字体大小
        }
      }
    ],
    tooltip: {
      trigger: 'axis'
    },
    xAxis: [
      {
        data: data1.value.dateList
      },
      {
        data: data1.value.dateList,
        gridIndex: 1
      }
    ],
    yAxis: [
      {},
      {
        gridIndex: 1
      }
    ],
    grid: [
      {
        bottom: '60%'
      },
      {
        top: '60%'
      }
    ],
    series: [
      {
        type: 'line',
        showSymbol: false,
        data: data1.value.xh2List
      },
      {
        type: 'line',
        showSymbol: false,
        data: data1.value.xtcsList,
        xAxisIndex: 1,
        yAxisIndex: 1
      }
    ]
  });
}
</script>
<style lang="less" scoped>
.chart {
  margin-top: 1vh;
  height: 40vh;
  width: 26vw;
  // background-color: #0b1a41;
  border-image-source: radial-gradient(68% 68%, transparent 0px, transparent 100%, cyan 100%);
  border-image-slice: 1;
  border-width: 3px;
  border-style: solid;
  border-image-outset: 0cm;
  background: url(../../../assets/images/bgimg.png) no-repeat ;
  background-size: 100% 100%;
}
</style>