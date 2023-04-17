<template>
  <div class="full-container flex column no-wrap gap-20">
    <title-component :title="$t('pages.building.details_title')" showBackButton />

    <item-details-component v-if="buildingData" :title="`${$t('pages.building.entity')}: ${buildingData.internalCode}`" :item-data="buildingDetails">
      <div class="flex no-wrap gap-5">
        <custom-button padding="none" round color="primary" flat no-caps icon="drive_file_rename_outline" @click="openCreateEditBuilding()" />
        <custom-button padding="none" round color="negative" flat no-caps icon="delete" @click="openDeleteBuilding()" />
      </div>
    </item-details-component>

    <content-container-component class="flex column no-wrap gap-10">
      <div class="flex no-wrap justify-between items-center">
        <div class="content-title">{{ $t('pages.room.rooms_building') }}</div>
        <custom-button :unelevated="false" icon="add_circle_outline" :label="$t('pages.room.add_room')" color="secondary" @click="openCreateRoomInBuilding()" />
      </div>

      <room-table-component v-if="buildingData" :where-id="buildingId" />
    </content-container-component>
  </div>
</template>

<script>
import ContentContainerComponent from 'src/components/content-container/content-container-component.vue'
import ItemDetailsComponent from 'src/components/item-details/item-details-component'
import RoomTableComponent from 'src/components/tables/room/room-table-component'
import { computed, defineComponent, onBeforeUnmount, onMounted, reactive, toRefs } from 'vue'
import { hideLoading, showLoading } from 'src/utils/quasarComponents'
import TitleComponent from 'src/components/title/title-component'
import { useBuildingStore } from 'stores/building'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import bus from 'boot/bus'

export default defineComponent({
  components: {
    TitleComponent,
    RoomTableComponent,
    ItemDetailsComponent,
    ContentContainerComponent
  },
  setup() {
    onMounted(() => {
      bus.$on('refreshBuildingData', () => {
        fetchData()
      })
      bus.$on('refreshBuildingDataDeleted', () => {
        router.push({ path: `/crypt/buildings` })
      })
      fetchData()
    })

    onBeforeUnmount(() => {
      bus.$off('refreshBuildingData')
      bus.$off('refreshBuildingDataDeleted')
    })

    const route = useRoute()
    const router = useRouter()
    const { t } = useI18n({})
    const buildingStore = useBuildingStore()

    const state = reactive({
      loading: false,
      buildingId: computed(() => route.params.buildingId || null),
      buildingData: null,
      buildingDetails: []
    })

    const fetchData = async() => {
      try {
        state.loading = showLoading()
        await fetchBuildingData()
        state.loading = hideLoading()
      } catch (error) {
        state.loading = hideLoading()
      }
    }

    const fetchBuildingData = async () => {
      try {
        const data = await buildingStore.getBuilding(state.buildingId)
        state.buildingData = data?.data
        setBuildingDetails()
      } catch (error) {
        state.loading = hideLoading()
      }
    }

    const setBuildingDetails = () => {
      state.buildingDetails = [
        { label: t('pages.building.internal_code'), icon: 'tag', value: state.buildingData.internalCode },
        { label: t('pages.building.name'), icon: 'church', value: state.buildingData.name },
        { label: t('pages.building.address'), icon: 'place', value: state.buildingData.address },
        { label: t('pages.building.description'), icon: 'description', value: state.buildingData.description || '-' }
      ]
    }

    const openCreateEditBuilding = () => {
      const data = JSON.parse(JSON.stringify(state.buildingData))
      bus.$emit('openCreateEditBuildingModal', data)
    }

    const openDeleteBuilding = () => {
      const data = JSON.parse(JSON.stringify(state.buildingData))
      bus.$emit('openDeleteBuildingModal', data)
    }

    const openCreateRoomInBuilding = () => {
      const data = JSON.parse(JSON.stringify(state.buildingData))
      bus.$emit('openCreateRoomInBuildingModal', data)
    }

    return {
      ...toRefs(state),
      openCreateEditBuilding,
      openDeleteBuilding,
      openCreateRoomInBuilding
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