<template>
  <div class="full-container flex column no-wrap gap-10">
    <title-component :title="$t('pages.relocation.list_title')">
      <template v-slot:button>
        <custom-button :unelevated="false" icon="add_circle_outline" :label="$t('pages.relocation.add_relocation')" color="secondary" @click="openCreateEditRelocation()" />
      </template>
    </title-component>

    <relocation-table-component />
  </div>
</template>

<script>
import RelocationTableComponent from 'src/components/tables/relocation/relocation-table-component'
import TitleComponent from 'src/components/title/title-component'
import { defineComponent } from 'vue'
import bus from 'boot/bus'

export default defineComponent({
  components: {
    TitleComponent,
    RelocationTableComponent
  },
  setup() {
    const openCreateEditRelocation = () => {
      bus.$emit('openCreateEditRelocationModal')
    }

    return {
      openCreateEditRelocation
    }
  }
})
</script>