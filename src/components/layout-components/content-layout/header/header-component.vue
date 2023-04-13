<template>
  <section class="header-layout">
    <div class="welcome-message">
      <span>Bienvenido: </span>
      <span>Antonio Gálvez Ruz</span>
    </div>

    <div class="log-out" @click="logout">
      <span>Cerrar sesión </span>
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
      logout
    }
  }
})
</script>
