<template>
  <div class="full-container flex column no-wrap gap-20">
    <title-component :title="$t('pages.row.details_title')" showBackButton />

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
          <custom-button v-if="isAdminUser" padding="none" round color="primary" flat no-caps icon="drive_file_rename_outline" @click="openCreateEditRow()" />
          <custom-button v-if="isAdminUser" padding="none" round color="negative" flat no-caps icon="delete" @click="openDeleteRow()" />
        </div>
      </item-details-component>
    </div>

    <content-container-component class="flex column no-wrap gap-10" v-if="rowData">
      <div class="flex no-wrap justify-between items-center">
        <div class="content-title">{{ $t('pages.niche.niches_row') }}</div>
        <custom-button v-if="isAdminUser" :unelevated="false" icon="add_circle_outline" :label="$t('pages.niche.add_niche')" color="secondary" @click="openCreateNicheInRow()" />
      </div>

      <niche-table-component :where-id="rowId" />
    </content-container-component>
  </div>
</template>

<script>
import ContentContainerComponent from 'src/components/content-container/content-container-component'
import ItemDetailsComponent from 'src/components/item-details/item-details-component'
import NicheTableComponent from 'src/components/tables/niche/niche-table-component'
import { computed, defineComponent, onBeforeUnmount, onMounted, reactive, toRefs } from 'vue'
import { useAuthenticationStore } from 'stores/authentication'
import { hideLoading, showLoading } from 'src/utils/quasarComponents'
import TitleComponent from 'src/components/title/title-component'
import { useRowStore } from 'stores/row'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import bus from 'boot/bus'

export default defineComponent({
  components: {
    TitleComponent,
    NicheTableComponent,
    ItemDetailsComponent,
    ContentContainerComponent
  },
  setup() {
    onMounted(() => {
      bus.$on('refreshRowData', () => {
        fetchData()
      })
      bus.$on('refreshRowDataDeleted', () => {
        router.push({ path: `/crypt/rows` })
      })
      fetchData()
    })

    onBeforeUnmount(() => {
      bus.$off('refreshRowData')
      bus.$off('refreshRowDataDeleted')
    })

    const route = useRoute()
    const router = useRouter()
    const { t } = useI18n({})
    const rowStore = useRowStore()
    const authenticationStore = useAuthenticationStore()

    const state = reactive({
      isAdminUser: authenticationStore.isAdmin,
      loading: false,
      rowId: computed(() => route.params.rowId || null),
      buildingData: null,
      buildingDetails: [],
      roomData: null,
      roomDetails: [],
      rowData: null,
      rowDetails: [],
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
        const data = await rowStore.getRow(`${state.rowId}?includeRoom=true&includeBuilding=true`)
        state.buildingData = data?.data?.room?.building
        state.roomData = data?.data?.room
        state.rowData = data?.data

        delete state.rowData.room.building
        setDetails()
      } catch (error) {
        state.loading = hideLoading()
      }
    }

    const setDetails = () => {
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

    const openCreateEditRow = () => {
      const data = JSON.parse(JSON.stringify(state.rowData))
      bus.$emit('openCreateEditRowModal', data)
    }

    const openDeleteRow = () => {
      const data = JSON.parse(JSON.stringify(state.rowData))
      bus.$emit('openDeleteRowModal', data)
    }

    const openCreateNicheInRow = () => {
      const data = JSON.parse(JSON.stringify(state.rowData))
      data.room = JSON.parse(JSON.stringify(state.roomData))
      data.room.building = JSON.parse(JSON.stringify(state.buildingData))
      bus.$emit('openCreateNicheInRowModal', data)
    }

    return {
      ...toRefs(state),
      goToBuildingInfo,
      goToRoomInfo,
      openCreateEditRow,
      openDeleteRow,
      openCreateNicheInRow
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