<template>
  <dialog-component v-model="isDialogOpen" :dialog-title="type === 'Create' ? $t('pages.user.modal_create_title') : $t('pages.user.modal_edit_title')">
    <q-form @submit="onSubmit">
      <div class="form-container">
        <div class="input-form" v-if="type === 'Create'">
          <div class="full-width">
            <div class="stack-label">{{ $t('pages.user.person_id') }} *</div>
            <q-select
              dense
              outlined
              use-input
              :loading="loadingPeopleSelect"
              :rules="[(val => (val && val.length > 0 || $t('components.form_components.data_required')) )]"
              :options="peopleOptions"
              class="single-line-value-select"
              popup-content-class="popup-max-height"
              bottom-slots
              map-options
              emit-value
              clearable
              input-debounce="0"
              @filter="filterFn"
              v-model="userData.personId"
            >
              <template v-if="!userData.personId" v-slot:prepend>
                <div class="select-value">{{ $t('components.form_components.no_selected') }}</div>
              </template>

              <template v-slot:no-option>
                <q-item>
                  <q-item-section>
                    {{ $t('components.form_components.no_options') }}
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
        </div>
        <div class="input-form">
          <custom-select v-model="userData.rol" :label="$t('pages.user.rol')" class="full-width" :options="rolOptions" required />
        </div>
        <div class="input-form">
          <custom-input v-model="userData.password" :label="type === 'Create' ? $t('pages.user.password') : $t('pages.user.new_password')" class="full-width" :placeholder="type === 'Create' ? $t('pages.user.password_placeholder') : $t('pages.user.new_password_placeholder')" type="password" :required="type === 'Create'" />
          <custom-input v-if="type === 'Create' || (type === 'Edit' && userData.password)" v-model="passwordRepeat" :label="$t('pages.user.password_repeat')" class="full-width" :placeholder="$t('pages.user.password_repeat_placeholder')" type="password" required :rules="[val => val === userData.password || $t('pages.user.error_password')]"/>
        </div>
      </div>

      <div class="flex justify-between">
        <custom-button outline :label="$t('general_texts.cancel')" color="secondary" @click="closeModal" />
        <custom-button icon="save" :label="$t('general_texts.save')" color="secondary" type="submit" />
      </div>
    </q-form>
  </dialog-component>
</template>

<script>
import { hideLoading, showLoading, showNotification } from 'src/utils/quasarComponents'
import { defineComponent, reactive, toRefs, onMounted, onBeforeUnmount } from 'vue'
import DialogComponent from 'src/modals/component/DialogComponent'
import { useAuthenticationStore } from 'stores/authentication'
import { usePersonStore } from 'stores/person'
import { useUserStore } from 'stores/user'
import { useI18n } from 'vue-i18n'
import bus from 'boot/bus'

export default defineComponent({
  components: {
    DialogComponent
  },
  setup() {
    onMounted(() => {
      bus.$on('openCreateEditUserModal', (data) => {
        state.type = data ? 'Edit' : 'Create'
        if (data) setUserData(data)
        state.isDialogOpen = true
        getAllPeopleNoInCasketNoUsers()
      })
    })

    onBeforeUnmount(() => {
      bus.$off('openCreateEditUserModal')
    })

    const { t } = useI18n({})
    const userStore = useUserStore()
    const personStore = usePersonStore()
    const authenticationStore = useAuthenticationStore()

    const state = reactive({
      isDialogOpen: false,
      loading: false,
      type: 'Create',
      loadingPeopleSelect: false,
      passwordRepeat: '',
      peopleOptions: [],
      filterOptions: [],
      rolOptions: [
        { label: t('components.rol.admin'), value: 'ADMIN' },
        { label: t('components.rol.consultant'), value: 'CONSULTANT' }
      ],
      userData: {
        id: '',
        rol: '',
        password: '',
        personId: ''
      }
    })

    const setUserData = (data) => {
      state.userData = JSON.parse(JSON.stringify(data))
      delete state.userData?.person
    }

    const filterFn = (val, update) => {
      update(() => {
        if (val === '') {
          state.peopleOptions = state.filterOptions
        }
        else {
          const needle = val.toLowerCase()
          state.peopleOptions = state.filterOptions.filter(
            v => v.label.toLowerCase().includes(needle)
          )
        }
      })
    }

    const getAllPeopleNoInCasketNoUsers = async () => {
      try {
        state.loadingPeopleSelect = true
        const data = await personStore.getAllPeopleNoInCasketNoUsers()
        fillPeopleOptions(data?.data)
        state.loadingPeopleSelect = false
      } catch (error) {
        state.loadingPeopleSelect = false
      }
    }

    const fillPeopleOptions = (data) => {
      state.peopleOptions = []
      data.forEach(person => {
        state.peopleOptions.push({ label: `${person.dni} - ${person.lastName1} ${person.lastName2} ${person.firstName}`, value: person.id.toString(), deathdate: person.deathdate })
      })
      state.filterOptions = state.peopleOptions
    }

    const onSubmit = async () => {
      try {
        state.loading = showLoading()
        if (state.type === 'Create') {
          await authenticationStore.register(state.userData)
          showNotification(t('pages.user.successfully_created'), 'positive')
        }
        else if (state.type === 'Edit') {
          await userStore.updateUser(state.userData)
          showNotification(t('pages.user.successfully_edited'), 'positive')
        }
        closeModal()
        bus.$emit('refreshUserData')
        state.loading = hideLoading()
      }
      catch (error) {
        if (error?.response?.status === 422) {
          if (error.response.data?.errors?.internalCode) {
            showNotification(t('pages.user.unique_error_internal_code'))
          }
          else if (error.response.data?.errors?.name) {
            showNotification(t('pages.user.unique_error_name'))
          }
        }
        state.loading = hideLoading()
      }
    }

    const closeModal = () => {
      state.isDialogOpen = false
      state.loading = false
      state.type = 'Create'
      state.passwordRepeat = ''
      state.userData.id = ''
      state.userData.internalCode = ''
      state.userData.name = ''
      state.userData.address = ''
      state.userData.description = ''
    }

    return {
      ...toRefs(state),
      onSubmit,
      closeModal,
      filterFn,
      getAllPeopleNoInCasketNoUsers
    };
  }
})
</script>

<style lang="scss" scoped>
  .form-container {
    width: 100%;
    .input-form{
      display: flex;
      gap: 10px;
      margin-bottom: 5px;
    }
  }
</style>