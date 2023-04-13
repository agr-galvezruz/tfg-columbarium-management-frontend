<template>
  <toolbar-component v-if="showToolbar" />
  <div class="main-layout">
    <sidebar-component />
    <content-layout-component />
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue'
import ToolbarComponent from 'src/components/toolbar/toolbar-component'
import SidebarComponent from 'src/components/layout-components/sidebar/sidebar-component'
import ContentLayoutComponent from 'src/components/layout-components/content-layout/content-layout-component'

export default defineComponent({
  components: {
    ToolbarComponent,
    SidebarComponent,
    ContentLayoutComponent
  },
  setup() {
    const showToolbar = computed(() => (process.env.MODE === 'electron'))

    return {
      showToolbar
    }
  }
})
</script>
