<template>
  <h2 style="text-align: center; color: rgb(255, 255, 255);height:0.3rem;line-height: 0.5rem;">
    <span style="font-size: 1.3vw;">异常检测</span>
  </h2>
  <div class="table">
    <el-table :data="tableData" border style="width: 98%;" :header-cell-style="{
      background: 'rgba(11, 18, 52)',
      'text-align': 'center',
    }" :cell-style="{ background: 'rgba(11, 18, 52)', 'text-align': 'center' }">
      <!-- <el-table-column prop="id" label="序号" width="80" /> -->
      <el-table-column prop="devicename" label="设备名" width="180" />
      <el-table-column prop="workshopname" label="车间" width="180" />
      <el-table-column prop="unusualphenomenon" label="异常现象" />
    </el-table>
  </div>
</template>

<script setup>
import axios from '@/axios';
import { ref, onMounted, watch } from 'vue';

// 定义响应式数据
const tableData = ref([]);

// 定义获取异常检测数据的函数
const getanomalydetectionLIst = async () => {
  try {
    const res = await axios.get('/anomalydetection');
    // 处理获取到的数据，假设接口返回的是一个数组，且每个元素包含所需的字段
    const processedData = res.map(item => ({
      devicename: item.devicename, // 根据实际接口返回的字段名调整
      workshopname: item.workshopname, // 根据实际接口返回的字段名调整
      unusualphenomenon: item.unusualphenomenon, // 根据实际接口返回的字段名调整
    }));
    tableData.value = processedData;
  } catch (error) {
    console.error('获取异常检测数据失败:', error);
  }
};

onMounted(() => {
  getanomalydetectionLIst();
});

// 如果有需要监听数据变化的逻辑，可以在这里添加 watch 监听
// watch(tableData, (newValue, oldValue) => {
//   // 处理数据变化的逻辑
// }, { deep: true });
</script>

<style lang="less" scoped>
.table {
  margin-left: 0.2rem;
  margin-top: 0.25rem;
  // 设置最大高度为 100px
  max-height: 100px; 
  overflow-y: auto;

  :deep(.el-table__row td) {
    color: rgb(255, 255, 255);
    font-size: 0.9vw; 
  }

  :deep(.el-table__header th) {
    color: rgb(255, 255, 255);
    font-size: 1.1vw; 
  }
}
</style>