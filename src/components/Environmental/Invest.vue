<template>
  <div class="invest">
    <div class="title" style="text-align: center;" ><span style="font-size: 1.3vw;">环保管理检测报告</span></div>
    <div class="table">
      <el-table :data="investTable" stripe :header-cell-style="{ 'text-align': 'center' }" height="300px">
        <el-table-column prop="title" label="标题" align="center" />
        <el-table-column prop="status" label="状态" align="center" />
        <el-table-column prop="remark" label="备注" align="center" />
        <el-table-column prop="annex" label="附件" align="center">
          <!-- <template #default="scope">
            <a href="./pdf/1.pdf" :download="scope.row.annex">{{scope.row.annex}}</a>
          </template> -->
          <template #default="scope">
            <a :href="scope.row.annex.url" :download="scope.row.annex.fileName">{{ scope.row.annex.name }}</a>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { onMounted, onUnmounted } from "vue";
import axios from '@/axios'
const investTable = ref([{
  name: '2021年第三季度环境现状监测报告',
  status: 'end',
  comment: 'XXX',
  annex: '2021年第三季度一期项目环境现状监测报告.pdf'
}, ])
// 获取环保管理检测报告数据
const getWorkshopsList = async () => {
  try {
    const res = await axios.get('/environmentreport');  
    // 解析 annex 字段为 JSON 格式，更新 investTable 数据
    investTable.value = res.map(item => {
      const annexData = JSON.parse(item.annex);
      return {
        title: item.title,
        status: item.status,
        remark: item.remark,
        annex: {
          url: annexData[0].url,
          fileName: annexData[0].fileName,
          name: annexData[0].name
        }
      };
    });
  } catch (error) {
    console.error(error);
  }
};
onMounted(() => {
  getWorkshopsList();
});
</script>

<style lang="less" scoped>
a:link //单击前

  {
  color: #fff;
  text-decoration: none;
}

a:visited //访问过后

  {
  color: #94dbdf;
  text-decoration: none;
}

a:hover //悬停

  {
  color: #c45656;
  text-decoration: none;
}

.invest {
  width: 45vw;
  height: 41vh;
  margin-left: 1vw;
  margin-top: 1vh;
  border: 0.15vw solid rgb(5, 38, 85);
  overflow: hidden; /* 隐藏超出部分 */
}

.title {
  width: 44.7vw;
  height: 4vh;
  background: url('@/assets/images/bgtitle.png') no-repeat;
  background-size: 100% 100%;
  color: #fff;
  // font-size: 18px;
  font-weight: 700;
}

.table {
  padding-top: 1vh;
  background: url('@/assets/images/bgimg.png') no-repeat;
  background-size: 100% 100%;
  overflow-y: auto; /* 启用垂直滚动条 */

  /deep/ .el-table {
    margin: 0 auto;
    --el-table-border-color: transparent;
    --el-table-border: 0px solid;
    --el-table-text-color: #fff;
    --el-table-header-bg-color: rgb(7, 13, 41);
    --el-table-bg-color: transparent;
    --el-table-tr-bg-color: transparent;
  }

  /deep/ .el-table tbody tr:hover>td {
    background-color: transparent;
  }

  /deep/ .el-table--striped .el-table__body tr.el-table__row--striped td {
    background: rgb(7, 13, 41);
  }
}
</style>