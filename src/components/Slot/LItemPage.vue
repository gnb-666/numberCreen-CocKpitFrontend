<!-- 大组件 -->
<template>
  <div class="item">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.item {
  height: 5rem;
  margin: 0.2rem;
  background: url("~@/assets/images/ItemPage.png") top center no-repeat;
  background-size: 100%;
}
</style>
