
<template>
  <div>
    <h2 style="text-align: center; color: rgb(255, 255, 255);height:0.3rem;line-height: 0.5rem;"><span
      style="font-size: 1.3vw;">危险预警</span></h2>
  </div>
  <div class="table">
    <el-table :data="curTableData" :key="curTableKey" :header-cell-style="{
        background: 'rgba(11, 18, 52)',
        'text-align': 'center',
      }"
      :cell-style="{ background: 'rgba(11, 18, 52)', 'text-align': 'center' }">
      <el-table-column prop="date" label="日期" min-width="17%"></el-table-column>
      <el-table-column prop="location" label="地点" min-width="28%"></el-table-column>
      <el-table-column prop="description" label="事件描述" min-width="55%"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 数据源
      tableData: [
        { date: "01-01", location: "还原车间", description: "硅棒温度过高" },
        { date: "02-02", location: "氢化车间", description: "氢气进料量偏低" },
        { date: "03-03", location: "电气车间", description: "电流过高" },
        { date: "04-04", location: "净化车间", description: "净化过程不稳定" },
        { date: "05-05", location: "整理车间", description: "用料库存紧缺" },
      ],
      // 当前显示的数据源和数据键名
      curTableData: [],
      curTableKey: 0,
      // 定时器
      timer: null,
      // 轮播间隔
      interval: 2000,
    };
  },
  mounted() {
    // 初始化循环轮播数据列表
    this.initCarousel();
  },
  methods: {
    // 初始化循环轮播数据列表
    initCarousel() {
      // 初始展示前三条数据
      this.curTableData = this.tableData.slice(0, 3);

      // 每隔interval毫秒更新展示数据
      this.timer = setInterval(() => {
        this.curTableKey++; // 更新key，强制重新渲染el-table
        // 取模运算，计算下一个循环展示的数据起始位置
        let index = this.curTableKey % (this.tableData.length - 2);
        // 获取展示数据
        this.curTableData = this.tableData.slice(index, index + 3);
      }, this.interval);
    },
  },
  beforeDestroy() {
    // 清除定时器
    clearInterval(this.timer);
  },
};
</script>

<style scoped lang="less">
.table {
  width: 98%;
  margin-top: 0.2rem;
  margin-left: 0.05rem;
  :deep(.el-table__row td) {
    color: rgb(255, 255, 255);
  }
  :deep(.el-table__header th) {
    color: rgb(255, 255, 255);
  }
}
</style>
