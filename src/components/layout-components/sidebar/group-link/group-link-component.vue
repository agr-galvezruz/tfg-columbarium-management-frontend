<template>
  <ul>
    <div class="group-section">
      <span>{{ groupLabel }}</span>
    </div>

    <simple-link-component
      v-for="child, index in children"
      :key="index"
      :icon="child.meta.icon"
      :label="child.meta.label"
      :parent-path="path"
      :children-path="child.path" />
  </ul>
</template>

<script>
import { defineComponent } from 'vue'
import SimpleLinkComponent from '../simple-link/simple-link-component'

export default defineComponent({
  components: {
    SimpleLinkComponent
  },
  props: {
    groupLabel: {
      type: String,
      required: true
    },
    path: {
      type: String,
      require: true
    },
    children: {
      type: Array,
      required: true
    }
  }
})
</script>
