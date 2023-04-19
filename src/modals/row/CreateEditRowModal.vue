<template>
  <dialog-component v-model="isDialogOpen" :dialog-title="type === 'Create' ? $t('pages.row.modal_create_title') : $t('pages.row.modal_edit_title')">
    <q-form @submit="onSubmit">
      <div class="form-container">
        <div class="input-form">
          <custom-select
            v-model="buildingId"
            :loading="loadingBuildingSelect"
            :options="buildingOptions"
            :label="$t('pages.row.building_id')"
            class="full-width"
            required
            :disabled="readonlySelect"
            @update:model-value="rowData.roomId = ''; getAllRoomsFromBuildingNoPagination()" />
          <custom-select
            v-model="rowData.roomId"
            :loading="loadingRoomSelect"
            :options="roomOptions"
            :label="$t('pages.row.room_id')"
            class="full-width"
            required
            :disabled="readonlySelect"
            :no-options="!buildingId ? $t('pages.row.room_no_options') : null" />
        </div>
        <div class="input-form">
          <custom-input v-model="rowData.internalCode" :readonly="!rowData.roomId" :label="$t('pages.row.internal_code')" class="full-width" :placeholder="$t('pages.row.internal_code_placeholder')" required type="internalCode" :internal-value="selectedInternalCode" />
        </div>
        <div class="input-form">
          <custom-input v-model="rowData.description" :label="$t('pages.row.description')" class="full-width" :placeholder="$t('pages.row.description_placeholder')" type="textarea" />
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
import { useI18n } from 'vue-i18n'
import bus from 'boot/bus'

export default defineComponent({
  components: {
    DialogComponent
  },
  setup() {
    onMounted(() => {
      bus.$on('openCreateEditRowModal', (data) => {
        state.type = data ? 'Edit' : 'Create'
        if (data) setRowData(data)
        state.isDialogOpen = true
        getAllBuildingsNoPaginated()
      })
      bus.$on('openCreateRowInRoomModal', (data) => {
        state.type = 'Create'
        state.buildingOptions = [{ label: `${data.building.internalCode} - ${data.building.name}`, value: data.building.id.toString(), internalCode: data.building.internalCode }]
        state.roomOptions = [{ label: `${data.internalCode} - ${data.location}`, value: data.id.toString(), internalCode: data.internalCode }]
        state.buildingId = data.building.id.toString()
        state.rowData.roomId = data.id.toString()
        state.isDialogOpen = true
        state.readonlySelect = true
      })
    })

    onBeforeUnmount(() => {
      bus.$off('openCreateEditRowModal')
      bus.$off('openCreateRowInRoomModal')
    })

    const { t } = useI18n({})
    const buildingStore = useBuildingStore()
    const roomStore = useRoomStore()
    const rowStore = useRowStore()

    const state = reactive({
      isDialogOpen: false,
      loading: false,
      readonlySelect: false,
      loadingBuildingSelect: false,
      buildingOptions: [],
      loadingRoomSelect: false,
      roomOptions: [],
      selectedInternalCode: computed(() => {
        let response = ''
        const buildingCode = state.buildingOptions.find(val => val.value === state.buildingId)?.internalCode
        if (buildingCode) response = `${buildingCode}`
        const roomCode = state.roomOptions.find(val => val.value === state.rowData.roomId)?.internalCode
        if (roomCode) response = `${roomCode} -`
        return response
      }),
      type: 'Create',
      buildingId: '',
      rowData: {
        id: '',
        internalCode: '',
        description: '',
        roomId: ''
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

    const setRowData = (data) => {
      state.rowData = JSON.parse(JSON.stringify(data))
      state.rowData.roomId = state.rowData.roomId.toString()
      state.buildingId = state.rowData.room.buildingId.toString()

      const internalCodeSplit = state.rowData.internalCode.split("-")
      state.rowData.internalCode = internalCodeSplit[internalCodeSplit.length - 1]
      delete state.rowData.room

      getAllRoomsFromBuildingNoPagination()
    }

    const onSubmit = async () => {
      try {
        state.loading = showLoading()
        const rowData = {...state.rowData, internalCode: `${state.selectedInternalCode}${state.rowData.internalCode}`.replace(/ /g,'')}
        if (state.type === 'Create') {
          await rowStore.createRow(rowData)
          showNotification(t('pages.row.successfully_created'), 'positive')
        }
        else if (state.type === 'Edit') {
          await rowStore.updateRow(rowData.id, rowData)
          showNotification(t('pages.row.successfully_edited'), 'positive')
        }
        closeModal()
        bus.$emit('refreshRowData')
        bus.$emit('refreshNicheData')
        state.loading = hideLoading()
      }
      catch (error) {
        if (error?.response?.status === 422) {
          if (error.response.data?.errors?.internalCode) {
            showNotification(t('pages.row.unique_error_internal_code'))
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
      state.type = 'Create'
      state.buildingId = '',
      state.rowData.id = ''
      state.rowData.internalCode = ''
      state.rowData.description = ''
      state.rowData.roomId = ''
    }

    return {
      ...toRefs(state),
      onSubmit,
      closeModal,
      getAllRoomsFromBuildingNoPagination
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