<template>
  <div class="recall">
    <div class="title" style="text-align: center;">
      <span style="font-size: 1.3vw;">各环节废物排放比例</span>
    </div>
    <div class="chart" id="chart_gas"></div>
  </div>
</template>

<script setup>
import * as echarts from "echarts";
import { onMounted, onUnmounted, ref } from 'vue';
import axios from '@/axios';

// 使用ref管理图表实例和数据
const chartInstance = ref(null);
const wastesData = ref({
  data0: [], // 废水
  data1: [], // 废气
  data2: []  // 废渣
});

onMounted(() => {
  getWastesList();
});

onUnmounted(() => {
  // 组件卸载时销毁图表
  if (chartInstance.value) {
    chartInstance.value.dispose();
    window.removeEventListener('resize', resizeChart);
  }
});

// 初始化或更新图表
const initChart = () => {
  // 检查DOM元素是否存在
  const chartDom = document.getElementById('chart_gas');
  if (!chartDom) return;

  // 销毁已有实例
  if (chartInstance.value) {
    chartInstance.value.dispose();
  }

  // 创建新实例
  chartInstance.value = echarts.init(chartDom);

  // 配置图表选项
  const option = {
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
        data: wastesData.value.data0,
        label: {
          position: 'outer',
          alignTo: 'none',
          bleedMargin: 5,
          color: '#fff',
          formatter: '{b}: {c} ({d}%)' // 显示名称、值和百分比
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
        data: wastesData.value.data1,
        label: {
          position: 'outer',
          alignTo: 'labelLine',
          bleedMargin: 5,
          color: '#fff',
          formatter: '{b}: {c} ({d}%)'
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
        data: wastesData.value.data2,
        label: {
          position: 'outer',
          alignTo: 'edge',
          margin: 20,
          color: '#fff',
          formatter: '{b}: {c} ({d}%)'
        },
        left: '66.6667%',
        right: 0,
        top: 0,
        bottom: 0
      }
    ],
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    }
  };

  chartInstance.value.setOption(option);
  window.addEventListener('resize', resizeChart);
};

// 图表自适应
const resizeChart = () => {
  if (chartInstance.value) {
    chartInstance.value.resize();
  }
};

// 获取数据
const getWastesList = async () => {
  try {
    const res = await axios.get('/wastes');
    
    // 清空旧数据
    wastesData.value = {
      data0: [],
      data1: [],
      data2: []
    };

    // 分类填充数据
    res.forEach(item => {
      const value = parseFloat(item.wastecontent).toFixed(2);
      const dataItem = {
        name: item.wastename,
        value: value
      };

      switch(item.wastetype) {
        case '废水':
          wastesData.value.data0.push(dataItem);
          break;
        case '废气':
          wastesData.value.data1.push(dataItem);
          break;
        case '废渣':
          wastesData.value.data2.push(dataItem);
          break;
      }
    });

    // 初始化或更新图表
    initChart();
  } catch (error) {
    console.error('获取数据失败:', error);
  }
};
</script>

<style lang="less" scoped>
.recall {
  width: 60vw;
  height: 32vh;
  margin-top: 2vh;
  margin-left: -10vw;
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
  display: flex;
  align-items: center;
  justify-content: center;
}

.chart {
  margin-top: 0vh;
  height: 26.625vh;
  width: 59.625vw;
  background: url('@/assets/images/bgimg.png') no-repeat;
  background-size: 100% 100%;
}
</style>