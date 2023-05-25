<template>
  <div class="full-container flex flex-center column gap-20">
    <!-- <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    > -->
    <img src="~assets/logo/azul.png" width="180" style="border-radius: 10px" />
    <div>
      <div class="intro-text">Parroquia de San Nicolás</div>
      <div class="intro-text">de la Villa</div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage'
})
</script>

<style lang="scss" scoped>
  .intro-text {
    font-size: 36px;
    font-weight: 600;
    color: var(--main-text-color);
    text-align: center;
  }
</style>
