<template>
  <dialog-component v-model="isDialogOpen" :dialog-title="type === 'Create' ? $t('pages.room.modal_create_title') : $t('pages.room.modal_edit_title')">
    <q-form @submit="onSubmit">
      <div class="form-container">
        <div class="input-form">
          <custom-select v-model="roomData.buildingId" :loading="loadingBuildingSelect" :options="buildingOptions" :label="$t('pages.room.building_id')" class="full-width" required :disabled="readonlySelect" />
          <custom-input v-model="roomData.internalCode" :readonly="!roomData.buildingId" :label="$t('pages.room.internal_code')" class="full-width" :placeholder="$t('pages.room.internal_code_placeholder')" required type="internalCode" :internal-value="selectedInternalCode" />
        </div>
        <div class="input-form">
          <custom-input v-model="roomData.location" :label="$t('pages.room.location')" class="full-width" :placeholder="$t('pages.room.location_placeholder')" required />
        </div>
        <div class="input-form">
          <custom-input v-model="roomData.description" :label="$t('pages.room.description')" class="full-width" :placeholder="$t('pages.room.description_placeholder')" type="editor" />
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
import { useI18n } from 'vue-i18n'
import bus from 'boot/bus'

export default defineComponent({
  components: {
    DialogComponent
  },
  setup() {
    onMounted(() => {
      bus.$on('openCreateEditRoomModal', (data) => {
        state.type = data ? 'Edit' : 'Create'
        if (data) setRoomData(data)
        state.isDialogOpen = true
        getAllBuildingsNoPaginated()
      })
      bus.$on('openCreateRoomInBuildingModal', (data) => {
        state.type = 'Create'
        state.buildingOptions = [{ label: `${data.internalCode} - ${data.name}`, value: data.id.toString(), internalCode: data.internalCode }]
        state.roomData.buildingId = data.id.toString()
        state.isDialogOpen = true
        state.readonlySelect = true
      })
    })

    onBeforeUnmount(() => {
      bus.$off('openCreateEditRoomModal')
      bus.$off('openCreateRoomInBuildingModal')
    })

    const { t } = useI18n({})
    const buildingStore = useBuildingStore()
    const roomStore = useRoomStore()

    const state = reactive({
      isDialogOpen: false,
      loading: false,
      readonlySelect: false,
      loadingBuildingSelect: false,
      buildingOptions: [],
      selectedInternalCode: computed(() => {
        const response = state.buildingOptions.find(val => val.value === state.roomData.buildingId)?.internalCode
        if (response) return `${response} -`
        return response
      }),
      type: 'Create',
      roomData: {
        id: '',
        internalCode: '',
        location: '',
        description: '',
        buildingId: ''
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

    const fillBuildingOptions = (data) => {
      state.buildingOptions = []
      data.forEach(building => {
        state.buildingOptions.push({ label: `${building.internalCode} - ${building.name}`, value: building.id.toString(), internalCode: building.internalCode })
      })
    }

    const setRoomData = (data) => {
      state.roomData = JSON.parse(JSON.stringify(data))
      state.roomData.buildingId = state.roomData.buildingId.toString()

      const internalCodeSplit = state.roomData.internalCode.split("-")
      state.roomData.internalCode = internalCodeSplit[internalCodeSplit.length - 1]
    }

    const onSubmit = async () => {
      try {
        state.loading = showLoading()
        const roomData = {...state.roomData, internalCode: `${state.selectedInternalCode}${state.roomData.internalCode}`.replace(/ /g,'')}
        if (state.type === 'Create') {
          await roomStore.createRoom(roomData)
          showNotification(t('pages.room.successfully_created'), 'positive')
        }
        else if (state.type === 'Edit') {
          await roomStore.updateRoom(roomData.id, roomData)
          showNotification(t('pages.room.successfully_edited'), 'positive')
        }
        closeModal()
        bus.$emit('refreshRoomData')
        bus.$emit('refreshRowData')
        state.loading = hideLoading()
      }
      catch (error) {
        if (error?.response?.status === 422) {
          if (error.response.data?.errors?.internalCode) {
            showNotification(t('pages.room.unique_error_internal_code'))
          }
        }
        state.loading = hideLoading()
      }
    }

    const closeModal = () => {
      state.isDialogOpen = false
      state.loading = false
      state.loadingBuildingSelect = false
      state.readonlySelect = false
      state.buildingOptions = []
      state.type = 'Create'
      state.roomData.id = ''
      state.roomData.internalCode = ''
      state.roomData.location = ''
      state.roomData.description = ''
      state.roomData.buildingId = ''
    }

    return {
      ...toRefs(state),
      onSubmit,
      closeModal
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