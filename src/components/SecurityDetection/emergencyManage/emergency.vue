<template>
  <div>
    <div class="left">
      <!-- 给菜单容器添加一个 class 用于设置滚动条 -->
      <div class="menu-container">
        <el-menu default-active="1-1" @open="handleOpen" @close="handleClose">
          <el-sub-menu index="1">
            <template #title>
              <el-icon>
                <Folder />
              </el-icon>
              <span>事故预案分类</span>
            </template>
            <el-menu-item @click="handleSectionClick('整理工段')" index="1-1">
              <el-icon>
                <Document />
              </el-icon>整理工段
            </el-menu-item>
            <el-menu-item index="1-2" @click="handleSectionClick('还原工段')">
              <el-icon>
                <Document />
              </el-icon>还原工段
            </el-menu-item>
            <el-menu-item index="1-3" @click="handleSectionClick('净化工段')">
              <el-icon>
                <Document />
              </el-icon>净化工段
            </el-menu-item>
            <el-menu-item index="1-4" @click="handleSectionClick('氢化工段')">
              <el-icon>
                <Document />
              </el-icon>氢化工段
            </el-menu-item>
            <el-menu-item index="1-5" @click="handleSectionClick('渣浆高沸工段')">
              <el-icon>
                <Document />
              </el-icon>渣浆高沸工段
            </el-menu-item>
            <el-menu-item index="1-6" @click="handleSectionClick('公用工程工段')">
              <el-icon>
                <Document />
              </el-icon>公用工程工段
            </el-menu-item>
            <el-menu-item index="1-7" @click="handleSectionClick('检维修工段')">
              <el-icon>
                <Document />
              </el-icon>检维修工段
            </el-menu-item>
            <el-menu-item index="1-8" @click="handleSectionClick('电气工段')">
              <el-icon>
                <Document />
              </el-icon>电气工段
            </el-menu-item>
            <el-menu-item index="1-9" @click="handleSectionClick('质检中心')">
              <el-icon>
                <Document />
              </el-icon>质检中心
            </el-menu-item>
            <el-menu-item index="1-10" @click="handleSectionClick('综合管理部')">
              <el-icon>
                <Document />
              </el-icon>综合管理部
            </el-menu-item>
            <el-menu-item index="1-11" @click="handleSectionClick('物资部')">
              <el-icon>
                <Document />
              </el-icon>物资部
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </div>
    </div>
    <div class="table">
      <el-table :data="selectedSection" style="width: 100%;" height="80.5vh" :row-class-name="tableRowClassName"
        :header-cell-style="{ background: '#0b1a41', color: '#fff' }">
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="id" label="编码" />
        <el-table-column prop="region" label="使用区域" />
        <el-table-column prop="range" label="适用范围" />
        <el-table-column prop="type" label="预案分类">
          <template #default="scope">
            <el-tag :type="scope.row.type === '现场' ? 'success' : 'warning'" disable-transitions>
              {{ scope.row.type === '现场' ? '现场' : '综合预案' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="version" label="版本" />
        <el-table-column prop="status" label="流程状态" />
        <el-table-column label="操作" width="120">
          <template #default>
            <el-button link type="primary">修改</el-button>
            <el-button link type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="contact">
      <div class="ps" v-for="(person, index) in rules.data" :key="index">
        <div class="psTitle">
          <div class="titleBe">{{ person.name }}</div>
          <div class="titleId">联系方式：{{ person.phone }}</div>
          <div class="titleEdit"></div>
        </div>
        <div class="psBody">
          <div class="id" :style="{ 'color': textcolor(person.id) }">工号: {{ person.id }}</div>
          <div class="level" :style="{ 'color': textcolor(person.level) }">岗位: {{ person.level }}</div>
          <div class="region" :style="{ 'color': textcolor(person.region) }">部门: {{ person.region }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from '@/axios';

const rules = ref({
  data: []
});

const tableData = ref([]);
const selectedSection = ref([]);

// 定义 handleOpen 和 handleClose 方法
const handleOpen = (key, keyPath) => {
  console.log('菜单展开:', key, keyPath);
};

const handleClose = (key, keyPath) => {
  console.log('菜单关闭:', key, keyPath);
};

const handleSectionClick = (template) => {
  selectedSection.value = []; // 清空selectedSection数组
  console.log(template);
  tableData.value.forEach((x) => {
    if (template === x.workshop) {
      selectedSection.value.push(x);
    }
  });
};

const tableRowClassName = ({ row }) => {
  if (row.level === '2') {
    return 'warning-row';
  } else {
    return 'success-row';
  }
};

const textcolor = computed(() => (value) => {
  if (value === '一般违规') {
    return '#fdfd00';
  } else if (value === '较大违规') {
    return '#febf00';
  } else if (value === '严重违规') {
    return '#d71e06';
  }
  return '#fff'; // 默认颜色
});

const contingency_planList = async () => {
  try {
    const res = await axios.get('/contingency_plan');
    res.forEach((datalist) => {
      const dataItem = {
        workshop: datalist.workshop,
        name: datalist.name1,
        id: datalist.encode,
        region: datalist.use_area,
        range: datalist.area_of_application,
        type: datalist.preplan_classification,
        version: datalist.version,
        status: datalist.process_state,
      };
      tableData.value.push(dataItem);
    });
  } catch (error) {
    console.error(error);
  }
};

const emergency_teamList = async () => {
  try {
    const res = await axios.get('/emergency_team');
    res.forEach((datalist) => {
      const dataItem = {
        phone: datalist.contact_information,
        name: datalist.name2,
        id: datalist.job_number,
        region: datalist.department,
        level: datalist.post,
      };
      rules.value.data.push(dataItem);
    });
  } catch (error) {
    console.error(error);
  }
};

onMounted(async () => {
  await contingency_planList(); // 先加载预案数据
  await emergency_teamList(); // 再加载应急团队数据

  // 确保 tableData.value 有数据后再执行
  if (tableData.value.length > 0) {
    handleSectionClick(tableData.value[0].workshop);
  }
});
</script>

<style lang="less" scoped>
.left {
  display: inline-block;
  height: 80vh;
  width: 17vw;

  /deep/ .el-menu {
    height: 90vh;
    background-color: #0b1a41;
    --el-menu-text-color: #fff;
    --el-menu-hover-bg-color: #0070bf;
    --el-menu-active-color: #a0dbfb;
    border-right: 0px;
  }
}

.menu-container {
  height: 80vh;
  overflow-y: auto;
}

.table {
  display: inline-block;
  position: absolute;
  left: 18vw;
  height: 80vh;
  width: 52vw;

  /deep/ .el-table {
    --el-table-text-color: #fff !important;
    --el-table-border-color: transparent;
    --el-table-row-hover-bg-color: #c45656 !important;
    --el-table-border: 0px solid;
    background-color: transparent;
  }
}

/deep/ .el-table .warning-row {
  --el-table-tr-bg-color: #1c7484;
}

/deep/ .el-table .success-row {
  --el-table-tr-bg-color: #0b1a41;
}

.contact {
  display: inline-block;
  position: absolute;
  height: 80.5vh;
  width: 22vw;
  left: 70vw;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background: rgba(27, 140, 236, 0.5);
  }

  .ps {
    margin-left: 1vw;
    margin-top: 2vh;
    width: 20vw;
    height: 14vh;
    background: url('@/assets/images/bg_box3.png') no-repeat;
    background-size: 100% 100%;
    border-image-source: radial-gradient(68% 68%, transparent 0px, transparent 100%, cyan 100%);
    border-image-slice: 1;
    border-width: 3px;
    border-style: solid;
    border-image-outset: 0cm;

    .psTitle {
      width: 19.5vw;
      height: 4vh;
      background-color: #0b1678;
      font-size: 0.8vw;
      line-height: 4vh;
      position: absolute;
      left: 1.25vw;
      color: #fff;

      .titleBe {
        width: 5vw;
        display: inline-block;
        margin-left: 1vw;
      }

      .titleId {
        width: 11vw;
        font-size: 0.8vw;
        display: inline-block;
      }

      .titleEdit {
        width: 1vw;
        height: 2vh;
        display: inline-block;
        background: url('@/assets/images/security/编辑.png');
        background-size: 100% 100%;
        cursor: pointer;
      }
    }

    .psBody {
      width: 20vw;
      height: 10vh;
      margin-top: 4vh;

      .id {
        width: 20vw;
        height: 3vh;
        color: #fff;
        line-height: 3vh;
        padding-left: 1vw;
        font-size: 0.8vw;
      }

      .level {
        width: 20vw;
        height: 3vh;
        color: #fff;
        line-height: 3vh;
        padding-left: 1vw;
        font-size: 0.8vw;
      }

      .region {
        width: 20vw;
        height: 3vh;
        color: #fff;
        line-height: 3vh;
        padding-left: 1vw;
        font-size: 0.8vw;
      }
    }
  }
}
</style>