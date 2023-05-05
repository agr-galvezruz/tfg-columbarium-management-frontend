<template>
  <filter-component v-if="!reservationId && !personId && !casketId" :filters="filters" @update-filters="sendFilters" />

  <q-table
    class="full-width sticky-header"
    flat
    :loading="loading"
    :loading-label="$t('general_texts.loading')"
    :no-data-label="$t('pages.deposit.no_data')"
    :rows="rows"
    :columns="columns"
    row-key="dni"
    v-model:pagination="pagination"
    :rows-per-page-options="[0]"
    @request="onRequest"
    @row-click="goToDepositInfo"
    :pagination-label="getPaginationLabel"
    :hide-pagination="!!reservationId || !!personId || !!casketId">

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
            <q-item clickable @click="openCreateEditDeposit(props.row)" v-close-popup>
              <q-item-section>
                <div class="flex items-center gap-5">
                  <q-icon color="blue" size="24px" name="drive_file_rename_outline"/>
                  <span class="action-class">{{ $t('general_texts.edit') }}</span>
                </div>
              </q-item-section>
            </q-item>
            <q-item clickable @click="openDeleteDeposit(props.row)" v-close-popup>
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
import { useDepositStore } from 'stores/deposit'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import bus from 'boot/bus'
import { formatDbToEsDate } from 'src/helpers/formatDate'

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
    casketId: {
      type: String,
      default: null
    }
  },
  setup(props) {
    onMounted(() => {
      bus.$on('refreshDepositData', () => {
        fetchDepositData(state.pagination.page)
      })
      bus.$on('refreshDepositDataDeleted', () => {
        if (state.pagination.rowsNumber === 1 && state.pagination.page > 1) {
          fetchDepositData(state.pagination.page - 1)
        } else {
          fetchDepositData(state.pagination.page)
        }
      })
      fetchDepositData()
    })

    onBeforeUnmount(() => {
      bus.$off('refreshDepositData');
      bus.$off('refreshDepositDataDeleted');
    })

    const { t } = useI18n({})
    const router = useRouter()
    const depositStore = useDepositStore()

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
      { name: 'startDate', label: t('pages.deposit.resume_date'), field: row => formatDbToEsDate(row.startDate), align: 'left' },
      { name: 'endDate', label: t('pages.deposit.resume_end_date'), field: row => formatDbToEsDate(row.endDate) || '-', align: 'left' },
      { name: 'urn', label: t('pages.reservation.urn'), field: row => row.reservation.urn.internalCode, align: 'left' },
      { name: 'depositPerson', label: t('pages.deposit.deposit_person'), field: row => `${row.person.lastName1} ${row.person.lastName2} ${row.person.firstName}`, align: 'left' },
      { name: 'deceasedRelationship', label: t('pages.deposit.deceased_relationship'), field: 'deceasedRelationship', align: 'left',},
      { name: 'casket', label: t('pages.deposit.casket'), align: 'left',},
      { name: 'description', label: t('pages.deposit.description'), field: 'description', align: 'left',},
      { name: 'actions', label: '', align: 'center', style: 'width:42px'},
    ]

    if (props.casketId) {
      delete columns[4]
      // columns.splice(1, 0, { name: 'endDate', label: t('pages.deposit.resume_end_date'), field: row => formatDbToEsDate(row.endDate) || '-', align: 'left' },);
    }

    const filters = [
      { key: 'startDate', label: t('pages.deposit.resume_date'), icon: 'event', type: 'date', operator: 'like'},
      { key: 'person', label: t('pages.deposit.deposit_person'), icon: 'person', type: 'input', operator: 'like'},
      { key: 'urn', label: t('pages.reservation.urn'), icon: 'grid_view', type: 'input', operator: 'like'},
      { key: 'deceasedRelationship', label: t('pages.deposit.deceased_relationship'), icon: 'social_distance', type: 'input', operator: 'like'},
      { key: 'casket', label: t('pages.deposit.casket'), icon: 'takeout_dining', type: 'input', operator: 'like'},
      { key: 'description', label: t('pages.deposit.description'), icon: 'description', type: 'input', operator: 'like'}
    ]

    const getPaginationLabel = (first, end, total) => {
      return `${t('general_texts.pagination_records')}: ${first} - ${end} ${t('general_texts.pagination_of')} ${total}`
    }

    const fetchDepositData = async (page = 1) => {
      try {
        state.loading = true
        let data = null
        if (props.casketId) {
          data = await depositStore.getDepositByCasketId(`${props.casketId}?includePerson=true&includeCasket=true&includeReservation=true`)
        } else if (props.personId) {
          data = await depositStore.getDepositByPersonId(`${props.personId}?includePerson=true&includeCasket=true&includeReservation=true`)
        } else if (props.reservationId) {
          data = await depositStore.getDepositByReservationId(`${props.reservationId}?includePerson=true&includeCasket=true&includeReservation=true`)
        } else {
          data = await depositStore.getAllDeposits(`${concatFilters(state.urlFilters, page)}&includePerson=true`)
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
      fetchDepositData(state.pagination.page)
    }

    const sendFilters = (filters) => {
      state.urlFilters = filters
      fetchDepositData()
    }

    const goToDepositInfo = (evt, row) => {
      router.push({ path: `/management/deposit/${row.id}` })
    }

    const openCreateEditDeposit = (data = null) => {
      bus.$emit('openCreateEditDepositModal', data)
    }

    const openDeleteDeposit = (data) => {
      bus.$emit('openDeleteDepositModal', data)
    }

    return {
      ...toRefs(state),
      columns,
      filters,
      onRequest,
      getPaginationLabel,
      sendFilters,
      openCreateEditDeposit,
      openDeleteDeposit,
      goToDepositInfo
    }
  }
})
</script>
