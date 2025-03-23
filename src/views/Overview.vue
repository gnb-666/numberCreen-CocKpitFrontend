<template>
  <div class="container">
      <section class="left">
        <ItemPage>
          <Trend />
        </ItemPage>
        <ItemPage>
          <Plan />
        </ItemPage>
        <ItemPage>
          <Scroll />
        </ItemPage>
      </section>
      <section class="mid">
        <MItemPage>
          <FactoryOverview />
        </MItemPage>
        <Bottom>
          <Monitor/>
        </Bottom>
      </section>
      <section class="right">
        <ItemPage>
          <Quality />
        </ItemPage>
        <!-- <ItemPage style="height: 50vh;"> -->
          <SiTrend />
        <!-- </ItemPage> -->
        <!-- <ItemPage>
          <ClTrend />
        </ItemPage> -->
      </section>

  </div>
</template>

<script setup>
import ItemPage from "@/components/ProSlot/ItemPage.vue";
import Bottom from "@/components/ProSlot/Bottom.vue";
import MItemPage from "@/components/ProSlot/MItemPage.vue";
import Trend from "@/components/Overview/Trend.vue";
import Plan from "@/components/Overview/Plan.vue";
// import Usage from "@/components/Overview/Usage.vue";
import Scroll from "@/components/Overview/Scroll.vue";
import Quality from "@/components/Overview/Quality.vue";
import SiTrend from "@/components/Overview/SiTrend.vue";
// import ClTrend from "@/components/Overview/ClTrend.vue";
import FactoryOverview from "@/components/Overview/FactoryOverview.vue";
import Monitor from "@/components/Overview/Monitor.vue";
</script>

<style lang="less" scoped>
.container {
  min-width: 15rem; 
  max-width: 25.6rem;
  margin: 0 auto;
  padding: -0.13rem 0.13rem 0;
  display: flex;
  background: url("~@/assets/images/background_under.png") top center no-repeat;
  background-size: 100%;
  
}
.container .left {
  margin-left: 0.5rem;
  flex: 2;
}
.container .mid {
  flex: 4;
}
.container .right {
  margin-right: 0.5rem;
  flex: 2;
}


</style>