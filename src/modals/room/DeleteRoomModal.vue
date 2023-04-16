<template>
  <dialog-component v-model="isDialogOpen" :dialog-title="$t('pages.room.modal_delete_title')">
    <div class="info-text">
      <div>{{ $t('pages.room.modal_delete_text2') }}</div>
      <div>
        <span>{{ $t('pages.room.modal_delete_text1') }}</span>
        <span class="important">&nbsp;{{ roomData.internalCode }}</span>
        <span>?</span>
      </div>
    </div>
    <div class="flex justify-between">
      <custom-button outline :label="$t('general_texts.cancel')" color="secondary" @click="isDialogOpen = false" />
      <custom-button icon="delete" :label="$t('general_texts.delete')" color="negative" @click="deleteRoom" />
    </div>
  </dialog-component>
</template>

<script>
import { defineComponent, reactive, toRefs, onMounted, onBeforeUnmount } from 'vue'
import DialogComponent from 'src/modals/component/DialogComponent'
import { hideLoading, showLoading, showNotification } from 'src/utils/quasarComponents'
import { useRoomStore } from 'stores/room'
import { useI18n } from 'vue-i18n'
import bus from 'boot/bus'

export default defineComponent({
  components: {
    DialogComponent
  },
  setup() {
    onMounted(() => {
      bus.$on('openDeleteRoomModal', (data) => {
        state.roomData = JSON.parse(JSON.stringify(data))
        state.isDialogOpen = true
      })
    })

    onBeforeUnmount(() => {
      bus.$off('openDeleteRoomModal')
    })

    const { t } = useI18n({})
    const roomStore = useRoomStore()

    const state = reactive({
      isDialogOpen: false,
      loading: false,
      roomData: null
    })

    const deleteRoom = async () => {
      try {
        state.loading = showLoading()
        await roomStore.deleteRoom(state.roomData.id)
        showNotification(t('pages.room.successfully_deleted'), 'positive')
        bus.$emit('refreshRoomDataDeleted')
        closeModal()
        state.loading = hideLoading()
      } catch (error) {
        if (error?.response?.status === 422) {
          showNotification(t('pages.room.delete_error'))
        }
        state.loading = hideLoading()
      }
    }

    const closeModal = () => {
      state.isDialogOpen = false
      state.loading = false
      state.roomData = null
    }

    return {
      ...toRefs(state),
      deleteRoom
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