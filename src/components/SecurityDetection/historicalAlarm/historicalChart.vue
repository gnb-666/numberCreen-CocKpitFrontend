<template>
  <div class="chart" id="chart_his"></div>
</template>

<script setup>
import * as echarts from "echarts";
import { ref, watch, onMounted, onUnmounted } from "vue";
import axios from '@/axios';

// 定义 props
const props = defineProps(['tableData']);

// 定义响应式数据
const date = ref([]);
const data = ref([]);
let chart = null;

// 监听 props.tableData 的变化
watch(
  () => props.tableData,
  (newVal) => {
    console.log('tableData 更新:', newVal);
    if (newVal && newVal.length > 0) {
      // 处理数据并更新图表
      setChart();
    }
  },
  { immediate: true } // 立即执行一次
);

// 组件挂载时初始化图表
onMounted(() => {
  chart = echarts.init(document.getElementById("chart_his"));
  setChart();

  // 监听窗口大小变化
  window.addEventListener("resize", () => {
    if (chart) {
      chart.resize();
    }
  });
});

// 组件卸载时销毁图表实例和移除事件监听器
onUnmounted(() => {
  if (chart) {
    chart.dispose(); // 销毁图表实例
    chart = null;
  }
  window.removeEventListener("resize", () => {});
});

// 设置图表配置和数据
const setChart = async () => {
  try {
    const res = await axios.get('/historychart');
    console.log('resval', res);
    date.value = res.hours;
    data.value = res.count;

    // 计算基于vw的字体大小
    const viewportWidth = window.innerWidth;
    const fontSize = viewportWidth * 0.013; // 假设为1vw

    // 图表配置
    const option = {
      tooltip: {
        trigger: 'axis',
        position: function (pt) {
          return [pt[0], '10%'];
        }
      },
      title: {
        left: 'center',
        text: '历史报警统计',
        textStyle: {
          fontSize: fontSize, // 使用动态计算的字体大小
          color: '#fff'
        },
        top: '5%' // 调整标题位置
      },
      toolbox: {
        feature: {
          dataZoom: {
            yAxisIndex: 'none'
          },
          restore: {},
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: date.value
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%']
      },
      grid: {
        top: '20%', // 调整图表内容整体位置
        bottom: '10%',
        left: '10%',
        right: '10%'
      },
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 10
        },
        {
          start: 0,
          end: 10
        }
      ],
      series: [
        {
          name: '报警数量',
          type: 'line',
          symbol: 'none',
          sampling: 'lttb',
          itemStyle: {
            color: 'rgb(255, 70, 131)'
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(255, 158, 68)'
              },
              {
                offset: 1,
                color: 'rgb(255, 70, 131)'
              }
            ])
          },
          data: data.value
        }
      ]
    };

    // 设置图表配置
    if (chart) {
      chart.setOption(option);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
</script>

<style lang="less" scoped>
.chart {
  margin-top: 1vh;
  margin-left: 2vw;
  height: 40vh;
  width: 23vw;
  background-color: #0b1a41;
  background-size: 100% 100%;
}
</style>