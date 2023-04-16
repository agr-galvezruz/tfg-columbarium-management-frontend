<template>
  <dialog-component v-model="isDialogOpen" :dialog-title="$t('pages.row.modal_delete_title')">
    <div class="info-text">
      <div>{{ $t('pages.row.modal_delete_text2') }}</div>
      <div>
        <span>{{ $t('pages.row.modal_delete_text1') }}</span>
        <span class="important">&nbsp;{{ rowData.internalCode }}</span>
        <span>?</span>
      </div>
    </div>
    <div class="flex justify-between">
      <custom-button outline :label="$t('general_texts.cancel')" color="secondary" @click="isDialogOpen = false" />
      <custom-button icon="delete" :label="$t('general_texts.delete')" color="negative" @click="deleteRow" />
    </div>
  </dialog-component>
</template>

<script>
import { defineComponent, reactive, toRefs, onMounted, onBeforeUnmount } from 'vue'
import DialogComponent from 'src/modals/component/DialogComponent'
import { hideLoading, showLoading, showNotification } from 'src/utils/quasarComponents'
import { useRowStore } from 'stores/row'
import { useI18n } from 'vue-i18n'
import bus from 'boot/bus'

export default defineComponent({
  components: {
    DialogComponent
  },
  setup() {
    onMounted(() => {
      bus.$on('openDeleteRowModal', (data) => {
        state.rowData = JSON.parse(JSON.stringify(data))
        state.isDialogOpen = true
      })
    })

    onBeforeUnmount(() => {
      bus.$off('openDeleteRowModal')
    })

    const { t } = useI18n({})
    const rowStore = useRowStore()

    const state = reactive({
      isDialogOpen: false,
      loading: false,
      rowData: null
    })

    const deleteRow = async () => {
      try {
        state.loading = showLoading()
        await rowStore.deleteRow(state.rowData.id)
        showNotification(t('pages.row.successfully_deleted'), 'positive')
        bus.$emit('refreshRowDataDeleted')
        closeModal()
        state.loading = hideLoading()
      } catch (error) {
        if (error?.response?.status === 422) {
          showNotification(t('pages.row.delete_error'))
        }
        state.loading = hideLoading()
      }
    }

    const closeModal = () => {
      state.isDialogOpen = false
      state.loading = false
      state.rowData = null
    }

    return {
      ...toRefs(state),
      deleteRow
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