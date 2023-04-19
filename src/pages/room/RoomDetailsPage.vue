<template>
  <div class="full-container flex column no-wrap gap-20">
    <title-component :title="$t('pages.room.details_title')" showBackButton />

    <div class="flex gap-10 details-flex-container">
      <item-details-component v-if="buildingData" :title="`${$t('pages.building.entity')}: ${buildingData?.internalCode}`" :item-data="buildingDetails">
        <div class="flex no-wrap gap-5">
          <custom-button padding="none" round color="positive" flat no-caps icon="launch" @click="goToBuildingInfo()" />
        </div>
      </item-details-component>

      <item-details-component v-if="roomData" :title="`${$t('pages.room.entity')}: ${roomData?.internalCode}`" :item-data="roomDetails">
        <div class="flex no-wrap gap-5">
          <custom-button padding="none" round color="primary" flat no-caps icon="drive_file_rename_outline" @click="openCreateEditRoom()" />
          <custom-button padding="none" round color="negative" flat no-caps icon="delete" @click="openDeleteRoom()" />
        </div>
      </item-details-component>
    </div>

    <content-container-component class="flex column no-wrap gap-10" v-if="roomData">
      <div class="flex no-wrap justify-between items-center">
        <div class="content-title">{{ $t('pages.row.rows_room') }}</div>
        <custom-button :unelevated="false" icon="add_circle_outline" :label="$t('pages.row.add_row')" color="secondary" @click="openCreateRowInRoom()" />
      </div>

      <row-table-component :where-id="roomId" />
    </content-container-component>
  </div>
</template>

<script>
import ContentContainerComponent from 'src/components/content-container/content-container-component'
import ItemDetailsComponent from 'src/components/item-details/item-details-component'
import RowTableComponent from 'src/components/tables/row/row-table-component'
import { computed, defineComponent, onBeforeUnmount, onMounted, reactive, toRefs } from 'vue'
import { hideLoading, showLoading } from 'src/utils/quasarComponents'
import TitleComponent from 'src/components/title/title-component'
import { useRoomStore } from 'stores/room'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import bus from 'boot/bus'

export default defineComponent({
  components: {
    TitleComponent,
    RowTableComponent,
    ItemDetailsComponent,
    ContentContainerComponent
  },
  setup() {
    onMounted(() => {
      bus.$on('refreshRoomData', () => {
        fetchData()
      })
      bus.$on('refreshRoomDataDeleted', () => {
        router.push({ path: `/crypt/rooms` })
      })
      fetchData()
    })

    onBeforeUnmount(() => {
      bus.$off('refreshRoomData')
      bus.$off('refreshRoomDataDeleted')
    })

    const route = useRoute()
    const router = useRouter()
    const { t } = useI18n({})
    const roomStore = useRoomStore()

    const state = reactive({
      loading: false,
      roomId: computed(() => route.params.roomId || null),
      buildingData: null,
      buildingDetails: [],
      roomData: null,
      roomDetails: [],
    })

    const fetchData = async() => {
      try {
        state.loading = showLoading()
        await fetchRoomData()
        state.loading = hideLoading()
      } catch (error) {
        state.loading = hideLoading()
      }
    }

    const fetchRoomData = async () => {
      try {
        const data = await roomStore.getRoom(`${state.roomId}?includeBuilding=true`)
        state.buildingData = data?.data?.building
        state.roomData = data?.data

        delete state.roomData.building
        setBuildingDetails()
      } catch (error) {
        state.loading = hideLoading()
      }
    }

    const setBuildingDetails = () => {
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

    const openCreateEditRoom = () => {
      const data = JSON.parse(JSON.stringify(state.roomData))
      bus.$emit('openCreateEditRoomModal', data)
    }

    const openDeleteRoom = () => {
      const data = JSON.parse(JSON.stringify(state.roomData))
      bus.$emit('openDeleteRoomModal', data)
    }

    const openCreateRowInRoom = () => {
      const data = JSON.parse(JSON.stringify(state.roomData))
      data.building = JSON.parse(JSON.stringify(state.buildingData))
      bus.$emit('openCreateRowInRoomModal', data)
    }

    return {
      ...toRefs(state),
      goToBuildingInfo,
      openCreateEditRoom,
      openDeleteRoom,
      openCreateRowInRoom
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