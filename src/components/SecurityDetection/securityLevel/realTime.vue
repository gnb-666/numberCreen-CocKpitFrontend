<template>
  <div class="container1">
    <div class="top">
      <!-- 重大风险 -->
      <div class="top1">
        <div class="img">
          <img src="@/assets/images/security/Level1.png" style="width:100%;height: 100%;">
        </div>
        <div class="text">
          <div class="header" style="color: #ff0000;">重大风险</div>
          <div class="count" style="color: #ff0000;">
            {{ majorRiskCount0 }}
            <div class="unit">个</div>
          </div>
          <div class="section-count">
            本工段
            <div class="section-value" style="color: #ff0000;">{{ sectionRiskCount0 }}</div> 个
          </div>
        </div>
      </div>

      <!-- 较大风险 -->
      <div class="top1">
        <div class="img">
          <img src="@/assets/images/security/Level2.png" style="width:100%;height: 100%;">
        </div>
        <div class="text">
          <div class="header" style="color: #ffc000;">较大风险</div>
          <div class="count" style="color: #ffc000;">
            {{ majorRiskCount1 }}
            <div class="unit">个</div>
          </div>
          <div class="section-count">
            本工段
            <div class="section-value" style="color: #ffc000;">{{ sectionRiskCount1 }}</div> 个
          </div>
        </div>
      </div>

      <!-- 一般风险 -->
      <div class="top1">
        <div class="img">
          <img src="@/assets/images/security/Level3.png" style="width:100%;height: 100%;">
        </div>
        <div class="text">
          <div class="header" style="color: #ffff00;">一般风险</div>
          <div class="count" style="color: #ffff00;">
            {{ majorRiskCount2 }}
            <div class="unit">个</div>
          </div>
          <div class="section-count">
            本工段
            <div class="section-value" style="color: #ffff00;">{{ sectionRiskCount2 }}</div> 个
          </div>
        </div>
      </div>

      <!-- 低风险 -->
      <div class="top1">
        <div class="img">
          <img src="@/assets/images/security/Level4.png" style="width:100%;height: 100%;">
        </div>
        <div class="text">
          <div class="header" style="color: #0070c0;">低风险</div>
          <div class="count" style="color: #0070c0;">
            {{ majorRiskCount3 }}
            <div class="unit">个</div>
          </div>
          <div class="section-count">
            本工段
            <div class="section-value" style="color: #0070c0;">{{ sectionRiskCount3 }}</div> 个
          </div>
        </div>
      </div>
    </div>

    <div class="left">
      <hydriding></hydriding>
    </div>
    <div class="middle">
      <threeD class="threed"></threeD>
    </div>
    <div class="right">
      <right></right>
    </div>
  </div>
</template>

<script setup>
import hydriding from '@/components/SecurityDetection/securityLevel/hydriding.vue';
import threeD from '@/components/SecurityDetection/securityLevel/3d.vue';
import right from '@/components/SecurityDetection/securityLevel/rightChart.vue';
import { ref, computed, onMounted, watch } from 'vue';
import store from '@/store/index';
import { proxyAxios } from '@/axios/iotdb';

// 定义变量
const majorRiskCount0 = ref(0); // 重大风险数量
const majorRiskCount1 = ref(0); // 重大风险数量
const majorRiskCount2 = ref(0); // 重大风险数量
const majorRiskCount3 = ref(0); // 重大风险数量
const sectionRiskCount0 = ref(0); // 本工段重大风险数量
const sectionRiskCount1 = ref(0); // 本工段较大风险数量
const sectionRiskCount2 = ref(0); // 本工段一般风险数量
const sectionRiskCount3 = ref(0); // 本工段低风险数量
const infolist = ref([]);
const Allinfolist = ref([]);

// 模拟从接口获取数据
const fetchRiskData = async () => {
  let type = '';
  let params = '';
  switch (store.state.section) {
    case '氢化工段':
      type = 'historyQH';
      params = 'apiToken=a67c4de4543d45dd87a4e37b3de530e4';
      break;
    case '净化工段':
      type = 'historyJH';
      params = 'apiToken=2c3eebe7eb0446e1bc075ede43ea366e';
      break;
    case '渣浆高沸工段':
      type = 'historyZJ';
      params = 'apiToken=389b6e1f9b9840299311fa31bf9d811f';
      break;
    case '还原工段':
      type = 'historyHY';
      params = 'apiToken=0e1c056dad19478899b8bbb39205e828';
      break;
    case '公用工程工段':
      type = 'historyGYGC';
      params = 'apiToken=6eddc3ad31c042329c5f21a27ac6bb24';
      break;
  }

  try {
    // 发起请求
    const res = await proxyAxios.get(`/${type}?${params}`);
    infolist.value = res.data.data; // 假设返回的数据在 res.data 中
    // 重置计数
    sectionRiskCount0.value = 0;
    sectionRiskCount1.value = 0;
    sectionRiskCount2.value = 0;
    sectionRiskCount3.value = 0;

    // 确保 infolist.value 是数组
    if (Array.isArray(infolist.value)) {
      // 遍历数据并计数
      infolist.value.forEach(item => {
        const level = parseInt(item.level); // 将 "2.0" 转换为 2
        if (level === 1) {
          sectionRiskCount0.value++;
        } else if (level === 2) {
          sectionRiskCount1.value++;
        } else if (level === 3) {
          sectionRiskCount2.value++;
        } else if (level === 4) {
          sectionRiskCount3.value++;
        }
      });
    } else {
      console.error('infolist.value is not an array:', infolist.value);
    }
  } catch (error) {
    console.error('Error fetching info list:', error);
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
    // 重置计数
    majorRiskCount0.value = 0;
    majorRiskCount1.value = 0;
    majorRiskCount2.value = 0;
    majorRiskCount3.value = 0;
    // 并行发起请求
    const responses = await Promise.all(requests);

    // 合并数据
    Allinfolist.value = responses.flatMap(res => res.data.data);

    // 确保 Allinfolist.value 是数组
    if (Array.isArray(Allinfolist.value)) {
      // 遍历数据并计数
      Allinfolist.value.forEach(item => {
        const level = parseInt(item.level); // 将 "2.0" 转换为 2
        if (level === 1) {
          majorRiskCount0.value++;
        } else if (level === 2) {
          majorRiskCount1.value++;
        } else if (level === 3) {
          majorRiskCount2.value++;
        } else if (level === 4) {
          majorRiskCount3.value++;
        }
      });
    } else {
      console.error('Allinfolist.value is not an array:', Allinfolist.value);
    }
  } catch (error) {
    console.error('Error fetching all risk data:', error);
  }
};
// 监听工段变化
const section = computed(() => store.state.section);
watch(section, () => {
  fetchRiskData();
  fetchAllRiskData()
});

// 组件挂载时获取数据
onMounted(() => {
  fetchRiskData();
  fetchAllRiskData()
});
</script>

<style lang="less" scoped>
.container1 {
  height: 10.7rem;
  margin: 0 auto;
  margin-bottom: 110px;
  padding: -0.13rem 0.13rem 0;

  .top {
    width: 90vw;
    height: 15vh;
    margin-top: 2vh;
    margin-left: 2.5vw;

    .top1 {
      width: 18vw;
      height: 15vh;
      background: url('@/assets/images/security/hydriding/titleBack.png');
      background-size: 100% 100%;
      border-image-source: radial-gradient(68% 68%, transparent 0px, transparent 100%, cyan 100%);
      border-image-slice: 1;
      border-width: 3px;
      border-style: solid;
      border-image-outset: 0cm;
      display: inline-block;
      margin-left: 3vw;

      .img {
        width: 6vw;
        height: 10vh;
        margin-top: 2vh;
        margin-left: 1vw;
        display: inline-block;
        vertical-align: middle;
      }

      .text {
        width: 9vw;
        height: 10vh;
        // margin-top: 1vh;
        display: inline-block;
        color: #fff;
        vertical-align: middle;

        .header {
          height: 4vh;
          padding-top: 1vh;
          padding-left: 2vw;
          font-size: 1.3vw;
          font-weight: 700;
        }

        .count {
          font-size: 1.3vw;
          margin-left: 2vw;
          padding-top: 5px;
          display: inline-block;
          font-weight: 700;
        }

        .unit {
          font-size: 1.3vw;
          margin-left: 0vw;
          padding-top: 0px;
          display: inline-block;
          color: #fff;
        }

        .section-count {
          font-size: 1.3vw;
          margin-left: 2vw;
          // padding-top: 5px;
          display: inline-block;
        }

        .section-value {
          font-size: 1.3vw;
          margin-left: 0vw;
          padding-top: 0px;
          display: inline-block;
          font-weight: 700;
        }
      }
    }
  }

  .left {
    margin-top: 1vh;
    width: 25vw;
    height: 65vh;
    position: absolute;
    left: 1vw;
  }

  .middle {
    margin-top: 7vh;
    width: 35vw;
    height: 65vh;
    position: absolute;
    left: 29vw;
  }

  .right {
    margin-top: 1vh;
    width: 22vw;
    height: 65vh;
    position: absolute;
    left: 65vw;
  }
}
</style>