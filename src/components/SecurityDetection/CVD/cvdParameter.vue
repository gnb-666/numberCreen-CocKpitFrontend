<template>
  <div>
    <div><img src="@/assets/images/security/cvd/三角.png" style="width:1.2vw;height: 1.2vw;"><div class="text">{{$store.state.cvdName}}炉参数</div></div>
    <div class="Parameter">
      <div class="Par_1">
        <div class="P_time">
        <img src="@/assets/images/security/cvd/时间周期.png" >
        <div class="P_text">30h</div>
      </div>
      <div class="P_T">
        <img src="@/assets/images/security/cvd/温度.png" >
        <div class="P_text">1065℃</div>
      </div>
      </div>
      <div class="Par_2">
        <div class="P_W">
          <img src="@/assets/images/security/cvd/电功率.png" >
          <div class="P_text">4609KW</div>
        </div>
        <div class="P_portion">
          <img src="@/assets/images/security/cvd/icon-配比.png" >
          <div class="P_text">2.46</div>
        </div>
      </div>
    </div>
    <div class="gaugeChart">
      <Tcs class="Tcs"></Tcs>
      <H2 class="H2"></H2>
    </div>
  </div>
</template>
<script setup>
import Tcs from '@/components/SecurityDetection/CVD/TcsGuage.vue'
import H2 from '@/components/SecurityDetection/CVD/H2Guage.vue'
</script>
<style lang="less" scoped>
.text{
    height: 2.1vw;
    font-size: 1.3vw;
    vertical-align: middle;
    color: #fff;
    font-weight: 600;
    display: inline-block;
    margin-left: 1vw;
  }
.Parameter{
  height: 15vh;
  // background-color: pink;
  
  .Par_1{
    height: 6vh;
    .P_text {
      width: 6vw;
      display: inline-block;
      font-size: 1.3vw;
      font-weight: 600;
      color: #fff;
      height: 6vh;
      line-height: 6vh;
      position: absolute;
      top: 4vh;
      margin-left: 1vw;
    }
    .P_time{
    display: inline-block;
    width: 10vw;
    height: 6vh;
    margin-left: 2vw;
    img{
      display: inline-block;
      width: 3vw;
      height: 6vh;
      
    }
  }
    .P_T{
      display: inline-block;
      width: 10vw;
      height: 6vh;
      margin-left: 2vw;
      img{
        display: inline-block;
        width: 3vw;
        height: 6vh;
        
      }
      
    }
  }
  .Par_2{
    margin-top: 1vh;
    height: 6vh;
    // background-color: #fff;
    .P_text {
      width: 6vw;
      display: inline-block;
      font-size: 1.3vw;
      font-weight: 600;
      color: #fff;
      height: 6vh;
      line-height: 6vh;
      position: absolute;
      top: 11vh;
      margin-left: 1vw;
    }
    .P_W{
      display: inline-block;
      width: 10vw;
      height: 6vh;
      margin-left: 2vw;
        img{
          display: inline-block;
          width: 3vw;
          height: 6vh;
        }
    }
    .P_portion{
      display: inline-block;
      width: 10vw;
      height: 6vh;
      margin-left: 2vw;
        img{
          display: inline-block;
          width: 3vw;
          height: 6vh;
        }
    }
  }
}
.Tcs{
  display: inline-block;
  width: 12.5vw;
  height: 20vh;
  
  border-image-source: radial-gradient(68% 68%, transparent 0px, transparent 100%, cyan 100%);
  border-image-slice: 1;
  border-width: 3px;
  border-style: solid;
  border-image-outset: 0cm;
  background: url(../../../assets/images/bg_box3.png) no-repeat ;
  background-size: 100% 100%;
}
.H2{
  display: inline-block;
  width: 12.5vw;
  height: 20vh;
  // background-color: #fff;
  margin-left: 1vw;
  border-image-source: radial-gradient(68% 68%, transparent 0px, transparent 100%, cyan 100%);
  border-image-slice: 1;
  border-width: 3px;
  border-style: solid;
  border-image-outset: 0cm;
  background: url(../../../assets/images/bg_box3.png) no-repeat ;
  background-size: 100% 100%;
}
</style>
