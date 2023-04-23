<template>
  <q-table
    class="full-width sticky-header"
    flat
    :loading="loading"
    :loading-label="$t('general_texts.loading')"
    :no-data-label="$t('pages.casket.no_data')"
    :rows="rows"
    :columns="columns"
    row-key="id"
    hide-pagination
    :rows-per-page-options="[0]"
    @row-click="goToCasketInfo">

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
            <!-- <q-item clickable @click="openDeleteCasket(props.row)" v-close-popup>
              <div class="flex items-center gap-5">
                <q-icon color="negative" size="24px" name="delete"/>
                <span class="action-class">{{ $t('general_texts.delete') }}</span>
              </div>
            </q-item> -->
          </q-menu>
        </custom-button>
      </q-td>
    </template>
  </q-table>
</template>

<script>
import { defineComponent, onBeforeUnmount, onMounted, reactive, toRefs } from 'vue'
import { useCasketStore } from 'stores/casket'
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
      bus.$on('refreshCasketData', () => {
        fetchCasketData()
      })
      fetchCasketData()
    })

    onBeforeUnmount(() => {
      bus.$off('refreshCasketData')
    })

    const { t } = useI18n({})
    const router = useRouter()
    const casketStore = useCasketStore()

    const state = reactive({
      loading: false,
      rows: [],
    })

    const columns = [
      { name: 'people', label: t('pages.casket.people_in_casket'), align: 'left' },
      { name: 'description', label: t('pages.casket.description'), field: 'description', align: 'left' },
      { name: 'actions', label: '', align: 'center', style: 'width:42px'},
    ]

    const fetchCasketData = async (page = 1) => {
      try {
        state.loading = true
        const data = await casketStore.getCasket(`${props.whereId}?includePeople=true`)
        state.rows = [data?.data]
        state.loading = false
      } catch (error) {
        state.loading = false
      }
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
      openCreateEditCasket,
      openDeleteCasket,
      goToCasketInfo
    }
  }
})
</script>
