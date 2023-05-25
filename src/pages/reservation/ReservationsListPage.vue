<template>
  <div class="full-container flex column no-wrap gap-10">
    <title-component :title="$t('pages.reservation.list_title')">
      <template v-slot:button>
        <custom-button v-if="isAdminUser" :unelevated="false" icon="add_circle_outline" :label="$t('pages.reservation.add_reservation')" color="secondary" @click="openCreateEditReservation()" />
      </template>
    </title-component>

    <reservation-table-component />
  </div>
</template>

<script>
import ReservationTableComponent from 'src/components/tables/reservation/reservation-table-component'
import TitleComponent from 'src/components/title/title-component'
import { useAuthenticationStore } from 'stores/authentication'
import { defineComponent, reactive, toRefs } from 'vue'
import bus from 'boot/bus'

export default defineComponent({
  components: {
    TitleComponent,
    ReservationTableComponent
  },
  setup() {
    const authenticationStore = useAuthenticationStore()

    const state = reactive({
      isAdminUser: authenticationStore.isAdmin
    })

    const openCreateEditReservation = () => {
      bus.$emit('openCreateEditReservationModal')
    }

    return {
      ...toRefs(state),
      openCreateEditReservation
    }
  }
})
</script>