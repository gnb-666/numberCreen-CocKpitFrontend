<template>
  <div class="test">
    <h2 style="text-align: center; color: rgb(255, 255, 255);height:0.3rem;line-height: 0.5rem;"><span style="font-size: 1.3vw;">智能设备投入（万元）</span></h2>
    <div class="chart">
      <div ref="chartRef" :style="{ height: '3rem' }"></div>
    </div>
  </div>
</template>

<script setup>
import * as echarts from "echarts";
import { onMounted, onUnmounted, ref } from "vue";
import axios from '@/axios';

// 使用 ref 管理响应式数据
const chartRef = ref(null);
let chartInstance = null;
const sourceData = ref([["location", "氢化工段设备", "净化工段设备", "渣浆高沸工段设备", "还原工段设备", "公用工段设备"]]);
const inputdata = ref({});
const resLength = 100;
for (let i = 0; i < resLength; i++) {
  inputdata.value[`data${i}`] = [];
}

// 提取图表配置函数
const getChartOption = () => ({
  legend: {
    top: "1%",
    fontSize: 5,
    textStyle: {
      color: "white",
      fontSize: 8,
    },
  },
  grid: {},
  dataset: {
    source: sourceData.value,
  },
  xAxis: {
    type: "category",
    name: "年份",
    nameTextStyle: { fontSize: 8 },
    axisLine: {
      lineStyle: {
        color: "#FFF",
        width: 1,
      },
      fontSize: 5,
    },
    axisLabel: {
      textStyle: {
        color: "white",
      },
    },
  },
  yAxis: {
    name: "金额",
    nameTextStyle: { fontSize: 5 },
    axisLine: {
      lineStyle: {
        color: "#FFF",
        width: 1,
      },
    },
    axisLabel: {
      textStyle: {
        fontSize: 8 ,
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
      type: "bar",
      label: {
        show: false,
        position: "top",
        color: "white",
      },
      color: {
        type: "linear",
        x: 0, //右
        y: 0, //下
        x2: 0, //左
        y2: 1, //上
        colorStops: [
          {
            offset: 0,
            color: "#11d56d", // 0% 处的颜色
          },
          {
            offset: 1,
            color: "#83bff6", // 100% 处的颜色
          },
        ],
      },
    },
    {
      type: "bar",
      label: {
        show: false,
        position: "top",
        color: "white",
      },
      color: {
        type: "linear",
        x: 0, //右
        y: 0, //下
        x2: 0, //左
        y2: 1, //上
        colorStops: [
          {
            offset: 0,
            color: "#CD7F32", // 0% 处的颜色
          },
          {
            offset: 1,
            color: "#D8D8BF", // 100% 处的颜色
          },
        ],
      },
    },
    {
      type: "bar",
      label: {
        show: false,
        position: "top",
        color: "white",
      },
      color: {
        type: "linear",
        x: 0, //右
        y: 0, //下
        x2: 0, //左
        y2: 1, //上
        colorStops: [
          {
            offset: 0,
            color: "#2F4F4F", // 0% 处的颜色
          },
          {
            offset: 1,
            color: "#8FBC8F", // 100% 处的颜色
          },
        ],
      },
    },
    {
      type: "bar",
      label: {
        show: false,
        position: "top",
        color: "white",
      },
      color: {
        type: "linear",
        x: 0, //右
        y: 0, //下
        x2: 0, //左
        y2: 1, //上
        colorStops: [
          {
            offset: 0,
            color: "#4B0082", // 0% 处的颜色
          },
          {
            offset: 1,
            color: "#8FBC8F", // 100% 处的颜色
          },
        ],
      },
    },
    {
      type: "bar",
      label: {
        show: false,
        position: "top",
        color: "white",
      },
      color: {
        type: "linear",
        x: 0, //右
        y: 0, //下
        x2: 0, //左
        y2: 1, //上
        colorStops: [
          {
            offset: 0,
            color: "#FF6E47", // 0% 处的颜色
          },
          {
            offset: 1,
            color: "#EAADEA", // 100% 处的颜色
          },
        ],
      },
    },
  ],
});

// 初始化图表函数
const initChart = () => {
  if (chartRef.value) {
    if (chartInstance) {
      chartInstance.dispose(); // 销毁旧的图表实例
    }
    chartInstance = echarts.init(chartRef.value); // 初始化新的图表实例
    chartInstance.setOption(getChartOption());

    const resizeHandler = () => {
      if (chartInstance) { // 确保 chartInstance 存在
        chartInstance.resize();
      }
    };
    window.addEventListener('resize', resizeHandler);

    // 返回一个清理函数
    return () => {
      window.removeEventListener('resize', resizeHandler);
      if (chartInstance) {
        chartInstance.dispose(); // 销毁图表实例
        chartInstance = null; // 将实例置空
      }
    };
  }
  return () => {}; // 如果 chartRef.value 不存在，返回一个空函数
};

// 获取数据函数
const getequipmentinputList = async () => {
  try {
    const res = await axios.get('/equipmentinput');
    const actualResLength = res.length;
    // 对 res 数组根据年份大小进行排序
    res.sort((a, b) => parseInt(a.year) - parseInt(b.year));
    for (let i = 0; i < actualResLength; i++) {
      const datalist = res[i];
      inputdata.value[`data${i}`].push(datalist['year']);
      inputdata.value[`data${i}`].push(datalist['hydrogenationsection']);
      inputdata.value[`data${i}`].push(datalist['purificationsection']);
      inputdata.value[`data${i}`].push(datalist['slurryhighboilingsection']);
      inputdata.value[`data${i}`].push(datalist['reductionsection']);
      inputdata.value[`data${i}`].push(datalist['commonstation']);
    }
    // 遍历 inputdata 中的数据，将每个 data 数组添加到 sourceData 中
    for (let i = 0; i < actualResLength; i++) {
      const currentData = inputdata.value[Object.keys(inputdata.value)[i]];
      sourceData.value.push(currentData);
    }
    // 数据加载完成后再初始化图表
    initChart();
  } catch (error) {
    console.error('获取智能设备投入数据失败:', error);
  }
};

onMounted(() => {
  getequipmentinputList();
});

onUnmounted(() => {
  if (chartInstance) {
    chartInstance.dispose(); // 销毁图表实例
    chartInstance = null; // 将实例置空
  }
});
</script>

<style scoped>
.chart {
  margin-top: 0.125rem;
}
</style>