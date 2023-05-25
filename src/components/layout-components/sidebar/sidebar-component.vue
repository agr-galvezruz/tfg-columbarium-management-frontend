<template>
  <section class="sidebar">
    <div class="full-logo" style="height:60px">
      <!-- <span class="logo material-icons">stars</span> -->
      <!-- <img src="~assets/logo/azul_no_background.png" width="40" /> -->
      <div class="logo-name">
        <span>Gest</span>
        <span>columba</span>
      </div>
    </div>

    <nav>
      <template v-for="route, index in $router?.options?.routes" :key="index">
        <template v-if="route?.permission === 'ADMIN' && isAdminUser">
          <ul v-if="!route?.hidden && route.children?.length === 1">
            <simple-link-component
              :icon="route.meta.icon"
              :label="route.meta.label"
              :parent-path="route.path"
              :children-path="route.children[0].path" />
          </ul>

          <group-link-component
            v-if="!route?.hidden && route.children?.length > 1"
            :group-label="route.meta.label"
            :path="route.path"
            :children="route.children" />
        </template>

        <template v-else-if="route?.permission !== 'ADMIN'">
          <ul v-if="!route?.hidden && route.children?.length === 1">
            <simple-link-component
              :icon="route.meta.icon"
              :label="route.meta.label"
              :parent-path="route.path"
              :children-path="route.children[0].path" />
          </ul>

          <group-link-component
            v-if="!route?.hidden && route.children?.length > 1"
            :group-label="route.meta.label"
            :path="route.path"
            :children="route.children" />
        </template>
      </template>
    </nav>
  </section>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue'
import SimpleLinkComponent from './simple-link/simple-link-component'
import GroupLinkComponent from './group-link/group-link-component'
import { useAuthenticationStore } from 'stores/authentication'

export default defineComponent({
  components: {
    SimpleLinkComponent,
    GroupLinkComponent
  },
  setup() {
    const authenticationStore = useAuthenticationStore()

    const state = reactive({
      isAdminUser: authenticationStore.isAdmin
    })

    return {
      ...toRefs(state)
    }
  }
})
</script>
