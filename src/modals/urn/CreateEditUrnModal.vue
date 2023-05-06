<template>
  <dialog-component v-model="isDialogOpen" :dialog-title="type === 'Create' ? $t('pages.urn.modal_create_title') : $t('pages.urn.modal_edit_title')">
    <q-form @submit="onSubmit">
      <div class="form-container">
        <div class="input-form">
          <custom-select
            v-model="buildingId"
            :loading="loadingBuildingSelect"
            :options="buildingOptions"
            :label="$t('pages.urn.building_id')"
            class="full-width"
            required
            :disabled="readonlySelect"
            @update:model-value="roomId = ''; rowId = ''; urnData.nicheId = ''; getAllRoomsFromBuildingNoPagination()" />
          <custom-select
            v-model="roomId"
            :loading="loadingRoomSelect"
            :options="roomOptions"
            :label="$t('pages.urn.room_id')"
            class="full-width"
            required
            :disabled="readonlySelect"
            :no-options="!buildingId ? $t('pages.urn.room_no_options') : null"
            @update:model-value="rowId = ''; urnData.nicheId = ''; getAllRowsFromRoomNoPagination()" />
        </div>
        <div class="input-form">
          <custom-select
            v-model="rowId"
            :loading="loadingRowSelect"
            :options="rowOptions"
            :label="$t('pages.urn.row_id')"
            class="full-width"
            required
            :disabled="readonlySelect"
            :no-options="!roomId ? $t('pages.urn.row_no_options') : null"
            @update:model-value="urnData.nicheId = ''; getAllNichesFromRowNoPagination()" />
          <custom-select
            v-model="urnData.nicheId"
            :loading="loadingNicheSelect"
            :options="nicheOptions"
            :label="$t('pages.urn.niche_id')"
            class="full-width"
            required
            :disabled="readonlySelect"
            :no-options="!rowId ? $t('pages.urn.niche_no_options') : null" />
        </div>
        <div class="input-form">
          <custom-input v-model="urnData.internalCode" :readonly="!urnData.nicheId" :label="$t('pages.urn.internal_code')" class="full-width" :placeholder="$t('pages.urn.internal_code_placeholder')" required type="internalCode" :internal-value="selectedInternalCode" />
          <custom-select v-model="urnData.status" :options="statusOptions" :label="$t('pages.urn.status')" class="full-width" required />
        </div>
        <div class="input-form">
          <custom-input v-model="urnData.description" :label="$t('pages.urn.description')" class="full-width" :placeholder="$t('pages.urn.description_placeholder')" type="editor" />
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
import { defineComponent, reactive, toRefs, onMounted, computed, onBeforeUnmount } from 'vue'
import DialogComponent from 'src/modals/component/DialogComponent'
import { useBuildingStore } from 'stores/building'
import { useRoomStore } from 'stores/room'
import { useRowStore } from 'stores/row'
import { useNicheStore } from 'stores/niche'
import { useUrnStore } from 'stores/urn'
import { useI18n } from 'vue-i18n'
import bus from 'boot/bus'

export default defineComponent({
  components: {
    DialogComponent
  },
  setup() {
    onMounted(() => {
      bus.$on('openCreateEditUrnModal', (data) => {
        state.type = data ? 'Edit' : 'Create'
        if (data) setUrnData(data)
        state.isDialogOpen = true
        getAllBuildingsNoPaginated()
      })
      bus.$on('openCreateUrnInNicheModal', (data) => {
        console.log(data)
        state.type = 'Create'
        state.buildingOptions = [{ label: `${data.row.room.building.internalCode} - ${data.row.room.building.name}`, value: data.row.room.building.id.toString(), internalCode: data.row.room.building.internalCode }]
        state.roomOptions = [{ label: `${data.row.room.internalCode} - ${data.row.room.location}`, value: data.row.room.id.toString(), internalCode: data.row.room.internalCode }]
        state.rowOptions = [{ label: `${data.row.internalCode}`, value: data.row.id.toString(), internalCode: data.row.internalCode }]
        state.nicheOptions = [{ label: `${data.internalCode}`, value: data.id.toString(), internalCode: data.internalCode }]
        state.buildingId = data.row.room.building.id.toString()
        state.roomId = data.row.room.id.toString()
        state.rowId = data.row.id.toString()
        state.urnData.nicheId = data.id.toString()
        state.isDialogOpen = true
        state.readonlySelect = true
      })
    })

    onBeforeUnmount(() => {
      bus.$off('openCreateEditUrnModal')
      bus.$off('openCreateUrnInNicheModal')
    })

    const { t } = useI18n({})
    const buildingStore = useBuildingStore()
    const roomStore = useRoomStore()
    const rowStore = useRowStore()
    const nicheStore = useNicheStore()
    const urnStore = useUrnStore()

    const state = reactive({
      isDialogOpen: false,
      loading: false,
      readonlySelect: false,
      loadingBuildingSelect: false,
      buildingOptions: [],
      loadingRoomSelect: false,
      roomOptions: [],
      loadingRowSelect: false,
      rowOptions: [],
      loadingNicheSelect: false,
      nicheOptions: [],
      selectedInternalCode: computed(() => {
        let response = ''
        const buildingCode = state.buildingOptions.find(val => val.value === state.buildingId)?.internalCode
        if (buildingCode) response = `${buildingCode}`

        const roomCode = state.roomOptions.find(val => val.value === state.roomId)?.internalCode
        if (roomCode) response = `${roomCode}`

        const rowCode = state.rowOptions.find(val => val.value === state.rowId)?.internalCode
        if (rowCode) response = `${rowCode}`

        const nicheCode = state.nicheOptions.find(val => val.value === state.urnData.nicheId)?.internalCode
        if (nicheCode) response = `${nicheCode} -`
        return response
      }),
      type: 'Create',
      buildingId: '',
      roomId: '',
      rowId: '',
      statusOptions: [
        { value: 'AVAILABLE' ,label: t('components.status.available') },
        { value: 'RESERVED' ,label: t('components.status.reserved') },
        { value: 'OCCUPIED' ,label: t('components.status.occupied') },
        { value: 'EXPIRED' ,label: t('components.status.expired') },
        { value: 'DISABLED' ,label: t('components.status.disabled') }
      ],
      urnData: {
        id: '',
        internalCode: '',
        status: '',
        description: '',
        nicheId: ''
      }
    })

    const getAllBuildingsNoPaginated = async () => {
      try {
        state.loadingBuildingSelect = true
        const data = await buildingStore.getAllBuildingsNoPaginated()
        fillBuildingOptions(data?.data)
        state.loadingBuildingSelect = false
      } catch (error) {
        state.loadingBuildingSelect = false
      }
    }

    const getAllRoomsFromBuildingNoPagination = async () => {
      try {
        state.loadingRoomSelect = true
        const data = await roomStore.getAllRoomsFromBuildingNoPagination(state.buildingId)
        fillRoomOptions(data?.data)
        state.loadingRoomSelect = false
      } catch (error) {
        state.loadingRoomSelect = false
      }
    }

    const getAllRowsFromRoomNoPagination = async () => {
      try {
        state.loadingRowSelect = true
        const data = await rowStore.getAllRowsFromRoomNoPagination(state.roomId)
        fillRowOptions(data?.data)
        state.loadingRowSelect = false
      } catch (error) {
        state.loadingRowSelect = false
      }
    }

    const getAllNichesFromRowNoPagination = async () => {
      try {
        state.loadingNicheSelect = true
        const data = await nicheStore.getAllNichesFromRowNoPagination(state.rowId)
        fillNicheOptions(data?.data)
        state.loadingNicheSelect = false
      } catch (error) {
        state.loadingNicheSelect = false
      }
    }

    const fillBuildingOptions = (data) => {
      state.buildingOptions = []
      data.forEach(building => {
        state.buildingOptions.push({ label: `${building.internalCode} - ${building.name}`, value: building.id.toString(), internalCode: building.internalCode })
      })
    }

    const fillRoomOptions = (data) => {
      state.roomOptions = []
      data.forEach(room => {
        state.roomOptions.push({ label: `${room.internalCode} - ${room.location}`, value: room.id.toString(), internalCode: room.internalCode })
      })
    }

    const fillRowOptions = (data) => {
      state.rowOptions = []
      data.forEach(row => {
        state.rowOptions.push({ label: `${row.internalCode}`, value: row.id.toString(), internalCode: row.internalCode })
      })
    }

    const fillNicheOptions = (data) => {
      state.nicheOptions = []
      data.forEach(niche => {
        state.nicheOptions.push({ label: `${niche.internalCode}`, value: niche.id.toString(), internalCode: niche.internalCode })
      })
    }

    const setUrnData = (data) => {
      state.urnData = JSON.parse(JSON.stringify(data))
      state.urnData.nicheId = state.urnData.nicheId.toString()

      state.rowId = state.urnData.niche.rowId.toString()
      state.roomId = state.urnData.niche.row.roomId.toString()
      state.buildingId = state.urnData.niche.row.room.buildingId.toString()

      const internalCodeSplit = state.urnData.internalCode.split("-")
      state.urnData.internalCode = internalCodeSplit[internalCodeSplit.length - 1]
      delete state.urnData.niche

      getAllRoomsFromBuildingNoPagination()
      getAllRowsFromRoomNoPagination()
      getAllNichesFromRowNoPagination()
    }

    const onSubmit = async () => {
      try {
        state.loading = showLoading()
        const urnData = {...state.urnData, internalCode: `${state.selectedInternalCode}${state.urnData.internalCode}`.replace(/ /g,'')}
        if (state.type === 'Create') {
          await urnStore.createUrn(urnData)
          showNotification(t('pages.urn.successfully_created'), 'positive')
        }
        else if (state.type === 'Edit') {
          await urnStore.updateUrn(urnData.id, urnData)
          showNotification(t('pages.urn.successfully_edited'), 'positive')
        }
        closeModal()
        bus.$emit('refreshNicheData')
        bus.$emit('refreshUrnData')
        bus.$emit('refreshReservationData')
        bus.$emit('refreshDepositData')
        bus.$emit('refreshRelocationData')
        state.loading = hideLoading()
      }
      catch (error) {
        if (error?.response?.status === 422) {
          if (error.response.data?.errors?.internalCode) {
            showNotification(t('pages.urn.unique_error_internal_code'))
          }
        }
        state.loading = hideLoading()
      }
    }

    const closeModal = () => {
      state.isDialogOpen = false
      state.loading = false
      state.readonlySelect = false
      state.loadingBuildingSelect = false
      state.buildingOptions = []
      state.loadingRoomSelect = false
      state.roomOptions = []
      state.loadingRowSelect = false
      state.rowOptions = []
      state.loadingNicheSelect = false
      state.nicheOptions = []
      state.type = 'Create'
      state.buildingId = '',
      state.roomId = '',
      state.rowId = '',
      state.urnData.id = ''
      state.urnData.internalCode = ''
      state.urnData.status = ''
      state.urnData.description = ''
      state.urnData.nicheId = ''
    }

    return {
      ...toRefs(state),
      onSubmit,
      closeModal,
      getAllRoomsFromBuildingNoPagination,
      getAllRowsFromRoomNoPagination,
      getAllNichesFromRowNoPagination,
    };
  }
})
</script>

<style lang="scss" scoped>
  .form-container {
    width: 100%;
    .input-form {
      display: flex;
      gap: 10px;
      margin-bottom: 5px;
    }
    .input-form > * {
      flex: 1;
      min-width: 275px;
    }
  }
</style>