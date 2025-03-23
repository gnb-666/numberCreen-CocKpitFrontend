<template>
  <div class="recall">
    <div class="title" style="text-align: center;" ><span style="font-size: 1.3vw;">各环节废物排放比例</span></div>
    <div class="chart" id="chart_gas">
    </div>
  </div>
</template>

<script setup>
import * as echarts from "echarts";
import { reactive, ref } from 'vue';
import { onMounted, onUnmounted } from "vue";
import { size } from "lodash";
import axios from '@/axios'
let wastes = {};
for (let i = 0; i < 3; i++) {
  wastes[`data${i}`] = [];
}
let echart = echarts;
onMounted(() => {
  getwastesList()
  initChart();
});

onUnmounted(() => {
  echart.dispose;
});

// 基础配置一下Echarts
function initChart() {
  let chart = echart.init(document.getElementById("chart_gas"));
  // 把配置和数据放这里
  chart.setOption({
    title: [
      {
        subtext: '废水',
        left: '16.67%',
        top: '80%',
        textAlign: 'center',
        subtextStyle: {
          color: '#fff',
          fontSize: 12,
          fontWeight: 600
        }
      },
      {
        subtext: '废气',
        left: '50%',
        top: '80%',
        textAlign: 'center',
        subtextStyle: {
          color: '#fff',
          fontSize: 12,
          fontWeight: 600
        }
      },
      {
        subtext: '废渣',
        left: '83.33%',
        top: '80%',
        textAlign: 'center',
        subtextStyle: {
          color: '#fff',
          fontSize: 12,
          fontWeight: 600
        }
      }
    ],
    series: [
      {
        type: 'pie',
        radius: '50%',
        center: ['50%', '50%'],
        data: wastes['data0'],
        label: {
          position: 'outer',
          alignTo: 'none',
          bleedMargin: 5,
          color: '#fff'
        },
        left: 0,
        right: '66.6667%',
        top: 0,
        bottom: 0
      },
      {
        type: 'pie',
        radius: '50%',
        center: ['50%', '50%'],
        data: wastes['data1'],
        label: {
          position: 'outer',
          alignTo: 'labelLine',
          bleedMargin: 5,
          color: '#fff'
        },
        left: '33.3333%',
        right: '33.3333%',
        top: 0,
        bottom: 0
      },
      {
        type: 'pie',
        radius: '50%',
        center: ['50%', '50%'],
        data: wastes['data2'],
        label: {
          position: 'outer',
          alignTo: 'edge',
          margin: 20,
          color: '#fff'
        },
        left: '66.6667%',
        right: 0,
        top: 0,
        bottom: 0
      }
    ]
  });
  window.onresize = function () {
    //自适应大小
    chart.resize();
  };
}
const getwastesList = async () => {
  try {
    const res = await axios.get('/wastes');
    const resLength = res.length; // 获取数组的长度
    // 对res数组根据年份大小进行排序
    for (let i = 0; i < resLength; i++) {
      let datalist = res[i];
      if (datalist['wastetype'] == "废水") {
        // datalist.wastecontent = datalist.wastecontent.toFixed(2)
        wastes['data0'].push({ name: datalist.wastename, value: datalist.wastecontent });
      } else if (datalist['wastetype'] == "废气") {
        // datalist.wastecontent = datalist.wastecontent.toFixed(2)
        wastes['data1'].push({ name: datalist.wastename, value: datalist.wastecontent });
      } else if (datalist['wastetype'] == "废渣") {
        // datalist.wastecontent = datalist.wastecontent.toFixed(2)
        wastes['data2'].push({ name: datalist.wastename, value: datalist.wastecontent });
      }
    }
    initChart(); // 确保数据填充完毕后再初始化图表
  } catch (error) {
    console.error(error);
  }
};
</script>

<style lang="less" scoped>
.recall {
  width: 60vw;
  height: 32vh;
  margin-top: 2vh;
  // margin-left: 1vw;
  margin-left: -10vw;
  // margin-top: 1vh;
  border: 0.2vw solid rgb(5, 38, 85);
}

.title {
  width: 59.625vw;
  height: 5vh;
  margin-left: 0vw;
  background: url('@/assets/images/bgtitle.png') no-repeat;
  background-size: 100% 100%;
  color: #fff;
  font-size: 18px;
  font-weight: 700;
}

.chart {
  margin-top: 0vh;
  // padding-top: 1vh;
  height: 26.625vh;
  width: 59.625vw;
  background: url('@/assets/images/bgimg.png') no-repeat;
  background-size: 100% 100%;
}
</style>