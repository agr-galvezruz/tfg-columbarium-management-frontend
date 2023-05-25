<template>
  <dialog-component v-model="isDialogOpen" :dialog-title="$t('pages.casket.modal_delete_title')">
    <div class="info-text">
      <div>{{ $t('pages.casket.modal_delete_text2') }}</div>
      <div>
        <span>{{ $t('pages.casket.modal_delete_text1') }}</span>
        <span>?</span>
      </div>
    </div>
    <div class="flex justify-between">
      <custom-button outline :label="$t('general_texts.cancel')" color="secondary" @click="isDialogOpen = false" />
      <custom-button icon="delete" :label="$t('general_texts.delete')" color="negative" @click="deleteCasket" />
    </div>
  </dialog-component>
</template>

<script>
import { defineComponent, reactive, toRefs, onMounted, onBeforeUnmount } from 'vue'
import DialogComponent from 'src/modals/component/DialogComponent'
import { hideLoading, showLoading, showNotification } from 'src/utils/quasarComponents'
import { useCasketStore } from 'stores/casket'
import { useI18n } from 'vue-i18n'
import bus from 'boot/bus'

export default defineComponent({
  components: {
    DialogComponent
  },
  setup() {
    onMounted(() => {
      bus.$on('openDeleteCasketModal', (data) => {
        state.casketData = JSON.parse(JSON.stringify(data))
        state.isDialogOpen = true
      })
    })

    onBeforeUnmount(() => {
      bus.$off('openDeleteCasketModal')
    })

    const { t } = useI18n({})
    const casketStore = useCasketStore()

    const state = reactive({
      isDialogOpen: false,
      loading: false,
      casketData: null
    })

    const deleteCasket = async () => {
      try {
        state.loading = showLoading()
        await casketStore.deleteCasket(state.casketData.id)
        showNotification(t('pages.casket.successfully_deleted'), 'positive')
        bus.$emit('refreshCasketDataDeleted')
        closeModal()
        state.loading = hideLoading()
      } catch (error) {
        if (error?.response?.status === 422) {
          showNotification(t('pages.casket.delete_error'))
        }
        state.loading = hideLoading()
      }
    }

    const closeModal = () => {
      state.isDialogOpen = false
      state.loading = false
      state.casketData = null
    }

    return {
      ...toRefs(state),
      deleteCasket
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