<template>
  <dialog-component v-model="isDialogOpen" :dialog-title="type === 'Create' ? $t('pages.niche.modal_create_title') : $t('pages.niche.modal_edit_title')">
    <q-form @submit="onSubmit">
      <div class="form-container">
        <div class="input-form">
          <custom-select
            v-model="buildingId"
            :loading="loadingBuildingSelect"
            :options="buildingOptions"
            :label="$t('pages.niche.building_id')"
            class="full-width"
            required
            :disabled="readonlySelect"
            @update:model-value="roomId = ''; nicheData.rowId = ''; getAllRoomsFromBuildingNoPagination()" />
          <custom-select
            v-model="roomId"
            :loading="loadingRoomSelect"
            :options="roomOptions"
            :label="$t('pages.niche.room_id')"
            class="full-width"
            required
            :disabled="readonlySelect"
            :no-options="!roomId ? $t('pages.niche.room_no_options') : null"
            @update:model-value="nicheData.rowId = ''; getAllRowsFromRoomNoPagination()" />
        </div>
        <div class="input-form">
          <custom-select
            v-model="nicheData.rowId"
            :loading="loadingRowSelect"
            :options="rowOptions"
            :label="$t('pages.niche.row_id')"
            class="full-width"
            required
            :disabled="readonlySelect"
            :no-options="!buildingId ? $t('pages.niche.row_no_options') : null" />
          <custom-input v-model="nicheData.internalCode" :readonly="!nicheData.rowId" :label="$t('pages.niche.internal_code')" class="full-width" :placeholder="$t('pages.niche.internal_code_placeholder')" required type="internalCode" :internal-value="selectedInternalCode" />
        </div>
        <div class="input-form">
          <custom-input v-model="nicheData.storageQuantity" :label="$t('pages.niche.storage_quantity')" class="full-width" :placeholder="$t('pages.niche.storage_quantity_placeholder')" type="number" />
        </div>
        <div class="input-form">
          <custom-input v-model="nicheData.description" :label="$t('pages.niche.description')" class="full-width" :placeholder="$t('pages.niche.description_placeholder')" type="textarea" />
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
import { useI18n } from 'vue-i18n'
import bus from 'boot/bus'

export default defineComponent({
  components: {
    DialogComponent
  },
  setup() {
    onMounted(() => {
      bus.$on('openCreateEditNicheModal', (data) => {
        state.type = data ? 'Edit' : 'Create'
        if (data) setNicheData(data)
        state.isDialogOpen = true
        getAllBuildingsNoPaginated()
      })
      bus.$on('openCreateNicheInRowModal', (data) => {
        console.log(data)
        state.type = 'Create'
        state.buildingOptions = [{ label: `${data.room.building.internalCode} - ${data.room.building.name}`, value: data.room.building.id.toString(), internalCode: data.room.building.internalCode }]
        state.roomOptions = [{ label: `${data.room.internalCode} - ${data.room.location}`, value: data.room.id.toString(), internalCode: data.room.internalCode }]
        state.rowOptions = [{ label: `${data.internalCode}`, value: data.id.toString(), internalCode: data.internalCode }]
        state.buildingId = data.room.building.id.toString()
        state.roomId = data.room.id.toString()
        state.nicheData.rowId = data.id.toString()
        state.isDialogOpen = true
        state.readonlySelect = true
      })
    })

    onBeforeUnmount(() => {
      bus.$off('openCreateEditNicheModal')
      bus.$off('openCreateNicheInRowModal')
    })

    const { t } = useI18n({})
    const buildingStore = useBuildingStore()
    const roomStore = useRoomStore()
    const rowStore = useRowStore()
    const nicheStore = useNicheStore()

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
      selectedInternalCode: computed(() => {
        let response = ''
        const buildingCode = state.buildingOptions.find(val => val.value === state.buildingId)?.internalCode
        if (buildingCode) response = `${buildingCode}`

        const roomCode = state.roomOptions.find(val => val.value === state.roomId)?.internalCode
        if (roomCode) response = `${roomCode}`

        const rowCode = state.rowOptions.find(val => val.value === state.nicheData.rowId)?.internalCode
        if (rowCode) response = `${rowCode} -`
        return response
      }),
      type: 'Create',
      buildingId: '',
      roomId: '',
      nicheData: {
        id: '',
        internalCode: '',
        storageQuantity: '',
        description: '',
        rowId: ''
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

    const setNicheData = (data) => {
      state.nicheData = JSON.parse(JSON.stringify(data))
      state.nicheData.rowId = state.nicheData.rowId.toString()

      state.roomId = state.nicheData.row.roomId.toString()
      state.buildingId = state.nicheData.row.room.buildingId.toString()

      const internalCodeSplit = state.nicheData.internalCode.split("-")
      state.nicheData.internalCode = internalCodeSplit[internalCodeSplit.length - 1]
      delete state.nicheData.row

      getAllRoomsFromBuildingNoPagination()
      getAllRowsFromRoomNoPagination()
    }

    const onSubmit = async () => {
      try {
        state.loading = showLoading()
        const nicheData = {...state.nicheData, internalCode: `${state.selectedInternalCode}${state.nicheData.internalCode}`.replace(/ /g,'')}
        if (state.type === 'Create') {
          await nicheStore.createNiche(nicheData)
          showNotification(t('pages.niche.successfully_created'), 'positive')
        }
        else if (state.type === 'Edit') {
          await nicheStore.updateNiche(nicheData.id, nicheData)
          showNotification(t('pages.niche.successfully_edited'), 'positive')
        }
        closeModal()
        bus.$emit('refreshNicheData')
        state.loading = hideLoading()
      }
      catch (error) {
        if (error?.response?.status === 422) {
          if (error.response.data?.errors?.internalCode) {
            showNotification(t('pages.niche.unique_error_internal_code'))
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
      state.type = 'Create'
      state.buildingId = '',
      state.roomId = '',
      state.nicheData.id = ''
      state.nicheData.internalCode = ''
      state.nicheData.storageQuantity = ''
      state.nicheData.description = ''
      state.nicheData.rowId = ''
    }

    return {
      ...toRefs(state),
      onSubmit,
      closeModal,
      getAllRoomsFromBuildingNoPagination,
      getAllRowsFromRoomNoPagination
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