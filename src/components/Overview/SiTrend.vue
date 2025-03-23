<template>
  <div class="chartbox">
    <!-- <h2 class="title" style="">硅料入库明细</h2> -->
    <h2 style="text-align: center; color: rgb(255, 255, 255);height:0.3rem;line-height: 0.5rem;"><span
      style="font-size: 1.3vw;">硅料入库明细</span></h2>
    <div class="block">
      <div class="date-picker-container">
        <el-date-picker v-model="value1" type="datetimerange" range-separator="To" start-placeholder="Start date"
          end-placeholder="End date" />
      </div>

    </div>
    <div class="chart">
      <div id="SiTrend" ref="siTrendChart"></div>
    </div>
  </div>
</template>


<script setup>
import * as echarts from "echarts";
import { reactive, ref, watch } from 'vue';
import { onMounted, onUnmounted } from 'vue';
import axios from '@/axios';


const value1 = ref([
  new Date(2024, 10, 10, 10, 10),
  new Date(2025, 1, 11, 10, 10),
])
// 构建新的参数字符串
const param1 = ref(value1.value[0].toISOString()); // 将第一个日期转换为 ISO 格式的字符串
const param2 = ref(value1.value[1].toISOString()); // 将第二个日期转换为 ISO 格式的字符串
/// 声明定义一下echart
let chart
let siTrendChart = ref(null)
const data1 = ref([])
const x = ['product', 'Batch A', 'Batch B', 'Batch C', 'Batch D']


onMounted(() => {
  chart = echarts.init(siTrendChart.value);
  setChart();
  window.onresize = () => {
    //自适应大小
    chart.resize();
  };
});
watch(value1, () => {
  param1.value = value1.value[0].toISOString();
  console.log(param1.value);

  param2.value = value1.value[1].toISOString();
  setChart();
});
onUnmounted(() => {
  // 修正：调用 dispose 方法
  chart.dispose();
});
let final_data1 = ['免洗\\致密\\块', 0, 0, 0, 0]
let final_data2 = ['免洗\\菜花\\块', 0, 0, 0, 0]
let final_data3 = ['免洗\\珊瑚\\块', 0, 0, 0, 0]
let final_data4 = ['致密\\复投\\N型', 0, 0, 0, 0]
// 基础配置一下Echarts
const setChart = async () => {


  // await axios.get('/warehousingdetail?param1=2023-07-20 15:00:00&param2=2025-07-21 20:00:00').then(res=>{
  await axios.get(`/warehousingdetail?param1=${param1.value}&param2=${param2.value}`).then(res => {
    final_data1 = ['免洗\\致密\\块', 0, 0, 0, 0]
    final_data2 = ['免洗\\菜花\\块', 0, 0, 0, 0]
    final_data3 = ['免洗\\珊瑚\\块', 0, 0, 0, 0]
    final_data4 = ['致密\\复投\\N型', 0, 0, 0, 0]
    if (res) {
      data1.value = res
      data1.value.forEach((e) => {
        switch (e.batch) {
          case 'Batch A':
            switch (e.name) {
              case '免洗\\致密\\块':
                final_data1[1] = final_data1[1] + e.weight
                break;
              case '免洗\\菜花\\块':
                final_data2[1] = final_data2[1] + e.weight
                break;
              case '免洗\\珊瑚\\块':
                final_data3[1] = final_data3[1] + e.weight
                break;
              case '致密/复投/N型':
                final_data4[1] = final_data4[1] + e.weight
                break;
            }
            break;
          case 'Batch B':
            switch (e.name) {
              case '免洗\\致密\\块':
                final_data1[2] = final_data1[2] + e.weight
                break;
              case '免洗\\菜花\\块':
                final_data2[2] = final_data2[2] + e.weight
                break;
              case '免洗\\珊瑚\\块':
                final_data3[2] = final_data3[2] + e.weight
                break;
              case '致密/复投/N型':
                final_data4[2] = final_data4[2] + e.weight
                break;
            }
            break;
          case 'Batch C':
            switch (e.name) {
              case '免洗\\致密\\块':
                final_data1[3] = final_data1[3] + e.weight
                break;
              case '免洗\\菜花\\块':
                final_data2[3] = final_data2[3] + e.weight
                break;
              case '免洗\\珊瑚\\块':
                final_data3[3] = final_data3[3] + e.weight
                break;
              case '致密/复投/N型':
                final_data4[3] = final_data4[3] + e.weight
                break;
            }
            break;
          case 'Batch D':
            switch (e.name) {
              case '免洗\\致密\\块':
                final_data1[4] = final_data1[4] + e.weight
                break;
              case '免洗\\菜花\\块':
                final_data2[4] = final_data2[4] + e.weight
                break;
              case '免洗\\珊瑚\\块':
                final_data3[4] = final_data3[4] + e.weight
                break;
              case '致密/复投/N型':
                final_data4[4] = final_data4[4] + e.weight
                break;
            }
            break;
        }
      })
    }
    return res
  })
  chart.on('updateAxisPointer', (event) => {
    const xAxisInfo = event.axesInfo[0];
    if (xAxisInfo) {
      const dimension = xAxisInfo.value + 1;
      chart.setOption({
        series: {
          id: 'pie',
          label: {
            // formatter: '{b}: {@[' + dimension + ']} ({d}%)'
          },
          encode: {
            value: dimension,
            tooltip: dimension
          }
        }
      });
    }
  })
  // 把配置和数据放这里
  chart.setOption({
    legend: {
      textStyle: {
        color: "#FFF",
        fontSize: '10px'
      }
    },
    tooltip: {
      trigger: 'axis',
      showContent: false
    },
    dataset: {
      source: [
        x,
        final_data1,
        final_data2,
        final_data3,
        final_data4
      ]
    },
    xAxis: {
      type: 'category',
      axisLine: {
        lineStyle: {
          color: "#FFF",
          width: 1,
        },
      },
      axisLabel: {
        textStyle: {
          color: "white",
        },
      },
    },
    yAxis: {
      gridIndex: 0,
      axisLine: {
        lineStyle: {
          color: "#FFF",
          width: 1,
        },
      },
      axisLabel: {
        textStyle: {
          color: "white",
        },
      },
    },
    grid: {
      top: '55%',
      left: '18% '
    },
    series: [
      {
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        emphasis: { focus: 'series' }
      },
      {
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        emphasis: { focus: 'series' }
      },
      {
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        emphasis: { focus: 'series' }
      },
      {
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        emphasis: { focus: 'series' }
      },
      {
        type: 'pie',
        id: 'pie',
        radius: '30%',
        // 修改 center 属性，将扇形图向下移动
        center: ['50%', '35%'], 
        emphasis: {
          focus: 'self'
        },
        label: {
          formatter: '{b}: {@Batch A} ({d}%)'
        },
        encode: {
          itemName: 'product',
          value: 'Batch A',
          tooltip: 'Batch A'
        }
      }
    ]
  });
}

</script>

<style scoped lang="less">
.block {
  padding: 3vh 0 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  // flex: 1;
}

.chartbox {
  width: 22vw;
  margin-left: 1vw;
  border: 0.15vw solid rgb(5, 38, 85);
  background-color: #0b1234;
}

.title {
  text-align: center;
  color: rgb(255, 255, 255);
  height: 4vh;
  line-height: 4vh;
  background: url('@/assets/images/bgtitle.png') no-repeat;
  background-size: 100% 100%;
}

.chart {
  margin-top: 0.125rem;
  height: 47vh;


  #SiTrend {
    margin-top: 0.125vh;
    height: 47vh;
  }
}

.date-picker-container {
  height: 20%;
  /* Adjust the height as needed */
}

.el-date-picker {
  height: 100%;
}
:deep(.el-date-editor.el-input) {
  width: 20vw !important;
}

:deep(.el-date-editor.el-input__wrapper) {
  width: 20vw !important;
}

</style>