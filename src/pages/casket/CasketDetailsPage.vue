<template>
  <div class="full-container flex column no-wrap gap-20">
    <title-component :title="$t('pages.casket.details_title')" showBackButton />

    <item-details-component v-if="casketData" :title="`${$t('pages.casket.entity')}: ${casketData.id}`" :item-data="casketDetails">
      <div class="flex no-wrap gap-5">
        <custom-button padding="none" round color="primary" flat no-caps icon="drive_file_rename_outline" @click="openCreateEditCasket()" />
        <custom-button padding="none" round color="negative" flat no-caps icon="delete" @click="openDeleteCasket()" />
      </div>
    </item-details-component>

    <content-container-component class="flex column no-wrap gap-10" v-if="casketData">
      <div class="flex no-wrap justify-between items-center">
        <div class="content-title">{{ $t('pages.casket.people_in_casket') }}</div>
        <!-- <custom-button :unelevated="false" icon="add_circle_outline" :label="$t('pages.person.add_person')" color="secondary" @click="openCreateRoomInCasket()" /> -->
      </div>

      <person-casket-table-component :where-id="casketId" />
    </content-container-component>
  </div>
</template>

<script>
import ContentContainerComponent from 'src/components/content-container/content-container-component'
import ItemDetailsComponent from 'src/components/item-details/item-details-component'
import PersonCasketTableComponent from 'src/components/tables/person-casket/person-casket-table-component'
import { computed, defineComponent, onBeforeUnmount, onMounted, reactive, toRefs } from 'vue'
import { hideLoading, showLoading } from 'src/utils/quasarComponents'
import TitleComponent from 'src/components/title/title-component'
import { useCasketStore } from 'stores/casket'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import bus from 'boot/bus'

export default defineComponent({
  components: {
    TitleComponent,
    PersonCasketTableComponent,
    ItemDetailsComponent,
    ContentContainerComponent
  },
  setup() {
    onMounted(() => {
      bus.$on('refreshCasketData', () => {
        fetchData()
      })
      bus.$on('refreshCasketDataDeleted', () => {
        router.push({ path: `/record/caskets` })
      })
      fetchData()
    })

    onBeforeUnmount(() => {
      bus.$off('refreshCasketData')
      bus.$off('refreshCasketDataDeleted')
    })

    const route = useRoute()
    const router = useRouter()
    const { t } = useI18n({})
    const casketStore = useCasketStore()

    const state = reactive({
      loading: false,
      casketId: computed(() => route.params.casketId || null),
      casketData: null,
      casketDetails: []
    })

    const fetchData = async() => {
      try {
        state.loading = showLoading()
        await fetchCasketData()
        state.loading = hideLoading()
      } catch (error) {
        state.loading = hideLoading()
      }
    }

    const fetchCasketData = async () => {
      try {
        const data = await casketStore.getCasket(`${state.casketId}?includePeople=true`)
        state.casketData = data?.data
        setCasketDetails()
      } catch (error) {
        state.loading = hideLoading()
      }
    }

    const setCasketDetails = () => {
      state.casketDetails = [
        { label: t('pages.casket.description'), icon: 'description', value: state.casketData.description || '-' }
      ]
    }

    const openCreateEditCasket = () => {
      const data = JSON.parse(JSON.stringify(state.casketData))
      bus.$emit('openCreateEditCasketModal', data)
    }

    const openDeleteCasket = () => {
      const data = JSON.parse(JSON.stringify(state.casketData))
      bus.$emit('openDeleteCasketModal', data)
    }

    const openCreateRoomInCasket = () => {
      const data = JSON.parse(JSON.stringify(state.casketData))
      bus.$emit('openCreateRoomInCasketModal', data)
    }

    return {
      ...toRefs(state),
      openCreateEditCasket,
      openDeleteCasket,
      openCreateRoomInCasket
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