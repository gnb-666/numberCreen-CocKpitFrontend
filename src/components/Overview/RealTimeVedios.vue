<template>
  <div class="container">
    <div class="leftcontainer">
      <div class="nchoose">
        <div class="nchoosetitle">画面分割</div>
        <div class="nchoosebody">
          <div @click="splitVideo(1,1)">1</div>
          <div @click="splitVideo(2,2)">4</div>
          <div @click="splitVideo(1,5)">6</div>
          <div @click="splitVideo(3,3)">9</div>
          <div @click="splitVideo(4,4)">16</div>
        </div>
      </div>
      <div class="leftbody">
        <div class="leftbodytitle">相机列表</div>
        <el-input
          v-model="query"
          placeholder="Please enter keyword"
          @input="onQueryChanged"
        />
        <el-tree-v2 
        ref="treeRef"
        :data="data" 
        :props="props"
        show-checkbox 
        :filter-method="filterMethod"
        />
      </div>
    </div>
    <div class="rightcontainer">
      <div v-if="!Sixflag">
        <el-row v-for="(item,itemindex) in rows" :style="{height:rowsHeight}">
          <el-col v-for="(item,itemindex) in cols" :span="cols[0]" :style="{height:rowsHeight}">
            <div  :style="{height:rowsHeight}">
              <div class="rowsTitle" style="height: 2vh;">
                视频监控
              </div>
              <div class="myVideo" :style="{height:vedioHeight}"><VideoJs :videoSrc="data1.videoSrc" autoPlay /></div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div v-else>
        <el-row style="height:50vh">
          <el-col :span="16">
            <div class="rowsTitle" style="height:2vh">
              视频监控
            </div>
            <div class="myVideo" style="height:48vh"><VideoJs :videoSrc="data1.videoSrc" autoPlay /></div>
          </el-col>
          <el-col :span="8">
            <el-row style="height:25vh">
              <div class="rowsTitle" style="height:2vh">
                视频监控
              </div>
              <div class="myVideo" style="height:23vh"><VideoJs :videoSrc="data1.videoSrc" autoPlay /></div>
            </el-row>
            <el-row style="height:25vh">
              <div class="rowsTitle" style="height:2vh">
                视频监控
              </div>
              <div class="myVideo" style="height:23vh"><VideoJs :videoSrc="data1.videoSrc" autoPlay /></div>
            </el-row>
          </el-col>
        </el-row>
        <el-row style="height:25vh">
          <el-col :span="8">
            <div class="rowsTitle" style="height:2vh">
              视频监控
            </div>
            <div class="myVideo" style="height:22vh"><VideoJs :videoSrc="data1.videoSrc" autoPlay /></div>
          </el-col>
          <el-col :span="8">
            <div class="rowsTitle" style="height:2vh">
              视频监控
            </div>
            <div class="myVideo" style="height:22vh"><VideoJs :videoSrc="data1.videoSrc" autoPlay /></div>
          </el-col>
          <el-col :span="8">
            <div class="rowsTitle" style="height:2vh">
              视频监控
            </div>
            <div class="myVideo" style="height:22vh"><VideoJs :videoSrc="data1.videoSrc" autoPlay /></div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script setup>
import {reactive,ref,computed} from 'vue';
import VideoJs from "@/components/SecurityDetection/Video.vue";

const query = ref('')
const treeRef = ref()

const rows = ref([1])
const cols = ref([24])

const Sixflag = ref(false)

const data1 = reactive({
  videoSrc: "http://220.161.87.62:8800/hls/0/index.m3u8",
});

const data= ref([{
  id:1,
  label:'整理工段',
  children:[{
    id:2,
    label:'整理工段-1',
  },{
    id:3,
    label:'整理工段-2',
  }]
},{
  id:4,
  label:'还原工段',
  children:[{
    id:5,
    label:'还原工段-1',
  },{
    id:6,
    label:'还原工段-2',
  }]
},{
  id:7,
  label:'净化工段',
  children:[{
    id:8,
    label:'净化工段-1',
  },{
    id:9,
    label:'净化工段-2',
  }]
},{
  id:10,
  label:'氢化工段',
  children:[{
    id:11,
    label:'氢化工段-1',
  },{
    id:12,
    label:'氢化工段-2',
  }]
}
])

const props = {
  value:'id',
  label:'label',
  children:'children'
}

const onQueryChanged = (query) =>{
  treeRef.value.filter(query)
}

const filterMethod = (query,node) => {
  return node.label.includes(query)
}

const splitVideo = (row,col) => {
  if(row==1&&col==5){
    Sixflag.value = true
  }else{
    Sixflag.value = false
    rows.value = []
    for(let i=0;i<row;i++){
      rows.value.push(1)
    }
    cols.value = []
    for(let i=0;i<col;i++){
      cols.value.push(24/col)
    }
  }
  console.log(rows.value,cols.value);
}

const rowsHeight = computed(()=>{
  console.log(75/rows.value.length+'vh');
  return 75/rows.value.length +'vh'
})

const vedioHeight = computed(()=>{
  console.log(75/rows.value.length+'vh');
  return 75/rows.value.length - 3 +'vh'
})
</script>
<style lang="less" scoped>

.container{
  height: 75vh;
  width: 80vw;
  margin-left: 1vw;
  .leftcontainer{
    width: 20vw;
    .nchoose{
      height: 10vh;
      .nchoosetitle{
        // padding-left: 1vw;
        height: 3vh;
        line-height: 3vh;
        font-size: 0.218rem;
      }
      .nchoosebody{
        height: 3vw;
        line-height: 3vw;
        font-size: 0.4rem;
        div{
          display: inline-block;
          width: 3vw;
          height: 3vw;
          text-align: center;
          background-color: pink;
          margin-left: 0.5vw;
          color: #fff;
          cursor: pointer;
        }
      }
    }

    .leftbody{
      height: 65vh;
      .leftbodytitle{
        height: 3vh;
        line-height: 3vh;
        font-size: 0.218rem;
      }
    }
    

  }
  .rightcontainer{
    width: 60vw;
    .rowsTitle{
      width: 98%;
      font-size: 0.116rem;
    }
    .myVideo{
      width: 98%;
      // height: 90%;
    }
  }
}

</style>
