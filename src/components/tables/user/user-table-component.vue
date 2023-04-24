<template>
  <filter-component :filters="filters" @update-filters="sendFilters" />

  <q-table
    class="full-width sticky-header"
    flat
    :loading="loading"
    :loading-label="$t('general_texts.loading')"
    :no-data-label="$t('pages.user.no_data')"
    :rows="rows"
    :columns="columns"
    row-key="dni"
    v-model:pagination="pagination"
    :rows-per-page-options="[0]"
    @request="onRequest"
    @row-click="goToUserInfo"
    :pagination-label="getPaginationLabel">

    <template v-slot:header-cell="props">
      <q-th :props="props" class="q-table-header-text">{{ props.col.label }}</q-th>
    </template>

    <template v-slot:body-cell-rol="props">
      <q-td :props="props">
        <rol-chip-component :rol="props.row.rol" />
      </q-td>
    </template>

    <template v-slot:body-cell-actions="props">
      <q-td :props="props" @click.stop="null">
        <custom-button padding="none" round color="secondary" flat no-caps icon="more_vert">
          <q-menu anchor="top left" self="top right">
            <q-item clickable @click="openCreateEditUser(props.row)" v-close-popup>
              <q-item-section>
                <div class="flex items-center gap-5">
                  <q-icon color="blue" size="24px" name="drive_file_rename_outline"/>
                  <span class="action-class">{{ $t('general_texts.edit') }}</span>
                </div>
              </q-item-section>
            </q-item>
            <q-item v-if="props.row.id != '0' && props.row.id != currentUserId" clickable @click="openDeleteUser(props.row)" v-close-popup>
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
import RolChipComponent from 'src/components/rol-chip/rol-chip-component'
import { concatFilters } from 'src/helpers/concatFilters'
import { computed, defineComponent, onBeforeUnmount, onMounted, reactive, toRefs } from 'vue'
import { useUserStore } from 'stores/user'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import bus from 'boot/bus'
import { useAuthenticationStore } from 'src/stores/authentication'

export default defineComponent({
  components: {
    FilterComponent,
    RolChipComponent
  },
  setup() {
    onMounted(() => {
      bus.$on('refreshUserData', () => {
        fetchUserData(state.pagination.page)
      })
      bus.$on('refreshUserDataDeleted', () => {
        if (state.pagination.rowsNumber === 1 && state.pagination.page > 1) {
          fetchUserData(state.pagination.page - 1)
        } else {
          fetchUserData(state.pagination.page)
        }
      })
      fetchUserData()
    })

    onBeforeUnmount(() => {
      bus.$off('refreshUserData');
      bus.$off('refreshUserDataDeleted');
    })

    const { t } = useI18n({})
    const router = useRouter()
    const userStore = useUserStore()
    const authenticationStore = useAuthenticationStore()

    const state = reactive({
      currentUserId: computed(() => authenticationStore.getUser.id),
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
      { name: 'id', label: t('pages.user.id'), field: 'id', align: 'left' },
      { name: 'name', label: t('pages.user.name'), field: row => `${row.person.lastName1} ${row.person.lastName2} ${row.person.firstName}`, align: 'left',},
      { name: 'rol', label: t('pages.user.rol'), field: 'rol', align: 'left',},
      { name: 'actions', label: '', align: 'center', style: 'width:42px'},
    ]

    const filters = [
      { key: 'id', label: t('pages.user.id'), icon: 'tag', type: 'input', operator: 'like'},
      { key: 'rol', label: t('pages.user.rol'), icon: 'assignment', type: 'select', operator: 'eq', options: [
        { key: 'ADMIN', label: t('components.rol.admin'), icon: 'verified' },
        { key: 'CONSULTANT', label: t('components.rol.consultant'), icon: 'local_library' }
      ]}
    ]

    const getPaginationLabel = (first, end, total) => {
      return `${t('general_texts.pagination_records')}: ${first} - ${end} ${t('general_texts.pagination_of')} ${total}`
    }

    const fetchUserData = async (page = 1) => {
      try {
        state.loading = true
        const data = await userStore.getAllUsers(`${concatFilters(state.urlFilters, page)}&includePerson=true`)
        state.rows = data?.data
        state.pagination = {
          page: data.meta.current_page,
          rowsPerPage: data.meta.per_page,
          rowsNumber: data.meta.total
        }
        state.loading = false
      } catch (error) {
        state.loading = false
        router.replace({ name: 'login' })
      }
    }

    const onRequest = (props) => {
      state.pagination = props.pagination
      fetchUserData(state.pagination.page)
    }

    const sendFilters = (filters) => {
      state.urlFilters = filters
      fetchUserData()
    }

    const goToUserInfo = (evt, row) => {
      router.push({ path: `/record/person/${row.person_id}` })
    }

    const openCreateEditUser = (data = null) => {
      bus.$emit('openCreateEditUserModal', data)
    }

    const openDeleteUser = (data) => {
      bus.$emit('openDeleteUserModal', data)
    }

    return {
      ...toRefs(state),
      columns,
      filters,
      onRequest,
      getPaginationLabel,
      sendFilters,
      openCreateEditUser,
      openDeleteUser,
      goToUserInfo
    }
  }
})
</script>
