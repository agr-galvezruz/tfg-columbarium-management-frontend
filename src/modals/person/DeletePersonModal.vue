<template>
  <dialog-component v-model="isDialogOpen" :dialog-title="$t('pages.person.modal_delete_title')">
    <div class="info-text">
      <div>{{ $t('pages.person.modal_delete_text2') }}</div>
      <div>
        <span>{{ $t('pages.person.modal_delete_text1') }}</span>
        <span class="important">&nbsp;{{ `${personData.dni} - ${personData.firstName} ${personData.lastName1} ${personData.lastName2}` }}</span>
        <span>?</span>
      </div>
    </div>
    <div class="flex justify-between">
      <custom-button outline :label="$t('general_texts.cancel')" color="secondary" @click="isDialogOpen = false" />
      <custom-button icon="delete" :label="$t('general_texts.delete')" color="negative" @click="deletePerson" />
    </div>
  </dialog-component>
</template>

<script>
import { defineComponent, reactive, toRefs, onMounted, onBeforeUnmount } from 'vue'
import DialogComponent from 'src/modals/component/DialogComponent'
import { hideLoading, showLoading, showNotification } from 'src/utils/quasarComponents'
import { usePersonStore } from 'stores/person'
import { useI18n } from 'vue-i18n'
import bus from 'boot/bus'

export default defineComponent({
  components: {
    DialogComponent
  },
  setup() {
    onMounted(() => {
      bus.$on('openDeletePersonModal', (data) => {
        state.personData = JSON.parse(JSON.stringify(data))
        state.isDialogOpen = true
      })
    })

    onBeforeUnmount(() => {
      bus.$off('openDeletePersonModal')
    })

    const { t } = useI18n({})
    const personStore = usePersonStore()

    const state = reactive({
      isDialogOpen: false,
      loading: false,
      personData: null
    })

    const deletePerson = async () => {
      try {
        state.loading = showLoading()
        await personStore.deletePerson(state.personData.id)
        showNotification(t('pages.person.successfully_deleted'), 'positive')
        bus.$emit('refreshPersonDataDeleted')
        closeModal()
        state.loading = hideLoading()
      } catch (error) {
        if (error?.response?.status === 422) {
          showNotification(t('pages.person.delete_error'))
        }
        state.loading = hideLoading()
      }
    }

    const closeModal = () => {
      state.isDialogOpen = false
      state.loading = false
      state.personData = null
    }

    return {
      ...toRefs(state),
      deletePerson
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