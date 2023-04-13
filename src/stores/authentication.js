
import { defineStore } from 'pinia'
import { axios, updateHeaders } from 'boot/axios'

export const useAuthenticationStore = defineStore('authentication', {
  state: () => ({
    token: null,
  }),

  getters: {
    getToken: (state) => state.token,
  },

  actions: {
    async login(formData) {
      const { data } = await axios.post('/login', formData)
      this.token = data.access_token
      updateHeaders(data.access_token)
      return data
    },

    async logout() {
      const { data } = await axios.get('/logout')
      this.token = null
      updateHeaders(null)
      return data
    },
  },

  persist: {
    storage: sessionStorage,
  },
})