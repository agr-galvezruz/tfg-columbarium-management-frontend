
import { defineStore } from 'pinia'
import { axios } from 'boot/axios'

export const useCasketStore = defineStore('casket', {
  actions: {
    async getAllCaskets(filter) {
      const { data } = await axios.get(`/caskets${filter}`)
      return data
    },

    async createCasketWithPeople(formData) {
      const { data } = await axios.post('/caskets/createCasketWithPeople', formData)
      return data
    },

    async updateCasketWithPeople(formData) {
      const { data } = await axios.post('/caskets/updateCasketWithPeople', formData)
      return data
    },

    async getCasket(casketId) {
      const { data } = await axios.get(`/caskets/${casketId}`)
      return data
    },

    async createCasket(formData) {
      const { data } = await axios.post('/caskets', formData)
      return data
    },

    async updateCasket(id, formData) {
      const { data } = await axios.put(`/caskets/${id}`, formData)
      return data
    },

    async deleteCasket(id) {
      const { data } = await axios.delete(`/caskets/${id}`)
      return data
    },
  },
})