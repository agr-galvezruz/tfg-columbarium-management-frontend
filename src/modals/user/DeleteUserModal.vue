<template>
  <dialog-component v-model="isDialogOpen" :dialog-title="$t('pages.user.modal_delete_title')">
    <div class="info-text">
      <div>
        <span>{{ $t('pages.user.modal_delete_text1') }}</span>
        <span class="important">&nbsp;{{ role }}</span>
        <span>?</span>
      </div>
    </div>
    <div class="flex justify-between">
      <custom-button outline :label="$t('general_texts.cancel')" color="secondary" @click="isDialogOpen = false" />
      <custom-button icon="delete" :label="$t('general_texts.delete')" color="negative" @click="deleteUser" />
    </div>
  </dialog-component>
</template>

<script>
import { defineComponent, reactive, toRefs, onMounted, onBeforeUnmount, computed } from 'vue'
import DialogComponent from 'src/modals/component/DialogComponent'
import { hideLoading, showLoading, showNotification } from 'src/utils/quasarComponents'
import { useUserStore } from 'stores/user'
import { useI18n } from 'vue-i18n'
import bus from 'boot/bus'

export default defineComponent({
  components: {
    DialogComponent
  },
  setup() {
    onMounted(() => {
      bus.$on('openDeleteUserModal', (data) => {
        state.userData = JSON.parse(JSON.stringify(data))
        state.isDialogOpen = true
      })
    })

    onBeforeUnmount(() => {
      bus.$off('openDeleteUserModal')
    })

    const { t } = useI18n({})
    const userStore = useUserStore()

    const state = reactive({
      isDialogOpen: false,
      loading: false,
      userData: null,
      role: computed(() => state.userData?.rol === 'ADMIN' ? 'Administrador' : 'Consultor')
    })

    const deleteUser = async () => {
      try {
        state.loading = showLoading()
        await userStore.deleteUser(state.userData.id)
        showNotification(t('pages.user.successfully_deleted'), 'positive')
        bus.$emit('refreshUserDataDeleted')
        closeModal()
        state.loading = hideLoading()
      } catch (error) {
        if (error?.response?.status === 422) {
          showNotification(t('pages.user.delete_error'))
        }
        state.loading = hideLoading()
      }
    }

    const closeModal = () => {
      state.isDialogOpen = false
      state.loading = false
      state.userData = null
    }

    return {
      ...toRefs(state),
      deleteUser
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