<template>
  <dialog-component v-model="isDialogOpen" :dialog-title="type === 'Create' ? $t('pages.reservation.modal_create_title') : $t('pages.reservation.modal_edit_title')" :width="dialogWidth">
    <q-carousel v-model="step" transition-prev="slide-right" transition-next="slide-left" :swipeable="false" :navigation="false" animated>
      <!-- Step 1 -->
      <q-carousel-slide name="date-selection">
        <q-form @submit="firstStep">
          <div class="form-container">
            <div class="input-form">
              <custom-input v-model="reservation_time" @update:model-value="updateEndDate" :label="$t('pages.reservation.reservation_time')" class="full-width" :placeholder="$t('pages.reservation.reservation_time_placeholder')" required type="number" :rules="[(val => val && parseInt(val) > 0 || $t('pages.reservation.reservation_time_validation'))]" />
            </div>
            <div class="input-form" v-if="type === 'Edit'">
              <custom-date-picker v-model="reservationData.startDate" :label="$t('pages.reservation.start_date')" class="full-width" :placeholder="$t('pages.reservation.start_date_placeholder')" required />
              <custom-date-picker v-model="reservationData.endDate" :label="$t('pages.reservation.end_date')" class="full-width" :placeholder="$t('pages.reservation.end_date_placeholder')" required />
            </div>
          </div>

          <div class="flex justify-between">
            <custom-button outline :label="$t('general_texts.cancel')" color="secondary" @click="closeModal" />
            <custom-button icon="arrow_forward" :label="$t('general_texts.continue')" color="secondary" type="submit" />
          </div>
        </q-form>
      </q-carousel-slide>

      <!-- Step 2 -->
      <q-carousel-slide name="urn-selection">
        <q-form @submit="secondStep">
          <div class="form-container">
            <div class="input-form">
              <custom-select
                v-model="resourceData.buildingId"
                :loading="resourceData.loadingBuildingSelect"
                :options="resourceData.buildingOptions"
                :label="$t('pages.urn.building_id')"
                class="full-width"
                required
                @update:model-value="resourceData.roomId = ''; resourceData.rowId = ''; resourceData.nicheId = ''; reservationData.urnId = ''; getAllRoomsByIdAndBuilding()" />
            </div>
            <div class="input-form">
              <custom-select
                v-model="resourceData.roomId"
                :loading="resourceData.loadingRoomSelect"
                :options="resourceData.roomOptions"
                :label="$t('pages.urn.room_id')"
                class="full-width"
                required
                :no-options="!resourceData.buildingId ? $t('pages.urn.room_no_options') : null"
                @update:model-value="resourceData.rowId = ''; resourceData.nicheId = ''; reservationData.urnId = ''; getAllRowsByIdAndRoom()" />
              <custom-select
                v-model="resourceData.rowId"
                :loading="resourceData.loadingRowSelect"
                :options="resourceData.rowOptions"
                :label="$t('pages.urn.row_id')"
                class="full-width"
                required
                :no-options="!resourceData.roomId ? $t('pages.urn.row_no_options') : null"
                @update:model-value="resourceData.nicheId = ''; reservationData.urnId = ''; getAllNichesByIdAndRow()" />
            </div>
            <div class="input-form">
              <custom-select
                v-model="resourceData.nicheId"
                :loading="resourceData.loadingNicheSelect"
                :options="resourceData.nicheOptions"
                :label="$t('pages.urn.niche_id')"
                class="full-width"
                required
                :no-options="!resourceData.rowId ? $t('pages.urn.niche_no_options') : null"
                @update:model-value="reservationData.urnId = ''; getAllUrnsByIdAndNiche()" />
              <custom-select
                v-model="reservationData.urnId"
                :loading="resourceData.loadingUrnSelect"
                :options="resourceData.urnOptions"
                :label="$t('pages.urn.urn_id')"
                class="full-width"
                required
                :no-options="!resourceData.nicheId ? $t('pages.urn.urn_no_options') : null" />
            </div>
          </div>

          <div class="flex justify-between">
            <custom-button outline :label="$t('general_texts.cancel')" color="secondary" @click="closeModal" />
            <div class="flex gap-5">
              <custom-button outline icon="arrow_back" :label="$t('general_texts.back')" color="secondary" @click="goBackToStep1" />
              <custom-button icon="arrow_forward" :label="$t('general_texts.continue')" color="secondary" type="submit" />
            </div>
          </div>
        </q-form>
      </q-carousel-slide>

      <!-- Step 3 -->
      <q-carousel-slide name="person-selection">
        <q-form @submit="goToResume">
          <div class="form-container">
            <div class="header-title-component">{{ $t('pages.reservation.reservation_person') }}</div>
            <person-select-create-component v-model="personForm" :person-text="$t('pages.reservation.reservation_person')" />
          </div>

          <div class="flex justify-between" :style="!personForm.tabSelected ? 'margin-top:15px' : null">
            <custom-button outline :label="$t('general_texts.cancel')" color="secondary" @click="closeModal" />
            <div class="flex gap-5">
              <custom-button outline icon="arrow_back" :label="$t('general_texts.back')" color="secondary" @click="goBackToStep2" />
              <custom-button icon="arrow_forward" :label="$t('general_texts.continue')" color="secondary" type="submit" :disabled="!personForm.tabSelected" />
            </div>
          </div>
        </q-form>
      </q-carousel-slide>

      <!-- Step 4 -->
      <q-carousel-slide name="resume">
        <q-form @submit="onSubmit">
          <div class="resume-container">
            <div class="title">{{ $t('pages.reservation.resume_reservation_title') }}</div>
            <div class="input-form flex items-center gap-5">
              <div class="info-text">
                <span>{{ $t('pages.reservation.resume_period_time') }}:&nbsp;</span>
                <span class="text-secondary" style="font-weight:600">{{ reservation_time }}</span>
                <span v-if="type === 'Edit' && more_reservation_time > 0" class="text-secondary" style="font-weight:600">&nbsp;+ {{ more_reservation_time }} = {{ sum(reservation_time, more_reservation_time) }} </span>
                <span>&nbsp;{{ $t('pages.reservation.resume_years') }}.</span>
              </div>
              <custom-button v-if="type === 'Edit' && !thisReservationHasDeposit" padding="none" round color="primary" flat no-caps icon="drive_file_rename_outline" @click="editYearsSelected" />
            </div>
            <div class="input-form flex items-center gap-5">
              <div class="info-text">
                <span>{{ type === 'Edit' ? $t('pages.reservation.date_info_text_1_update') : $t('pages.reservation.date_info_text_1') }}&nbsp;</span>
                <span class="text-secondary" style="font-weight:600">{{ reservationData.startDate }}</span>
                <span>&nbsp;{{ $t('pages.reservation.date_info_text_2') }}&nbsp;</span>
                <span class="text-secondary" style="font-weight:600">{{ reservationData.endDate }}</span>
                <span>.</span>
              </div>
              <custom-button v-if="type === 'Edit' && !thisReservationHasDeposit" padding="none" round color="primary" flat no-caps icon="drive_file_rename_outline" @click="editYearsSelected" />
            </div>
            <div class="input-form flex items-center gap-5">
              <div class="info-text">
                <span>{{ $t('pages.reservation.resume_niche_selected') }}:&nbsp;</span>
                <span class="text-secondary" style="font-weight:600">{{ niche_selected }}</span>
                <span>.</span>
              </div>
              <custom-button v-if="type === 'Edit' && !thisReservationHasDeposit" padding="none" round color="primary" flat no-caps icon="drive_file_rename_outline" @click="editUrnSelected" />
            </div>
            <div class="input-form flex items-center gap-5">
              <div class="info-text">
                <span>{{ $t('pages.reservation.resume_person_selected') }}:&nbsp;</span>
                <span class="text-secondary" style="font-weight:600">{{ person_selected }}</span>
                <span>.</span>
              </div>
              <custom-button v-if="type === 'Edit' && !thisReservationHasDeposit" padding="none" round color="primary" flat no-caps icon="drive_file_rename_outline" @click="editPersonSelected" />
            </div>
          </div>

          <div class="input-form column" v-if="type === 'Edit'" style="margin-bottom:10px">
            <q-list>
              <q-item tag="label" v-ripple style="border-radius:12px">
                <q-item-section avatar>
                  <q-radio v-model="radioOption" val="add_years" color="primary" @update:model-value="radioChanged" />
                </q-item-section>
                <q-item-section>
                  <q-item-label style="font-size:15px">Ampliar reserva</q-item-label>
                  <q-item-label style="font-size:14px" caption>Añadirá al periodo de reserva los años introducidos. El estado de la urna no se modificará.</q-item-label>
                </q-item-section>
              </q-item>

              <q-item tag="label" v-ripple style="border-radius:12px" v-if="!checkIfIsToday">
                <q-item-section avatar top>
                  <q-radio v-model="radioOption" val="cancel_reservation" color="orange" @update:model-value="radioChanged" />
                </q-item-section>
                <q-item-section>
                  <q-item-label style="font-size:15px">Cancelar reserva</q-item-label>
                  <q-item-label style="font-size:14px" caption>Esto establecerá la fecha de fin de reserva a dia de hoy y liberará la urna reservada/ocupada.</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
          <div class="input-form" v-if="type === 'Edit' && radioOption === 'add_years'">
            <custom-input v-model="more_reservation_time" @update:model-value="updateEndDate" :label="$t('pages.reservation.more_reservation_time')" class="full-width" :placeholder="$t('pages.reservation.more_reservation_time_placeholder')" required type="number" :rules="[(val => val && parseInt(val) > 0 || $t('pages.reservation.reservation_time_validation'))]" />
          </div>
          <div class="input-form">
            <custom-input v-model="reservationData.description" :label="$t('pages.reservation.description')" class="full-width" :placeholder="$t('pages.reservation.description_placeholder')" type="editor" />
          </div>

          <div class="flex justify-between">
            <custom-button outline :label="$t('general_texts.cancel')" color="secondary" @click="closeModal" />
            <div class="flex gap-5">
              <custom-button v-if="type === 'Create'" outline icon="arrow_back" :label="$t('general_texts.back')" color="secondary" @click="goBackToStep3" />
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
import { formatEsToDbDate, formatDbToEsDate } from 'src/helpers/formatDate'
import DialogComponent from 'src/modals/component/DialogComponent'
import { useReservationStore } from 'stores/reservation'
import { addYearsEs } from 'src/helpers/formatDate'
import { useBuildingStore } from 'stores/building'
import { useRoomStore } from 'stores/room'
import { useRowStore } from 'stores/row'
import { useNicheStore } from 'stores/niche'
import { useUrnStore } from 'stores/urn'
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
      bus.$on('openCreateEditReservationModal', (data) => {
        closeModal()
        state.type = data ? 'Edit' : 'Create'
        if (state.type === 'Create') {
          formData.reservationData.startDate = moment().format('DD/MM/YYYY')
        }
        if (data) setReservationData(data)
        state.isDialogOpen = true
      })
      bus.$on('openCreateReservationInPersonModal', (data) => {
        closeModal()
        state.type = 'Create'
        formData.reservationData.startDate = moment().format('DD/MM/YYYY')
        formData.personForm.tabSelected = 'select'
        formData.personForm.personSelected.id = data.id
        formData.personForm.personSelected.label = `${data.dni} - ${data.lastName1} ${data.lastName2} ${data.firstName}`
        state.skip = 'person-selection'
        state.isDialogOpen = true
      })
      bus.$on('openCreateReservationInUrnModal', (data) => {
        closeModal()
        state.type = 'Create'
        formData.reservationData.startDate = moment().format('DD/MM/YYYY')
        formData.reservationData.urnId = data.id
        formData.resourceData.urnOptions = [{ label: data.internalCode, value: data.id }]
        state.skip = 'urn-selection'
        state.isDialogOpen = true
      })

    })

    onBeforeUnmount(() => {
      bus.$off('openCreateEditReservationModal')
      bus.$off('openCreateReservationInPersonModal')
      bus.$off('openCreateReservationInUrnModal')
    })

    const { t } = useI18n({})
    const buildingStore = useBuildingStore()
    const roomStore = useRoomStore()
    const rowStore = useRowStore()
    const nicheStore = useNicheStore()
    const urnStore = useUrnStore()
    const reservationStore = useReservationStore()

    const state = reactive({
      isDialogOpen: false,
      loading: false,
      type: 'Create',
      step: 'date-selection',
      reservation_time: '',
      more_reservation_time: '',
      radioOption: '',
      skip: '',
      thisReservationHasDeposit: false,
      niche_selected: computed(() => formData.resourceData.urnOptions.find(val => val.value === formData.reservationData.urnId)?.label),
      reservationEndDate: computed(() => {
        if (state.type === 'Edit' && state.more_reservation_time > 0) {
          return addYearsEs(formData.reservationData.startDate, sum(state.reservation_time, state.more_reservation_time)) || ''
        }
        return addYearsEs(formData.reservationData.startDate, state.reservation_time) || ''
      }),
      dialogWidth: computed(() => {
        if (state.step === 'person-selection') return '820'
        return '650'
      }),
      person_selected: computed(() => {
        if (formData.personForm.tabSelected === 'add') {
          return `${formData.personForm.newPersonData.dni} - ${formData.personForm.newPersonData.lastName1} ${formData.personForm.newPersonData.lastName2} ${formData.personForm.newPersonData.firstName}`
        }
        return formData.personForm.personSelected.label
      }),
      checkIfIsToday: computed(() => {
        if (moment().format('DD/MM/YYYY') === state.reservationEndDate) {
          return true
        }
        return false
      })
    })

    const formData = reactive({
      reservationData: {
        id: '',
        startDate: '',
        endDate: '',
        description: '',
        urnId: '',
        personId: '',
      },
      resourceIds: [],
      resourceData: {
        buildingId: '',
        loadingBuildingSelect: false,
        buildingOptions: [],
        roomId: '',
        loadingRoomSelect: false,
        roomOptions: [],
        rowId: '',
        loadingRowSelect: false,
        rowOptions: [],
        nicheId: '',
        loadingNicheSelect: false,
        nicheOptions: [],
        loadingUrnSelect: false,
        urnOptions: [],
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

    const setReservationData = (data) => {
      const dataParsed = JSON.parse(JSON.stringify(data))
      state.step = 'resume'
      state.thisReservationHasDeposit = !!dataParsed.deposit

      formData.reservationData.id = dataParsed.id
      formData.reservationData.startDate = formatDbToEsDate(dataParsed.startDate)
      formData.reservationData.endDate = formatDbToEsDate(dataParsed.endDate)
      formData.reservationData.description = dataParsed.description
      formData.reservationData.urnId = dataParsed.urnId?.toString()
      formData.reservationData.personId = dataParsed.personId?.toString()
      formData.personForm.tabSelected = 'select'
      formData.personForm.personSelected.id = dataParsed.personId?.toString()
      formData.personForm.personSelected.label = `${dataParsed.person.dni} - ${dataParsed.person.lastName1} ${dataParsed.person.lastName2} ${dataParsed.person.firstName}`

      const firstDate = moment(formData.reservationData.startDate, 'DD-MM-YYYY')
      const secondDate = moment(formData.reservationData.endDate, 'DD-MM-YYYY')
      const duration = moment.duration(secondDate.diff(firstDate))
      state.reservation_time = Math.round(duration.asYears()).toString()

      formData.resourceData.buildingId = dataParsed.urn.niche.row.room.buildingId?.toString()
      formData.resourceData.roomId = dataParsed.urn.niche.row.roomId?.toString()
      formData.resourceData.rowId = dataParsed.urn.niche.rowId?.toString()
      formData.resourceData.nicheId = dataParsed.urn.nicheId?.toString()
      formData.resourceData.urnOptions = [{ label: dataParsed.urn.internalCode, value: dataParsed.urnId?.toString() }]
    }

    const updateEndDate = () => {
      if (state.reservation_time && state.reservation_time > 0) {
        formData.reservationData.endDate = state.reservationEndDate
      }
    }

    const editYearsSelected = () => {
      state.step = 'date-selection'
      state.reservation_time = state.reservation_time?.toString()
    }

    const editUrnSelected = async () => {
      state.step = 'urn-selection'
      await getAllAvailableResources()
      getAllBuildingsById()
      getAllRoomsByIdAndBuilding()
      getAllRowsByIdAndRoom()
      getAllNichesByIdAndRow()
      getAllUrnsByIdAndNiche()
    }

    const editPersonSelected = () => {
      state.step = 'person-selection'
    }

    const goBackToStep1 = () => {
      if (state.type === 'Edit') {
        state.more_reservation_time = state.more_reservation_time?.toString()
        goToResume()
        return
      }
      state.step = 'date-selection'
      state.reservation_time = state.reservation_time?.toString()
    }

    const goBackToStep2 = () => {
      if (state.type === 'Edit') {
        state.more_reservation_time = state.more_reservation_time?.toString()
        goToResume()
        return
      }
      if (state.skip === 'urn-selection') {
        goBackToStep1()
        return
      }
      state.step = 'urn-selection'
    }

    const goBackToStep3 = () => {
      if (state.type === 'Edit') {
        state.more_reservation_time = state.more_reservation_time?.toString()
        goToResume()
        return
      }
      if (state.skip === 'person-selection') {
        goBackToStep2()
        return
      }
      state.step = 'person-selection'
    }

    const firstStep = () => {
      if (state.type === 'Edit') {
        state.more_reservation_time = state.more_reservation_time?.toString()
        goToResume()
        return
      }
      if (state.skip === 'urn-selection') {
        secondStep()
        return
      }
      state.step = 'urn-selection'
      getAllAvailableResources()
    }

    const secondStep = () => {
      if (state.type === 'Edit') {
        state.more_reservation_time = state.more_reservation_time?.toString()
        goToResume()
        return
      }
      if (state.skip === 'person-selection') {
        goToResume()
        return
      }
      state.step = 'person-selection'
    }

    const goToResume = () => {
      state.step = 'resume'
    }

    const getAllAvailableResources = async () => {
      try {
        formData.resourceData.loadingBuildingSelect = true
        const data = await reservationStore.getAllAvailableResources()
        formData.resourceIds = data
        await getAllBuildingsById()
        formData.resourceData.loadingBuildingSelect = false
      } catch (error) {
        formData.resourceData.loadingBuildingSelect = false
      }
    }

    const getAllBuildingsById = async () => {
      try {
        formData.resourceData.loadingBuildingSelect = true
        const data = await buildingStore.getAllBuildingsById({ buildingIds: formData.resourceIds?.buildingIds })
        fillBuildingOptions(data?.data)
        formData.resourceData.loadingBuildingSelect = false
      } catch (error) {
        formData.resourceData.loadingBuildingSelect = false
      }
    }

    const fillBuildingOptions = (data) => {
      formData.resourceData.buildingOptions = []
      data.forEach(building => {
        formData.resourceData.buildingOptions.push({ label: `${building.internalCode} - ${building.name}`, value: building.id.toString() })
      })
    }

    const getAllRoomsByIdAndBuilding = async () => {
      try {
        formData.resourceData.loadingRoomSelect = true
        const data = await roomStore.getAllRoomsByIdAndBuilding({ buildingId: formData.resourceData?.buildingId, roomIds: formData.resourceIds?.roomIds })
        fillRoomOptions(data?.data)
        formData.resourceData.loadingRoomSelect = false
      } catch (error) {
        formData.resourceData.loadingRoomSelect = false
      }
    }

    const fillRoomOptions = (data) => {
      formData.resourceData.roomOptions = []
      data.forEach(room => {
        formData.resourceData.roomOptions.push({ label: `${room.internalCode} - ${room.location}`, value: room.id.toString() })
      })
    }

    const getAllRowsByIdAndRoom = async () => {
      try {
        formData.resourceData.loadingRowSelect = true
        const data = await rowStore.getAllRowsByIdAndRoom({ roomId: formData.resourceData?.roomId, rowIds: formData.resourceIds?.rowIds })
        fillRowOptions(data?.data)
        formData.resourceData.loadingRowSelect = false
      } catch (error) {
        formData.resourceData.loadingRowSelect = false
      }
    }

    const fillRowOptions = (data) => {
      formData.resourceData.rowOptions = []
      data.forEach(row => {
        formData.resourceData.rowOptions.push({ label: `${row.internalCode}`, value: row.id.toString() })
      })
    }

    const getAllNichesByIdAndRow = async () => {
      try {
        formData.resourceData.loadingNicheSelect = true
        const data = await nicheStore.getAllNichesByIdAndRow({ rowId: formData.resourceData?.rowId, nicheIds: formData.resourceIds?.nicheIds })
        fillNicheOptions(data?.data)
        formData.resourceData.loadingNicheSelect = false
      } catch (error) {
        formData.resourceData.loadingNicheSelect = false
      }
    }

    const fillNicheOptions = (data) => {
      formData.resourceData.nicheOptions = []
      data.forEach(niche => {
        formData.resourceData.nicheOptions.push({ label: `${niche.internalCode}`, value: niche.id.toString() })
      })
    }

    const getAllUrnsByIdAndNiche = async () => {
      try {
        formData.resourceData.loadingUrnSelect = true
        const data = await urnStore.getAllUrnsByIdAndNiche({ nicheId: formData.resourceData?.nicheId, urnIds: formData.resourceIds?.urnIds })
        fillUrnOptions(data?.data)
        formData.resourceData.loadingUrnSelect = false
      } catch (error) {
        formData.resourceData.loadingUrnSelect = false
      }
    }

    const fillUrnOptions = (data) => {
      formData.resourceData.urnOptions = []
      data.forEach(urn => {
        formData.resourceData.urnOptions.push({ label: `${urn.internalCode}`, value: urn.id.toString() })
      })
    }



    const onSubmit = async () => {
      try {
        state.loading = showLoading()
        const form = JSON.parse(JSON.stringify(formData))
        form.reservationData.startDate = formatEsToDbDate(form.reservationData.startDate)
        form.reservationData.endDate = formatEsToDbDate(form.reservationData.endDate)
        delete form.resourceIds
        delete form.resourceData

        if (state.type === 'Create') {
          await reservationStore.createReservation(form)
          showNotification(t('pages.reservation.successfully_created'), 'positive')
        }
        else if (state.type === 'Edit') {
          form.cancelReservation = state.radioOption === 'cancel_reservation'
          await reservationStore.updateReservation(form)
          showNotification(t('pages.reservation.successfully_edited'), 'positive')
        }
        closeModal()
        bus.$emit('refreshReservationData')
        bus.$emit('refreshUrnData')
        state.loading = hideLoading()
      }
      catch (error) {
        state.loading = hideLoading()
      }
    }

    const radioChanged = () => {
      if (state.radioOption === 'cancel_reservation') {
        state.more_reservation_time = '0'
      }
    }

    const closeModal = () => {
      state.isDialogOpen = false
      state.loading = false
      state.type = 'Create'
      state.step = 'date-selection'
      state.reservation_time = ''
      state.more_reservation_time = ''
      state.radioOption = ''
      state.skip = ''

      formData.reservationData.id = ''
      formData.reservationData.startDate = ''
      formData.reservationData.endDate = ''
      formData.reservationData.description = ''
      formData.reservationData.urnId = ''
      formData.reservationData.personId = ''

      formData.resourceIds = []
      formData.resourceData.buildingId = ''
      formData.resourceData.loadingBuildingSelect = false
      formData.resourceData.buildingOptions = []
      formData.resourceData.roomId = ''
      formData.resourceData.loadingRoomSelect = false
      formData.resourceData.roomOptions = []
      formData.resourceData.rowId = ''
      formData.resourceData.loadingRowSelect = false
      formData.resourceData.rowOptions = []
      formData.resourceData.nicheId = ''
      formData.resourceData.loadingNicheSelect = false
      formData.resourceData.nicheOptions = []
      formData.resourceData.loadingUrnSelect = false
      formData.resourceData.urnOptions = []

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

    const sum = (num1, num2) => {
      const n1 = parseInt(num1)
      const n2 = parseInt(num2)
      return n1 + n2
    }


    return {
      ...toRefs(state),
      ...toRefs(formData),
      sum,
      onSubmit,
      closeModal,
      firstStep,
      secondStep,
      goToResume,
      goBackToStep1,
      goBackToStep2,
      goBackToStep3,
      getAllRoomsByIdAndBuilding,
      getAllRowsByIdAndRoom,
      getAllNichesByIdAndRow,
      getAllUrnsByIdAndNiche,
      radioChanged,
      editUrnSelected,
      editPersonSelected,
      editYearsSelected,
      updateEndDate
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
    .input-form > * {
      flex: 1;
      min-width: 275px;
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