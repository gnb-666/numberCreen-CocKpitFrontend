<template>
  <!-- <h2 style="text-align: center; color: rgb(255, 255, 255);height:0.3rem;line-height: 0.5rem;">计划执行情况</h2> -->
  <h2 style="text-align: center; color: rgb(255, 255, 255);height:0.3rem;line-height: 0.5rem;"><span
    style="font-size: 1.3vw;">计划执行情况</span></h2>
  <div class="chart">
    <div id="Plan" :style="{ height: '3rem' }"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { onMounted, onUnmounted } from "vue";
import axios from '@/axios'
export default {
  setup() {
    /// 声明定义一下echart
    let echart = echarts;
    const sourceData = [["product", "产量", "计划"]];
    let resLength = 100
    let inputdata = {};
    for (let i = 0; i < resLength; i++) {
      inputdata[`data${i}`] = [];

    }
    onMounted(() => {
      getplandetailList()
      initChart();
    });

    onUnmounted(() => {
      echart.dispose;
    });

    // 基础配置一下Echarts
    function initChart() {
      let chart = echart.init(document.getElementById("Plan"));
      // 把配置和数据放这里
      chart.setOption({
        legend: {
          top: "5%",
          textStyle: {
            color: "white",
          },
        },
        grid: {
          left: "3%",
          right: "3%",
          bottom: "20%",
          containLabel: true,
        },
        color: ["#ADEAEA", "#ED7C30"],
        dataset: {
          source: sourceData,
        },
        xAxis: {
          type: "category",
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
        yAxis: {
          name: "产量(万吨)",
          min: 0,
          max: 400,
          interval: 100,
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
            label: {
              show: true,
              color: "white",
              position: "top",
            },
          },
          {
            type: "bar",
            label: {
              show: true,
              color: "white",
              position: "top",
            },
          },
        ],
      });
      window.onresize = function () {
        //自适应大小
        chart.resize();
      };
    }
    const getplandetailList = async () => {
      try {
        const res = await axios.get('/plandetail');
        const resLength = res.length; // 获取数组的长度
        // 对res数组根据年份大小进行排序
        res.sort((a, b) => {
          // 将年份字符串转换为数字进行比较
          const yearA = parseInt(a.year);
          const yearB = parseInt(b.year);

          // 根据年份大小升序排序
          return yearA - yearB;
        });
        for (let i = 0; i < resLength; i++) {
          let datalist = res[i];
          inputdata[`data${i}`].push(datalist['year']);
          inputdata[`data${i}`].push(datalist['actualproduction']);
          inputdata[`data${i}`].push(datalist['planproduction']);
        }
        // 遍历inputdata中的数据，将每个data数组添加到sourceData中
        for (let i = 0; i < resLength; i++) {
          let currentData = inputdata[Object.keys(inputdata)[i]];
          sourceData.push(currentData);
        }
        initChart(); // 确保数据填充完毕后再初始化图表
      } catch (error) {
        console.error(error);
      }
    };
    return { initChart };
  },
};
</script>

<style scoped>
.chart {
  margin-top: 0.125rem;
}
</style>