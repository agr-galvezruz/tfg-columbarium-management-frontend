
import { defineStore } from 'pinia'
import { axios } from 'boot/axios'

export const useUrnStore = defineStore('urn', {
  actions: {
    async getAllUrns(filter) {
      const { data } = await axios.get(`/urns${filter}`)
      return data
    },

    async getUrn(id) {
      const { data } = await axios.get(`/urns/${id}`)
      return data
    },

    async getUrnById(id) {
      const { data } = await axios.get(`/urns/getUrnById/${id}`)
      return data
    },

    async getUrnsFromNiche(filter) {
      const { data } = await axios.get(`/urns/getUrnsFromNiche${filter}`)
      return data
    },

    async getAllUrnsByIdAndNiche(formData) {
      const { data } = await axios.post('/urns/getAllUrnsByIdAndNiche', formData)
      return data
    },

    async createUrn(formData) {
      const { data } = await axios.post('/urns', formData)
      return data
    },

    async updateUrn(id, formData) {
      const { data } = await axios.put(`/urns/${id}`, formData)
      return data
    },

    async deleteUrn(id) {
      const { data } = await axios.delete(`/urns/${id}`)
      return data
    },
  },
})