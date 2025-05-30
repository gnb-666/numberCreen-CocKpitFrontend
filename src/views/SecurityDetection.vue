<template>
  <div style="white-space: pre-line; z-index: 0">
    <section class="container">
      <div class="leftmeau">
        <div 
          v-for="(item, index) in menuItems" 
          :key="index"
          class="leftItem" 
          @click="switchTab(index)"
          :style="{backgroundColor: activeIndex === index ? '#0b1a41' : '#100b2b'}"
        >
          <img :src="item.icon" style="width: 4vh;height: 4vh;">
          <div class="text">{{ item.title }}</div>
        </div>
      </div>
      <div class="rightmeau">
        <component :is="activeComponent"></component>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import I3d from '@/components/SecurityDetection/3di.vue'
import RT from '@/components/SecurityDetection/securityLevel/realTime.vue'
import HT from '@/components/SecurityDetection/historicalAlarm/historical.vue'
import PS from '@/components/SecurityDetection/personSecurity/personSecurity.vue'
import CVD from '@/views/SecurityViews/CvdView.vue'
import EM from '@/components/SecurityDetection/emergencyManage/emergency.vue'
import AM from '@/components/SecurityDetection/accidentManage/accidentManage.vue'

// 菜单配置
const menuItems = [
  // { title: '厂区三维图', icon: require('@/assets/images/security/厂区图.png'), component: I3d },
  { title: '实时报警', icon: require('@/assets/images/security/检测.png'), component: RT },
  { title: '历史报警', icon: require('@/assets/images/security/历史报警.png'), component: HT },
  { title: '人员安全', icon: require('@/assets/images/security/人员安全.png'), component: PS },
  { title: '应急管理', icon: require('@/assets/images/security/应急管理.png'), component: EM },
  { title: '事故管理', icon: require('@/assets/images/security/事故管理.png'), component: AM },
  { title: '还原炉', icon: require('@/assets/images/security/炉.png'), component: CVD }
]

// 当前激活的菜单索引
const activeIndex = ref(0)

// 当前激活的组件
const activeComponent = computed(() => menuItems[activeIndex.value].component)

// 切换标签页
const switchTab = (index) => {
  activeIndex.value = index
}
</script>

<style lang="less" scoped>
.container {
  height: 10.7rem;
  margin: 0 auto;
  margin-bottom: 110px;
  padding: -0.13rem 0.13rem 0;
  display: flex;
  background: url("~@/assets/images/background_under.png") top center no-repeat;
  background-size: 100%;
  
  .leftmeau {
    position: absolute;
    width: 5vw;
    height: 84vh;
    left: 1.5vw;
    top: 10vh;
    
    .leftItem {
      height: 8vh;
      text-align: center;
      cursor: pointer;
      margin-bottom: 2vh;
      transition: background-color 0.3s ease;
      
      img {
        padding-top: 1vh;
        height: 4vh;
      }
      
      .text {
        padding-top: 1vh;
        height: 5vh;
        font-size: 1.5vh;
        color: #fff;
        text-align: center;
      }
      
      &:hover {
        background-color: #0b1a41 !important;
      }
    }
  }
  
  .rightmeau {
    position: absolute;
    width: 90vw;
    height: 82vh;
    left: 6.5vw;
  }
}
</style>