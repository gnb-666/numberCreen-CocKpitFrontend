<template>
  <div class="container">
    <section class="containerTop">
      <section class="left">
        <ItemPage>
          <Structure />
        </ItemPage>
        <ItemPage>
          <Distributed />
        </ItemPage>
      </section>
      <section class="mid">
        <MItemPage>
          <Multipul />
        </MItemPage>
      </section>
      <section class="right">
        <ItemPage>
          <Cost />
        </ItemPage>
        <ItemPage>
          <Upgrade />
        </ItemPage>
      </section>
    </section>

    <section class="containerBottom">
      <section class="left">
        <Bottom>
          <Healthy />
        </Bottom>
      </section>
      <section class="right">
        <Bottom>
          <Error />
        </Bottom>
      </section>
    </section>
  </div>
</template>

<script setup>
import Structure from "@/components/Equipment/Structure.vue";
import Distributed from "@/components/Equipment/Distributed.vue";
import Healthy from "@/components/Equipment/Healthy.vue";
import Multipul from "@/components/Equipment/Multipul.vue";
import Cost from "@/components/Equipment/Cost.vue";
import Upgrade from "@/components/Equipment/Upgrade.vue";
import Error from "@/components/Equipment/Error.vue";
import Left from "@/components/ProSlot/Left.vue";
import ItemPage from "@/components/ProSlot/ItemPage.vue";
import MItemPage from "@/components/ProSlot/MItemPage.vue";
import Bottom from "@/components/ProSlot/Bottom.vue";
</script>

<style lang="less" scoped>
.container {
  background: url("~@/assets/images/background_under.png") top center no-repeat;
  background-size: 100%;
}
.containerTop {
  min-width: 15rem;
  max-width: 25.6rem;
  margin: 0 auto;
  padding: -0.13rem 0.13rem 0;
  display: flex;
  margin-bottom: -0.3rem;
}
.containerTop .left {
  margin-left: 0.5rem;
  flex: 2;
}
.containerTop .mid {
  flex: 4;
}
.containerTop .right {
  margin-right: 0.5rem;
  flex: 2;
}

.containerBottom {
  height: 4rem;
  margin: 0 auto;
  display: flex;
  margin-top: 0.2rem;
}
.containerBottom .left {
  margin-left: 0.5rem;
  flex: 2;
}
.containerBottom .right {
  margin-right: 0.5rem;
  flex: 2;
}
</style>    