<template>
  <div class="content-container">
    <slot></slot>
  </div>
</template>


<style lang="scss" scoped>
  .content-container {
    border-radius: 12px;
    background-color: var(--background-color);
    padding: 15px;
    box-shadow: var(--main-shadow);
  }
</style>
