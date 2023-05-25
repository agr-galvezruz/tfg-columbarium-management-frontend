<template>
  <dialog-component v-model="isDialogOpen" :dialog-title="$t('pages.deposit.modal_delete_title')">
    <div class="info-text">
      <div>{{ $t('pages.deposit.modal_delete_text2') }}</div>
      <div>
        <span>{{ $t('pages.deposit.modal_delete_text1') }}</span>
        <span class="important">&nbsp;{{ depositData.name }}</span>
        <span>?</span>
      </div>
    </div>
    <div class="flex justify-between">
      <custom-button outline :label="$t('general_texts.cancel')" color="secondary" @click="isDialogOpen = false" />
      <custom-button icon="delete" :label="$t('general_texts.delete')" color="negative" @click="deleteDeposit" />
    </div>
  </dialog-component>
</template>

<script>
import { defineComponent, reactive, toRefs, onMounted, onBeforeUnmount } from 'vue'
import DialogComponent from 'src/modals/component/DialogComponent'
import { hideLoading, showLoading, showNotification } from 'src/utils/quasarComponents'
import { useDepositStore } from 'stores/deposit'
import { useI18n } from 'vue-i18n'
import bus from 'boot/bus'

export default defineComponent({
  components: {
    DialogComponent
  },
  setup() {
    onMounted(() => {
      bus.$on('openDeleteDepositModal', (data) => {
        state.depositData = JSON.parse(JSON.stringify(data))
        state.isDialogOpen = true
      })
    })

    onBeforeUnmount(() => {
      bus.$off('openDeleteDepositModal')
    })

    const { t } = useI18n({})
    const depositStore = useDepositStore()

    const state = reactive({
      isDialogOpen: false,
      loading: false,
      depositData: null
    })

    const deleteDeposit = async () => {
      try {
        state.loading = showLoading()
        await depositStore.deleteDeposit(state.depositData.id)
        showNotification(t('pages.deposit.successfully_deleted'), 'positive')
        bus.$emit('refreshDepositDataDeleted')
        bus.$emit('refreshReservationData')
        bus.$emit('refreshUrnData')
        closeModal()
        state.loading = hideLoading()
      } catch (error) {
        if (error?.response?.status === 422) {
          showNotification(t('pages.deposit.delete_error'))
        }
        state.loading = hideLoading()
      }
    }

    const closeModal = () => {
      state.isDialogOpen = false
      state.loading = false
      state.depositData = null
    }

    return {
      ...toRefs(state),
      deleteDeposit
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