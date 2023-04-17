<template>
  <dialog-component v-model="isDialogOpen" :dialog-title="$t('pages.niche.modal_delete_title')">
    <div class="info-text">
      <div>{{ $t('pages.niche.modal_delete_text2') }}</div>
      <div>
        <span>{{ $t('pages.niche.modal_delete_text1') }}</span>
        <span class="important">&nbsp;{{ nicheData.internalCode }}</span>
        <span>?</span>
      </div>
    </div>
    <div class="flex justify-between">
      <custom-button outline :label="$t('general_texts.cancel')" color="secondary" @click="isDialogOpen = false" />
      <custom-button icon="delete" :label="$t('general_texts.delete')" color="negative" @click="deleteNiche" />
    </div>
  </dialog-component>
</template>

<script>
import { defineComponent, reactive, toRefs, onMounted, onBeforeUnmount } from 'vue'
import DialogComponent from 'src/modals/component/DialogComponent'
import { hideLoading, showLoading, showNotification } from 'src/utils/quasarComponents'
import { useNicheStore } from 'stores/niche'
import { useI18n } from 'vue-i18n'
import bus from 'boot/bus'

export default defineComponent({
  components: {
    DialogComponent
  },
  setup() {
    onMounted(() => {
      bus.$on('openDeleteNicheModal', (data) => {
        state.nicheData = JSON.parse(JSON.stringify(data))
        state.isDialogOpen = true
      })
    })

    onBeforeUnmount(() => {
      bus.$off('openDeleteNicheModal')
    })

    const { t } = useI18n({})
    const nicheStore = useNicheStore()

    const state = reactive({
      isDialogOpen: false,
      loading: false,
      nicheData: null
    })

    const deleteNiche = async () => {
      try {
        state.loading = showLoading()
        await nicheStore.deleteNiche(state.nicheData.id)
        showNotification(t('pages.niche.successfully_deleted'), 'positive')
        bus.$emit('refreshNicheDataDeleted')
        closeModal()
        state.loading = hideLoading()
      } catch (error) {
        if (error?.response?.status === 422) {
          showNotification(t('pages.niche.delete_error'))
        }
        state.loading = hideLoading()
      }
    }

    const closeModal = () => {
      state.isDialogOpen = false
      state.loading = false
      state.nicheData = null
    }

    return {
      ...toRefs(state),
      deleteNiche
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