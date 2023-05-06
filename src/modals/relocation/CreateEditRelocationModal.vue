<template>
  <dialog-component v-model="isDialogOpen" :dialog-title="type === 'Create' ? $t('pages.relocation.modal_create_title') : $t('pages.relocation.modal_edit_title')">
    <q-carousel v-model="step" transition-prev="slide-right" transition-next="slide-left" :swipeable="false" :navigation="false" animated>
      <!-- Step 1 -->
      <q-carousel-slide name="relocation-selection">
        <q-form @submit="firstStep">
          <div class="form-container">
            <div class="input-form column" style="margin-bottom:10px">
              <q-list>
                <q-item tag="label" v-ripple style="border-radius:12px">
                  <q-item-section avatar>
                    <q-radio v-model="relocationOption" val="active-reservation" color="primary" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label style="font-size:15px">Reubicación con reserva asociada</q-item-label>
                    <q-item-label style="font-size:14px" caption>Realiza la reubicación de un depósito con reserva activa.</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item tag="label" v-ripple style="border-radius:12px">
                  <q-item-section avatar top>
                    <q-radio v-model="relocationOption" val="expired-reservation" color="primary" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label style="font-size:15px">Reubicación sin reserva</q-item-label>
                    <q-item-label style="font-size:14px" caption>Realiza la reubicación de un cofre sin reserva.</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </div>

          <div class="flex justify-between">
            <custom-button outline :label="$t('general_texts.cancel')" color="secondary" @click="closeModal" />
            <custom-button icon="arrow_forward" :label="$t('general_texts.continue')" color="secondary" type="submit" :disabled="!relocationOption" />
          </div>
        </q-form>
      </q-carousel-slide>

      <!-- Step 2 -->
      <q-carousel-slide name="date-selection">
        <q-form @submit="secondStep">
          <div class="form-container">
            <div v-if="type === 'Create'" class="input-form column" style="margin-bottom:10px">
              <q-list>
                <q-item tag="label" v-ripple style="border-radius:12px">
                  <q-item-section avatar>
                    <q-radio v-model="dateOption" val="automatic_date" color="primary" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label style="font-size:15px">Fecha de la reubicación a día de hoy</q-item-label>
                    <q-item-label style="font-size:14px" caption>Establecerá la fecha de la reubicación a la fecha de hoy.</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item tag="label" v-ripple style="border-radius:12px">
                  <q-item-section avatar top>
                    <q-radio v-model="dateOption" val="manual_date" color="primary" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label style="font-size:15px">Fecha de la reubicación manual</q-item-label>
                    <q-item-label style="font-size:14px" caption>Podrá seleccionar la fecha en la que se realizó la reubicación.</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
            <div class="input-form" v-if="dateOption === 'manual_date'">
              <custom-date-picker v-model="relocationData.date" :label="$t('pages.relocation.date')" class="full-width" :placeholder="$t('pages.relocation.date_placeholder')" required />
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

      <!-- Step 3 active-reservation -->
      <q-carousel-slide name="active-reservation">
        <q-form @submit="thirdStep">
          <div class="form-container">
            <div class="input-form">
              <div class="full-width">
                <div class="stack-label">{{ $t('pages.relocation.reservation_active') }} *</div>
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
                  input-debounce="0"
                  @filter="filterFn1"
                  v-model="relocationData.reservationId"
                >
                  <template v-if="!relocationData.reservationId" v-slot:prepend>
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
          </div>
          <div class="flex justify-between">
            <custom-button outline :label="$t('general_texts.cancel')" color="secondary" @click="closeModal" />
            <div class="flex gap-5">
              <custom-button outline icon="arrow_back" :label="$t('general_texts.back')" color="secondary" @click="goBackToStep2" />
              <custom-button icon="arrow_forward" :label="$t('general_texts.continue')" color="secondary" type="submit" />
            </div>
          </div>
        </q-form>
      </q-carousel-slide>

      <!-- Step 3 expired-reservation -->
      <q-carousel-slide name="expired-reservation">
        <q-form @submit="thirdStep">
          <div class="form-container">
            <div class="input-form">
              <div class="full-width">
                <div class="stack-label">{{ $t('pages.relocation.casket_id') }} *</div>
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
                  input-debounce="0"
                  options-html
                  @filter="filterFn2"
                  v-model="relocationData.casketId"
                >
                  <template v-if="!relocationData.casketId" v-slot:prepend>
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
          </div>
          <div class="flex justify-between">
            <custom-button outline :label="$t('general_texts.cancel')" color="secondary" @click="closeModal" />
            <div class="flex gap-5">
              <custom-button outline icon="arrow_back" :label="$t('general_texts.back')" color="secondary" @click="goBackToStep2" />
              <custom-button icon="arrow_forward" :label="$t('general_texts.continue')" color="secondary" type="submit" />
            </div>
          </div>
        </q-form>
      </q-carousel-slide>

      <!-- Step 4 -->
      <q-carousel-slide name="urn-selection">
        <q-form @submit="goToResume">
          <div class="form-container">
            <div class="input-form">
              <custom-select
                v-model="resourceData.buildingId"
                :loading="resourceData.loadingBuildingSelect"
                :options="resourceData.buildingOptions"
                :label="$t('pages.relocation.building_id')"
                class="full-width"
                required
                @update:model-value="resourceData.roomId = ''; resourceData.rowId = ''; resourceData.nicheId = ''; relocationData.urnId = ''; getAllRoomsByIdAndBuilding()" />
            </div>
            <div class="input-form">
              <custom-select
                v-model="resourceData.roomId"
                :loading="resourceData.loadingRoomSelect"
                :options="resourceData.roomOptions"
                :label="$t('pages.relocation.room_id')"
                class="full-width"
                required
                :no-options="!resourceData.buildingId ? $t('pages.urn.room_no_options') : null"
                @update:model-value="resourceData.rowId = ''; resourceData.nicheId = ''; relocationData.urnId = ''; getAllRowsByIdAndRoom()" />
              <custom-select
                v-model="resourceData.rowId"
                :loading="resourceData.loadingRowSelect"
                :options="resourceData.rowOptions"
                :label="$t('pages.relocation.row_id')"
                class="full-width"
                required
                :no-options="!resourceData.roomId ? $t('pages.urn.row_no_options') : null"
                @update:model-value="resourceData.nicheId = ''; relocationData.urnId = ''; getAllNichesByIdAndRow()" />
            </div>
            <div class="input-form">
              <custom-select
                v-model="resourceData.nicheId"
                :loading="resourceData.loadingNicheSelect"
                :options="resourceData.nicheOptions"
                :label="$t('pages.relocation.niche_id')"
                class="full-width"
                required
                :no-options="!resourceData.rowId ? $t('pages.urn.niche_no_options') : null"
                @update:model-value="relocationData.urnId = ''; getAllUrnsByIdAndNiche()" />
              <custom-select
                v-model="relocationData.urnId"
                :loading="resourceData.loadingUrnSelect"
                :options="resourceData.urnOptions"
                :label="$t('pages.relocation.urn_id')"
                class="full-width"
                required
                :no-options="!resourceData.nicheId ? $t('pages.urn.urn_no_options') : null" />
            </div>
          </div>

          <div class="flex justify-between">
            <custom-button outline :label="$t('general_texts.cancel')" color="secondary" @click="closeModal" />
            <div class="flex gap-5">
              <custom-button outline icon="arrow_back" :label="$t('general_texts.back')" color="secondary" @click="goBackToStep3" />
              <custom-button icon="arrow_forward" :label="$t('general_texts.continue')" color="secondary" type="submit" />
            </div>
          </div>
        </q-form>
      </q-carousel-slide>

      <!-- Step 5 -->
      <q-carousel-slide name="resume">
        <q-form @submit="onSubmit">
          <div class="resume-container" :style="type === 'Create' ? 'margin-bottom:15px;' : null">
            <div class="title">{{ $t('pages.relocation.resume_relocation_title') }}</div>
            <div class="input-form flex items-center gap-5">
              <div class="info-text">
                <span>{{ $t('pages.relocation.date') }}:&nbsp;</span>
                <span class="text-secondary" style="font-weight:600">{{ relocationData.date }}</span>
                <span>.</span>
              </div>
              <custom-button v-if="type === 'Edit'" padding="none" round color="primary" flat no-caps icon="drive_file_rename_outline" @click="editStartDate" />
            </div>
            <div class="input-form flex items-center gap-5">
              <div class="info-text">
                <span>{{ $t('pages.relocation.resume_urn_selected') }}:&nbsp;</span>
                <span class="text-secondary" style="font-weight:600">{{ urn_selected }}</span>
                <span>.</span>
              </div>
              <custom-button v-if="type === 'Edit'" padding="none" round color="primary" flat no-caps icon="drive_file_rename_outline" @click="editUrnSelected" />
            </div>
            <div class="input-form flex items-center gap-5" v-if="relocationOption === 'active-reservation'">
              <div class="info-text flex">
                <span>{{ $t('pages.relocation.reservation_selected') }}:&nbsp;</span>
                <span class="text-secondary" style="font-weight:600">{{ reservation_selected }}</span>
              </div>
            </div>
            <div class="input-form flex items-center gap-5" v-if="relocationOption === 'expired-reservation'">
              <div class="info-text flex">
                <span>{{ $t('pages.relocation.casket_selected') }}:&nbsp;</span>
                <span class="text-secondary" style="font-weight:600" v-html="casket_selected"></span>
              </div>
              <custom-button v-if="type === 'Edit'" padding="none" round color="primary" flat no-caps icon="drive_file_rename_outline" @click="editCasket" />
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
            <custom-date-picker v-model="relocationData.endDate" :label="$t('pages.relocation.end_date')" class="full-width" :placeholder="$t('pages.relocation.end_date_placeholder')" required />
          </div>

          <div class="input-form">
            <custom-input v-model="relocationData.description" :label="$t('pages.relocation.description')" class="full-width" :placeholder="$t('pages.relocation.description_placeholder')" type="editor" />
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
import { hideLoading, showLoading, showNotification } from 'src/utils/quasarComponents'
import { defineComponent, reactive, toRefs, onMounted, onBeforeUnmount, computed } from 'vue'
import DialogComponent from 'src/modals/component/DialogComponent'
import { useRelocationStore } from 'stores/relocation'
import { useReservationStore } from 'stores/reservation'
import { useBuildingStore } from 'stores/building'
import { useRoomStore } from 'stores/room'
import { useRowStore } from 'stores/row'
import { useNicheStore } from 'stores/niche'
import { useUrnStore } from 'stores/urn'
import { useCasketStore } from 'stores/casket'
import { useI18n } from 'vue-i18n'
import bus from 'boot/bus'
import moment from 'moment'
import { formatDbToEsDate, formatEsToDbDate } from 'src/helpers/formatDate'

export default defineComponent({
  components: {
    DialogComponent
  },
  setup() {
    onMounted(() => {
      bus.$on('openCreateEditRelocationModal', (data) => {
        closeModal()
        state.type = data ? 'Edit' : 'Create'
        if (data) setRelocationData(data)
        state.isDialogOpen = true
      })
      bus.$on('openCreateRelocationInUrnModal', (data) => {
        closeModal()
        state.type = 'Create'
        state.skip = 'urn-selection'
        formData.relocationData.urnId = data.id?.toString()
        formData.resourceData.urnOptions = [{ label: data.internalCode, value: data.id?.toString() }]
        state.isDialogOpen = true
      })
    })

    onBeforeUnmount(() => {
      bus.$off('openCreateEditRelocationModal')
      bus.$off('openCreateRelocationInUrnModal')
    })

    const { t } = useI18n({})
    const buildingStore = useBuildingStore()
    const roomStore = useRoomStore()
    const rowStore = useRowStore()
    const nicheStore = useNicheStore()
    const urnStore = useUrnStore()
    const casketStore = useCasketStore()
    const relocationStore = useRelocationStore()
    const reservationStore = useReservationStore()

    const state = reactive({
      isDialogOpen: false,
      loading: false,
      type: 'Create',
      step: 'relocation-selection',
      relocationOption: '',
      dateOption: '',
      skip: '',
      transferDeposit: false,
      urn_selected: computed(() => formData.resourceData.urnOptions.find(val => val.value === formData.relocationData.urnId)?.label),
      reservation_selected: computed(() => formData.resourceData.reservationOptions.filter(val => val.value === formData.relocationData.reservationId)?.[0]?.label),
      casket_selected: computed(() => formData.resourceData.casketOptions.filter(val => val.value === formData.relocationData.casketId)?.[0]?.label)
    })

    const formData = reactive({
      relocationData: {
        id: '',
        reservationId: '',
        urnId: '',
        date: '',
        endDate: '',
        casketId: '',
        description: ''
      },
      resourceData: {
        loadingReservationSelect: false,
        reservationOptions: [],
        filterOptions1: [],
        loadingCasketSelect: false,
        casketOptions: [],
        filterOptions2: [],
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
      }
    })

    const setRelocationData = (data) => {
      const dataParsed = JSON.parse(JSON.stringify(data))
      state.relocationOption = 'expired-reservation'
      state.dateOption = 'manual_date'
      state.step = 'resume'

      formData.relocationData.id = dataParsed.id?.toString()
      formData.relocationData.endDate = formatDbToEsDate(dataParsed.endDate)
      formData.relocationData.reservationId = dataParsed.reservationId?.toString()
      formData.relocationData.urnId = dataParsed.urnId?.toString()
      formData.relocationData.date = formatDbToEsDate(dataParsed.startDate)
      formData.relocationData.casketId = dataParsed.casketId?.toString()
      formData.relocationData.description = dataParsed.description

      formData.resourceData.buildingId = dataParsed.urn.niche.row.room.buildingId?.toString()
      formData.resourceData.roomId = dataParsed.urn.niche.row.roomId?.toString()
      formData.resourceData.rowId = dataParsed.urn.niche.rowId?.toString()
      formData.resourceData.nicheId = dataParsed.urn.nicheId?.toString()
      formData.resourceData.urnOptions = [{ label: dataParsed.urn.internalCode, value: dataParsed.urnId?.toString() }]

      if (dataParsed.endDate) {
        state.transferDeposit = true
      }

      let names = ''
      dataParsed.casket.people.forEach(person => {
        names += `<div>${person.dni} - ${person.lastName1} ${person.lastName2} ${person.firstName}</div>`
      })
      formData.resourceData.casketOptions = [{ label: `<div><div>${names}</div></div>`, value: dataParsed.casketId?.toString() }]
    }

    const goBackToStep1 = () => {
      if (state.type === 'Edit') {
        goToResume()
        return
      }
      state.step = 'relocation-selection'
    }

    const goBackToStep2 = () => {
      if (state.type === 'Edit') {
        goToResume()
        return
      }
      state.step = 'date-selection'
    }

    const goBackToStep3 = () => {
      if (state.type === 'Edit') {
        goToResume()
        return
      }
      state.step = state.relocationOption
    }

    const goBackToStep4 = () => {
      if (state.type === 'Edit') {
        goToResume()
        return
      }
      if (state.skip === 'urn-selection') {
        goBackToStep3()
        return
      }
      state.step = 'urn-selection'
    }

    const firstStep = () => {
      if (state.type === 'Edit') {
        goToResume()
        return
      }
      state.step = 'date-selection'
    }

    const secondStep = () => {
      if (state.type === 'Edit') {
        goToResume()
        return
      }
      if (state.dateOption === 'automatic_date') {
        formData.relocationData.date = moment().format('DD/MM/YYYY')
      }
      if (state.relocationOption === 'active-reservation') {
        getAllReservationsWithDepositInDate()
      } else if (state.relocationOption === 'expired-reservation') {
        getAllCasketsWithExpiredReservation()
      }
      state.step = state.relocationOption
    }

    const thirdStep = () => {
      if (state.type === 'Edit') {
        goToResume()
        return
      }
      if (state.skip === 'urn-selection') {
        goToResume()
        return
      }
      state.step = 'urn-selection'
      getAllAvailableResources()
    }

    const goToResume = () => {
      state.step = 'resume'
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

    const editStartDate = () => {
      state.step = 'date-selection'
    }

    const editCasket = () => {
      getAllCasketsWithExpiredReservation()
      state.step = 'expired-reservation'
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

    const getAllCasketsWithExpiredReservation = async () => {
      try {
        formData.resourceData.loadingReservationSelect = true
        let filter = `?relocationDate=${formatEsToDbDate(formData.relocationData.date)}`
        if (state.type === 'Edit') {
          filter += `&includeCasketId=${formData.relocationData.casketId}`
        }
        const data = await casketStore.getAllCasketsWithExpiredReservation(filter)
        fillCasketOptions(data?.data)
        formData.resourceData.loadingReservationSelect = false
      } catch (error) {
        formData.resourceData.loadingReservationSelect = false
      }
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

    const getAllReservationsWithDepositInDate = async () => {
      try {
        formData.resourceData.loadingReservationSelect = true
        let filter = `?relocationDate=${formatEsToDbDate(formData.relocationData.date)}`
        if (state.type === 'Edit') {
          filter += `&includeReservationId=${formData.depositData.reservationId}`
        }
        const data = await reservationStore.getAllReservationsWithDepositInDate(filter)
        fillReservationOptions(data?.data)
        formData.resourceData.loadingReservationSelect = false
      } catch (error) {
        formData.resourceData.loadingReservationSelect = false
      }
    }

    const fillReservationOptions = (data) => {
      formData.resourceData.reservationOptions = []
      data.forEach(reservation => {
        formData.resourceData.reservationOptions.push({ label: `${reservation.urn.internalCode} / ${reservation.person.lastName1} ${reservation.person.lastName2} ${reservation.person.firstName} (${formatDbToEsDate(reservation.startDate)} - ${formatDbToEsDate(reservation.endDate)})`, value: reservation.id.toString() })
      })
      formData.resourceData.filterOptions1 = formData.resourceData.reservationOptions
    }

    const getAllAvailableResources = async () => {
      try {
        formData.resourceData.loadingBuildingSelect = true
        const data = await reservationStore.getAllAvailableResources()
        formData.resourceIds = data

        if (state.type === 'Edit') {
          if (!formData.resourceIds?.buildingIds.includes(parseInt(formData.resourceData.buildingId))) formData.resourceIds?.buildingIds.push(parseInt(formData.resourceData.buildingId))
          if (!formData.resourceIds?.roomIds.includes(parseInt(formData.resourceData.roomId))) formData.resourceIds?.roomIds.push(parseInt(formData.resourceData.roomId))
          if (!formData.resourceIds?.rowIds.includes(parseInt(formData.resourceData.rowId))) formData.resourceIds?.rowIds.push(parseInt(formData.resourceData.rowId))
          if (!formData.resourceIds?.nicheIds.includes(parseInt(formData.resourceData.nicheId))) formData.resourceIds?.nicheIds.push(parseInt(formData.resourceData.nicheId))
          if (!formData.resourceIds?.urnIds.includes(parseInt(formData.relocationData.urnId))) formData.resourceIds?.urnIds.push(parseInt(formData.relocationData.urnId))
        }

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
        const form = JSON.parse(JSON.stringify(formData.relocationData))
        form.dateSp = form.date
        form.date = formatEsToDbDate(form.date)
        form.endDate = formatEsToDbDate(form.endDate)
        form.type = state.relocationOption

        if (state.type === 'Create') {
          await relocationStore.createRelocation(form)
          showNotification(t('pages.relocation.successfully_created'), 'positive')
        }
        else if (state.type === 'Edit') {
          await relocationStore.updateRelocation(form)
          showNotification(t('pages.relocation.successfully_edited'), 'positive')
        }
        closeModal()
        bus.$emit('refreshRelocationData')
        bus.$emit('refreshUrnData')
        bus.$emit('refreshDepositData')
        bus.$emit('refreshReservationData')
        bus.$emit('refreshPersonData')
        state.loading = hideLoading()
      }
      catch (error) {
        state.loading = hideLoading()
      }
    }

    const closeModal = () => {
      state.isDialogOpen = false
      state.loading = false
      state.type = 'Create'
      state.step = 'relocation-selection'
      state.relocationOption = ''
      state.dateOption = ''
      state.skip = ''
      state.transferDeposit = false

      formData.relocationData.id = ''
      formData.relocationData.endDate = ''
      formData.relocationData.reservationId = ''
      formData.relocationData.urnId = ''
      formData.relocationData.date = ''
      formData.relocationData.casketId = ''
      formData.relocationData.description = ''

      formData.resourceData.loadingReservationSelect = false
      formData.resourceData.reservationOptions = []
      formData.resourceData.filterOptions1 = []
      formData.resourceData.loadingCasketSelect = false
      formData.resourceData.casketOptions = []
      formData.resourceData.filterOptions2 = []
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
    }

    const clearEndDate = () => {
      if (!state.transferDeposit) {
        formData.relocationData.endDate = ''
      }
    }

    return {
      ...toRefs(state),
      ...toRefs(formData),
      onSubmit,
      closeModal,
      filterFn1,
      filterFn2,
      goBackToStep1,
      goBackToStep2,
      goBackToStep3,
      goBackToStep4,
      goToResume,
      firstStep,
      secondStep,
      thirdStep,
      getAllRoomsByIdAndBuilding,
      getAllRowsByIdAndRoom,
      getAllNichesByIdAndRow,
      getAllUrnsByIdAndNiche,
      clearEndDate,
      editStartDate,
      editCasket,
      editUrnSelected
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