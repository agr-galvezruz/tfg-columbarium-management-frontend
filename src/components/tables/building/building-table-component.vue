<template>
  <filter-component :filters="filters" @update-filters="sendFilters" />

  <q-table
    class="full-width sticky-header"
    flat
    :loading="loading"
    :loading-label="$t('general_texts.loading')"
    :no-data-label="$t('pages.building.no_data')"
    :rows="rows"
    :columns="columns"
    row-key="dni"
    v-model:pagination="pagination"
    :rows-per-page-options="[0]"
    @request="onRequest"
    @row-click="goToBuildingInfo"
    :pagination-label="getPaginationLabel">

    <template v-slot:header-cell="props">
      <q-th :props="props" class="q-table-header-text">{{ props.col.label }}</q-th>
    </template>

    <template v-slot:body-cell-actions="props">
      <q-td :props="props" @click.stop="null">
        <custom-button padding="none" round color="secondary" flat no-caps icon="more_vert">
          <q-menu anchor="top left" self="top right">
            <q-item clickable @click="openCreateEditBuilding(props.row)" v-close-popup>
              <q-item-section>
                <div class="flex items-center gap-5">
                  <q-icon color="blue" size="24px" name="drive_file_rename_outline"/>
                  <span class="action-class">{{ $t('general_texts.edit') }}</span>
                </div>
              </q-item-section>
            </q-item>
            <q-item clickable @click="openDeleteBuilding(props.row)" v-close-popup>
              <div class="flex items-center gap-5">
                <q-icon color="negative" size="24px" name="delete"/>
                <span class="action-class">{{ $t('general_texts.delete') }}</span>
              </div>
            </q-item>
          </q-menu>
        </custom-button>
      </q-td>
    </template>
  </q-table>
</template>

<script>
import FilterComponent from 'src/components/filter/filter-component'
import { concatFilters } from 'src/helpers/concatFilters'
import { defineComponent, onBeforeUnmount, onMounted, reactive, toRefs } from 'vue'
import { useBuildingStore } from 'stores/building'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import bus from 'boot/bus'

export default defineComponent({
  components: {
    FilterComponent
  },
  setup() {
    onMounted(() => {
      bus.$on('refreshBuildingData', () => {
        fetchBuildingData(state.pagination.page)
      })
      bus.$on('refreshBuildingDataDeleted', () => {
        if (state.pagination.rowsNumber === 1 && state.pagination.page > 1) {
          fetchBuildingData(state.pagination.page - 1)
        } else {
          fetchBuildingData(state.pagination.page)
        }
      })
      fetchBuildingData()
    })

    onBeforeUnmount(() => {
      bus.$off('refreshBuildingData');
      bus.$off('refreshBuildingDataDeleted');
    })

    const { t } = useI18n({})
    const router = useRouter()
    const buildingStore = useBuildingStore()

    const state = reactive({
      loading: false,
      rows: [],
      urlFilters: '',
      pagination: {
        page: 1,
        rowsPerPage: 1,
        rowsNumber: 1
      }
    })

    const columns = [
      { name: 'internalCode', label: t('pages.building.internal_code'), field: 'internalCode', align: 'left' },
      { name: 'name', label: t('pages.building.name'), field: 'name', align: 'left',},
      { name: 'address', label: t('pages.building.address'), field: 'address', align: 'left',},
      { name: 'description', label: t('pages.building.description'), field: 'description', align: 'left',},
      { name: 'actions', label: '', align: 'center', style: 'width:42px'},
    ]

    const filters = [
      { key: 'internalCode', label: t('pages.building.internal_code'), icon: 'tag', type: 'input', operator: 'like'},
      { key: 'name', label: t('pages.building.name'), icon: 'church', type: 'input', operator: 'like'},
      { key: 'address', label: t('pages.building.address'), icon: 'place', type: 'input', operator: 'like'},
      { key: 'description', label: t('pages.building.description'), icon: 'description', type: 'input', operator: 'like'}
    ]

    const getPaginationLabel = (first, end, total) => {
      return `${t('general_texts.pagination_records')}: ${first} - ${end} ${t('general_texts.pagination_of')} ${total}`
    }

    const fetchBuildingData = async (page = 1) => {
      try {
        state.loading = true
        const data = await buildingStore.getAllBuildings(concatFilters(state.urlFilters, page))
        state.rows = data?.data
        state.pagination = {
          page: data.meta.current_page,
          rowsPerPage: data.meta.per_page,
          rowsNumber: data.meta.total
        }
        state.loading = false
      } catch (error) {
        state.loading = false
      }
    }

    const onRequest = (props) => {
      state.pagination = props.pagination
      fetchBuildingData(state.pagination.page)
    }

    const sendFilters = (filters) => {
      state.urlFilters = filters
      fetchBuildingData()
    }

    const goToBuildingInfo = (evt, row) => {
      router.push({ path: `/crypt/building/${row.id}` })
    }

    const openCreateEditBuilding = (data = null) => {
      bus.$emit('openCreateEditBuildingModal', data)
    }

    const openDeleteBuilding = (data) => {
      bus.$emit('openDeleteBuildingModal', data)
    }

    return {
      ...toRefs(state),
      columns,
      filters,
      onRequest,
      getPaginationLabel,
      sendFilters,
      openCreateEditBuilding,
      openDeleteBuilding,
      goToBuildingInfo
    }
  }
})
</script>
