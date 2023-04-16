<template>
  <div class="full-container flex column no-wrap gap-10">
    <title-component :title="$t('pages.building.list_title')">
      <template v-slot:button>
        <custom-button :unelevated="false" icon="add_circle_outline" :label="$t('pages.building.add_building')" color="secondary" @click="openCreateEditBuilding()" />
      </template>
    </title-component>

    <building-table-component />
  </div>
</template>

<script>
import BuildingTableComponent from 'src/components/tables/building/building-table-component'
import TitleComponent from 'src/components/title/title-component'
import { defineComponent } from 'vue'
import bus from 'boot/bus'

export default defineComponent({
  components: {
    TitleComponent,
    BuildingTableComponent
  },
  setup() {
    const openCreateEditBuilding = () => {
      bus.$emit('openCreateEditBuildingModal')
    }

    return {
      openCreateEditBuilding
    }
  }
})
</script>