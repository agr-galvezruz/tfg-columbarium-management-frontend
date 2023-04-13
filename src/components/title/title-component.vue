<template>
  <div class="title-container">
    <div class="flex justify-between items-center">
      <div class="title-border">{{ title }}</div>
      <slot name="button"></slot>
    </div>
    <div v-if="subtitle" class="subtitle">{{ subtitle }}</div>
    <div v-if="subtitle2" class="subtitle">{{ subtitle2 }}</div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    title: {
      type: String,
      default: null
    },
    subtitle: {
      type: String,
      default: null
    },
    subtitle2: {
      type: String,
      default: null
    }
  }
})
</script>

<style lang="scss" scoped>
  .title-container {
    color: var(--main-text-color);
    transition: all 0.4s ease;
    .title-border {
      margin: 0;
      font-size: 26px;
      font-weight: 600;
    }
    .subtitle {
      font-size: 14px;
    }
  }
</style>