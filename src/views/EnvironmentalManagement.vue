<template>
  <div>
    <section class="container">
      <section class="left">
        <Invest></Invest>
        <Recall style="margin-top:3vh;"></Recall>
      </section>
      <section class="right">
        <E3D></E3D>
        <Gas></Gas>
      </section>
    </section>
  </div>
</template>

<script setup>
import Invest from '@/components/Environmental/Invest.vue';
import Recall from '@/components/Environmental/Recall.vue'
import E3D from '@/components/Environmental/Environmental3D.vue'
import Gas from '@/components/Environmental/Gas.vue'
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
    .left {
        margin-left: 0.5rem;
        flex: 3;
    }
    .right {
        margin-right: 0.5rem;
        flex: 2;
    }
}



</style>




