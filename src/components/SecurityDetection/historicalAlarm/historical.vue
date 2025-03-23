<template>
  <div class="box">
    <div class="boxHeader">
      <el-date-picker
        v-model="searchDate"
        type="datetimerange"
        :shortcuts="shortcuts"
        range-separator="To"
        start-placeholder="Start date"
        end-placeholder="End date"
      />
    </div>
    <div class="boxBody">
      <el-table
        :data="tableData"
        style="width: 100%;"
        height="73vh"
        :row-class-name="tableRowClassName"
        :header-cell-style="{ background: '#0b1a41', color: '#fff' }"
      >
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="name" label="名称" show-overflow-tooltip :min-width="120" />
        <el-table-column prop="describes" label="描述" show-overflow-tooltip :min-width="300" />
        <el-table-column prop="type" label="报警类型" show-overflow-tooltip :min-width="100" />
        <el-table-column prop="tim" label="开始时间" show-overflow-tooltip :min-width="170" />
        <el-table-column prop="level" label="优先级" show-overflow-tooltip :min-width="100">
          <template #default="scope">
            <el-tag :type="scope.row.level === '1' ? 'danger' : 'warning'" disable-transitions>
              优先级{{ scope.row.level }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template #default="scope">
            <el-tag :type="scope.row.status === '1' ? 'success' : 'warning'" disable-transitions>
              {{ scope.row.status === '1' ? '已消除' : '待消除' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120" show-overflow-tooltip>
          <template #default>
            <el-button link type="primary">修改</el-button>
            <el-button link type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  <SecurityCount class="SecurityCount" :tableData="tableData"></SecurityCount>
  <hisChart class="chart" :tableData="tableData"></hisChart>
</template>

<script setup>
import SecurityCount from '@/components/SecurityDetection/historicalAlarm/SecurityCount.vue';
import hisChart from '@/components/SecurityDetection/historicalAlarm/historicalChart.vue';
import { proxyAxios } from '@/axios/iotdb';
import { ref, onMounted } from 'vue';

// 定义 shortcuts
const shortcuts = [
  {
    text: '最近一周',
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      return [start, end];
    },
  },
  {
    text: '最近一个月',
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      return [start, end];
    },
  },
  {
    text: '最近三个月',
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
      return [start, end];
    },
  },
];

const searchDate = ref('');
const tableData = ref([]);

const tableRowClassName = ({ row }) => {
  if (row.level === '1') {
    return 'warning-row';
  } else {
    return 'success-row';
  }
};

// 获取所有值
const fetchAllRiskData = async () => {
  try {
    // 定义所有请求
    const requests = [
      proxyAxios.get('/historyQH?apiToken=a67c4de4543d45dd87a4e37b3de530e4'),
      proxyAxios.get('/historyJH?apiToken=2c3eebe7eb0446e1bc075ede43ea366e'),
      proxyAxios.get('/historyZJ?apiToken=389b6e1f9b9840299311fa31bf9d811f'),
      proxyAxios.get('/historyHY?apiToken=0e1c056dad19478899b8bbb39205e828'),
      proxyAxios.get('/historyGYGC?apiToken=6eddc3ad31c042329c5f21a27ac6bb24'),
    ];

    // 并行发起请求
    const responses = await Promise.all(requests);

    // 合并数据
    tableData.value = responses.flatMap(res => res.data.data);

    // 确保 tableData.value 是数组
    if (Array.isArray(tableData.value)) {
      // 遍历数据并格式化时间
      tableData.value.forEach(item => {
        // 检查 tim 字段是否存在且是有效的时间戳
        if (item.tim && !isNaN(item.tim)) {
          // 创建一个 Date 对象
          const date = new Date(Number(item.tim));

          // 提取年、月、日
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从 0 开始，需要加 1
          const day = String(date.getDate()).padStart(2, '0'); // 确保日期是两位数

          // 拼接成 YYYY-MM-DD 格式的字符串
          const formattedDate = `${year}-${month}-${day}`;

          // 更新 tim 字段
          item.tim = formattedDate;
        } else {
          console.warn('Invalid timestamp:', item.tim);
        }
      });
    } else {
      console.error('tableData.value is not an array:', tableData.value);
    }
  } catch (error) {
    console.error('Error fetching all risk data:', error);
  }
};

onMounted(() => {
  fetchAllRiskData();
});
</script>

<style lang="less" scoped>
.box {
  width: 90vw;
  height: 80vh;

  .boxHeader {
    width: 90vw;
    height: 5vh;
    margin-left: 3vw;
    padding-top: 2vh;
  }

  .boxBody {
    width: 60vw;
    height: 75vh;
    padding-top: 1vh;
    margin-left: 1vw;

    /deep/ .el-table {
      --el-table-text-color: #fff !important;
      --el-table-border-color: transparent;
      --el-table-row-hover-bg-color: #c45656 !important;
      --el-table-border: 0px solid background-color: transparent !important;
    }
  }
}

/deep/ .el-table .warning-row {
  --el-table-tr-bg-color: #1c7484;
}

/deep/ .el-table .success-row {
  --el-table-tr-bg-color: #0b1a41;
}

.SecurityCount {
  position: absolute;
  right: 0vw;
  top: 4vh;
}

.chart {
  position: absolute;
  right: 0vw;
  width: 26vw;
  height: 36vh;
  top: 42vh;
}
</style>