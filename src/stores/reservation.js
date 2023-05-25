
import { defineStore } from 'pinia'
import { axios } from 'boot/axios'

export const useReservationStore = defineStore('reservation', {
  actions: {
    async getAllReservations(filter) {
      const { data } = await axios.get(`/reservations${filter}`)
      return data
    },

    async getAllAvailableResources() {
      const { data } = await axios.get('/reservations/getAllAvailableResources')
      return data
    },

    async getAllReservationsWithNoDeposit(filter) {
      const { data } = await axios.get(`/reservations/getAllReservationsWithNoDeposit${filter}`)
      return data
    },

    async getAllReservationsWithDepositInDate(filter) {
      const { data } = await axios.get(`/reservations/getAllReservationsWithDepositInDate${filter}`)
      return data
    },

    async getAllReservationsFromPerson(filter) {
      const { data } = await axios.get(`/reservations/getAllReservationsFromPerson${filter}`)
      return data
    },

    async getAllReservationsFromUrn(filter) {
      const { data } = await axios.get(`/reservations/getAllReservationsFromUrn${filter}`)
      return data
    },

    async getReservation(id) {
      const { data } = await axios.get(`/reservations/${id}`)
      return data
    },

    async getReservationById(id) {
      const { data } = await axios.get(`/reservations/getReservationById/${id}`)
      return data
    },

    async createReservation(formData) {
      const { data } = await axios.post('/reservations/createReservation', formData)
      return data
    },

    async updateReservation(formData) {
      const { data } = await axios.post('/reservations/updateReservation', formData)
      return data
    },

    async deleteReservation(id) {
      const { data } = await axios.delete(`/reservations/${id}`)
      return data
    },
  },
})