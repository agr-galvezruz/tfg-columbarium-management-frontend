<template>
  <div class="full-container flex column no-wrap gap-10">
    <title-component :title="$t('pages.person.list_title')">
      <template v-slot:button>
        <custom-button :unelevated="false" icon="add_circle_outline" :label="$t('pages.person.add_person')" color="secondary" @click="openCreateEditPerson()" />
      </template>
    </title-component>

    <person-table-component />
  </div>
</template>

<script>
import PersonTableComponent from 'src/components/tables/person/person-table-component'
import TitleComponent from 'src/components/title/title-component'
import { defineComponent } from 'vue'
import bus from 'boot/bus'

export default defineComponent({
  components: {
    TitleComponent,
    PersonTableComponent
  },
  setup() {
    const openCreateEditPerson = () => {
      bus.$emit('openCreateEditPersonModal')
    }

    return {
      openCreateEditPerson
    }
  }
})
</script>