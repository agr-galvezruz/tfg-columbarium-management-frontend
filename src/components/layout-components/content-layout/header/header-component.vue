<template>
  <section class="header-layout">
    <div class="welcome-message">
      <span>{{ $t('general_texts.welcome') }}: </span>
      <span>{{ username }}</span>
    </div>

    <div class="log-out" @click="logout">
      <span>{{ $t('general_texts.logout') }}&nbsp;</span>
      <span class="logout material-icons">power_settings_new</span>
    </div>
  </section>
</template>

<script>
import { useAuthenticationStore } from 'stores/authentication'
import { updateHeaders } from 'src/boot/axios'
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const authenticationStore = useAuthenticationStore()
    const router = useRouter()

    const username = authenticationStore.getUsername
    const logout = async () => {
      try {
        await authenticationStore.logout()
      } finally {
        sessionStorage.clear()
        updateHeaders(null)
        router.replace({ name: 'login' })
      }
    }

    return{
      logout,
      username
    }
  }
})
</script>
