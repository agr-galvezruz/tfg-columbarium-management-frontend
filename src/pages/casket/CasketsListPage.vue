<template>
  <div class="full-container flex column no-wrap gap-10">
    <title-component :title="$t('pages.casket.list_title')">
      <template v-slot:button>
        <custom-button :unelevated="false" icon="add_circle_outline" :label="$t('pages.casket.add_casket')" color="secondary" @click="openCreateEditCasket()" />
      </template>
    </title-component>

    <casket-table-component />
  </div>
</template>

<script>
import CasketTableComponent from 'src/components/tables/casket/casket-table-component'
import TitleComponent from 'src/components/title/title-component'
import { defineComponent } from 'vue'
import bus from 'boot/bus'

export default defineComponent({
  components: {
    TitleComponent,
    CasketTableComponent
  },
  setup() {
    const openCreateEditCasket = () => {
      bus.$emit('openCreateEditCasketModal')
    }

    return {
      openCreateEditCasket
    }
  }
})
</script>