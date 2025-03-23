<template>
  <div class="test">
    <h2 style="text-align: center; color: rgb(255, 255, 255);height:0.3rem;line-height: 0.5rem;">
      <span style="font-size: 1.3vw;">产能增长趋势</span>
    </h2>
    <div class="chart">
      <div id="Trend" :style="{ height: '3.2rem' }"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { onMounted, onUnmounted, ref } from "vue";
import axios from '@/axios';

export default {
  setup() {
    // 声明定义一下echart
    let echart = echarts;
    let resLength = 100;
    let inputdata = {};
    for (let i = 0; i < resLength; i++) {
      inputdata[`data${i}`] = [];
    }

    // 将 chart 提升为组件作用域的变量
    let chart = null;

    // 基础配置一下Echarts
    const initChart = () => {
      if (chart) {
        chart.dispose(); // 销毁旧的图表实例
      }
      chart = echart.init(document.getElementById("Trend"));
      // 把配置和数据放这里
      chart.setOption({
        color: ["#70DBDB", "#B87333"],
        xAxis: {
          nameTextStyle: { fontSize: 10 },
          type: "category",
          data: inputdata['data0'],
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
          nameTextStyle: { fontSize: 10 },
          type: "value",
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
          splitLine: {
            lineStyle: {
              color: "#2F2F4F",
            },
          },
        },
        series: [
          {
            name: '产能增长',
            data: inputdata['data1'],
            type: "line",
            label: {
              show: true,
              color: "white",
              position: "bottom",
            },
          },
        ],
      });
      window.onresize = function () {
        // 自适应大小
        chart.resize();
      };
    };

    // 获取数据
    const getcapacitygrowthtrendList = async () => {
      try {
        const res = await axios.get('/capacitygrowthtrend');
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
          inputdata['data0'].push(datalist['year']);
          inputdata['data1'].push(datalist['capacity']);
        }
        // 确保数据填充完毕后再初始化图表
        initChart();
      } catch (error) {
        console.error(error);
      }
    };

    onMounted(() => {
      getcapacitygrowthtrendList();
    });

    onUnmounted(() => {
      if (chart) {
        chart.dispose(); // 销毁图表实例
        chart = null; // 将实例置空
      }
    });

    return { initChart };
  },
};
</script>

<style scoped>
.chart {
  width: 100%;
  height: 3.2rem; /* 确保这里有明确的高度 */
}
</style>