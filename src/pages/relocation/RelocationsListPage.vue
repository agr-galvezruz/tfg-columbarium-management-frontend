<template>
  <div class="full-container flex column no-wrap gap-10">
    <title-component :title="$t('pages.relocation.list_title')">
      <template v-slot:button>
        <custom-button v-if="isAdminUser" :unelevated="false" icon="add_circle_outline" :label="$t('pages.relocation.add_relocation')" color="secondary" @click="openCreateEditRelocation()" />
      </template>
    </title-component>

    <relocation-table-component />
  </div>
</template>

<script>
import RelocationTableComponent from 'src/components/tables/relocation/relocation-table-component'
import TitleComponent from 'src/components/title/title-component'
import { useAuthenticationStore } from 'stores/authentication'
import { defineComponent, reactive, toRefs } from 'vue'
import bus from 'boot/bus'

export default defineComponent({
  components: {
    TitleComponent,
    RelocationTableComponent
  },
  setup() {
    const authenticationStore = useAuthenticationStore()

    const state = reactive({
      isAdminUser: authenticationStore.isAdmin
    })

    const openCreateEditRelocation = () => {
      bus.$emit('openCreateEditRelocationModal')
    }

    return {
      ...toRefs(state),
      openCreateEditRelocation
    }
  }
})
</script>