<template>
  <filter-component :filters="filters" @update-filters="sendFilters" />

  <q-table
    class="full-width sticky-header"
    flat
    :loading="loading"
    :loading-label="$t('general_texts.loading')"
    :no-data-label="$t('pages.room.no_data')"
    :rows="rows"
    :columns="columns"
    row-key="dni"
    v-model:pagination="pagination"
    :rows-per-page-options="[0]"
    @request="onRequest"
    @row-click="goToRoomInfo"
    :pagination-label="getPaginationLabel">

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
            <q-item clickable @click="openCreateEditRoom(props.row)" v-close-popup>
              <q-item-section>
                <div class="flex items-center gap-5">
                  <q-icon color="blue" size="24px" name="drive_file_rename_outline"/>
                  <span class="action-class">{{ $t('general_texts.edit') }}</span>
                </div>
              </q-item-section>
            </q-item>
            <q-item clickable @click="openDeleteRoom(props.row)" v-close-popup>
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
import { concatFilters } from 'src/helpers/concatFilters'
import { useAuthenticationStore } from 'stores/authentication'
import { useRoomStore } from 'stores/room'
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
      bus.$on('refreshRoomData', () => {
        fetchRoomData(state.pagination.page)
      })
      bus.$on('refreshRoomDataDeleted', () => {
        if (state.pagination.rowsNumber === 1 && state.pagination.page > 1) {
          fetchRoomData(state.pagination.page - 1)
        } else {
          fetchRoomData(state.pagination.page)
        }
      })
      fetchRoomData()
    })

    onBeforeUnmount(() => {
      bus.$off('refreshRoomData')
      bus.$off('refreshRoomDataDeleted')
    })

    const { t } = useI18n({})
    const router = useRouter()
    const roomStore = useRoomStore()
    const authenticationStore = useAuthenticationStore()

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
      { name: 'internalCode', label: t('pages.room.internal_code'), field: 'internalCode', align: 'left' },
      { name: 'location', label: t('pages.room.location'), field: 'location', align: 'left',},
      { name: 'description', label: t('pages.room.description'), field: 'description', align: 'left',},
    ]

    if (authenticationStore.isAdmin) {
      columns.push({ name: 'actions', label: '', align: 'center', style: 'width:42px'})
    }

    const filters = [
      { key: 'internalCode', label: t('pages.room.internal_code'), icon: 'tag', type: 'input', operator: 'like'},
      { key: 'location', label: t('pages.room.location'), icon: 'place', type: 'input', operator: 'like'},
      { key: 'description', label: t('pages.room.description'), icon: 'description', type: 'input', operator: 'like'}
    ]

    const getPaginationLabel = (first, end, total) => {
      return `${t('general_texts.pagination_records')}: ${first} - ${end} ${t('general_texts.pagination_of')} ${total}`
    }

    const fetchRoomData = async (page = 1) => {
      try {
        state.loading = true
        let data = null
        if (props.whereId) {
          data = await roomStore.getRoomsFromBuilding(`${concatFilters(state.urlFilters, page)}&buildingId=${props.whereId}`)
        } else {
          data = await roomStore.getAllRooms(`${concatFilters(state.urlFilters, page)}`)
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
      fetchRoomData(state.pagination.page)
    }

    const sendFilters = (filters) => {
      state.urlFilters = filters
      fetchRoomData()
    }

    const goToRoomInfo = (evt, row) => {
      router.push({ path: `/crypt/room/${row.id}` })
    }

    const openCreateEditRoom = (data = null) => {
      bus.$emit('openCreateEditRoomModal', data)
    }

    const openDeleteRoom = (data) => {
      bus.$emit('openDeleteRoomModal', data)
    }

    return {
      ...toRefs(state),
      columns,
      filters,
      onRequest,
      getPaginationLabel,
      sendFilters,
      openCreateEditRoom,
      openDeleteRoom,
      goToRoomInfo
    }
  }
})
</script>