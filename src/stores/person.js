
import { defineStore } from 'pinia'
import { axios } from 'boot/axios'

export const usePersonStore = defineStore('person', {
  actions: {
    async getAllPeople(filter) {
      const { data } = await axios.get(`/people${filter}`)
      return data
    },

    async getAllPeopleNoInCasket() {
      const { data } = await axios.get('/people/getAllPeopleNoInCasket')
      return data
    },

    async getAllPeopleNoInCasketNoUsers() {
      const { data } = await axios.get('/people/getAllPeopleNoInCasketNoUsers')
      return data
    },

    async getAllPeopleInCasket(casketId) {
      const { data } = await axios.get(`/people/getAllPeopleInCasket/${casketId}`)
      return data
    },

    async getPerson(personId) {
      const { data } = await axios.get(`/people/${personId}`)
      return data
    },

    async getPersonById(personId) {
      const { data } = await axios.get(`/people/getPersonById/${personId}`)
      return data
    },

    async checkExistDni(dni) {
      const { data } = await axios.get(`/people/checkExistDni/${dni}`)
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