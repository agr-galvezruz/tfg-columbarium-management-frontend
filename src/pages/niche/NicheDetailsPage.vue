<template>
  <div class="full-container flex column no-wrap gap-20">
    <title-component :title="$t('pages.niche.details_title')" showBackButton />

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
          <custom-button v-if="isAdminUser" padding="none" round color="primary" flat no-caps icon="drive_file_rename_outline" @click="openCreateEditNiche()" />
          <custom-button v-if="isAdminUser" padding="none" round color="negative" flat no-caps icon="delete" @click="openDeleteNiche()" />
        </div>
      </item-details-component>
    </div>

    <content-container-component class="flex column no-wrap gap-10" v-if="nicheData">
      <div class="flex no-wrap justify-between items-center">
        <div class="content-title">{{ $t('pages.urn.urns_niche') }}</div>
        <custom-button v-if="isAdminUser" :unelevated="false" icon="add_circle_outline" :label="$t('pages.urn.add_urn')" color="secondary" @click="openCreateUrnInNiche()" />
      </div>

      <urn-table-component :where-id="nicheId" />
    </content-container-component>
  </div>
</template>

<script>
import ContentContainerComponent from 'src/components/content-container/content-container-component'
import ItemDetailsComponent from 'src/components/item-details/item-details-component'
import UrnTableComponent from 'src/components/tables/urn/urn-table-component'
import { computed, defineComponent, onBeforeUnmount, onMounted, reactive, toRefs } from 'vue'
import { useAuthenticationStore } from 'stores/authentication'
import { hideLoading, showLoading } from 'src/utils/quasarComponents'
import TitleComponent from 'src/components/title/title-component'
import { useNicheStore } from 'stores/niche'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import bus from 'boot/bus'

export default defineComponent({
  components: {
    TitleComponent,
    UrnTableComponent,
    ItemDetailsComponent,
    ContentContainerComponent
  },
  setup() {
    onMounted(() => {
      bus.$on('refreshNicheData', () => {
        fetchData()
      })
      bus.$on('refreshNicheDataDeleted', () => {
        router.push({ path: `/crypt/niches` })
      })
      fetchData()
    })

    onBeforeUnmount(() => {
      bus.$off('refreshNicheData')
      bus.$off('refreshNicheDataDeleted')
    })

    const route = useRoute()
    const router = useRouter()
    const { t } = useI18n({})
    const nicheStore = useNicheStore()
    const authenticationStore = useAuthenticationStore()

    const state = reactive({
      isAdminUser: authenticationStore.isAdmin,
      loading: false,
      nicheId: computed(() => route.params.nicheId || null),
      buildingData: null,
      buildingDetails: [],
      roomData: null,
      roomDetails: [],
      rowData: null,
      rowDetails: [],
      nicheData: null,
      nicheDetails: [],
    })

    const fetchData = async() => {
      try {
        state.loading = showLoading()
        await fetchRowData()
        state.loading = hideLoading()
      } catch (error) {
        state.loading = hideLoading()
      }
    }

    const fetchRowData = async () => {
      try {
        const data = await nicheStore.getNiche(`${state.nicheId}?includeRow=true&includeRoom=true&includeBuilding=true`)
        state.buildingData = data?.data?.row?.room?.building
        state.roomData = data?.data?.row?.room
        state.rowData = data?.data?.row
        state.nicheData = data?.data

        delete state.nicheData.row.room.building
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

    const openCreateEditNiche = () => {
      const data = JSON.parse(JSON.stringify(state.nicheData))
      bus.$emit('openCreateEditNicheModal', data)
    }

    const openDeleteNiche = () => {
      const data = JSON.parse(JSON.stringify(state.nicheData))
      bus.$emit('openDeleteNicheModal', data)
    }

    const openCreateUrnInNiche = () => {
      const data = JSON.parse(JSON.stringify(state.nicheData))
      data.row = JSON.parse(JSON.stringify(state.rowData))
      data.row.room = JSON.parse(JSON.stringify(state.roomData))
      data.row.room.building = JSON.parse(JSON.stringify(state.buildingData))
      bus.$emit('openCreateUrnInNicheModal', data)
    }

    return {
      ...toRefs(state),
      goToBuildingInfo,
      goToRoomInfo,
      goToRowInfo,
      openCreateEditNiche,
      openDeleteNiche,
      openCreateUrnInNiche
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