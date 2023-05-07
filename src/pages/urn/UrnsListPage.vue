<template>
  <div class="full-container flex column no-wrap gap-10">
    <title-component :title="$t('pages.urn.list_title')">
      <template v-slot:button>
        <custom-button v-if="isAdminUser" :unelevated="false" icon="add_circle_outline" :label="$t('pages.urn.add_urn')" color="secondary" @click="openCreateEditUrn()" />
      </template>
    </title-component>

    <urn-table-component />
  </div>
</template>

<script>
import UrnTableComponent from 'src/components/tables/urn/urn-table-component'
import TitleComponent from 'src/components/title/title-component'
import { useAuthenticationStore } from 'stores/authentication'
import { defineComponent, reactive, toRefs } from 'vue'
import bus from 'boot/bus'

export default defineComponent({
  components: {
    TitleComponent,
    UrnTableComponent
  },
  setup() {
    const authenticationStore = useAuthenticationStore()

    const state = reactive({
      isAdminUser: authenticationStore.isAdmin
    })

    const openCreateEditUrn = () => {
      bus.$emit('openCreateEditUrnModal')
    }

    return {
      ...toRefs(state),
      openCreateEditUrn
    }
  }
})
</script>