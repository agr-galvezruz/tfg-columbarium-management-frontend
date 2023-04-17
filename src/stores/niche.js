
import { defineStore } from 'pinia'
import { axios } from 'boot/axios'

export const useNicheStore = defineStore('niche', {
  actions: {
    async getAllNiches(filter) {
      const { data } = await axios.get(`/niches${filter}`)
      return data
    },

    async getNichesFromRow(filter) {
      const { data } = await axios.get(`/niches/getNichesFromRow${filter}`)
      return data
    },

    async createNiche(formData) {
      const { data } = await axios.post('/niches', formData)
      return data
    },

    async updateNiche(id, formData) {
      const { data } = await axios.put(`/niches/${id}`, formData)
      return data
    },

    async deleteNiche(id) {
      const { data } = await axios.delete(`/niches/${id}`)
      return data
    },
  },
})