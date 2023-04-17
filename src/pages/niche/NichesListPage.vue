<template>
  <div class="full-container flex column no-wrap gap-10">
    <title-component :title="$t('pages.niche.list_title')">
      <template v-slot:button>
        <custom-button :unelevated="false" icon="add_circle_outline" :label="$t('pages.niche.add_niche')" color="secondary" @click="openCreateEditNiche()" />
      </template>
    </title-component>

    <niche-table-component />
  </div>
</template>

<script>
import NicheTableComponent from 'src/components/tables/niche/niche-table-component'
import TitleComponent from 'src/components/title/title-component'
import { defineComponent } from 'vue'
import bus from 'boot/bus'

export default defineComponent({
  components: {
    TitleComponent,
    NicheTableComponent
  },
  setup() {
    const openCreateEditNiche = () => {
      bus.$emit('openCreateEditNicheModal')
    }

    return {
      openCreateEditNiche
    }
  }
})
</script>