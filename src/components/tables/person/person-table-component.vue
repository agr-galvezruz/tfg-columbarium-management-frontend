<template>
  <filter-component :filters="filters" @update-filters="sendFilters" />

  <q-table
    class="full-width sticky-header"
    flat
    :loading="loading"
    :loading-label="$t('general_texts.loading')"
    :no-data-label="$t('pages.person.no_data')"
    :rows="rows"
    :columns="columns"
    row-key="dni"
    v-model:pagination="pagination"
    :rows-per-page-options="[0]"
    @request="onRequest"
    @row-click="goToPersonInfo"
    :pagination-label="getPaginationLabel">

    <template v-slot:header-cell="props">
      <q-th :props="props" class="q-table-header-text">{{ props.col.label }}</q-th>
    </template>

    <template v-slot:body-cell-casketId="props">
      <q-td :props="props">
        <q-icon v-if="props.row.casketId" color="green" size="21px" name="check_circle"/>
      </q-td>
    </template>

    <template v-slot:body-cell-actions="props">
      <q-td :props="props" @click.stop="null">
        <custom-button padding="none" round color="secondary" flat no-caps icon="more_vert">
          <q-menu anchor="top left" self="top right">
            <q-item clickable @click="openCreateEditPerson(props.row)" v-close-popup>
              <q-item-section>
                <div class="flex items-center gap-5">
                  <q-icon color="blue" size="24px" name="drive_file_rename_outline"/>
                  <span class="action-class">{{ $t('general_texts.edit') }}</span>
                </div>
              </q-item-section>
            </q-item>
            <q-item clickable @click="openDeletePerson(props.row)" v-close-popup>
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
import { usePersonStore } from 'stores/person'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import bus from 'boot/bus'

export default defineComponent({
  components: {
    FilterComponent
  },
  setup() {
    onMounted(() => {
      bus.$on('refreshPersonData', () => {
        fetchPersonData(state.pagination.page)
      })
      bus.$on('refreshPersonDataDeleted', () => {
        if (state.pagination.rowsNumber === 1 && state.pagination.page > 1) {
          fetchPersonData(state.pagination.page - 1)
        } else {
          fetchPersonData(state.pagination.page)
        }
      })
      fetchPersonData()
    })

    onBeforeUnmount(() => {
      bus.$off('refreshPersonData');
      bus.$off('refreshPersonDataDeleted');
    })

    const { t } = useI18n({})
    const router = useRouter()
    const personStore = usePersonStore()

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
      { name: 'dni', label: t('pages.person.dni'), field: 'dni', align: 'left' },
      { name: 'fullName', label: t('pages.person.full_name'), field: row => `${row.lastName1} ${row.lastName2} ${row.firstName}`, align: 'left' },
      { name: 'address', label: t('pages.person.address'), field: 'address', align: 'left',},
      { name: 'state', label: t('pages.person.state'), field: 'state', align: 'left',},
      { name: 'city', label: t('pages.person.city'), field: 'city', align: 'left',},
      { name: 'postalCode', label: t('pages.person.postal_code'), field: 'postalCode', align: 'left',},
      { name: 'phone', label: t('pages.person.phone'), field: 'phone', align: 'left',},
      { name: 'casketId', label: t('pages.person.in_casket'), align: 'center'},
      { name: 'actions', label: '', align: 'center', style: 'width:42px'},
    ]

    const filters = [
      { key: 'dni', label: t('pages.person.dni'), icon: 'badge', type: 'input', operator: 'like'},
      { key: 'firstName', label: t('pages.person.first_name'), icon: 'account_circle', type: 'input', operator: 'like'},
      { key: 'lastName1', label: t('pages.person.last_name1'), icon: 'contact_page', type: 'input', operator: 'like'},
      { key: 'lastName2', label: t('pages.person.last_name2'), icon: 'contact_page', type: 'input', operator: 'like'},
      { key: 'address', label: t('pages.person.address'), icon: 'place', type: 'input', operator: 'like'},
      { key: 'city', label: t('pages.person.city'), icon: 'location_city', type: 'input', operator: 'like'},
      { key: 'state', label: t('pages.person.state'), icon: 'flag', type: 'input', operator: 'like'},
      { key: 'postalCode', label: t('pages.person.postal_code'), icon: 'tag', type: 'input', operator: 'like'},
      { key: 'phone', label: t('pages.person.phone'), icon: 'phone', type: 'input', operator: 'like'},
      { key: 'casketId', label: t('pages.person.in_casket'), icon: 'takeout_dining', type: 'select', operator: 'null', options: [
        { key: 'false', label: 'Si', icon: 'check_circle_outline' },
        { key: 'true', label: 'No', icon: 'highlight_off' },
      ]}
    ]

    const getPaginationLabel = (first, end, total) => {
      return `${t('general_texts.pagination_records')}: ${first} - ${end} ${t('general_texts.pagination_of')} ${total}`
    }

    const fetchPersonData = async (page = 1) => {
      try {
        state.loading = true
        const data = await personStore.getAllPeople(concatFilters(state.urlFilters, page))
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
      fetchPersonData(state.pagination.page)
    }

    const sendFilters = (filters) => {
      state.urlFilters = filters
      fetchPersonData()
    }

    const goToPersonInfo = (evt, row) => {
      router.push({ path: `/record/person/${row.id}` })
    }

    const openCreateEditPerson = (data = null) => {
      bus.$emit('openCreateEditPersonModal', data)
    }

    const openDeletePerson = (data) => {
      bus.$emit('openDeletePersonModal', data)
    }

    return {
      ...toRefs(state),
      columns,
      filters,
      onRequest,
      getPaginationLabel,
      sendFilters,
      openCreateEditPerson,
      openDeletePerson,
      goToPersonInfo
    }
  }
})
</script>
