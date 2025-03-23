<template>
  <div>
    <div class="leftSide">
      <div class="aD" v-for="item in accidentData.data">
        <div class="aDtitle">
          <div class="titleBe">{{item.type}}</div>
          <div class="titleId">事故编号{{ item.id }}</div>
        </div>
        <div class="aDBody">
          <div class="name" :style="{ 'color':textcolor(item.level)}">事故名称:{{ item.name }}</div>
          <div class="time" :style="{ 'color':textcolor(item.level)}">事故发生时间:{{ item.time }}</div>
          <div class="people" :style="{ 'color':textcolor(item.level)}">伤亡人数:{{ item.people }}</div>
          <div class="name" :style="{ 'color':textcolor(item.level)}">经济损失:{{ item.cost }}</div>
          <div class="name" :style="{ 'color':textcolor(item.level)}">责任部门:{{ item.department }}</div>
          <div class="name" :style="{ 'color':textcolor(item.level)}">所在区域:{{ item.region }}</div>
          <div class="name" :style="{ 'color':textcolor(item.level)}">责任人:{{ item.resperson }}</div>
        </div>
      </div>
    </div>
    <div class="table">
      <div class="tableTitle">事故指标</div>
      <el-table
        :data="tableData"
        style="width: 100%;"
        height="30vh"
        :row-class-name="tableRowClassName"
        :header-cell-style="{background:'#0b1a41',color:'#fff'}"
      >
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="id" label="编码" />
        <el-table-column prop="region" label="管控级别" />
        <el-table-column prop="people" label="联系人员" />
        <el-table-column prop="phone" label="联系方式" />
        <el-table-column prop="type" label="预案类型">
          <template #default="scope">
            <el-tag
              :type="scope.row.type === '综合应急预案' ? 'success' : 'warning'"
              disable-transitions>{{ scope.row.type === '专项应急预案' ? '专项应急预案' : '综合应急预案'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="gov" label="政府应急部门" />
        <el-table-column prop="govPhone" label="政府应急电话" />
        <el-table-column label="操作" width="120">
          <template #default>
            <el-button link type="primary">修改</el-button>
            <el-button link type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <chart></chart>
    </div>
  </div>
</template>
<script setup>
import {reactive,ref,computed,onMounted} from 'vue';
import chart from '@/components/SecurityDetection/accidentManage/accidentChart.vue'
import axios from '@/axios'
const accidentData = ref({
  data:[
  //   {
  //   name:'111',
  //   id:'AM202302006',
  //   time:'2023-02-08 12:28.00',
  //   people:'1',
  //   cost:'50000',
  //   department:'公用工程工段',
  //   region:'XX03_10尾气',
  //   rsperson:'105691,周程',
  //   type:'生产事故',
  //   level:'严重违规'
  // },
]
})

const textcolor = computed(()=>
  (value)=>{
    if(value=='正常'){
      return '#fdfd00'
    }else if(value=='一般事故'){
      return '#febf00'
    }else if(value=='重大事故'){
      return '#d71e06'
    }
    
  }
)

const tableData = ref([
// {
//   name:'一般A级',
//   id:'A',
//   region:'公司',
//   people:'105691,周程',
//   phone:'13705218463',
//   gov:'准东开发区安监局',
//   govPhone:'0994-6733336'
// },
])
onMounted(() => {
  accident_indexList()
  accident_ledgerList()
})
const tableRowClassName = ({
  row,
  rowIndex,
}) => {
  // console.log(row);
  if (row.level === '2') {
    return 'warning-row'
  }else{
    return 'success-row'
  }
}
const accident_indexList = async () => {
  try {
    const res = await axios.get('/accident_index');
    res.forEach((datalist) => {
      const dataItem = {
        name:datalist.name3,
        id: datalist.encode3,
        region: datalist.control_level,
        people: datalist.contact_person,
        phone: datalist.contact_number,
        gov: datalist.government_emergency_departmen,
        govPhone: datalist.government_emergency_telephone,
      };
      tableData.value.push(dataItem);
    });
  } catch (error) {
    console.error(error);
  }
};
const accident_ledgerList = async () => {
  try {
    const res = await axios.get('/accident_ledger');
    res.forEach((datalist) => {
      const dateObject = new Date(datalist.occurrence_time),
      occurrence_time = dateObject.toISOString().split('T')[0]
      const dataItem = {
        name:datalist.name3,
        id: datalist.number,
        region: datalist.control_level,
        time: occurrence_time,
        people: datalist.casualty,
        cost: datalist.economic_losses,
        department: datalist.responsible_department,
        type:datalist.event_type,
        resperson:datalist.responsible_person
      };
      accidentData.value.data.push(dataItem);
    });
  } catch (error) {
    console.error(error);
  }
};
</script>
<style lang="less" scoped>
.leftSide{
  width: 20vw;
  height: 80vh;
  display: inline-block;
  // background-color: #fff;
  .aD{
    margin-left: 2vw;
    margin-top: 1vh;
    width: 20vw;
    height: 26vh;
    background: url('@/assets/images/bg_box3.png') no-repeat;
    background-size: 100% 100%;
    border-image-source: radial-gradient(68% 68%, transparent 0px, transparent 100%, cyan 100%);
    border-image-slice: 1;
    border-width: 3px;
    border-style: solid;
    border-image-outset: 0cm;
    .aDtitle{
      width: 19.5vw;
      height: 4vh;
      background-color: #0b1678;
      font-size: 1vw;
      line-height: 4vh;
      position: absolute;
      left: 2.25vw;
      color: #fff;
      .titleBe{
        width: 5vw;
        display:inline-block;
        margin-left: 1vw;
        font-size: 1vw;
        // background-color: #fff;
      }
      .titleId{
        width: 11vw;
        font-size: 14px;
        display: inline-block;
        font-size: 1vw;
        // background-color: #fff;
      }
    }
    .aDBody{
      width: 20vw;
      height: 20vh;
      margin-top: 4vh;
      .name{
        width: 20vw;
        height: 3vh;
        color: #fff;
        line-height: 3vh;
        padding-left: 1vw;
        font-size: 0.8vw;
      }
      .time{
        width: 20vw;
        height: 3vh;
        color: #fff;
        line-height: 3vh;
        padding-left: 1vw;
        font-size: 0.8vw;
      }
      .people{
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
.table{
  width: 66vw;
  height: 81vh;
  // background-color: #fff;
  display: inline-block;
  position: absolute;
  top: 0;
  left: 23vw;
  .tableTitle{
    height: 5vh;
    line-height: 5vh;
    text-align: center;
    color: #fff;
    font-size:1.3vw;
    font-weight:700;
    margin-left: 20px;
  }
  /deep/ .el-table  {
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
