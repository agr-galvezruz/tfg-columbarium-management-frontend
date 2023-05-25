
import { defineStore } from 'pinia'
import { axios } from 'boot/axios'

export const useUserStore = defineStore('user', {
  actions: {
    async getAllUsers(filter) {
      const { data } = await axios.get(`/users${filter}`)
      return data
    },

    async updateUser(formData) {
      const { data } = await axios.put('/users/updateUser', formData)
      return data
    },

    async deleteUser(id) {
      const { data } = await axios.delete(`/users/${id}`)
      return data
    },
  },
})