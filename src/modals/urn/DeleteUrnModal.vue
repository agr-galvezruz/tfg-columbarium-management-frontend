<template>
  <dialog-component v-model="isDialogOpen" :dialog-title="$t('pages.urn.modal_delete_title')">
    <div class="info-text">
      <div>{{ $t('pages.urn.modal_delete_text2') }}</div>
      <div>
        <span>{{ $t('pages.urn.modal_delete_text1') }}</span>
        <span class="important">&nbsp;{{ urnData.internalCode }}</span>
        <span>?</span>
      </div>
    </div>
    <div class="flex justify-between">
      <custom-button outline :label="$t('general_texts.cancel')" color="secondary" @click="isDialogOpen = false" />
      <custom-button icon="delete" :label="$t('general_texts.delete')" color="negative" @click="deleteUrn" />
    </div>
  </dialog-component>
</template>

<script>
import { defineComponent, reactive, toRefs, onMounted, onBeforeUnmount } from 'vue'
import DialogComponent from 'src/modals/component/DialogComponent'
import { hideLoading, showLoading, showNotification } from 'src/utils/quasarComponents'
import { useUrnStore } from 'stores/urn'
import { useI18n } from 'vue-i18n'
import bus from 'boot/bus'

export default defineComponent({
  components: {
    DialogComponent
  },
  setup() {
    onMounted(() => {
      bus.$on('openDeleteUrnModal', (data) => {
        state.urnData = JSON.parse(JSON.stringify(data))
        state.isDialogOpen = true
      })
    })

    onBeforeUnmount(() => {
      bus.$off('openDeleteUrnModal')
    })

    const { t } = useI18n({})
    const urnStore = useUrnStore()

    const state = reactive({
      isDialogOpen: false,
      loading: false,
      urnData: null
    })

    const deleteUrn = async () => {
      try {
        state.loading = showLoading()
        await urnStore.deleteUrn(state.urnData.id)
        showNotification(t('pages.urn.successfully_deleted'), 'positive')
        bus.$emit('refreshUrnDataDeleted')
        closeModal()
        state.loading = hideLoading()
      } catch (error) {
        if (error?.response?.status === 422) {
          showNotification(t('pages.urn.delete_error'))
        }
        state.loading = hideLoading()
      }
    }

    const closeModal = () => {
      state.isDialogOpen = false
      state.loading = false
      state.urnData = null
    }

    return {
      ...toRefs(state),
      deleteUrn
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