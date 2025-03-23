<template>
  <div class="recall">
    <div class="title" style="text-align: center;" ><span style="font-size: 1.3vw;">回收率</span></div>
    <div class="chart" id="chart">
    </div>
  </div>
</template>

<script setup>
import * as echarts from "echarts";
import { reactive, ref } from 'vue';
import axios from '@/axios'
import { onMounted, onUnmounted } from "vue";
let echart = echarts;
let recalldata = {};
for (let i = 0; i < 4; i++) {
  recalldata[`data${i}`] = [];

}
onMounted(() => {
  getrecoveryList();
  // initChart();
});

onUnmounted(() => {
  echart.dispose;
});

// 基础配置一下Echarts
function initChart() {
  let chart = echart.init(document.getElementById("chart"));
  // 把配置和数据放这里
  chart.setOption({
    legend: {
      textStyle: {
        color: "#fff"
      }
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      // top:"15%",
      containLabel: true,
    },
    tooltip: {},
    dataset: {
      dimensions: ['product', '行业标准', '本公司'],
      source: [
        // { product: '水循环', 行业标准: 90, 本公司: 97 },
        // { product: '氮气', 行业标准: 95, 本公司: 98 },
        // { product: '氯化氢', 行业标准: 93, 本公司: 97 },
        // { product: '四氯化硅', 行业标准: 90, 本公司: 96 }
        recalldata['data0'],
        recalldata['data1'],
        recalldata['data2'],
        recalldata['data3'],
      ]
    },
    xAxis: {
      type: 'category',
      axisLabel: {
        color: "#fff"
      }
    },
    yAxis: {
      name: '百分比(%)',
      min: 80,
      splitNumber: 4,
      axisLine: {
        lineStyle: {
          color: "#fff"
        }
      },
    },
    // Declare several bar series, each will be mapped
    // to a column of dataset.source by default.
    series: [{
      type: 'bar',
      itemStyle: {
        color: "rgba(216, 166, 95)"
      }
    }, {
      type: 'bar',
      itemStyle: {
        color: "rgba(148, 219, 223)"
      }
    }]
  });
  window.onresize = function () {
    //自适应大小
    chart.resize();
  };
}
const getrecoveryList = async () => {
  try {
    const res = await axios.get('/recovery');
    for (let i = 0; i < 4; i++) {
      let datalist = res[i];
      recalldata[`data${i}`] = {
        product: datalist['ingredientname'],
        行业标准: datalist['industrystandards'],
        本公司: datalist['companystandards']
      };
    }
    initChart(); // 确保数据填充完毕后再初始化图表
  } catch (error) {
    console.error(error);
  }
};
</script>

<style lang="less" scoped>
.recall {
  width: 33vw;
  height: 35vh;
  margin-left: 1vw;
  // margin-top: 1vh;
  border: 0.15vw solid rgb(5, 38, 85);
}

.title {
  width: 32.75vw;
  height: 4vh;
  background: url('@/assets/images/bgtitle.png') no-repeat;
  background-size: 100% 100%;
  color: #fff;
  font-size: 18px;
  font-weight: 700;
}

.chart {
  margin-top: 0vh;
  padding-top: 1vh;
  height: 30.7vh;
  width: 32.7vw;
  background: url('@/assets/images/bgimg.png') no-repeat;
  background-size: 100% 100%;
}
</style>