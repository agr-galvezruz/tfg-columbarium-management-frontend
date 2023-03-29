<template>
  <section class="sidebar">
    <div class="full-logo">
      <span class="logo material-icons">stars</span>
      <div class="logo-name">
        <span>Gest</span>
        <span>columba</span>
      </div>
    </div>

    <nav>
      <template v-for="route, index in $router?.options?.routes" :key="index">
        <ul v-if="!route?.hidden && route.children?.length === 1">
          <simple-link-component
            :icon="route.meta.icon"
            :label="route.name"
            :parent-path="route.path"
            :children-path="route.children[0].path" />
        </ul>

        <group-link-component
          v-if="!route?.hidden && route.children?.length > 1"
          :group-label="route.name"
          :path="route.path"
          :children="route.children" />
      </template>
    </nav>
  </section>
</template>

<script>
import { defineComponent } from 'vue'
import SimpleLinkComponent from './simple-link/simple-link-component'
import GroupLinkComponent from './group-link/group-link-component'

export default defineComponent({
  components: {
    SimpleLinkComponent,
    GroupLinkComponent
  },
})
</script>
