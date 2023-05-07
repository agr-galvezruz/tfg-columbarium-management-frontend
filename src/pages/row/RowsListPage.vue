<template>
  <div class="full-container flex column no-wrap gap-10">
    <title-component :title="$t('pages.row.list_title')">
      <template v-slot:button>
        <custom-button v-if="isAdminUser" :unelevated="false" icon="add_circle_outline" :label="$t('pages.row.add_row')" color="secondary" @click="openCreateEditRow()" />
      </template>
    </title-component>

    <row-table-component />
  </div>
</template>

<script>
import RowTableComponent from 'src/components/tables/row/row-table-component'
import TitleComponent from 'src/components/title/title-component'
import { useAuthenticationStore } from 'stores/authentication'
import { defineComponent, reactive, toRefs } from 'vue'
import bus from 'boot/bus'

export default defineComponent({
  components: {
    TitleComponent,
    RowTableComponent
  },
  setup() {
    const authenticationStore = useAuthenticationStore()

    const state = reactive({
      isAdminUser: authenticationStore.isAdmin
    })

    const openCreateEditRow = () => {
      bus.$emit('openCreateEditRowModal')
    }

    return {
      ...toRefs(state),
      openCreateEditRow
    }
  }
})
</script>