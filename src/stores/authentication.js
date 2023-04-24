
import { defineStore } from 'pinia'
import { axios, updateHeaders } from 'boot/axios'

export const useAuthenticationStore = defineStore('authentication', {
  state: () => ({
    token: null,
    user: null
  }),

  getters: {
    getToken: (state) => state.token,
    getUser: (state) => state.user,
    getUsername: (state) => `${state.user.person.first_name} ${state.user.person.last_name_1} ${state.user.person.last_name_2}`
  },

  actions: {
    async login(formData) {
      const { data } = await axios.post('/login', formData)
      this.token = data.access_token
      this.user = data.user
      updateHeaders(data.access_token)
      return data
    },

    async register(formData) {
      const { data } = await axios.post('/register', formData)
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