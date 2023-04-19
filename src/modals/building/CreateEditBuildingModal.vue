<template>
  <dialog-component v-model="isDialogOpen" :dialog-title="type === 'Create' ? $t('pages.building.modal_create_title') : $t('pages.building.modal_edit_title')">
    <q-form @submit="onSubmit">
      <div class="form-container">
        <div class="input-form">
          <custom-input v-model="buildingData.internalCode" :label="$t('pages.building.internal_code')" class="full-width" :placeholder="$t('pages.building.internal_code_placeholder')" required />
          <custom-input v-model="buildingData.name" :label="$t('pages.building.name')" class="full-width" :placeholder="$t('pages.building.name_placeholder')" required />
        </div>
        <div class="input-form">
          <custom-input v-model="buildingData.address" :label="$t('pages.building.address')" class="full-width" :placeholder="$t('pages.building.address_placeholder')" required />
        </div>
        <div class="input-form">
          <custom-input v-model="buildingData.description" :label="$t('pages.building.description')" class="full-width" :placeholder="$t('pages.building.description_placeholder')" type="textarea" />
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
import { useBuildingStore } from 'stores/building'
import { useI18n } from 'vue-i18n'
import bus from 'boot/bus'

export default defineComponent({
  components: {
    DialogComponent
  },
  setup() {
    onMounted(() => {
      bus.$on('openCreateEditBuildingModal', (data) => {
        state.type = data ? 'Edit' : 'Create'
        if (data) setBuildingData(data)
        state.isDialogOpen = true
      })
    })

    onBeforeUnmount(() => {
      bus.$off('openCreateEditBuildingModal')
    })

    const { t } = useI18n({})
    const buildingStore = useBuildingStore()

    const state = reactive({
      isDialogOpen: false,
      loading: false,
      type: 'Create',
      buildingData: {
        id: '',
        internalCode: '',
        name: '',
        address: '',
        description: ''
      }
    })

    const setBuildingData = (data) => {
      state.buildingData = JSON.parse(JSON.stringify(data))
    }

    const onSubmit = async () => {
      try {
        state.loading = showLoading()
        if (state.type === 'Create') {
          await buildingStore.createBuilding(state.buildingData)
          showNotification(t('pages.building.successfully_created'), 'positive')
        }
        else if (state.type === 'Edit') {
          await buildingStore.updateBuilding(state.buildingData.id, state.buildingData)
          showNotification(t('pages.building.successfully_edited'), 'positive')
        }
        closeModal()
        bus.$emit('refreshBuildingData')
        bus.$emit('refreshRoomData')
        state.loading = hideLoading()
      }
      catch (error) {
        if (error?.response?.status === 422) {
          if (error.response.data?.errors?.internalCode) {
            showNotification(t('pages.building.unique_error_internal_code'))
          }
          else if (error.response.data?.errors?.name) {
            showNotification(t('pages.building.unique_error_name'))
          }
        }
        state.loading = hideLoading()
      }
    }

    const closeModal = () => {
      state.isDialogOpen = false
      state.loading = false
      state.type = 'Create'
      state.buildingData.id = ''
      state.buildingData.internalCode = ''
      state.buildingData.name = ''
      state.buildingData.address = ''
      state.buildingData.description = ''
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
    .input-form{
      display: flex;
      gap: 10px;
      margin-bottom: 5px;
    }
  }
</style>