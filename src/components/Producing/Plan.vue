<template>
  <h2 style="text-align: center; color: rgb(255, 255, 255);height:0.34rem;line-height: 0.45rem;"><span style="font-size: 1.3vw;">计划执行</span></h2>
  <div class="chart">
    <div id="PlanChart" :style="{ height: '3rem' }"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { onMounted, onUnmounted, ref } from "vue";
import axios from '@/axios';

export default {
  setup() {
    // 使用 ref 管理响应式数据
    const chart = ref(null);
    const sourceData = ref([["product", "产量", "计划"]]);
    const inputdata = ref({});
    for (let i = 0; i < 7; i++) {
      inputdata.value[`data${i}`] = [];
    }

    onMounted(() => {
      getdailyplandetailList();
    });

    onUnmounted(() => {
      if (chart.value) {
        chart.value.dispose();
      }
    });

    // 生成图表配置对象的函数
    const getChartOptions = () => ({
      legend: {
        top: "5%",
        textStyle: {
          color: "white",
        },
      },
      color: ["#ADEAEA", "#ED7C30"],
      dataset: {
        source: sourceData.value,
      },
      xAxis: {
        name: "日期",
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
        max: 0.5,
        interval: 0.1,
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

    // 初始化图表函数
    const initChart = () => {
      const targetElement = document.getElementById("PlanChart");
      if (!targetElement) return;

      chart.value = echarts.init(targetElement);
      chart.value.setOption(getChartOptions());

      const resizeHandler = () => {
        if (chart.value) {
          chart.value.resize();
        }
      };
      window.addEventListener('resize', resizeHandler);

      return () => {
        window.removeEventListener('resize', resizeHandler);
      };
    };

    // 获取数据函数
    const getdailyplandetailList = async () => {
      try {
        const res = await axios.get('/dailyplandetail');

        res.sort((a, b) => {
          const dateA = new Date(a.time);
          const dateB = new Date(b.time);
          return dateA - dateB;
        });

        const recentData = res.slice(0, 7);

        recentData.forEach((datalist, index) => {
          const date = new Date(datalist['time']);
          const month = date.getMonth() + 1;
          const day = date.getDate();
          const formattedDate = `${month}-${day}`;
          inputdata.value[`data${index}`].push(formattedDate);
          inputdata.value[`data${index}`].push(datalist['actualproduction']);
          inputdata.value[`data${index}`].push(datalist['planproduction']);
        });

        for (let i = 0; i < 7; i++) {
          let currentData = inputdata.value[Object.keys(inputdata.value)[i]];
          sourceData.value.push(currentData);
        }

        initChart();
      } catch (error) {
        console.error('获取每日计划详情数据失败:', error);
      }
    };

    return {};
  },
};
</script>

<style scoped>
.chart {
  margin-top: 0.125rem;
}
</style>