<template>
  <q-table
    class="full-width sticky-header"
    flat
    :loading="loading"
    :loading-label="$t('general_texts.loading')"
    :no-data-label="$t('pages.person.no_data')"
    :rows="rows"
    :columns="columns"
    row-key="dni"
    :rows-per-page-options="[0]"
    hide-pagination
    @row-click="goToPersonInfo">

    <template v-slot:header-cell="props">
      <q-th :props="props" class="q-table-header-text">{{ props.col.label }}</q-th>
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
          </q-menu>
        </custom-button>
      </q-td>
    </template>
  </q-table>
</template>

<script>
import { defineComponent, onBeforeUnmount, onMounted, reactive, toRefs } from 'vue'
import { usePersonStore } from 'stores/person'
import { formatDbToEsDate } from 'src/helpers/formatDate'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import bus from 'boot/bus'

export default defineComponent({
  props: {
    whereId: {
      type: String,
      default: null
    }
  },
  setup(props) {
    onMounted(() => {
      bus.$on('refreshPersonData', () => {
        fetchPersonData()
      })
      fetchPersonData()
    })

    onBeforeUnmount(() => {
      bus.$off('refreshPersonData');
    })

    const { t } = useI18n({})
    const router = useRouter()
    const personStore = usePersonStore()

    const state = reactive({
      loading: false,
      rows: [],
    })

    const columns = [
      { name: 'dni', label: t('pages.person.dni'), field: 'dni', align: 'left' },
      { name: 'deathdate', label: t('pages.person.deathdate'), field: row => formatDbToEsDate(row.deathdate), align: 'left',},
      { name: 'fullName', label: t('pages.person.full_name'), field: row => `${row.lastName1} ${row.lastName2} ${row.firstName}`, align: 'left' },
      { name: 'state', label: t('pages.person.state'), field: 'state', align: 'left',},
      { name: 'city', label: t('pages.person.city'), field: 'city', align: 'left',},
      { name: 'actions', label: '', align: 'center', style: 'width:42px'},
    ]

    const fetchPersonData = async () => {
      try {
        state.loading = true
        const data = await personStore.getAllPeopleInCasket(props.whereId)
        state.rows = data?.data
        state.loading = false
      } catch (error) {
        state.loading = false
      }
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
      openCreateEditPerson,
      openDeletePerson,
      goToPersonInfo
    }
  }
})
</script>
