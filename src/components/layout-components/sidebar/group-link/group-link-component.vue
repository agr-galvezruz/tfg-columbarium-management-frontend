<template>
  <ul>
    <div class="group-section">
      <span>{{ $t(groupLabel) }}</span>
    </div>

    <template v-for="child, index in children" :key="index">
      <simple-link-component
        v-if="!child.hidden"
        :icon="child.meta.icon"
        :label="child.meta.label"
        :parent-path="path"
        :children-path="child.path" />
    </template>
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
