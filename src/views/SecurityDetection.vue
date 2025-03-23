<template>
  <div style="white-space: pre-line; z-index: 0">
    <section class="container">
      <div class="leftmeau">
        <div class="leftItem" @click="left_click(1)" id="1" :style="{backgroundColor:(detectAcitve==true?'#0b1a41':'#100b2b')}">
          <img src="@/assets/images/security/检测.png" style="width: 4vh;height: 4vh;">
          <div class="text">实时报警</div>
        </div>
        <div class="leftItem" @click="left_click(2)" id="2" :style="{backgroundColor:(alertAcitve==true?'#0b1a41':'#100b2b')}">
          <img src="@/assets/images/security/历史报警.png" style="width: 4vh;height: 4vh;">
          <div class="text">历史报警</div>
        </div>
        <div class="leftItem" @click="left_click(3)" id="3" :style="{backgroundColor:(personAcitve==true?'#0b1a41':'#100b2b')}">
          <img src="@/assets/images/security/人员安全.png" style="width: 4vh;height: 4vh;">
          <div class="text">人员安全</div>
        </div>
        <div class="leftItem" @click="left_click(4)" id="4" :style="{backgroundColor:(manageAcitve==true?'#0b1a41':'#100b2b')}">
          <img src="@/assets/images/security/应急管理.png" style="width: 4vh;height: 4vh;">
          <div class="text">应急管理</div>
        </div>
        <div class="leftItem" @click="left_click(5)" id="5" :style="{backgroundColor:(accidentAcitve==true?'#0b1a41':'#100b2b')}">
          <img src="@/assets/images/security/事故管理.png" style="width: 4vh;height: 4vh;">
          <div class="text">事故管理</div>
        </div>
        <div class="leftItem" @click="left_click(6)" id="6" :style="{backgroundColor:(cvdAcitve==true?'#0b1a41':'#100b2b')}">
          <img src="@/assets/images/security/炉.png" style="width: 4vh;height: 4vh;">
          <div class="text">还原炉</div>
        </div>
      </div>
      <div class="rightmeau">
        <RT v-if="detectAcitve"></RT>
        <HT v-if="alertAcitve"></HT>
        <PS v-if="personAcitve"></PS>
        <CVD v-if="cvdAcitve"></CVD>
        <EM v-if="manageAcitve"></EM>
        <AM v-if="accidentAcitve"></AM>
      </div>
    </section>
  </div>
</template>

<script setup>
import {reactive,ref} from 'vue';
import RT from '@/components/SecurityDetection/securityLevel/realTime.vue'
import HT from '@/components/SecurityDetection/historicalAlarm/historical.vue'
import PS from '@/components/SecurityDetection/personSecurity/personSecurity.vue'
import CVD from '@/views/SecurityViews/CvdView.vue'
import EM from '@/components/SecurityDetection/emergencyManage/emergency.vue'
import AM from '@/components/SecurityDetection/accidentManage/accidentManage.vue'

import { useRouter } from "vue-router";
const router = useRouter();

const detectAcitve = ref(true)
const alertAcitve = ref(false)
const personAcitve = ref(false)
const manageAcitve = ref(false)
const accidentAcitve = ref(false)
const cvdAcitve = ref(false)

const left_click = (index) => {
  const states = [detectAcitve, alertAcitve, personAcitve, manageAcitve, accidentAcitve, cvdAcitve];
  states.forEach((state, i) => {
    state.value = i === index - 1;
  });
};
</script>

<style lang="less" scoped>
.container {
  height:10.7rem;
  margin: 0 auto;
  margin-bottom: 110px;
  padding: -0.13rem 0.13rem 0;
  display: flex;
  background: url("~@/assets/images/background_under.png") top center no-repeat;
  background-size: 100%;
  .leftmeau{
    position: absolute;
    width: 5vw;
    height: 84vh;
    left: 1.5vw;
    top: 10vh;
    .leftItem{
      height: 8vh;
      text-align: center;
      cursor: pointer;
      margin-bottom: 2vh;
      img{
        padding-top: 1vh;
        height: 4vh;
      }
      .text{
        padding-top: 1vh;
        height: 5vh;
        font-size: 1.5vh;
        color: #fff;
        text-align: center;
      }
    }
  }
  .rightmeau{
    position: absolute;
    width: 90vw;
    height: 82vh;
    left: 6.5vw;
  }}
</style>