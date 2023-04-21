<template>
  <dialog-component v-model="isDialogOpen" :dialog-title="type === 'Create' ? $t('pages.person.modal_create_title') : $t('pages.person.modal_edit_title')" width="820">
    <q-form @submit="onSubmit">
      <div class="form-container">
        <div class="input-form">
          <custom-input v-model="personData.dni" :label="$t('pages.person.dni')" class="full-width" :placeholder="$t('pages.person.dni_placeholder')" required />
          <custom-date-picker v-model="personData.birthdate" :label="$t('pages.person.birthdate')" class="full-width" :placeholder="$t('pages.person.birthdate_placeholder')" />
          <custom-date-picker v-model="personData.deathdate" :label="$t('pages.person.deathdate')" class="full-width" :placeholder="$t('pages.person.deathdate_placeholder')" />
        </div>
        <div class="input-form">
          <custom-input v-model="personData.firstName" :label="$t('pages.person.first_name')" class="full-width" :placeholder="$t('pages.person.first_name_placeholder')" required />
          <custom-input v-model="personData.lastName1" :label="$t('pages.person.last_name1')" class="full-width" :placeholder="$t('pages.person.last_name1_placeholder')" required />
          <custom-input v-model="personData.lastName2" :label="$t('pages.person.last_name2')" class="full-width" :placeholder="$t('pages.person.last_name2_placeholder')" required />
        </div>
        <div class="input-form">
          <custom-input v-model="personData.address" :label="$t('pages.person.address')" class="full-width" :placeholder="$t('pages.person.address_placeholder')" required />
          <custom-input v-model="personData.state" :label="$t('pages.person.state')" class="full-width" :placeholder="$t('pages.person.state_placeholder')" required />
        </div>
        <div class="input-form">
          <custom-select v-model="personData.city" :label="$t('pages.person.city')" class="full-width" :options="provinceOptions" required />
          <custom-input v-model="personData.postalCode" :label="$t('pages.person.postal_code')" class="full-width" :placeholder="$t('pages.person.postal_code_placeholder')" type="number" required />
          <custom-select v-model="personData.maritalStatus" :label="$t('pages.person.marital_status')" class="full-width" :options="maritalStatusOptions" />
        </div>
        <div class="input-form">
          <custom-input v-model="personData.phone" :label="$t('pages.person.phone')" class="full-width" :placeholder="$t('pages.person.phone_placeholder')" required />
          <custom-input v-model="personData.email" :label="$t('pages.person.email')" class="full-width" :placeholder="$t('pages.person.email_placeholder')" type="email" />
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
import { formatEsToDbDate, formatDbToEsDate } from 'src/helpers/formatDate'
import { defineComponent, reactive, toRefs, onMounted, onBeforeUnmount } from 'vue'
import DialogComponent from 'src/modals/component/DialogComponent'
import { usePersonStore } from 'stores/person'
import { useI18n } from 'vue-i18n'
import bus from 'boot/bus'

export default defineComponent({
  components: {
    DialogComponent
  },
  setup() {
    onMounted(() => {
      bus.$on('openCreateEditPersonModal', (data) => {
        state.type = data ? 'Edit' : 'Create'
        if (data) setPersonData(data)
        state.isDialogOpen = true
        getAllProvinces()
      })
    })

    onBeforeUnmount(() => {
      bus.$off('openCreateEditPersonModal')
    })

    const { t } = useI18n({})
    const personStore = usePersonStore()

    const state = reactive({
      isDialogOpen: false,
      loading: false,
      type: 'Create',
      loadingProvinceSelect: false
    })

    const formData = reactive({
      maritalStatusOptions: [
        { label: t('pages.person.single'), value: 'SINGLE' },
        { label: t('pages.person.married'), value: 'MARRIED' },
        { label: t('pages.person.union'), value: 'UNION' },
        { label: t('pages.person.separate'), value: 'SEPARATE' },
        { label: t('pages.person.divorced'), value: 'DIVORCED' },
        { label: t('pages.person.widower'), value: 'WIDOWER' },
      ],
      provinceOptions: [],
      personData: {
        id: '',
        dni: '',
        firstName: '',
        lastName1: '',
        lastName2: '',
        address: '',
        city: '',
        state: '',
        postalCode: '',
        phone: '',
        email: '',
        maritalStatus: '',
        birthdate: '',
        deathdate: '',
        casketId: ''
      }
    })

    const getAllProvinces = async () => {
      try {
        state.loadingProvinceSelect = true
        const data = await personStore.getAllProvinces()
        fillProvinceOptions(data?.data)
        state.loadingProvinceSelect = false
      } catch (error) {
        state.loadingProvinceSelect = false
      }
    }

    const fillProvinceOptions = (data) => {
      formData.provinceOptions = []
      data.forEach(province => {
        formData.provinceOptions.push({ label: province.name, value: province.name })
      })
    }

    const setPersonData = (data) => {
      formData.personData = JSON.parse(JSON.stringify(data))
      formData.personData.birthdate = formatDbToEsDate(formData.personData.birthdate)
      formData.personData.deathdate = formatDbToEsDate(formData.personData.deathdate)
    }

    const onSubmit = async () => {
      try {
        state.loading = showLoading()
        if (state.type === 'Create') {
          await personStore.createPerson({ ...formData.personData, birthdate: formatEsToDbDate(formData.personData.birthdate), deathdate: formatEsToDbDate(formData.personData.deathdate) })
          showNotification(t('pages.person.successfully_created'), 'positive')
        }
        else if (state.type === 'Edit') {
          await personStore.updatePerson(formData.personData.id, { ...formData.personData, birthdate: formatEsToDbDate(formData.personData.birthdate), deathdate: formatEsToDbDate(formData.personData.deathdate) })
          showNotification(t('pages.person.successfully_edited'), 'positive')
        }
        closeModal()
        bus.$emit('refreshPersonData')
        state.loading = hideLoading()
      }
      catch (error) {
        if (error?.response?.status === 422) {
          if (error.response.data?.errors?.internalCode) {
            showNotification(t('pages.person.unique_error_dni'))
          }
        }
        state.loading = hideLoading()
      }
    }

    const closeModal = () => {
      state.isDialogOpen = false
      state.loading = false
      state.type = 'Create'
      formData.personData.id = ''
      formData.personData.dni = ''
      formData.personData.firstName = ''
      formData.personData.lastName1 = ''
      formData.personData.lastName2 = ''
      formData.personData.address = ''
      formData.personData.city = ''
      formData.personData.state = ''
      formData.personData.postalCode = ''
      formData.personData.phone = ''
      formData.personData.email = ''
      formData.personData.maritalStatus = ''
      formData.personData.birthdate = ''
      formData.personData.deathdate = ''
      formData.personData.casketId = ''
    }

    return {
      ...toRefs(state),
      ...toRefs(formData),
      onSubmit,
      closeModal
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