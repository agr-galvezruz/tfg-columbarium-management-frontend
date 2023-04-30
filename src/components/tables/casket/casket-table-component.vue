<template>
  <filter-component v-if="!casketId" :filters="filters" @update-filters="sendFilters" />

  <q-table
    class="full-width sticky-header"
    flat
    :loading="loading"
    :loading-label="$t('general_texts.loading')"
    :no-data-label="$t('pages.casket.no_data')"
    :rows="rows"
    :columns="columns"
    row-key="id"
    v-model:pagination="pagination"
    :rows-per-page-options="[0]"
    @request="onRequest"
    @row-click="goToCasketInfo"
    :pagination-label="getPaginationLabel"
    :hide-pagination="!!casketId" >

    <template v-slot:header-cell="props">
      <q-th :props="props" class="q-table-header-text">{{ props.col.label }}</q-th>
    </template>

    <template v-slot:body-cell-people="props">
      <q-td :props="props">
        <div class="flex no-wrap column gap-5">
          <div v-for="person in props.row.people" :key="person.dni">
            {{ `${person.dni} - ${person.lastName1} ${person.lastName2} ${person.firstName}` }}
          </div>
        </div>
      </q-td>
    </template>

    <template v-slot:body-cell-actions="props">
      <q-td :props="props" @click.stop="null">
        <custom-button padding="none" round color="secondary" flat no-caps icon="more_vert">
          <q-menu anchor="top left" self="top right">
            <q-item clickable @click="openCreateEditCasket(props.row)" v-close-popup>
              <q-item-section>
                <div class="flex items-center gap-5">
                  <q-icon color="blue" size="24px" name="drive_file_rename_outline"/>
                  <span class="action-class">{{ $t('general_texts.edit') }}</span>
                </div>
              </q-item-section>
            </q-item>
            <q-item clickable @click="openDeleteCasket(props.row)" v-close-popup>
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
import { useCasketStore } from 'stores/casket'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import bus from 'boot/bus'

export default defineComponent({
  components: {
    FilterComponent
  },
  props: {
    casketId: {
      type: String,
      default: null
    }
  },
  setup(props) {
    onMounted(() => {
      bus.$on('refreshCasketData', () => {
        fetchCasketData(state.pagination.page)
      })
      bus.$on('refreshCasketDataDeleted', () => {
        if (state.pagination.rowsNumber === 1 && state.pagination.page > 1) {
          fetchCasketData(state.pagination.page - 1)
        } else {
          fetchCasketData(state.pagination.page)
        }
      })
      fetchCasketData()
    })

    onBeforeUnmount(() => {
      bus.$off('refreshCasketData');
      bus.$off('refreshCasketDataDeleted');
    })

    const { t } = useI18n({})
    const router = useRouter()
    const casketStore = useCasketStore()

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
      { name: 'people', label: t('pages.casket.people_in_casket'), align: 'left' },
      { name: 'description', label: t('pages.casket.description'), field: 'description', align: 'left' },
      { name: 'actions', label: '', align: 'center', style: 'width:42px'},
    ]

    const filters = [
      { key: 'people', label: t('pages.casket.people'), icon: 'people', type: 'input', operator: 'like' },
      { key: 'description', label: t('pages.casket.description'), icon: 'description', type: 'input', operator: 'like'},
    ]

    const getPaginationLabel = (first, end, total) => {
      return `${t('general_texts.pagination_records')}: ${first} - ${end} ${t('general_texts.pagination_of')} ${total}`
    }

    const fetchCasketData = async (page = 1) => {
      try {
        state.loading = true
        let data = null
        if (props.casketId) {
          data = await casketStore.getCasketById(`${props.casketId}?includePeople=true`)
        } else {
          data = await casketStore.getAllCaskets(`${concatFilters(state.urlFilters, page)}&includePeople=true`)
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
      fetchCasketData(state.pagination.page)
    }

    const sendFilters = (filters) => {
      state.urlFilters = filters
      fetchCasketData()
    }

    const goToCasketInfo = (evt, row) => {
      router.push({ path: `/record/casket/${row.id}` })
    }

    const openCreateEditCasket = (data = null) => {
      bus.$emit('openCreateEditCasketModal', data)
    }

    const openDeleteCasket = (data) => {
      bus.$emit('openDeleteCasketModal', data)
    }

    return {
      ...toRefs(state),
      columns,
      filters,
      onRequest,
      getPaginationLabel,
      sendFilters,
      openCreateEditCasket,
      openDeleteCasket,
      goToCasketInfo
    }
  }
})
</script>
