<template>
  <div>
    <section class="container">
      <section class="left">
        <Left>
          <Cpk />
        </Left>
        <Left>
          <PLan />
        </Left>
        <Left>
          <Storage />
        </Left>
      </section>
      <section class="right">
        <MItemPage>
          <!-- <Reduce/> -->
          <reduce1 />
        </MItemPage>
        <Left>
          <Quality />
        </Left>
      </section>
    </section>
  </div>
</template>

<script setup>
import Cpk from '@/components/Producing/Cpk.vue';
import PLan from '@/components/Producing/Plan.vue';
import Storage from '@/components/Producing/Storage.vue';
import Quality from '@/components/Producing/Quality.vue';
import Reduce from '@/components/Producing/Reduce.vue';
import reduce1 from '@/components/Producing/reduce1.vue';
import Left from '@/components/ProSlot/Left.vue';
import MItemPage from '@/components/ProSlot/MItemPage.vue';
import Reduce1 from '@/components/Producing/reduce1.vue';

// 在 setup 语法糖中，引入的组件会自动注册为当前组件的子组件
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
 .left {
    margin-left: 0.5rem;
    flex: 1;
  }
 .right {
    margin-right: 0.5rem;
    flex: 1;
  }
}
</style>