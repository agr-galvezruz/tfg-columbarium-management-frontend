<template>
  <div class="full-container flex column no-wrap gap-10">
    <title-component :title="$t('pages.person.title')">
      <template v-slot:button>
        <custom-button :unelevated="false" icon="add_circle_outline" :label="$t('pages.person.add_person')" color="secondary" />
      </template>
    </title-component>

    <filter-component :filters="filters" @update-filters="test" />

    <q-table
      class="full-width sticky-header"
      flat
      :loading="loading"
      :loading-label="$t('general_texts.loading')"
      :no-data-label="$t('general_texts.no_data')"
      :rows="rows"
      :columns="columns"
      row-key="dni"
      v-model:pagination="pagination"
      :rows-per-page-options="[0]"
      @request="onRequest"
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
        <q-td :props="props">
          <custom-button padding="none" round color="secondary" flat no-caps icon="more_vert">
            <q-menu anchor="top left" self="top right">
              <q-item clickable>
                <q-item-section>
                  <div class="flex items-center gap-5">
                    <q-icon color="blue" size="24px" name="drive_file_rename_outline"/>
                    <span class="action-class">{{ $t('general_texts.edit') }}</span>
                  </div>
                </q-item-section>
              </q-item>
              <q-item clickable>
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
  </div>
</template>

<script>
import TitleComponent from 'src/components/title/title-component'
import FilterComponent from 'src/components/filter/filter-component'
import { concatFilters } from 'src/helpers/concatFilters'
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { usePersonStore } from 'stores/person'
import { useI18n } from 'vue-i18n';

export default defineComponent({
  components: {
    TitleComponent,
    FilterComponent
  },
  setup() {
    onMounted(() => {
      fetchPersonData()
    })

    const { t } = useI18n({})
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
      { name: 'city', label: t('pages.person.city'), field: 'city', align: 'left',},
      { name: 'state', label: t('pages.person.state'), field: 'state', align: 'left',},
      { name: 'phone', label: t('pages.person.phone'), field: 'phone', align: 'left',},
      { name: 'casketId', label: t('pages.person.in_casket'), align: 'center'},
      { name: 'actions', label: '', align: 'center', style: 'width:42px'},
    ]

    const filters = [
      { key: 'dni', label: t('pages.person.dni'), icon: 'badge', type: 'input', operator: 'like'},
      { key: 'firstName', label: t('pages.person.firstName'), icon: 'account_circle', type: 'input', operator: 'like'},
      { key: 'lastName1', label: t('pages.person.lastName1'), icon: 'contact_page', type: 'input', operator: 'like'},
      { key: 'lastName2', label: t('pages.person.lastName2'), icon: 'contact_page', type: 'input', operator: 'like'},
      { key: 'address', label: t('pages.person.address'), icon: 'place', type: 'input', operator: 'like'},
      { key: 'city', label: t('pages.person.city'), icon: 'location_city', type: 'input', operator: 'like'},
      { key: 'state', label: t('pages.person.state'), icon: 'flag', type: 'input', operator: 'like'},
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

    const test = (filters) => {
      state.urlFilters = filters
      fetchPersonData()
    }

    return {
      ...toRefs(state),
      columns,
      filters,
      onRequest,
      getPaginationLabel,
      test
    }
  }
})
</script>