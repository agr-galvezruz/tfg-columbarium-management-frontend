
import { defineStore } from 'pinia'
import { axios } from 'boot/axios'

export const usePersonStore = defineStore('person', {
  actions: {
    async getAllPeople(filter) {
      const { data } = await axios.get(`/people${filter}`)
      return data
    },

    async createPerson(formData) {
      const { data } = await axios.post('/people', formData)
      return data
    },

    async updatePerson(id, formData) {
      const { data } = await axios.put(`/people/${id}`, formData)
      return data
    },

    async deletePerson(id) {
      const { data } = await axios.delete(`/people/${id}`)
      return data
    },

    async getAllProvinces() {
      const { data } = await axios.get('/provinces')
      return data
    },
  },
})