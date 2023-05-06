
import { defineStore } from 'pinia'
import { axios } from 'boot/axios'

export const useRelocationStore = defineStore('relocation', {
  actions: {
    async getAllRelocations(filter) {
      const { data } = await axios.get(`/relocations${filter}`)
      return data
    },

    async getAllRelocationsByCasket(filter) {
      const { data } = await axios.get(`/relocations/getAllRelocationsByCasket/${filter}`)
      return data
    },

    async getAllRelocationsByUrn(filter) {
      const { data } = await axios.get(`/relocations/getAllRelocationsByUrn/${filter}`)
      return data
    },

    async getRelocation(id) {
      const { data } = await axios.get(`/relocations/${id}`)
      return data
    },

    async createRelocation(formData) {
      const { data } = await axios.post('/relocations/createRelocation', formData)
      return data
    },

    async updateRelocation(formData) {
      const { data } = await axios.post('/relocations/updateRelocation', formData)
      return data
    },

    async deleteRelocation(id) {
      const { data } = await axios.delete(`/relocations/${id}`)
      return data
    },
  },
})