<template>
  <div class="full-container flex column no-wrap gap-20">
    <title-component :title="$t('pages.deposit.details_title')" showBackButton />

    <item-details-component v-if="depositData" :title="$t('pages.deposit.entity')" :item-data="depositDetails">
      <div class="flex no-wrap gap-5">
        <custom-button v-if="isAdminUser" padding="none" round color="primary" flat no-caps icon="drive_file_rename_outline" @click="openCreateEditDeposit()" />
        <custom-button v-if="isAdminUser" padding="none" round color="negative" flat no-caps icon="delete" @click="openDeleteDeposit()" />
      </div>
    </item-details-component>

    <content-container-component class="flex column no-wrap gap-10" v-if="depositData">
      <div class="flex no-wrap justify-between items-center">
        <div class="content-title">{{ $t('pages.deposit.deposit_person') }}</div>
      </div>
      <person-table-component :person-id="depositData.personId" />
    </content-container-component>

    <content-container-component class="flex column no-wrap gap-10" v-if="depositData">
      <div class="flex no-wrap justify-between items-center">
        <div class="content-title">{{ $t('pages.deposit.reservation_associated') }}</div>
      </div>
      <reservation-table-component :reservation-id="depositData.reservationId" />
    </content-container-component>

    <content-container-component class="flex column no-wrap gap-10" v-if="depositData">
      <div class="flex no-wrap justify-between items-center">
        <div class="content-title">{{ $t('pages.deposit.casket_deposited') }}</div>
      </div>
      <casket-table-component :casket-id="depositData.casketId" />
    </content-container-component>
  </div>
</template>

<script>
import ContentContainerComponent from 'src/components/content-container/content-container-component'
import ItemDetailsComponent from 'src/components/item-details/item-details-component'
import PersonTableComponent from 'src/components/tables/person/person-table-component'
import ReservationTableComponent from 'src/components/tables/reservation/reservation-table-component'
import CasketTableComponent from 'src/components/tables/casket/casket-table-component'
import { computed, defineComponent, onBeforeUnmount, onMounted, reactive, toRefs } from 'vue'
import { useAuthenticationStore } from 'stores/authentication'
import { hideLoading, showLoading } from 'src/utils/quasarComponents'
import TitleComponent from 'src/components/title/title-component'
import { useDepositStore } from 'stores/deposit'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import bus from 'boot/bus'
import { formatDbToEsDate } from 'src/helpers/formatDate'

export default defineComponent({
  components: {
    TitleComponent,
    PersonTableComponent,
    ItemDetailsComponent,
    CasketTableComponent,
    ReservationTableComponent,
    ContentContainerComponent
  },
  setup() {
    onMounted(() => {
      bus.$on('refreshDepositData', () => {
        fetchData()
      })
      bus.$on('refreshDepositDataDeleted', () => {
        router.push({ path: `/management/deposits` })
      })
      fetchData()
    })

    onBeforeUnmount(() => {
      bus.$off('refreshDepositData')
      bus.$off('refreshDepositDataDeleted')
    })

    const route = useRoute()
    const router = useRouter()
    const { t } = useI18n({})
    const depositStore = useDepositStore()
    const authenticationStore = useAuthenticationStore()

    const state = reactive({
      isAdminUser: authenticationStore.isAdmin,
      loading: false,
      depositId: computed(() => route.params.depositId || null),
      depositData: null,
      depositDetails: []
    })

    const fetchData = async() => {
      try {
        state.loading = showLoading()
        await fetchDepositData()
        state.loading = hideLoading()
      } catch (error) {
        state.loading = hideLoading()
      }
    }

    const fetchDepositData = async () => {
      try {
        const data = await depositStore.getDeposit(`${state.depositId}?includePerson=true&includeReservation=true&includeCasket=true`)
        state.depositData = data?.data
        state.depositData.personId = state.depositData.personId?.toString()
        state.depositData.casketId = state.depositData.casketId?.toString()
        state.depositData.reservationId = state.depositData.reservationId?.toString()
        setDepositDetails()
      } catch (error) {
        state.loading = hideLoading()
      }
    }

    const setDepositDetails = () => {
      state.depositDetails = [
        { label: t('pages.deposit.resume_date'), icon: 'today', value: formatDbToEsDate(state.depositData.startDate) },
        { label: t('pages.deposit.resume_end_date'), icon: 'event', value: formatDbToEsDate(state.depositData.endDate) || '-' },
        { label: t('pages.deposit.deceased_relationship'), icon: 'social_distance', value: state.depositData.deceasedRelationship },
        { label: t('pages.deposit.description'), icon: 'description', value: state.depositData.description || '-' }
      ]
    }

    const openCreateEditDeposit = () => {
      const data = JSON.parse(JSON.stringify(state.depositData))
      bus.$emit('openCreateEditDepositModal', data)
    }

    const openDeleteDeposit = () => {
      const data = JSON.parse(JSON.stringify(state.depositData))
      bus.$emit('openDeleteDepositModal', data)
    }

    // const openCreateRoomInDeposit = () => {
    //   const data = JSON.parse(JSON.stringify(state.depositData))
    //   bus.$emit('openCreateRoomInDepositModal', data)
    // }

    return {
      ...toRefs(state),
      openCreateEditDeposit,
      openDeleteDeposit,
      // openCreateRoomInDeposit
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