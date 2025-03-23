<!-- 长背景 -->
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
  background: url("~@/assets/images/cpk.jpg") top center no-repeat;
  background-size: 100%;
  height: 3.2rem;
  width: 11rem;
  margin: 0.2rem;
}
</style>
