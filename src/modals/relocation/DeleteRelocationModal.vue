<template>
  <dialog-component v-model="isDialogOpen" :dialog-title="$t('pages.relocation.modal_delete_title')">
    <div class="info-text">
      <div>
        <span>{{ $t('pages.relocation.modal_delete_text1') }}</span>
        <span>?</span>
      </div>
    </div>
    <div class="flex justify-between">
      <custom-button outline :label="$t('general_texts.cancel')" color="secondary" @click="isDialogOpen = false" />
      <custom-button icon="delete" :label="$t('general_texts.delete')" color="negative" @click="deleteRelocation" />
    </div>
  </dialog-component>
</template>

<script>
import { defineComponent, reactive, toRefs, onMounted, onBeforeUnmount } from 'vue'
import DialogComponent from 'src/modals/component/DialogComponent'
import { hideLoading, showLoading, showNotification } from 'src/utils/quasarComponents'
import { useRelocationStore } from 'stores/relocation'
import { useI18n } from 'vue-i18n'
import bus from 'boot/bus'

export default defineComponent({
  components: {
    DialogComponent
  },
  setup() {
    onMounted(() => {
      bus.$on('openDeleteRelocationModal', (data) => {
        state.relocationData = JSON.parse(JSON.stringify(data))
        state.isDialogOpen = true
      })
    })

    onBeforeUnmount(() => {
      bus.$off('openDeleteRelocationModal')
    })

    const { t } = useI18n({})
    const relocationStore = useRelocationStore()

    const state = reactive({
      isDialogOpen: false,
      loading: false,
      relocationData: null
    })

    const deleteRelocation = async () => {
      try {
        state.loading = showLoading()
        await relocationStore.deleteRelocation(state.relocationData.id)
        showNotification(t('pages.relocation.successfully_deleted'), 'positive')
        bus.$emit('refreshRelocationDataDeleted')
        bus.$emit('refreshUrnData')
        closeModal()
        state.loading = hideLoading()
      } catch (error) {
        state.loading = hideLoading()
      }
    }

    const closeModal = () => {
      state.isDialogOpen = false
      state.loading = false
      state.relocationData = null
    }

    return {
      ...toRefs(state),
      deleteRelocation
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