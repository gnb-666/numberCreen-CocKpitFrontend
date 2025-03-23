<!-- 大背景 -->
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
  background: url("~@/assets/images/MItemPage.png") top center no-repeat;
  background-size: 100%;
  height: 6.3rem;
  width: 11.1rem;
  margin: 0.2rem;
}

</style>
