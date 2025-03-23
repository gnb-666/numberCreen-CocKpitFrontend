<template>
  <div>
    <div class="leftBox">
      <div v-for="rule in inputdata.data" :key="rule.id" class="ps">
        <div class="psTitle">
          <div class="titleBe">违章操作</div>
          <div class="titleId">违章编号{{ rule.id }}</div>
          <div class="titleEdit" @click="edit(rule.id)"></div>
        </div>
        <div class="psBody">
          <div class="level" :style="{ 'color': textcolor(rule.level) }">违章等级:{{ rule.level }}</div>
          <div class="personName" :style="{ 'color': textcolor(rule.level) }">责任人:{{ rule.resPerson }}
          </div>
          <div class="content" :style="{ 'color': textcolor(rule.level) }">规章内容:{{ rule.content }}</div>
        </div>
      </div>
    </div>
    <!-- <div class="fourColor">
      
    </div> -->
    <div class="careerHealth">
      <el-table :data="tablexiaData" style="width: 100%;" height="40vh" :row-class-name="tableRowClassName"
        :header-cell-style="{ background: '#0b1a41', color: '#fff' }">
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="name" label="员工" />
        <el-table-column prop="id" label="工号" />
        <el-table-column prop="sex" label="性别" />
        <el-table-column prop="department" label="部门" />
        <el-table-column prop="type" label="岗位">
          <!-- <template #default="scope">
            <el-tag :type="scope.row.type === 'ZYJK009' ? 'success' : 'warning'" disable-transitions>{{ scope.row.type
              === 'ZYJK009' ? '电气运行' : '电气管理人员' }}</el-tag>
          </template> -->
        </el-table-column>
        <el-table-column prop="start_time" label="上岗时间" />
        <el-table-column prop="off_time" label="离岗时间" />
        <el-table-column prop="factor_history" label="危害因素接触史" width="200px">
          <template #default="scope">
            <el-tag v-for="item in scope.row.factor_history"
              :type="item == 0 ? 'danger' : (item == 1 ? 'warning' : 'info')" disable-transitions>{{ item == 0 ? '噪声'
                : (item == 1 ? '工频电场' : '粉尘') }}</el-tag>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="duration" label="持续时间" /> -->
        <!-- <el-table-column prop="level" label="优先级">
          
        </el-table-column>
        <el-table-column prop="status" label="状态" >
          <template #default="scope">
            <el-tag
              :type="scope.row.status === 'true' ? 'success' : 'warning'"
              disable-transitions
              >{{ scope.row.status === 'true' ? '已消除' : '待消除' }}</el-tag>
          </template>
        </el-table-column> -->
        <el-table-column label="操作" width="120">
          <template #default>
            <el-button link type="primary">修改</el-button>
            <el-button link type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <chart class="chart"></chart>
    </div>

    <el-dialog v-model="visible" width="600px" title="违章操作处理" center>

    </el-dialog>
  </div>
</template>
<script setup>
import { reactive, ref, computed, onMounted } from 'vue';
import chart from '@/components/SecurityDetection/personSecurity/chart.vue'
import axios from '@/axios'
let inputdata = reactive({ data: [] });
let tablexiaData = reactive([]);

onMounted(() => {
  getviolation_formList()
  getperson_informationList()
})
const rules = ref({
  data: [{
    id: 'UR202302230281',
    date: '2023-02-25',
    content: '1月05日10时49分 净化工段115日装置P01...',
    level: '一般违规',
    resPerson: '刘生源',
  },]
})
const visible = ref(false)

const textcolor = computed(() =>
  (value) => {
    if (value == '一般违规') {
      return '#fdfd00'
    } else if (value == '较大违规') {
      return '#febf00'
    } else if (value == '严重违规') {
      return '#d71e06'
    }

  }
)

const tableData = [
  {
    name: '张明杰',
    id: '227686',
    sex: '男',
    department: '电气工段',
    type: 'ZYJK009',
    start_time: '2018-09-23',
    off_time: '',
    factor_history: [0, 1, 2],
  }, 

]

const getviolation_formList = async () => {
  try {
    const res = await axios.get('/violation_form');
    res.forEach((datalist) => {
      const dataItem = {
        id: datalist.violate_code,
        date: datalist.datas,
        content: datalist.violate_content,
        level: datalist.violate_grade,
        resPerson: datalist.responsible_person,
      };
      inputdata.data.push(dataItem);
    });
  } catch (error) {
    console.error(error);
  }
};
const getperson_informationList = async () => {
  try {
    const res = await axios.get('/person_information');
    res.forEach((datalist) => {
      let factorCode = []; // 默认值为 0
      const factorMap = {
        "噪声": 0,
        "工频电场": 1,
        "粉尘": 2,
        // 可以根据需要添加更多映射
      };
      const factors = datalist.hazardous_factors.split('、'); // 假设使用 '、' 作为分隔符
      factors.forEach((factor) => {
        if (factor in factorMap) {
          factorCode.push(factorMap[factor]);
        }
      });
      const dateObject = new Date(datalist.start_time),
        start_time = dateObject.toISOString().split('T')[0]
      let left_time = ""; // 默认为空字符串
      if (datalist.left_time) {
        const date1Object = new Date(datalist.left_time);
        left_time = date1Object.toISOString().split('T')[0];
      }
      const dataItem = {
        name: datalist.name,
        id: datalist.id,
        sex: datalist.sex,
        department: datalist.department,
        type: datalist.post,
        start_time: start_time,
        off_time: left_time,
        factor_history: factorCode,
      };
      tablexiaData.push(dataItem);

    });
  } catch (error) {
    console.error(error);
  }
};

const tableRowClassName = ({
  row,
  rowIndex,
}) => {
  // console.log(row);
  if (row.level === '2') {
    return 'warning-row'
  } else {
    return 'success-row'
  }
}

const edit = (id) => {
  visible.value = true
}
</script>
<style lang="less" scoped>
.leftBox {
  width: 22vw;
  height: 90vh;
  overflow: auto;

  /* 添加滚动条 */
  // background-color: #fff;
  .ps {
    margin-left: 2vw;
    margin-top: 2vh;
    width: 20vw;
    height: 18vh;
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
      left: 2.25vw;
      color: #fff;

      .titleBe {
        width: 5vw;
        display: inline-block;
        margin-left: 1vw;
        // background-color: #fff;
      }

      .titleId {
        width: 11vw;
        font-size: 0.8vw;
        display: inline-block;
        // background-color: #fff;
      }

      .titleEdit {
        width: 1vw;
        height: 2vh;
        // padding-top:2vh;
        display: inline-block;
        // background-color:pink;
        background: url('@/assets/images/security/编辑.png');
        background-size: 100% 100%;
        cursor: pointer;
      }
    }

    .psBody {
      width: 20vw;
      height: 10vh;
      // background-color: #fff;
      // position: absolute;
      margin-top: 4vh;

      // top: 6vh;
      .level {
        width: 20vw;
        height: 3vh;
        color: #fff;
        font-size: 0.8vw;
        line-height: 3vh;
        padding-left: 1vw;
      }

      .personName {
        width: 20vw;
        height: 3vh;
        color: #fff;
        font-size: 0.8vw;
        line-height: 3vh;
        padding-left: 1vw;
      }

      .content {
        width: 20vw;
        height: 3vh;
        color: #fff;
        font-size: 0.8vw;
        line-height: 3vh;
        padding-left: 1vw;
      }
    }
  }
}

.fourColor {
  width: 50vw;
  height: 50vh;
  position: absolute;
  top: 2vh;
  left: 25vw;
  background: url('@/assets/images/security/四色图.png');
  background-size: 100% 100%;
  // background-color: #fff;

}

.careerHealth {
  width: 65vw;
  height: 78vh;
  position: absolute;
  top: 2vh;
  left: 25vw;

  .chart {
    // position:absolute;
    // left: 12vw;
    margin-top: 5vh;
    width: 65vw;
    height: 33vh;
    // background-color:#fff;
  }

  // background-color: #fff;
  /deep/ .el-table {
    // --el-table-tr-bg-color:transparent;
    // --el-table-header-bg-color:transparent !important; 
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
</style>
