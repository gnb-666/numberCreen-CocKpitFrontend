<template>
  <div>
    <div class="chart" id="chart2"></div>
    <div class="btns">
      <el-button class="btn" type="danger">报警处理</el-button>
    <el-button class="btn" type="primary">任务单处理</el-button>
    </div>
  </div>
</template>
<script setup>
import * as echarts from "echarts";
import {reactive,ref,computed,watch} from 'vue';
import { onMounted, onUnmounted } from "vue";
import store from '@/store/index'
import axios from '@/axios';
let echart = echarts;
let chart 
// const data = [["2000-06-05", 116], ["2000-06-06", 129], ["2000-06-07", 135]]
let dateList = []
let valueList  = []

const dateList1 = ['氢化工段', '净化工段', '渣浆高沸工段', '还原工段', '公用工程工段']
const valueList1 = [11,27,37,38,23]

onMounted(async() => {
  chart = echart.init(document.getElementById("chart2"));
  setChart();
  window.onresize =  ()=> {
    //自适应大小
    chart.resize();
  };
});

onUnmounted(() => {
  echart.dispose;
});

// 基础配置一下Echarts
const setChart = async()=> {
  let type = ''
  switch(store.state.section){
    case '氢化工段':
      type='QH'
      break;
    case '净化工段':
      type='JH'
      break;
    case '渣浆高沸工段':
      type='ZJ'
      break;
    case '还原工段':
      type='HY'
      break;
    case '公用工程工段':
      type='GYGC' 
      break;
  }
  await axios.get(`/warningchart/${type}`).then(res=>{
    dateList= res.hours
    valueList = res.count
    return res
  })
  let option = {
    visualMap: [
    {
      show: false,
      type: 'continuous',
      seriesIndex: 0,
      min: 10,
      max: 40
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
      text: '各工段报警点位统计',
      textStyle:{
        fontsize: 8,
        color:'#fff',
      }
    },
    {
      top: '50%',
      left: 'center',
      text: '氢化工段报警数',
      fontsize: 8,
      textStyle:{
        color:'#fff',
      }
    }
  ],
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'none'
    },
    formatter: function (params) {
      return params[0].name + ': ' + params[0].value;
    }
  },
  xAxis: [
  {
       data: dateList1,
        axisTick: { show: false },
        axisLine: { show: false },
        axisLabel: {
          interval:0,
          color: '#e54035'
        }
    },
    {
      data: dateList,
      gridIndex: 1
    }
  ],
  yAxis: [
    {
      splitLine: { show: false },
      axisTick: { show: false },
      axisLine: { show: false },
      axisLabel: { show: false }
    },
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
       name: 'hill',
      type: 'pictorialBar',
      barCategoryGap: '-120%',
      // symbol: 'path://M0,10 L10,10 L5,0 L0,10 z',
      symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
      itemStyle: {
        opacity: 0.8
      },
      emphasis: {
        itemStyle: {
          opacity: 1
        }
      },
      data: valueList1,
      z: 15
    },
    {
      type: 'line',
      showSymbol: false,
      data: valueList,
      xAxisIndex: 1,
      yAxisIndex: 1,
      // markArea: {
      //   itemStyle: {
      //     color: 'rgba(255, 173, 177, 0.4)'
      //   },
      //   data: [
      //     [
      //       {
      //         name: 'Morning Peak',
      //         xAxis: '2000-06-05'
      //       },
      //       {
      //         xAxis: '2000-07-05'
      //       }
      //     ],
      //   ]
      // }
    }
  ]
  }
  // 把配置和数据放这里
  chart.setOption(option)
}

const section = computed (()=>{
  return store.state.section
})

watch(section,(newVal,oldVal)=>{
  console.log(newVal,oldVal);
  setChart()
})

</script>
<style lang="less" scoped>
.chart {
  margin-top: 1vh;
  margin-left: 2vw;
  height: 55vh;
  width: 23vw;
  background-color: #0b1a41;
  // background: url(../../../assets/images/bgimg.png) no-repeat ;
  background-size: 100% 100%;
}
.btns {
  margin-left: 2vw;
  width: 23vw;
  text-align: center;
  .btn{
  margin-top: 2vh;
  width: 8vw;
  height: 4vh;
  font-size: 1.3vw;
  font-weight: 700;
}
}
</style>