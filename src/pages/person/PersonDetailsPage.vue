<template>
  <div class="full-container flex column no-wrap gap-20">
    <title-component :title="$t('pages.person.details_title')" showBackButton />

    <item-details-component v-if="personData" :title="$t('pages.person.entity')" :item-data="personDetails">
      <div class="flex no-wrap gap-5">
        <custom-button padding="none" round color="primary" flat no-caps icon="drive_file_rename_outline" @click="openCreateEditPerson()" />
        <custom-button padding="none" round color="negative" flat no-caps icon="delete" @click="openDeletePerson()" />
      </div>
    </item-details-component>

    <content-container-component class="flex column no-wrap gap-10" v-if="personData && personData.casketId">
      <div class="flex no-wrap justify-between items-center">
        <div class="content-title">{{ $t('pages.person.in_casket_detail') }}</div>
      </div>
      <casket-person-table-component :where-id="personData.casketId" />
    </content-container-component>

    <content-container-component class="flex column no-wrap gap-10" v-if="personData">
      <div class="flex no-wrap justify-between items-center">
        <div class="content-title">{{ $t('pages.person.person_reservation') }}</div>
        <custom-button v-if="!personData.casketId" :unelevated="false" icon="add_circle_outline" :label="$t('pages.reservation.add_reservation')" color="secondary" @click="openCreateReservationInPerson()" />
      </div>
      <reservation-table-component :person-id="personId"  />
    </content-container-component>

    <content-container-component class="flex column no-wrap gap-10" v-if="personData">
      <div class="flex no-wrap justify-between items-center">
        <div class="content-title">{{ $t('pages.person.deposit') }}</div>
        <custom-button v-if="!personData.casketId" :unelevated="false" icon="add_circle_outline" :label="$t('pages.deposit.add_deposit')" color="secondary" @click="openCreateEditDepositInPerson()" />
      </div>
      <deposit-table-component :person-id="personId" />
    </content-container-component>
  </div>
</template>

<script>
import ContentContainerComponent from 'src/components/content-container/content-container-component'
import ItemDetailsComponent from 'src/components/item-details/item-details-component'
import CasketPersonTableComponent from 'src/components/tables/casket-person/casket-person-table-component'
import DepositTableComponent from 'src/components/tables/deposit/deposit-table-component'
import ReservationTableComponent from 'src/components/tables/reservation/reservation-table-component'
import { formatDbToEsDate } from 'src/helpers/formatDate'
import { computed, defineComponent, onBeforeUnmount, onMounted, reactive, toRefs } from 'vue'
import { hideLoading, showLoading } from 'src/utils/quasarComponents'
import TitleComponent from 'src/components/title/title-component'
import { usePersonStore } from 'stores/person'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import bus from 'boot/bus'

export default defineComponent({
  components: {
    TitleComponent,
    CasketPersonTableComponent,
    ItemDetailsComponent,
    ContentContainerComponent,
    ReservationTableComponent,
    DepositTableComponent
  },
  setup() {
    onMounted(() => {
      bus.$on('refreshPersonData', () => {
        fetchData()
      })
      bus.$on('refreshPersonDataDeleted', () => {
        router.push({ path: `/crypt/persons` })
      })
      fetchData()
    })

    onBeforeUnmount(() => {
      bus.$off('refreshPersonData')
      bus.$off('refreshPersonDataDeleted')
    })

    const route = useRoute()
    const router = useRouter()
    const { t } = useI18n({})
    const personStore = usePersonStore()

    const state = reactive({
      loading: false,
      personId: computed(() => route.params.personId || null),
      personData: null,
      personDetails: []
    })

    const fetchData = async() => {
      try {
        state.loading = showLoading()
        await fetchPersonData()
        state.loading = hideLoading()
      } catch (error) {
        state.loading = hideLoading()
      }
    }

    const fetchPersonData = async () => {
      try {
        const data = await personStore.getPerson(state.personId)
        state.personData = data?.data
        state.personData.casketId = state.personData.casketId?.toString()
        setPersonDetails()
      } catch (error) {
        state.loading = hideLoading()
      }
    }

    const setPersonDetails = () => {
      state.personDetails = [
        { label: t('pages.person.full_name'), icon: 'account_circle', value: `${state.personData.lastName1} ${state.personData.lastName2} ${state.personData.firstName}` },
        { label: t('pages.person.address'), icon: 'place', value: `${state.personData.address}, ${state.personData.postalCode}, ${state.personData.state}, ${state.personData.city}`},
      ]
      if (state.personData.dni) {
        state.personDetails.unshift({ label: t('pages.person.dni'), icon: 'badge', value: state.personData.dni })
      }
      if (state.personData.phone) {
        state.personDetails.push({ label: t('pages.person.phone'), icon: 'phone', value: state.personData.phone })
      }
      if (state.personData.email) {
        state.personDetails.push({ label: t('pages.person.email'), icon: 'email', value: state.personData.email })
      }
      if (state.personData.deathdate) {
        state.personDetails.push({ label: t('pages.person.deathdate'), icon: 'event_busy', value: formatDbToEsDate(state.personData.deathdate) })
      }
    }

    const openCreateEditPerson = () => {
      const data = JSON.parse(JSON.stringify(state.personData))
      bus.$emit('openCreateEditPersonModal', data)
    }

    const openDeletePerson = () => {
      const data = JSON.parse(JSON.stringify(state.personData))
      bus.$emit('openDeletePersonModal', data)
    }

    const openCreateReservationInPerson = () => {
      const data = JSON.parse(JSON.stringify(state.personData))
      bus.$emit('openCreateReservationInPersonModal', data)
    }

    const openCreateEditDepositInPerson = () => {
      const data = JSON.parse(JSON.stringify(state.personData))
      bus.$emit('openCreateEditDepositInPersonModal', data)
    }

    return {
      ...toRefs(state),
      openCreateEditPerson,
      openDeletePerson,
      openCreateReservationInPerson,
      openCreateEditDepositInPerson
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