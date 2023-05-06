<template>
  <div class="full-container flex column no-wrap gap-20">
    <title-component :title="$t('pages.urn.details_title')" showBackButton />

    <div class="flex gap-10 details-flex-container">
      <item-details-component v-if="buildingData" :title="`${$t('pages.building.entity')}: ${buildingData?.internalCode}`" :item-data="buildingDetails">
        <div class="flex no-wrap gap-5">
          <custom-button padding="none" round color="positive" flat no-caps icon="launch" @click="goToBuildingInfo()" />
        </div>
      </item-details-component>

      <item-details-component v-if="roomData" :title="`${$t('pages.room.entity')}: ${roomData?.internalCode}`" :item-data="roomDetails">
        <div class="flex no-wrap gap-5">
          <custom-button padding="none" round color="positive" flat no-caps icon="launch" @click="goToRoomInfo()" />
        </div>
      </item-details-component>

      <item-details-component v-if="rowData" :title="`${$t('pages.row.entity')}: ${rowData?.internalCode}`" :item-data="rowDetails">
        <div class="flex no-wrap gap-5">
          <custom-button padding="none" round color="positive" flat no-caps icon="launch" @click="goToRowInfo()" />
        </div>
      </item-details-component>

      <item-details-component v-if="nicheData" :title="`${$t('pages.niche.entity')}: ${nicheData?.internalCode}`" :item-data="nicheDetails">
        <div class="flex no-wrap gap-5">
          <custom-button padding="none" round color="positive" flat no-caps icon="launch" @click="goToNicheInfo()" />
        </div>
      </item-details-component>
      <item-details-component v-if="urnData" :title="`${$t('pages.urn.entity')}: ${urnData?.internalCode}`" :item-data="urnDetails">
        <div class="flex no-wrap gap-5">
          <custom-button padding="none" round color="primary" flat no-caps icon="drive_file_rename_outline" @click="openCreateEditUrn()" />
          <custom-button padding="none" round color="negative" flat no-caps icon="delete" @click="openDeleteUrn()" />
        </div>
      </item-details-component>
    </div>

    <content-container-component class="flex column no-wrap gap-10" v-if="urnData">
      <div class="flex no-wrap justify-between items-center">
        <div class="content-title">{{ $t('pages.urn.urn_reservation') }}</div>
        <custom-button v-if="urnData.status === 'AVAILABLE'" :unelevated="false" icon="add_circle_outline" :label="$t('pages.reservation.add_reservation')" color="secondary" @click="openCreateReservationInUrn()" />
      </div>
      <reservation-table-component :urn-id="urnId" />
    </content-container-component>

    <content-container-component class="flex column no-wrap gap-10" v-if="urnData && urnData.relocations?.length > 0">
      <div class="flex no-wrap justify-between items-center">
        <div class="content-title">{{ $t('pages.casket.relocation') }}</div>
        <custom-button v-if="urnData.status === 'AVAILABLE'" :unelevated="false" icon="add_circle_outline" :label="$t('pages.relocation.add_relocation')" color="secondary" @click="openCreateRelocationInUrn()" />
      </div>
      <relocation-table-component :urn-id="urnId" />
    </content-container-component>
  </div>
</template>

<script>
import ContentContainerComponent from 'src/components/content-container/content-container-component'
import ItemDetailsComponent from 'src/components/item-details/item-details-component'
import ReservationTableComponent from 'src/components/tables/reservation/reservation-table-component'
import RelocationTableComponent from 'src/components/tables/relocation/relocation-table-component'
import { computed, defineComponent, onBeforeUnmount, onMounted, reactive, toRefs } from 'vue'
import { hideLoading, showLoading } from 'src/utils/quasarComponents'
import TitleComponent from 'src/components/title/title-component'
import { useUrnStore } from 'stores/urn'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import bus from 'boot/bus'

export default defineComponent({
  components: {
    TitleComponent,
    ItemDetailsComponent,
    ContentContainerComponent,
    ReservationTableComponent,
    RelocationTableComponent
  },
  setup() {
    onMounted(() => {
      bus.$on('refreshUrnData', () => {
        fetchData()
      })
      bus.$on('refreshUrnDataDeleted', () => {
        router.push({ path: `/crypt/urns` })
      })
      fetchData()
    })

    onBeforeUnmount(() => {
      bus.$off('refreshUrnData')
      bus.$off('refreshUrnDataDeleted')
    })

    const route = useRoute()
    const router = useRouter()
    const { t } = useI18n({})
    const urnStore = useUrnStore()

    const state = reactive({
      loading: false,
      urnId: computed(() => route.params.urnId || null),
      buildingData: null,
      buildingDetails: [],
      roomData: null,
      roomDetails: [],
      rowData: null,
      rowDetails: [],
      nicheData: null,
      nicheDetails: [],
      urnData: null,
      urnDetails: []
    })

    const fetchData = async() => {
      try {
        state.loading = showLoading()
        await fetchUrnData()
        state.loading = hideLoading()
      } catch (error) {
        state.loading = hideLoading()
      }
    }

    const fetchUrnData = async () => {
      try {
        const data = await urnStore.getUrn(`${state.urnId}?includeNiche=true&includeRow=true&includeRoom=true&includeBuilding=true&includeRelocations=true`)
        state.buildingData = data?.data?.niche?.row?.room?.building
        state.roomData = data?.data?.niche?.row?.room
        state.rowData = data?.data?.niche?.row
        state.nicheData = data?.data?.niche
        state.urnData = data?.data

        setDetails()
      } catch (error) {
        state.loading = hideLoading()
      }
    }

    const setDetails = () => {
      state.nicheDetails = [
        { label: t('pages.niche.internal_code'), icon: 'tag', value: state.nicheData.internalCode },
        { label: t('pages.niche.storage_quantity'), icon: 'storage', value: state.nicheData.storageQuantity },
        { label: t('pages.niche.description'), icon: 'description', value: state.nicheData.description || '-' }
      ]
      state.rowDetails = [
        { label: t('pages.row.internal_code'), icon: 'tag', value: state.rowData.internalCode },
        { label: t('pages.row.description'), icon: 'description', value: state.rowData.description || '-' }
      ]
      state.roomDetails = [
        { label: t('pages.room.internal_code'), icon: 'tag', value: state.roomData.internalCode },
        { label: t('pages.room.location'), icon: 'place', value: state.roomData.location },
        { label: t('pages.room.description'), icon: 'description', value: state.roomData.description || '-' }
      ]
      state.buildingDetails = [
        { label: t('pages.building.internal_code'), icon: 'tag', value: state.buildingData.internalCode },
        { label: t('pages.building.name'), icon: 'church', value: state.buildingData.name },
        { label: t('pages.building.address'), icon: 'place', value: state.buildingData.address },
        { label: t('pages.building.description'), icon: 'description', value: state.buildingData.description || '-' }
      ]
      state.urnDetails = [
        { label: t('pages.urn.internal_code'), icon: 'tag', value: state.urnData.internalCode },
        { label: t('pages.urn.status'), icon: 'assignment', value: state.urnData.status },
        { label: t('pages.urn.description'), icon: 'description', value: state.urnData.description || '-' }
      ]
    }

    const goToBuildingInfo = () => {
      router.push({ path: `/crypt/building/${state.buildingData.id}` })
    }

    const goToRoomInfo = () => {
      router.push({ path: `/crypt/room/${state.roomData.id}` })
    }

    const goToRowInfo = () => {
      router.push({ path: `/crypt/row/${state.rowData.id}` })
    }

    const goToNicheInfo = () => {
      router.push({ path: `/crypt/niche/${state.nicheData.id}` })
    }

    const openCreateEditUrn = () => {
      const data = JSON.parse(JSON.stringify(state.urnData))
      bus.$emit('openCreateEditUrnModal', data)
    }

    const openDeleteUrn = () => {
      const data = JSON.parse(JSON.stringify(state.urnData))
      bus.$emit('openDeleteUrnModal', data)
    }

    const openCreateReservationInUrn = () => {
      const data = JSON.parse(JSON.stringify(state.urnData))
      bus.$emit('openCreateReservationInUrnModal', data)
    }

    const openCreateRelocationInUrn = () => {
      const data = JSON.parse(JSON.stringify(state.urnData))
      bus.$emit('openCreateRelocationInUrnModal', data)
    }

    return {
      ...toRefs(state),
      openCreateEditUrn,
      openDeleteUrn,
      openCreateReservationInUrn,
      openCreateRelocationInUrn,
      goToBuildingInfo,
      goToRoomInfo,
      goToRowInfo,
      goToNicheInfo
    }
  }
})
</script>

<style lang="scss" scoped>
  .content-title {
    font-size: 21px;
    font-weight: 600;
  }
  .details-flex-container > * {
    flex: 1;
  }
</style>