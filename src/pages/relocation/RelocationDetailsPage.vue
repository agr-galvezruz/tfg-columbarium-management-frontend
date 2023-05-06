<template>
  <div class="full-container flex column no-wrap gap-20">
    <title-component :title="$t('pages.relocation.details_title')" showBackButton />

    <item-details-component v-if="relocationData" :title="$t('pages.relocation.entity')" :item-data="relocationDetails">
      <div class="flex no-wrap gap-5">
        <custom-button padding="none" round color="primary" flat no-caps icon="drive_file_rename_outline" @click="openCreateEditRelocation()" />
        <custom-button padding="none" round color="negative" flat no-caps icon="delete" @click="openDeleteRelocation()" />
      </div>
    </item-details-component>

    <content-container-component class="flex column no-wrap gap-10" v-if="relocationData">
      <div class="flex no-wrap justify-between items-center">
        <div class="content-title">{{ $t('pages.relocation.urn_id') }}</div>
      </div>
      <urn-table-component :urn-id="relocationData.urnId" />
    </content-container-component>

    <content-container-component class="flex column no-wrap gap-10" v-if="relocationData">
      <div class="flex no-wrap justify-between items-center">
        <div class="content-title">{{ $t('pages.relocation.casket_relocated') }}</div>
      </div>
      <casket-table-component :casket-id="relocationData.casketId" />
    </content-container-component>
  </div>
</template>

<script>
import ContentContainerComponent from 'src/components/content-container/content-container-component'
import ItemDetailsComponent from 'src/components/item-details/item-details-component'
import CasketTableComponent from 'src/components/tables/casket/casket-table-component'
import UrnTableComponent from 'src/components/tables/urn/urn-table-component'
import { computed, defineComponent, onBeforeUnmount, onMounted, reactive, toRefs } from 'vue'
import { hideLoading, showLoading } from 'src/utils/quasarComponents'
import TitleComponent from 'src/components/title/title-component'
import { useRelocationStore } from 'stores/relocation'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import bus from 'boot/bus'
import { formatDbToEsDate } from 'src/helpers/formatDate'

export default defineComponent({
  components: {
    TitleComponent,
    CasketTableComponent,
    ItemDetailsComponent,
    UrnTableComponent,
    ContentContainerComponent
  },
  setup() {
    onMounted(() => {
      bus.$on('refreshRelocationData', () => {
        fetchData()
      })
      bus.$on('refreshRelocationDataDeleted', () => {
        router.push({ path: `/management/relocations` })
      })
      fetchData()
    })

    onBeforeUnmount(() => {
      bus.$off('refreshRelocationData')
      bus.$off('refreshRelocationDataDeleted')
    })

    const route = useRoute()
    const router = useRouter()
    const { t } = useI18n({})
    const relocationStore = useRelocationStore()

    const state = reactive({
      loading: false,
      relocationId: computed(() => route.params.relocationId || null),
      relocationData: null,
      relocationDetails: []
    })

    const fetchData = async() => {
      try {
        state.loading = showLoading()
        await fetchRelocationData()
        state.loading = hideLoading()
      } catch (error) {
        state.loading = hideLoading()
      }
    }

    const fetchRelocationData = async () => {
      try {
        const data = await relocationStore.getRelocation(state.relocationId)
        state.relocationData = data?.data
        state.relocationData.urnId = state.relocationData.urnId?.toString()
        state.relocationData.casketId = state.relocationData.casketId?.toString()
        setRelocationDetails()
      } catch (error) {
        state.loading = hideLoading()
      }
    }

    const setRelocationDetails = () => {
      state.relocationDetails = [
        { label: t('pages.relocation.date'), icon: 'today', value: formatDbToEsDate(state.relocationData.startDate) },
        { label: t('pages.relocation.end_date'), icon: 'event', value: formatDbToEsDate(state.relocationData.endDate) || '-' },
        { label: t('pages.relocation.description'), icon: 'description', value: state.relocationData.description || '-' }
      ]
    }

    const openCreateEditRelocation = () => {
      const data = JSON.parse(JSON.stringify(state.relocationData))
      bus.$emit('openCreateEditRelocationModal', data)
    }

    const openDeleteRelocation = () => {
      const data = JSON.parse(JSON.stringify(state.relocationData))
      bus.$emit('openDeleteRelocationModal', data)
    }

    return {
      ...toRefs(state),
      openCreateEditRelocation,
      openDeleteRelocation
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