<template>
  <filter-component :filters="filters" @update-filters="sendFilters" />

  <q-table
    class="full-width sticky-header"
    flat
    :loading="loading"
    :loading-label="$t('general_texts.loading')"
    :no-data-label="$t('pages.urn.no_data')"
    :rows="rows"
    :columns="columns"
    row-key="id"
    v-model:pagination="pagination"
    :rows-per-page-options="[0]"
    @request="onRequest"
    :pagination-label="getPaginationLabel">

    <template v-slot:header-cell="props">
      <q-th :props="props" class="q-table-header-text">{{ props.col.label }}</q-th>
    </template>

    <template v-slot:body-cell-status="props">
      <q-td :props="props">
        <status-chip-component :status="props.row.status" />
      </q-td>
    </template>

    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <custom-button padding="none" round color="secondary" flat no-caps icon="more_vert">
          <q-menu anchor="top left" self="top right">
            <q-item clickable @click="openCreateEditUrn(props.row)" v-close-popup>
              <q-item-section>
                <div class="flex items-center gap-5">
                  <q-icon color="blue" size="24px" name="drive_file_rename_outline"/>
                  <span class="action-class">{{ $t('general_texts.edit') }}</span>
                </div>
              </q-item-section>
            </q-item>
            <q-item clickable @click="openDeleteUrn(props.row)" v-close-popup>
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
import { defineComponent, onBeforeUnmount, onMounted, reactive, toRefs } from 'vue'
import StatusChipComponent from 'src/components/status-chip/status-chip-component'
import FilterComponent from 'src/components/filter/filter-component'
import { concatFilters } from 'src/helpers/concatFilters'
import { useUrnStore } from 'stores/urn'
import { useI18n } from 'vue-i18n'
import bus from 'boot/bus'

export default defineComponent({
  components: {
    FilterComponent,
    StatusChipComponent
  },
  props: {
    whereId: {
      type: String,
      default: null
    }
  },
  setup(props) {
    onMounted(() => {
      bus.$on('refreshUrnData', () => {
        fetchUrnData(state.pagination.page)
      })
      bus.$on('refreshUrnDataDeleted', () => {
        if (state.pagination.rowsNumber === 1 && state.pagination.page > 1) {
          fetchUrnData(state.pagination.page - 1)
        } else {
          fetchUrnData(state.pagination.page)
        }
      })
      fetchUrnData()
    })

    onBeforeUnmount(() => {
      bus.$off('refreshUrnData')
      bus.$off('refreshUrnDataDeleted')
    })

    const { t } = useI18n({})
    const urnStore = useUrnStore()

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
      { name: 'internalCode', label: t('pages.urn.internal_code'), field: 'internalCode', align: 'left' },
      { name: 'status', label: t('pages.urn.status'), field: 'status', align: 'left' },
      { name: 'description', label: t('pages.urn.description'), field: 'description', align: 'left',},
      { name: 'actions', label: '', align: 'center', style: 'width:42px'},
    ]

    const filters = [
      { key: 'internalCode', label: t('pages.urn.internal_code'), icon: 'tag', type: 'input', operator: 'like'},
      { key: 'description', label: t('pages.urn.description'), icon: 'description', type: 'input', operator: 'like'},
      { key: 'status', label: t('pages.urn.status'), icon: 'assignment', type: 'select', operator: 'eq', options: [
        { key: 'AVAILABLE', label: 'Disponible', icon: 'check_circle_outline' },
        { key: 'RESERVED', label: 'Reservado', icon: 'error_outline' },
        { key: 'OCCUPIED', label: 'Ocupado', icon: 'remove_circle_outline' },
        { key: 'DISABLED', label: 'Inhabilitado', icon: 'hide_source' },
      ]}
    ]

    const getPaginationLabel = (first, end, total) => {
      return `${t('general_texts.pagination_records')}: ${first} - ${end} ${t('general_texts.pagination_of')} ${total}`
    }

    const fetchUrnData = async (page = 1) => {
      try {
        state.loading = true
        let data = null
        if (props.whereId) {
          data = await urnStore.getUrnsFromNiche(`${concatFilters(state.urlFilters, page)}&includeNiche=true&includeRow=true&includeRoom=true&nicheId=${props.whereId}`)
        } else {
          data = await urnStore.getAllUrns(`${concatFilters(state.urlFilters, page)}&includeNiche=true&includeRow=true&includeRoom=true`)
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
      fetchUrnData(state.pagination.page)
    }

    const sendFilters = (filters) => {
      state.urlFilters = filters
      fetchUrnData()
    }

    const openCreateEditUrn = (data = null) => {
      bus.$emit('openCreateEditUrnModal', data)
    }

    const openDeleteUrn = (data) => {
      bus.$emit('openDeleteUrnModal', data)
    }

    return {
      ...toRefs(state),
      columns,
      filters,
      onRequest,
      getPaginationLabel,
      sendFilters,
      openCreateEditUrn,
      openDeleteUrn
    }
  }
})
</script>