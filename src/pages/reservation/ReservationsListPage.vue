<template>
  <div class="full-container flex column no-wrap gap-10">
    <title-component :title="$t('pages.reservation.list_title')">
      <template v-slot:button>
        <custom-button :unelevated="false" icon="add_circle_outline" :label="$t('pages.reservation.add_reservation')" color="secondary" @click="openCreateEditReservation()" />
      </template>
    </title-component>

    <reservation-table-component />
  </div>
</template>

<script>
import ReservationTableComponent from 'src/components/tables/reservation/reservation-table-component'
import TitleComponent from 'src/components/title/title-component'
import { defineComponent } from 'vue'
import bus from 'boot/bus'

export default defineComponent({
  components: {
    TitleComponent,
    ReservationTableComponent
  },
  setup() {
    const openCreateEditReservation = () => {
      bus.$emit('openCreateEditReservationModal')
    }

    return {
      openCreateEditReservation
    }
  }
})
</script>