
import { defineStore } from 'pinia'
import { axios } from 'boot/axios'

export const useBuildingStore = defineStore('building', {
  actions: {
    async getAllBuildings(filter) {
      const { data } = await axios.get(`/buildings${filter}`)
      return data
    },

    async getBuilding(id) {
      const { data } = await axios.get(`/buildings/${id}`)
      return data
    },

    async getAllBuildingsNoPaginated() {
      const { data } = await axios.get('/buildings/getAllBuildingsNoPaginated')
      return data
    },

    async createBuilding(formData) {
      const { data } = await axios.post('/buildings', formData)
      return data
    },

    async updateBuilding(id, formData) {
      const { data } = await axios.put(`/buildings/${id}`, formData)
      return data
    },

    async deleteBuilding(id) {
      const { data } = await axios.delete(`/buildings/${id}`)
      return data
    },
  },
})