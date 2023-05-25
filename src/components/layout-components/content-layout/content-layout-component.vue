<template>
  <section class="content-layout">
    <header-component />
    <router-view-component />
  </section>
</template>

<script>
import { defineComponent } from 'vue'

import HeaderComponent from 'src/components/layout-components/content-layout/header/header-component'
import RouterViewComponent from 'src/components/layout-components/content-layout/router-view/router-view-component'

export default defineComponent({
  components: {
    HeaderComponent,
    RouterViewComponent
  }
})
</script>
