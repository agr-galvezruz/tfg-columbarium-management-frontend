<template>
  <dialog-component v-model="isDialogOpen" :dialog-title="type === 'Create' ? $t('pages.deposit.modal_create_title') : $t('pages.deposit.modal_edit_title')" :width="dialogWidth" >
    <q-carousel v-model="step" transition-prev="slide-right" transition-next="slide-left" :swipeable="false" :navigation="false" animated>
      <!-- Step 0 -->
      <q-carousel-slide name="date-selection">
        <q-form @submit="zeroStep">
          <div class="form-container">
            <div class="input-form column" style="margin-bottom:10px">
              <q-list>
                <q-item tag="label" v-ripple style="border-radius:12px">
                  <q-item-section avatar>
                    <q-radio v-model="dateOption" val="automatic_date" color="primary" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label style="font-size:15px">Fecha del depósito a día de hoy</q-item-label>
                    <q-item-label style="font-size:14px" caption>Establecerá la fecha del depósito a la fecha de hoy.</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item tag="label" v-ripple style="border-radius:12px">
                  <q-item-section avatar top>
                    <q-radio v-model="dateOption" val="manual_date" color="primary" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label style="font-size:15px">Fecha del depósito manual</q-item-label>
                    <q-item-label style="font-size:14px" caption>Podrá seleccionar la fecha en la que se realizó el depósito.</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
            <div class="input-form" v-if="dateOption === 'manual_date'">
              <custom-date-picker v-model="depositData.startDate" :label="$t('pages.deposit.start_date')" class="full-width" :placeholder="$t('pages.deposit.start_date_placeholder')" required />
            </div>
          </div>

          <div class="flex justify-between">
            <custom-button outline :label="$t('general_texts.cancel')" color="secondary" @click="closeModal" />
            <custom-button icon="arrow_forward" :label="$t('general_texts.continue')" color="secondary" type="submit" :disabled="!dateOption" />
          </div>
        </q-form>
      </q-carousel-slide>

      <!-- Step 1 -->
      <q-carousel-slide name="reservation-casket-selection">
        <q-form @submit="firstStep">
          <div class="form-container">
            <div class="input-form">
              <div class="full-width">
                <div class="stack-label">{{ $t('pages.deposit.reservation_id') }} *</div>
                <q-select
                  dense
                  outlined
                  use-input
                  :loading="resourceData.loadingReservationSelect"
                  :rules="[(val => (val && val.length > 0 || $t('components.form_components.data_required')) )]"
                  :options="resourceData.reservationOptions"
                  class="single-line-value-select"
                  popup-content-class="popup-max-height"
                  bottom-slots
                  map-options
                  emit-value
                  :disable="disableReservationSelect"
                  input-debounce="0"
                  @filter="filterFn1"
                  v-model="depositData.reservationId"
                >
                  <template v-if="!depositData.reservationId" v-slot:prepend>
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
              <div class="full-width">
                <div class="stack-label">{{ $t('pages.deposit.casket_id') }} *</div>
                <q-select
                  dense
                  outlined
                  use-input
                  :loading="resourceData.loadingCasketSelect"
                  :rules="[(val => (val && val.length > 0 || $t('components.form_components.data_required')) )]"
                  :options="resourceData.casketOptions"
                  class="single-line-value-select"
                  popup-content-class="popup-max-height"
                  bottom-slots
                  map-options
                  emit-value
                  :disable="disableCasketSelect"
                  input-debounce="0"
                  options-html
                  @filter="filterFn2"
                  v-model="depositData.casketId"
                >
                  <template v-if="!depositData.casketId" v-slot:prepend>
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

            <div v-if="disablePersonSelect" class="input-form">
              <custom-input v-model="depositData.deceasedRelationship" :label="$t('pages.deposit.deceased_relationship')" class="full-width" :placeholder="$t('pages.deposit.deceased_relationship_placeholder')" required />
            </div>
          </div>

          <div class="flex justify-between">
            <custom-button outline :label="$t('general_texts.cancel')" color="secondary" @click="closeModal" />
            <div class="flex gap-5">
              <custom-button outline icon="arrow_back" :label="$t('general_texts.back')" color="secondary" @click="goBackToStep0" />
              <custom-button icon="arrow_forward" :label="$t('general_texts.continue')" color="secondary" type="submit" />
            </div>
          </div>
        </q-form>
      </q-carousel-slide>

      <!-- Step 2 -->
      <q-carousel-slide name="person-selection">
        <q-form @submit="goToResume">
          <div class="form-container">
            <div class="header-title-component">{{ $t('pages.deposit.deposit_person') }}</div>
            <person-select-create-component v-model="personForm" :person-text="$t('pages.deposit.deposit_person')" />
            <div class="input-form" v-if="personForm.tabSelected">
              <custom-input v-model="depositData.deceasedRelationship" :label="$t('pages.deposit.deceased_relationship')" class="full-width" :placeholder="$t('pages.deposit.deceased_relationship_placeholder')" required />
            </div>
          </div>

          <div class="flex justify-between" :style="!personForm.tabSelected ? 'margin-top:15px' : null">
            <custom-button outline :label="$t('general_texts.cancel')" color="secondary" @click="closeModal" />
            <div class="flex gap-5">
              <custom-button outline icon="arrow_back" :label="$t('general_texts.back')" color="secondary" @click="goBackToStep1" />
              <custom-button icon="arrow_forward" :label="$t('general_texts.continue')" color="secondary" type="submit" :disabled="!personForm.tabSelected" />
            </div>
          </div>
        </q-form>
      </q-carousel-slide>

      <!-- Step 3 -->
      <q-carousel-slide name="resume">
        <q-form @submit="onSubmit">
          <div class="resume-container">
            <div class="title">{{ $t('pages.deposit.resume_deposit_title') }}</div>
            <div class="input-form flex items-center gap-5">
              <div class="info-text">
                <span>{{ $t('pages.deposit.resume_date') }}:&nbsp;</span>
                <span class="text-secondary" style="font-weight:600">{{ depositData.startDate }}</span>
                <span>.</span>
              </div>
              <custom-button v-if="type === 'Edit'" padding="none" round color="primary" flat no-caps icon="drive_file_rename_outline" @click="editDate" />
            </div>
            <div class="input-form flex items-center gap-5">
              <div class="info-text">
                <span>{{ $t('pages.deposit.deposit_person') }}:&nbsp;</span>
                <span class="text-secondary" style="font-weight:600">{{ deposited_person_selected }}</span>
                <span>.</span>
              </div>
              <custom-button v-if="type === 'Edit'" padding="none" round color="primary" flat no-caps icon="drive_file_rename_outline" @click="editPerson" />
            </div>
            <div class="input-form flex items-center gap-5">
              <div class="info-text">
                <span>{{ $t('pages.deposit.deceased_relationship') }}:&nbsp;</span>
                <span class="text-secondary" style="font-weight:600">{{ depositData.deceasedRelationship }}</span>
                <span>.</span>
              </div>
              <custom-button v-if="type === 'Edit'" padding="none" round color="primary" flat no-caps icon="drive_file_rename_outline" @click="editPerson" />
            </div>
            <div class="input-form flex items-center gap-5">
              <div class="info-text flex">
                <span>{{ $t('pages.deposit.casket') }}:&nbsp;</span>
                <span class="text-secondary" style="font-weight:600" v-html="casket_selected"></span>
              </div>
              <custom-button v-if="type === 'Edit'" padding="none" round color="primary" flat no-caps icon="drive_file_rename_outline" @click="editReservationCasket" />
            </div>
            <div class="input-form flex items-center gap-5">
              <div class="info-text flex">
                <span>{{ $t('pages.deposit.reservation') }}:&nbsp;</span>
                <span class="text-secondary" style="font-weight:600">{{ reservation_selected }}</span>
              </div>
              <custom-button v-if="type === 'Edit'" padding="none" round color="primary" flat no-caps icon="drive_file_rename_outline" @click="editReservationCasket" />
            </div>
          </div>

          <div class="input-form column" v-if="type === 'Edit'" style="margin-bottom:10px">
            <q-list>
              <q-item tag="label" v-ripple style="border-radius:12px">
                <q-item-section avatar top>
                  <q-checkbox v-model="transferDeposit" color="orange" @update:model-value="clearEndDate" />
                </q-item-section>
                <q-item-section>
                  <q-item-label style="font-size:15px">Traslado externo</q-item-label>
                  <q-item-label style="font-size:14px" caption>Cambio de sitio por traslado externo.</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>

          <div class="input-form" v-if="type === 'Edit' && transferDeposit">
            <custom-date-picker v-model="depositData.endDate" :label="$t('pages.deposit.end_date')" class="full-width" :placeholder="$t('pages.deposit.end_date_placeholder')" required />
          </div>

          <div class="input-form">
            <custom-input v-model="depositData.description" :label="$t('pages.deposit.description')" class="full-width" :placeholder="$t('pages.deposit.description_placeholder')" type="editor" />
          </div>

          <div class="flex justify-between">
            <custom-button outline :label="$t('general_texts.cancel')" color="secondary" @click="closeModal" />
            <div class="flex gap-5">
              <custom-button v-if="type === 'Create'" outline icon="arrow_back" :label="$t('general_texts.back')" color="secondary" @click="goBackToStep2" />
              <custom-button icon="save" :label="$t('general_texts.save')" color="secondary" type="submit" />
            </div>
          </div>
        </q-form>
      </q-carousel-slide>
    </q-carousel>
  </dialog-component>
</template>

<script>
import PersonSelectCreateComponent from 'src/components/select-create/person/person-select-create-component'
import { hideLoading, showLoading, showNotification } from 'src/utils/quasarComponents'
import { defineComponent, reactive, toRefs, onMounted, onBeforeUnmount, computed } from 'vue'
import { formatDbToEsDate, formatEsToDbDate } from 'src/helpers/formatDate'
import DialogComponent from 'src/modals/component/DialogComponent'
import { useDepositStore } from 'stores/deposit'
import { useReservationStore } from 'stores/reservation'
import { useCasketStore } from 'stores/casket'
import { useI18n } from 'vue-i18n'
import bus from 'boot/bus'
import moment from 'moment'

export default defineComponent({
  components: {
    DialogComponent,
    PersonSelectCreateComponent
  },
  setup() {
    onMounted(() => {
      bus.$on('openCreateEditDepositModal', (data) => {
        closeModal()
        state.type = data ? 'Edit' : 'Create'
        if (state.type === 'Create') {
          // formData.depositData.startDate = moment().format('DD/MM/YYYY')
          fetchData()
        }
        if (data) setDepositData(data)
        state.isDialogOpen = true
      })
      bus.$on('openCreateEditDepositInReservationModal', (data) => {
        closeModal()
        state.type = 'Create'
        state.disableReservationSelect = true
        // formData.depositData.startDate = moment().format('DD/MM/YYYY')
        formData.depositData.reservationId = data.id?.toString()
        formData.resourceData.reservationOptions = [{ label: `${data.urn.internalCode} / ${data.person.lastName1} ${data.person.lastName2} ${data.person.firstName} (${formatDbToEsDate(data.startDate)} - ${formatDbToEsDate(data.endDate)})`, value: data.id?.toString() }]
        getAllCasketsWithNoDeposit()
        state.isDialogOpen = true
      })
      bus.$on('openCreateEditDepositInPersonModal', (data) => {
        closeModal()
        state.type = 'Create'
        // formData.depositData.startDate = moment().format('DD/MM/YYYY')
        state.disablePersonSelect = true
        formData.depositData.personId = data.id.toString()
        formData.personForm.tabSelected = 'select'
        formData.personForm.personSelected.id = data.id?.toString()
        formData.personForm.personSelected.label = `${data.dni} - ${data.lastName1} ${data.lastName2} ${data.firstName}`
        fetchData()
        state.isDialogOpen = true
      })
      bus.$on('openCreateEditDepositInCasketModal', (data) => {
        closeModal()
        state.type = 'Create'
        // formData.depositData.startDate = moment().format('DD/MM/YYYY')
        state.disableCasketSelect = true
        formData.depositData.casketId = data.id?.toString()

        let names = ''
        data.people.forEach(person => {
          names += `<div>${person.dni} - ${person.lastName1} ${person.lastName2} ${person.firstName}</div>`
        })
        formData.resourceData.casketOptions = [{ label: `<div><div>${names}</div></div>`, value: data.id?.toString() }]
        getAllReservationsWithNoDeposit()
        state.isDialogOpen = true
      })

    })

    onBeforeUnmount(() => {
      bus.$off('openCreateEditDepositModal')
      bus.$off('openCreateEditDepositInReservationModal')
      bus.$off('openCreateEditDepositInCasketModal')
    })

    const { t } = useI18n({})
    const depositStore = useDepositStore()
    const casketStore = useCasketStore()
    const reservationStore = useReservationStore()

    const state = reactive({
      isDialogOpen: false,
      loading: false,
      type: 'Create',
      step: 'date-selection',
      dateOption: 'automatic_date',
      transferDeposit: false,
      disableReservationSelect: false,
      disablePersonSelect: false,
      disableCasketSelect: false,
      dialogWidth: computed(() => {
        if (state.step === 'person-selection') return '820'
        return '650'
      }),
      deposited_person_selected: computed(() => {
        if (formData.personForm.tabSelected === 'add') {
          return `${formData.personForm.newPersonData.dni} - ${formData.personForm.newPersonData.lastName1} ${formData.personForm.newPersonData.lastName2} ${formData.personForm.newPersonData.firstName}`
        }
        return formData.personForm.personSelected.label
      }),
      casket_selected: computed(() => {
        return formData.resourceData.casketOptions.filter(val => val.value === formData.depositData.casketId)?.[0]?.label
      }),
      reservation_selected: computed(() => {
        return formData.resourceData.reservationOptions.filter(val => val.value === formData.depositData.reservationId)?.[0]?.label
      }),
    })

    const formData = reactive({
      depositData: {
        id: '',
        startDate: '',
        endDate: '',
        description: '',
        reservationId: '',
        personId: '',
        casketId: '',
        deceasedRelationship: ''
      },
      resourceData: {
        filterOptions1: [],
        loadingReservationSelect: false,
        reservationOptions: [],
        filterOptions2: [],
        loadingCasketSelect: false,
        casketOptions: [],
      },
      personForm: {
        tabSelected: '',
        personSelected: {
          id: '',
          label: ''
        },
        newPersonData: {
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
      }
    })

    const setDepositData = (data) => {
      const dataParsed = JSON.parse(JSON.stringify(data))
      state.step = 'resume'

      if (dataParsed.endDate) {
        state.transferDeposit = true
      }

      formData.depositData.id = dataParsed.id
      formData.depositData.startDate = formatDbToEsDate(dataParsed.startDate)
      formData.depositData.endDate = formatDbToEsDate(dataParsed.endDate)
      formData.depositData.description = dataParsed.description
      formData.depositData.reservationId = dataParsed.reservationId?.toString()
      formData.depositData.personId = dataParsed.personId?.toString()
      formData.depositData.casketId = dataParsed.casketId?.toString()
      formData.depositData.deceasedRelationship = dataParsed.deceasedRelationship

      formData.personForm.tabSelected = 'select'
      formData.personForm.personSelected.id = dataParsed.personId?.toString()
      formData.personForm.personSelected.label = `${dataParsed.person.dni} - ${dataParsed.person.lastName1} ${dataParsed.person.lastName2} ${dataParsed.person.firstName}`

      let names = ''
      dataParsed.casket.people.forEach(person => {
        names += `<div>${person.dni} - ${person.lastName1} ${person.lastName2} ${person.firstName}</div>`
      })
      formData.resourceData.casketOptions = [{ label: `<div><div>${names}</div></div>`, value: dataParsed.casketId?.toString() }]
      formData.resourceData.reservationOptions = [{ label: `${dataParsed.reservation.urn.internalCode} / ${dataParsed.reservation.person.lastName1} ${dataParsed.reservation.person.lastName2} ${dataParsed.reservation.person.firstName} (${formatDbToEsDate(dataParsed.reservation.startDate)} - ${formatDbToEsDate(dataParsed.reservation.endDate)})`, value: dataParsed.reservationId?.toString() }]
    }

    const fetchData = () => {
      getAllReservationsWithNoDeposit()
      getAllCasketsWithNoDeposit()
    }

    const getAllReservationsWithNoDeposit = async () => {
      try {
        formData.resourceData.loadingReservationSelect = true
        let filter = ''
        if (state.type === 'Edit') {
          filter = `?includeReservationId=${formData.depositData.reservationId}`
        }
        const data = await reservationStore.getAllReservationsWithNoDeposit(filter)
        fillReservationOptions(data?.data)
        formData.resourceData.loadingReservationSelect = false
      } catch (error) {
        formData.resourceData.loadingReservationSelect = false
      }
    }

    const getAllCasketsWithNoDeposit = async () => {
      try {
        formData.resourceData.loadingCasketSelect = true
        let filter = ''
        if (state.type === 'Edit') {
          filter = `?includeCasketId=${formData.depositData.casketId}`
        }
        const data = await casketStore.getAllCasketsWithNoDeposit(filter)
        fillCasketOptions(data?.data)
        formData.resourceData.loadingCasketSelect = false
      } catch (error) {
        formData.resourceData.loadingCasketSelect = false
      }
    }

    const fillReservationOptions = (data) => {
      formData.resourceData.reservationOptions = []
      data.forEach(reservation => {
        formData.resourceData.reservationOptions.push({ label: `${reservation.urn.internalCode} / ${reservation.person.lastName1} ${reservation.person.lastName2} ${reservation.person.firstName} (${formatDbToEsDate(reservation.startDate)} - ${formatDbToEsDate(reservation.endDate)})`, value: reservation.id.toString() })
      })
      formData.resourceData.filterOptions1 = formData.resourceData.reservationOptions
    }

    const fillCasketOptions = (data) => {
      formData.resourceData.casketOptions = []

      data.forEach(casket => {
        let names = ''
        casket.people.forEach(person => {
          names += `<div>${person.dni} - ${person.lastName1} ${person.lastName2} ${person.firstName}</div>`
        })
        formData.resourceData.casketOptions.push({ label: `<div><div>${names}</div></div>`, value: casket.id.toString() })
      })
      formData.resourceData.filterOptions2 = formData.resourceData.casketOptions
    }

    const filterFn1 = (val, update) => {
      update(() => {
        if (val === '') {
          formData.resourceData.reservationOptions = formData.resourceData.filterOptions1
        }
        else {
          const needle = val.toLowerCase()
          formData.resourceData.reservationOptions = formData.resourceData.filterOptions1.filter(
            v => v.label.toLowerCase().includes(needle)
          )
        }
      })
    }

    const filterFn2 = (val, update) => {
      update(() => {
        if (val === '') {
          formData.resourceData.casketOptions = formData.resourceData.filterOptions2
        }
        else {
          const needle = val.toLowerCase()
          formData.resourceData.casketOptions = formData.resourceData.filterOptions2.filter(
            v => v.label.toLowerCase().includes(needle)
          )
        }
      })
    }

    const editReservationCasket = () => {
      fetchData()
      state.step = 'reservation-casket-selection'
    }

    const editPerson = () => {
      state.step = 'person-selection'
    }

    const editDate = () => {
      state.step = 'date-selection'
      state.dateOption = 'manual_date'
    }

    const goBackToStep0 = () => {
      if (state.type === 'Edit') {
        goToResume()
        return
      }
      state.step = 'date-selection'
    }

    const goBackToStep1 = () => {
      if (state.type === 'Edit') {
        goToResume()
        return
      }
      state.step = 'reservation-casket-selection'
    }

    const goBackToStep2 = () => {
      if (state.type === 'Edit') {
        goToResume()
        return
      }
      if (state.disablePersonSelect) {
        state.step = 'reservation-casket-selection'
        return
      }
      state.step = 'person-selection'
    }

    const zeroStep = () => {
      if (state.dateOption === 'automatic_date') {
        formData.depositData.startDate = moment().format('DD/MM/YYYY')
      }
      if (state.type === 'Edit') {
        goToResume()
        return
      }
      state.step = 'reservation-casket-selection'
    }

    const firstStep = () => {
      if (state.type === 'Edit') {
        goToResume()
        return
      }
      if (state.disablePersonSelect) {
        state.step = 'resume'
        return
      }
      state.step = 'person-selection'
    }

    const goToResume = () => {
      state.step = 'resume'
    }

    const onSubmit = async () => {
      try {
        state.loading = showLoading()
        const form = JSON.parse(JSON.stringify(formData))
        form.depositData.startDate = formatEsToDbDate(form.depositData.startDate)
        form.depositData.endDate = formatEsToDbDate(form.depositData.endDate)
        delete form.resourceData

        if (state.type === 'Create') {
          await depositStore.createDeposit(form)
          showNotification(t('pages.deposit.successfully_created'), 'positive')
        }
        else if (state.type === 'Edit') {
          form.transferDeposit = state.transferDeposit
          await depositStore.updateDeposit(form)
          showNotification(t('pages.deposit.successfully_edited'), 'positive')
        }
        closeModal()
        bus.$emit('refreshDepositData')
        bus.$emit('refreshUrnData')
        bus.$emit('refreshReservationData')
        bus.$emit('refreshCasketData')
        bus.$emit('refreshPersonData')
        state.loading = hideLoading()
      }
      catch (error) {
        console.log(error)
        state.loading = hideLoading()
      }
    }

    const clearEndDate = () => {
      if (!state.transferDeposit) {
        formData.depositData.endDate = ''
      }
    }

    const closeModal = () => {
      state.isDialogOpen = false
      state.loading = false
      state.type = 'Create'
      state.step = 'date-selection'
      state.dateOption = 'automatic_date'
      state.disableReservationSelect = false
      state.disablePersonSelect = false
      state.disableCasketSelect = false
      state.transferDeposit = false

      formData.depositData.id = ''
      formData.depositData.startDate = ''
      formData.depositData.endDate = ''
      formData.depositData.description = ''
      formData.depositData.reservationId = ''
      formData.depositData.personId = ''
      formData.depositData.casketId = ''
      formData.depositData.deceasedRelationship = ''

      formData.resourceData.filterOptions1 = []
      formData.resourceData.loadingReservationSelect = false
      formData.resourceData.reservationOptions = []
      formData.resourceData.filterOptions2 = []
      formData.resourceData.loadingCasketSelect = false
      formData.resourceData.casketOptions = []

      formData.personForm.tabSelected = ''
      formData.personForm.personSelected.id = ''
      formData.personForm.personSelected.label = ''
      formData.personForm.newPersonData.id = ''
      formData.personForm.newPersonData.dni = ''
      formData.personForm.newPersonData.firstName = ''
      formData.personForm.newPersonData.lastName1 = ''
      formData.personForm.newPersonData.lastName2 = ''
      formData.personForm.newPersonData.address = ''
      formData.personForm.newPersonData.city = ''
      formData.personForm.newPersonData.state = ''
      formData.personForm.newPersonData.postalCode = ''
      formData.personForm.newPersonData.phone = ''
      formData.personForm.newPersonData.email = ''
      formData.personForm.newPersonData.maritalStatus = ''
      formData.personForm.newPersonData.birthdate = ''
      formData.personForm.newPersonData.deathdate = ''
      formData.personForm.newPersonData.casketId = ''
    }

    return {
      ...toRefs(state),
      ...toRefs(formData),
      onSubmit,
      closeModal,
      filterFn1,
      filterFn2,
      zeroStep,
      firstStep,
      goBackToStep0,
      goBackToStep1,
      goToResume,
      goBackToStep2,
      editDate,
      editPerson,
      editReservationCasket,
      clearEndDate
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

  .header-title-component {
    position: relative;
    color: var(--main-text-color);
    font-weight: 500;
    margin-bottom: 5px;
    font-size: 15px;
    text-align: center;
  }

  .resume-container {
    margin-bottom: 10px;
    font-size: 15px;
    .title {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 10px;
    }
  }
</style>