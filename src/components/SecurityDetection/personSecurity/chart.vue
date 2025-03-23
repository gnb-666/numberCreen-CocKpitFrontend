<template>
  <div class="ratio">
    <div class="title" style="text-align: center;padding-top:0.5em;">人员安全相关比例</div>
    <div class="chart" id="chart_gas"></div>
  </div>
</template>

<script setup>
import * as echarts from "echarts";
import { onMounted, onUnmounted, ref } from "vue";
import axios from '@/axios';

// 使用 ref 管理 ECharts 实例
const chartInstance = ref(null);

// 数据容器
let safe = {};
for (let i = 0; i < 3; i++) {
  safe[`data${i}`] = [];
}

// 初始化图表
const initChart = () => {
  const targetElement = document.getElementById("chart_gas");
  if (!targetElement) return;

  // 如果已经存在图表实例，先销毁
  if (chartInstance.value) {
    chartInstance.value.dispose();
  }

  // 创建新的图表实例
  chartInstance.value = echarts.init(targetElement);

  // 设置图表配置
  chartInstance.value.setOption({
    title: [
      {
        subtext: '危害因素比例',
        left: '16.67%',
        top: '85%',
        textAlign: 'center',
        subtextStyle: {
          color: '#fff',
          fontSize: 12,
          fontWeight: 600
        }
      },
      {
        subtext: '人员岗位比例',
        left: '50%',
        top: '85%',
        textAlign: 'center',
        subtextStyle: {
          color: '#fff',
          fontSize: 12,
          fontWeight: 600
        }
      },
      {
        subtext: '接触类型比例',
        left: '83.33%',
        top: '85%',
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
        data: safe['data0'],
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
        data: safe['data1'],
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
        data: safe['data2'],
        label: {
          position: 'outer',
          alignTo: 'edge',
          edgeDistance: 20, 
          color: '#fff'
        },
        left: '66.6667%',
        right: 0,
        top: 0,
        bottom: 0
      }
    ]
  });

  // 监听窗口大小变化
  window.addEventListener("resize", () => {
    if (chartInstance.value) {
      chartInstance.value.resize();
    }
  });
};

// 获取数据
const getperson_safeList = async () => {
  try {
    const res = await axios.get('/person_safe');
    console.log('11', res);

    // 清空旧数据
    for (let i = 0; i < 3; i++) {
      safe[`data${i}`] = [];
    }

    // 填充新数据
    res.forEach((datalist) => {
      if (datalist['type'] === "危害因素比例") {
        safe['data0'].push({ name: datalist.name, value: datalist.value });
      } else if (datalist['type'] === "人员岗位比例") {
        safe['data1'].push({ name: datalist.name, value: datalist.value });
      } else if (datalist['type'] === "接触类型比例") {
        safe['data2'].push({ name: datalist.name, value: datalist.value });
      }
    });

    // 重新初始化图表
    initChart();
  } catch (error) {
    console.error(error);
  }
};

// 组件挂载时获取数据
onMounted(() => {
  getperson_safeList();
});

// 组件卸载时销毁图表实例
onUnmounted(() => {
  if (chartInstance.value) {
    chartInstance.value.dispose();
    chartInstance.value = null;
  }
  window.removeEventListener("resize", () => {});
});
</script>

<style lang="less" scoped>
.ratio {
  margin-top: 2vh;
  border: 0.2vw solid rgb(5, 38, 85);
  background-color: #fff;
}

.title {
  height: 5vh;
  margin-left: 0vw;
  background: url('@/assets/images/bgtitle.png') no-repeat;
  background-size: 100% 100%;
  color: #fff;
  font-size: 1.3vw;
  font-weight: 700;
}

.chart {
  margin-top: 0vh;
  height: 26.625vh;
  width: 59.625vw;
  background: url('@/assets/images/bgimg.png') no-repeat;
  background-size: 100% 100%;
}
</style>