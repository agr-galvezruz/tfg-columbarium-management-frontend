<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  setup() {
    const showToolbar = () => {
      if (process.env.MODE === 'electron') return
      document.body.style.setProperty('--toolbar-height', '0px')
    }
    showToolbar()
  }
})
</script>
