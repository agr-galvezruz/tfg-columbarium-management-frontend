<template>
  <filter-component v-if="!personId && !reservationId && !fromMap" :filters="filters" @update-filters="sendFilters" />

  <q-table
    class="full-width sticky-header"
    flat
    :loading="loading"
    :loading-label="$t('general_texts.loading')"
    :no-data-label="$t('pages.reservation.no_data')"
    :rows="rows"
    :columns="columns"
    row-key="dni"
    v-model:pagination="pagination"
    :rows-per-page-options="[0]"
    @request="onRequest"
    @row-click="goToReservationInfo"
    :pagination-label="getPaginationLabel"
    :hide-pagination="!!reservationId">

    <template v-slot:header-cell="props">
      <q-th :props="props" class="q-table-header-text">{{ props.col.label }}</q-th>
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
            <q-item clickable @click="openCreateEditReservation(props.row)" v-close-popup>
              <q-item-section>
                <div class="flex items-center gap-5">
                  <q-icon color="blue" size="24px" name="drive_file_rename_outline"/>
                  <span class="action-class">{{ $t('general_texts.edit') }}</span>
                </div>
              </q-item-section>
            </q-item>
            <q-item clickable @click="openDeleteReservation(props.row)" v-close-popup>
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
import FilterComponent from 'src/components/filter/filter-component'
import { formatDbToEsDate } from 'src/helpers/formatDate'
import { concatFilters } from 'src/helpers/concatFilters'
import { useReservationStore } from 'stores/reservation'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import bus from 'boot/bus'

export default defineComponent({
  components: {
    FilterComponent
  },
  props: {
    reservationId: {
      type: String,
      default: null
    },
    personId: {
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
      bus.$on('refreshReservationData', () => {
        fetchReservationData(state.pagination.page)
      })
      bus.$on('refreshReservationDataDeleted', () => {
        if (state.pagination.rowsNumber === 1 && state.pagination.page > 1) {
          fetchReservationData(state.pagination.page - 1)
        } else {
          fetchReservationData(state.pagination.page)
        }
      })
      fetchReservationData()
    })

    onBeforeUnmount(() => {
      bus.$off('refreshReservationData');
      bus.$off('refreshReservationDataDeleted');
    })

    const { t } = useI18n({})
    const router = useRouter()
    const reservationStore = useReservationStore()

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
      { name: 'startDate', label: t('pages.reservation.start_date'), field: row => formatDbToEsDate(row.startDate), align: 'left' },
      { name: 'endDate', label: t('pages.reservation.end_date'), field: row => formatDbToEsDate(row.endDate), align: 'left',},
      { name: 'urn', label: t('pages.reservation.urn'), field:  row => `${row.urn.internalCode}`, align: 'left',},
      { name: 'person', label: t('pages.reservation.person'), field:  row => `${row.person.lastName1} ${row.person.lastName2} ${row.person.firstName}`, align: 'left',},
      { name: 'description', label: t('pages.reservation.description'), field: 'description', align: 'left',},
      { name: 'actions', label: '', align: 'center', style: 'width:42px'},
    ]

    if (props.fromMap) {
      delete columns[2]
      delete columns[5]
    }

    if (props.personId) {
      delete columns[3]
    }

    const filters = [
      { key: 'startDate', label: t('pages.reservation.start_date'), icon: 'today', type: 'date', operator: 'like'},
      { key: 'endDate', label: t('pages.reservation.end_date'), icon: 'event', type: 'date', operator: 'like'},
      { key: 'urn', label: t('pages.reservation.urn'), icon: 'grid_view', type: 'input', operator: 'like'},
      { key: 'person', label: t('pages.reservation.person'), icon: 'person', type: 'input', operator: 'like'},
      { key: 'description', label: t('pages.reservation.description'), icon: 'description', type: 'input', operator: 'like'}
    ]

    const getPaginationLabel = (first, end, total) => {
      return `${t('general_texts.pagination_records')}: ${first} - ${end} ${t('general_texts.pagination_of')} ${total}`
    }

    const fetchReservationData = async (page = 1) => {
      try {
        state.loading = true
        let data = null
        if (props.reservationId) {
          data = await reservationStore.getReservationById(`${props.reservationId}?includePerson=true&includeUrn=true`)
        } else if (props.personId) {
          data = await reservationStore.getAllReservationsFromPerson(`${concatFilters(state.urlFilters, page)}&personId=${props.personId}`)
        } else if (props.urnId) {
          data = await reservationStore.getAllReservationsFromUrn(`${concatFilters(state.urlFilters, page)}&urnId=${props.urnId}&includePerson=true`)
        } else {
          data = await reservationStore.getAllReservations(`${concatFilters(state.urlFilters, page)}&includePerson=true`)
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
      fetchReservationData(state.pagination.page)
    }

    const sendFilters = (filters) => {
      state.urlFilters = filters
      fetchReservationData()
    }

    const goToReservationInfo = (evt, row) => {
      router.push({ path: `/management/reservation/${row.id}` })
    }

    const openCreateEditReservation = (data = null) => {
      bus.$emit('openCreateEditReservationModal', data)
    }

    const openDeleteReservation = (data) => {
      bus.$emit('openDeleteReservationModal', data)
    }

    return {
      ...toRefs(state),
      columns,
      filters,
      onRequest,
      getPaginationLabel,
      sendFilters,
      openCreateEditReservation,
      openDeleteReservation,
      goToReservationInfo
    }
  }
})
</script>
