<template>
  <filter-component v-if="!casketId && !urnId" :filters="filters" @update-filters="sendFilters" />

  <q-table
    class="full-width sticky-header"
    flat
    :loading="loading"
    :loading-label="$t('general_texts.loading')"
    :no-data-label="$t('pages.relocation.no_data')"
    :rows="rows"
    :columns="columns"
    row-key="id"
    v-model:pagination="pagination"
    :rows-per-page-options="[0]"
    @request="onRequest"
    @row-click="goToRelocationInfo"
    :pagination-label="getPaginationLabel"
    :hide-pagination="!!casketId || !!urnId">

    <template v-slot:header-cell="props">
      <q-th :props="props" class="q-table-header-text">{{ props.col.label }}</q-th>
    </template>

    <template v-slot:body-cell-casket="props">
      <q-td :props="props">
        <div class="flex no-wrap column gap-5">
          <div v-for="person in props.row.casket.people" :key="person">
            {{ `${person.dni} - ${person.lastName1} ${person.lastName2} ${person.firstName}` }}
          </div>
        </div>
      </q-td>
    </template>

    <template v-slot:body-cell-description="props">
      <q-td :props="props">
        <div v-html="props.row.description"></div>
      </q-td>
    </template>

    <template v-slot:body-cell-actions="props">
      <q-td :props="props" @click.stop="null">
        <custom-button padding="none" round color="secondary" flat no-caps icon="more_vert">
          <q-menu anchor="top left" self="top right">
            <q-item clickable @click="openCreateEditRelocation(props.row)" v-close-popup>
              <q-item-section>
                <div class="flex items-center gap-5">
                  <q-icon color="blue" size="24px" name="drive_file_rename_outline"/>
                  <span class="action-class">{{ $t('general_texts.edit') }}</span>
                </div>
              </q-item-section>
            </q-item>
            <q-item clickable @click="openDeleteRelocation(props.row)" v-close-popup>
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
import { useRelocationStore } from 'stores/relocation'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import bus from 'boot/bus'
import { formatDbToEsDate } from 'src/helpers/formatDate'

export default defineComponent({
  components: {
    FilterComponent
  },
  props: {
    casketId: {
      type: String,
      default: null
    },
    urnId: {
      type: String,
      default: null
    },
    fromMap: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    onMounted(() => {
      bus.$on('refreshRelocationData', () => {
        fetchRelocationData(state.pagination.page)
      })
      bus.$on('refreshRelocationDataDeleted', () => {
        if (state.pagination.rowsNumber === 1 && state.pagination.page > 1) {
          fetchRelocationData(state.pagination.page - 1)
        } else {
          fetchRelocationData(state.pagination.page)
        }
      })
      fetchRelocationData()
    })

    onBeforeUnmount(() => {
      bus.$off('refreshRelocationData');
      bus.$off('refreshRelocationDataDeleted');
    })

    const { t } = useI18n({})
    const router = useRouter()
    const relocationStore = useRelocationStore()

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
      { name: 'startDate', label: t('pages.relocation.date'), field: row => formatDbToEsDate(row.startDate), align: 'left' },
      { name: 'endDate', label: t('pages.relocation.end_date'), field: row => formatDbToEsDate(row.endDate) || '-', align: 'left' },
      { name: 'urn', label: t('pages.relocation.urn_id'), field: row => row.urn.internalCode, align: 'left' },
      { name: 'casket', label: t('pages.deposit.casket'), align: 'left',},
      { name: 'description', label: t('pages.relocation.description'), field: 'description', align: 'left' },
      { name: 'actions', label: '', align: 'center', style: 'width:42px'},
    ]

    if (props.fromMap) {
      delete columns[2]
      delete columns[5]
    }

    const filters = [
      { key: 'startDate', label: t('pages.relocation.date'), icon: 'today', type: 'date', operator: 'like'},
      { key: 'endDate', label: t('pages.relocation.end_date'), icon: 'event', type: 'date', operator: 'like'},
      { key: 'urn', label: t('pages.relocation.urn_id'), icon: 'grid_view', type: 'input', operator: 'like'},
      { key: 'casket', label: t('pages.deposit.casket'), icon: 'takeout_dining', type: 'input', operator: 'like'},
      { key: 'description', label: t('pages.relocation.description'), icon: 'description', type: 'input', operator: 'like'},
    ]

    const getPaginationLabel = (first, end, total) => {
      return `${t('general_texts.pagination_records')}: ${first} - ${end} ${t('general_texts.pagination_of')} ${total}`
    }

    const fetchRelocationData = async (page = 1) => {
      try {
        state.loading = true
        let data = null
        if (props.urnId) {
          data = await relocationStore.getAllRelocationsByUrn(props.urnId)
        } else if (props.casketId) {
          data = await relocationStore.getAllRelocationsByCasket(props.casketId)
        } else {
          data = await relocationStore.getAllRelocations(`${concatFilters(state.urlFilters, page)}`)
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
      fetchRelocationData(state.pagination.page)
    }

    const sendFilters = (filters) => {
      state.urlFilters = filters
      fetchRelocationData()
    }

    const goToRelocationInfo = (evt, row) => {
      router.push({ path: `/management/relocation/${row.id}` })
    }

    const openCreateEditRelocation = (data = null) => {
      bus.$emit('openCreateEditRelocationModal', data)
    }

    const openDeleteRelocation = (data) => {
      bus.$emit('openDeleteRelocationModal', data)
    }

    return {
      ...toRefs(state),
      columns,
      filters,
      onRequest,
      getPaginationLabel,
      sendFilters,
      openCreateEditRelocation,
      openDeleteRelocation,
      goToRelocationInfo
    }
  }
})
</script>
