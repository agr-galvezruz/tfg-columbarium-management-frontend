<template>
  <toolbar-component v-if="showToolbar" />
  <div class="login-layout">

    <div class="full-logo">
      <div class="flex justify-between">
        <img src="~assets/logo/azul.png" />
      </div>
      <div class="logo-name">
        <span>Gest</span>
        <span>columba</span>
      </div>
    </div>

    <div class="login-form-container">
      <q-form @submit="onSubmit">
        <div class="input-form">
          <custom-input v-model="id" :label="$t('pages.login.id')" :placeholder="$t('pages.login.id_placeholder')" type="number" />
          <custom-input v-model="password" :label="$t('pages.login.password')" :placeholder="$t('pages.login.password_placeholder')" type="password" />
        </div>
        <custom-button class="full-width" :label="$t('pages.login.login')" color="secondary" type="submit" />
      </q-form>
    </div>

    <div class="author-container">
      <div class="author-name">&#169; 2023 Antonio Gálvez Ruz, UCO.</div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed, reactive, toRefs } from 'vue'
import ToolbarComponent from 'src/components/toolbar/toolbar-component'
import { useAuthenticationStore } from 'stores/authentication'
import { hideLoading, showLoading } from 'src/utils/quasarComponents'
import { useRouter } from 'vue-router'
import { updateHeaders } from 'src/boot/axios'

export default defineComponent({
  components: {
    ToolbarComponent
  },
  setup() {
    const router = useRouter()
    const authenticationStore = useAuthenticationStore()
    const showToolbar = computed(() => (process.env.MODE === 'electron'))

    const state = reactive({
      loading: false,
      id: '',
      password: ''
    })

    const onSubmit = async () => {
      try {
        state.loading = showLoading()
        await authenticationStore.login({ id: state.id, password: state.password })
        router.push({ path: '/dashboard' })
        state.loading = hideLoading()
      } catch (error) {
        sessionStorage.clear()
        updateHeaders(null)
        router.replace({ name: 'login' })
        state.loading = hideLoading()
      }
    }

    return {
      ...toRefs(state),
      showToolbar,
      onSubmit
    }
  },
})
</script>

<style lang="scss" scoped>
  .login-layout {
    position: relative;
    min-height: calc(100vh - var(--toolbar-height));
    width: 100%;
    background-color: var(--body-color);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 20px;
    padding: 20px;

    .full-logo {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex-wrap: nowrap;
      padding-left: 2px;
      width: 100%;
      gap: 5px;
      // .logo {
      //   color: rgb(var(--main-color));
      //   font-size: 40px;
      //   height: 60px;
      // }
      img {
        width: 150px;
        margin: auto;
        border-radius: 12px;
      }
      .logo-name {
        font-size: 40px;
        span:nth-child(1) {
          font-weight: 600;
        }
      }
    }

    .login-form-container {
      border: 2px solid $primary;
      border-radius: 12px;
      background-color: var(--background-color);
      padding: 20px;
      box-shadow: var(--main-shadow);
      width: 400px;

      .input-form {
        margin-bottom: 5px;
      }
    }

    .author-container {
      position: absolute;
      bottom: 0;
      right: 0;
      border: 2px solid $primary;
      border-right: none;
      border-bottom: none;
      border-radius: 50px 0 0 0;
      background-color: var(--background-color);
      padding: 5px 10px 5px 20px;
      box-shadow: var(--main-shadow);
      .author-name {
        font-weight: 500;
        color: var(--main-text-color);
        font-size: 16px;
      }
    }
  }
</style>
