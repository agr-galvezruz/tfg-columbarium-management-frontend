<template>
  <dialog-component v-model="isDialogOpen" :dialog-title="$t('pages.building.modal_delete_title')">
    <div class="info-text">
      <div>{{ $t('pages.building.modal_delete_text2') }}</div>
      <div>
        <span>{{ $t('pages.building.modal_delete_text1') }}</span>
        <span class="important">&nbsp;{{ buildingData.name }}</span>
        <span>?</span>
      </div>
    </div>
    <div class="flex justify-between">
      <custom-button outline :label="$t('general_texts.cancel')" color="secondary" @click="isDialogOpen = false" />
      <custom-button icon="delete" :label="$t('general_texts.delete')" color="negative" @click="deleteBuilding" />
    </div>
  </dialog-component>
</template>

<script>
import { defineComponent, reactive, toRefs, onMounted, onBeforeUnmount } from 'vue'
import DialogComponent from 'src/modals/component/DialogComponent'
import { hideLoading, showLoading, showNotification } from 'src/utils/quasarComponents'
import { useBuildingStore } from 'stores/building'
import { useI18n } from 'vue-i18n'
import bus from 'boot/bus'

export default defineComponent({
  components: {
    DialogComponent
  },
  setup() {
    onMounted(() => {
      bus.$on('openDeleteBuildingModal', (data) => {
        state.buildingData = JSON.parse(JSON.stringify(data))
        state.isDialogOpen = true
      })
    })

    onBeforeUnmount(() => {
      bus.$off('openDeleteBuildingModal')
    })

    const { t } = useI18n({})
    const buildingStore = useBuildingStore()

    const state = reactive({
      isDialogOpen: false,
      loading: false,
      buildingData: null
    })

    const deleteBuilding = async () => {
      try {
        state.loading = showLoading()
        await buildingStore.deleteBuilding(state.buildingData.id)
        showNotification(t('pages.building.successfully_deleted'), 'positive')
        bus.$emit('refreshBuildingDataDeleted')
        closeModal()
        state.loading = hideLoading()
      } catch (error) {
        if (error?.response?.status === 422) {
          showNotification(t('pages.building.delete_error'))
        }
        state.loading = hideLoading()
      }
    }

    const closeModal = () => {
      state.isDialogOpen = false
      state.loading = false
      state.buildingData = null
    }

    return {
      ...toRefs(state),
      deleteBuilding
    };
  }
})
</script>

<style lang="scss" scoped>
  .info-text {
    font-size: 15px;
    text-align: center;
    margin-bottom: 20px;
    .important {
      font-weight: 600;
    }
  }
</style>