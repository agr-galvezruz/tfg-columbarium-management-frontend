<template>
  <div class="full-container flex column no-wrap gap-20">
    <title-component :title="$t('pages.reservation.details_title')" showBackButton />

    <item-details-component v-if="reservationData" :title="$t('pages.reservation.entity')" :item-data="reservationDetails">
      <div class="flex no-wrap gap-5">
        <custom-button padding="none" round color="primary" flat no-caps icon="drive_file_rename_outline" @click="openCreateEditReservation()" />
        <custom-button padding="none" round color="negative" flat no-caps icon="delete" @click="openDeleteReservation()" />
      </div>
    </item-details-component>

    <content-container-component class="flex column no-wrap gap-10" v-if="reservationData">
      <div class="flex no-wrap justify-between items-center">
        <div class="content-title">{{ $t('pages.reservation.reservation_urn') }}</div>
      </div>
      <urn-table-component :urn-id="reservationData.urnId" />
    </content-container-component>

    <content-container-component class="flex column no-wrap gap-10" v-if="reservationData">
      <div class="flex no-wrap justify-between items-center">
        <div class="content-title">{{ $t('pages.reservation.person') }}</div>
      </div>
      <person-table-component :person-id="reservationData.personId" />
    </content-container-component>

    <content-container-component class="flex column no-wrap gap-10" v-if="reservationData">
      <div class="flex no-wrap justify-between items-center">
        <div class="content-title">{{ $t('pages.reservation.deposit') }}</div>
        <custom-button v-if="!reservationData.deposit" :unelevated="false" icon="add_circle_outline" :label="$t('pages.deposit.add_deposit')" color="secondary" @click="openCreateEditDepositInReservation()" />
      </div>
      <deposit-table-component :reservation-id="reservationData.id" />
    </content-container-component>
  </div>
</template>

<script>
import ContentContainerComponent from 'src/components/content-container/content-container-component'
import ItemDetailsComponent from 'src/components/item-details/item-details-component'
import UrnTableComponent from 'src/components/tables/urn/urn-table-component'
import PersonTableComponent from 'src/components/tables/person/person-table-component'
import DepositTableComponent from 'src/components/tables/deposit/deposit-table-component'
import { computed, defineComponent, onBeforeUnmount, onMounted, reactive, toRefs } from 'vue'
import { hideLoading, showLoading } from 'src/utils/quasarComponents'
import TitleComponent from 'src/components/title/title-component'
import { useReservationStore } from 'stores/reservation'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import bus from 'boot/bus'
import { formatDbToEsDate } from 'src/helpers/formatDate'

export default defineComponent({
  components: {
    TitleComponent,
    UrnTableComponent,
    ItemDetailsComponent,
    PersonTableComponent,
    DepositTableComponent,
    ContentContainerComponent
  },
  setup() {
    onMounted(() => {
      bus.$on('refreshReservationData', () => {
        fetchData()
      })
      bus.$on('refreshReservationDataDeleted', () => {
        router.push({ path: `/management/reservations` })
      })
      fetchData()
    })

    onBeforeUnmount(() => {
      bus.$off('refreshReservationData')
      bus.$off('refreshReservationDataDeleted')
    })

    const route = useRoute()
    const router = useRouter()
    const { t } = useI18n({})
    const reservationStore = useReservationStore()

    const state = reactive({
      loading: false,
      reservationId: computed(() => route.params.reservationId || null),
      reservationData: null,
      reservationDetails: []
    })

    const fetchData = async() => {
      try {
        state.loading = showLoading()
        await fetchReservationData()
        state.loading = hideLoading()
      } catch (error) {
        state.loading = hideLoading()
      }
    }

    const fetchReservationData = async () => {
      try {
        const data = await reservationStore.getReservation(`${state.reservationId}?includePerson=true&includeUrn=true&includeDeposit=true`)
        state.reservationData = data?.data
        state.reservationData.urnId = state.reservationData.urnId?.toString()
        state.reservationData.personId = state.reservationData.personId?.toString()
        state.reservationData.id = state.reservationData.id?.toString()
        setReservationDetails()
      } catch (error) {
        state.loading = hideLoading()
      }
    }

    const setReservationDetails = () => {
      state.reservationDetails = [
        { label: t('pages.reservation.start_date'), icon: 'today', value: formatDbToEsDate(state.reservationData.startDate) },
        { label: t('pages.reservation.end_date'), icon: 'event', value: formatDbToEsDate(state.reservationData.endDate) },
        // { label: t('pages.reservation.urn'), icon: 'grid_view', value: state.reservationData.urn.internalCode },
        // { label: t('pages.reservation.person'), icon: 'person', value: `${state.reservationData.person.lastName1} ${state.reservationData.person.lastName2} ${state.reservationData.person.firstName}` },
        { label: t('pages.reservation.description'), icon: 'description', value: state.reservationData.description || '-' }
      ]
    }

    const openCreateEditReservation = () => {
      const data = JSON.parse(JSON.stringify(state.reservationData))
      bus.$emit('openCreateEditReservationModal', data)
    }

    const openDeleteReservation = () => {
      const data = JSON.parse(JSON.stringify(state.reservationData))
      bus.$emit('openDeleteReservationModal', data)
    }

    const openCreateEditDepositInReservation = () => {
      const data = JSON.parse(JSON.stringify(state.reservationData))
      bus.$emit('openCreateEditDepositInReservationModal', data)
    }

    return {
      ...toRefs(state),
      openCreateEditReservation,
      openDeleteReservation,
      openCreateEditDepositInReservation
    }
  }
})
</script>

<style lang="scss" scoped>
  .content-title {
    font-size: 21px;
    font-weight: 600;
  }
</style>