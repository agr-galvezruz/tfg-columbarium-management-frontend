<template>
  <filter-component :filters="filters" @update-filters="sendFilters" />

  <q-table
    class="full-width sticky-header"
    flat
    :loading="loading"
    :loading-label="$t('general_texts.loading')"
    :no-data-label="$t('pages.niche.no_data')"
    :rows="rows"
    :columns="columns"
    row-key="dni"
    v-model:pagination="pagination"
    :rows-per-page-options="[0]"
    @request="onRequest"
    @row-click="goToNicheInfo"
    :pagination-label="getPaginationLabel">

    <template v-slot:header-cell="props">
      <q-th :props="props" class="q-table-header-text">{{ props.col.label }}</q-th>
    </template>

    <template v-slot:body-cell-actions="props">
      <q-td :props="props" @click.stop="null">
        <custom-button padding="none" round color="secondary" flat no-caps icon="more_vert">
          <q-menu anchor="top left" self="top right">
            <q-item clickable @click="openCreateEditNiche(props.row)" v-close-popup>
              <q-item-section>
                <div class="flex items-center gap-5">
                  <q-icon color="blue" size="24px" name="drive_file_rename_outline"/>
                  <span class="action-class">{{ $t('general_texts.edit') }}</span>
                </div>
              </q-item-section>
            </q-item>
            <q-item clickable @click="openDeleteNiche(props.row)" v-close-popup>
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
import { useNicheStore } from 'stores/niche'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import bus from 'boot/bus'

export default defineComponent({
  components: {
    FilterComponent
  },
  props: {
    whereId: {
      type: String,
      default: null
    }
  },
  setup(props) {
    onMounted(() => {
      bus.$on('refreshNicheData', () => {
        fetchNicheData(state.pagination.page)
      })
      bus.$on('refreshNicheDataDeleted', () => {
        if (state.pagination.rowsNumber === 1 && state.pagination.page > 1) {
          fetchNicheData(state.pagination.page - 1)
        } else {
          fetchNicheData(state.pagination.page)
        }
      })
      fetchNicheData()
    })

    onBeforeUnmount(() => {
      bus.$off('refreshNicheData')
      bus.$off('refreshNicheDataDeleted')
    })

    const { t } = useI18n({})
    const router = useRouter()
    const nicheStore = useNicheStore()

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
      { name: 'internalCode', label: t('pages.niche.internal_code'), field: 'internalCode', align: 'left' },
      { name: 'storageQuantity', label: t('pages.niche.storage_quantity'), field: 'storageQuantity', align: 'left' },
      { name: 'storageRows', label: t('pages.niche.storage_rows'), field: 'storageRows', align: 'left' },
      { name: 'description', label: t('pages.niche.description'), field: 'description', align: 'left',},
      { name: 'actions', label: '', align: 'center', style: 'width:42px'},
    ]

    const filters = [
      { key: 'internalCode', label: t('pages.niche.internal_code'), icon: 'tag', type: 'input', operator: 'like'},
      { key: 'storageQuantity', label: t('pages.niche.storage_quantity'), icon: 'storage', type: 'input', operator: 'eq'},
      { key: 'storageRows', label: t('pages.niche.storage_rows'), icon: 'align_vertical_top', type: 'input', operator: 'eq'},
      { key: 'description', label: t('pages.niche.description'), icon: 'description', type: 'input', operator: 'like'}
    ]

    const getPaginationLabel = (first, end, total) => {
      return `${t('general_texts.pagination_records')}: ${first} - ${end} ${t('general_texts.pagination_of')} ${total}`
    }

    const fetchNicheData = async (page = 1) => {
      try {
        state.loading = true
        let data = null
        if (props.whereId) {
          data = await nicheStore.getNichesFromRow(`${concatFilters(state.urlFilters, page)}&includeRow=true&includeRoom=true&rowId=${props.whereId}`)
        } else {
          data = await nicheStore.getAllNiches(`${concatFilters(state.urlFilters, page)}&includeRow=true&includeRoom=true`)
        }
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
      fetchNicheData(state.pagination.page)
    }

    const sendFilters = (filters) => {
      state.urlFilters = filters
      fetchNicheData()
    }

    const goToNicheInfo = (evt, row) => {
      router.push({ path: `/crypt/niche/${row.id}` })
    }

    const openCreateEditNiche = (data = null) => {
      bus.$emit('openCreateEditNicheModal', data)
    }

    const openDeleteNiche = (data) => {
      bus.$emit('openDeleteNicheModal', data)
    }

    return {
      ...toRefs(state),
      columns,
      filters,
      onRequest,
      getPaginationLabel,
      sendFilters,
      openCreateEditNiche,
      openDeleteNiche,
      goToNicheInfo
    }
  }
})
</script>