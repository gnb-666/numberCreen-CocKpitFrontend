<template>
    <!-- <h2 style="text-align: center; color: rgb(255, 255, 255);height:0rem;line-height: 0.5rem;">氯耗投入趋势</h2> -->
    <h2 style="text-align: center; color: rgb(255, 255, 255);height:0.3rem;line-height: 0.5rem;"><span
      style="font-size: 1.3vw;">氯耗投入趋势</span></h2>
    <div class="chart">
      <div id="ClTrend" :style="{ height: '2.7rem' }"></div>
    </div>
  </template>
  
  <script>
  import * as echarts from "echarts";
  import { onMounted, onUnmounted } from "vue";
  
  export default {
    setup() {
      /// 声明定义一下echart
      let echart = echarts;
  
      onMounted(() => {
        initChart();
      });
  
      onUnmounted(() => {
        echart.dispose;
      });
  
      // 基础配置一下Echarts
      function initChart() {
        let chart = echart.init(document.getElementById("ClTrend"));
        // 把配置和数据放这里
        chart.setOption({

        grid: {
          left: "3%",
          right: "6%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap:false,
          data: ["2016","2017", "2018", "2019", "2020", "2023"],
          axisLine: {
            lineStyle: {
              color: "#FFF",
              width: 1,
            },
          },
        },
        color:"#ADEAEA",
        yAxis: {
          min:0, 
          max:100, 
          interval:20,
          axisLine: {
            lineStyle: {
              color: "#FFF",
              width: 1,
            },
          },
        },
        series: [
          {
            name: "实时电耗",
            type: "line",
            stack: "Total",
            data: [54, 46, 62, 50, 72,81],
            areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: '#ADEAEA'
          },
          {
            offset: 1,
            color: '#5D5A5A'
          }
        ])
      },
          },
        ],
        });
        window.onresize = function () {
          //自适应大小
          chart.resize();
        };
      }
  
      return { initChart };
    },
  };
  
  
           
  </script>
  
  <style scoped>
  .chart {
    margin-top: 0.125rem;
  }
  </style>
  