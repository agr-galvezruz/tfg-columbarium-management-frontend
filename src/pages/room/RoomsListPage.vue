<template>
  <div class="full-container flex column no-wrap gap-10">
    <title-component :title="$t('pages.room.list_title')">
      <template v-slot:button>
        <custom-button :unelevated="false" icon="add_circle_outline" :label="$t('pages.room.add_room')" color="secondary" @click="openCreateEditRoom()" />
      </template>
    </title-component>

    <room-table-component />
  </div>
</template>

<script>
import RoomTableComponent from 'src/components/tables/room/room-table-component'
import TitleComponent from 'src/components/title/title-component'
import { defineComponent } from 'vue'
import bus from 'boot/bus'

export default defineComponent({
  components: {
    TitleComponent,
    RoomTableComponent
  },
  setup() {
    const openCreateEditRoom = () => {
      bus.$emit('openCreateEditRoomModal')
    }

    return {
      openCreateEditRoom
    }
  }
})
</script>