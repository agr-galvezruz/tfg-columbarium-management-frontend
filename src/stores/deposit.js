
import { defineStore } from 'pinia'
import { axios } from 'boot/axios'

export const useDepositStore = defineStore('deposit', {
  actions: {
    async getAllDeposits(filter) {
      const { data } = await axios.get(`/deposits${filter}`)
      return data
    },

    async getDeposit(id) {
      const { data } = await axios.get(`/deposits/${id}`)
      return data
    },

    async getDepositByUrnId(id) {
      const { data } = await axios.get(`/deposits/getDepositByUrnId/${id}`)
      return data
    },

    async getDepositByCasketId(id) {
      const { data } = await axios.get(`/deposits/getDepositByCasketId/${id}`)
      return data
    },

    async getDepositByPersonId(id) {
      const { data } = await axios.get(`/deposits/getDepositByPersonId/${id}`)
      return data
    },

    async getDepositByReservationId(id) {
      const { data } = await axios.get(`/deposits/getDepositByReservationId/${id}`)
      return data
    },

    async createDeposit(formData) {
      const { data } = await axios.post('/deposits/createDeposit', formData)
      return data
    },

    async updateDeposit(formData) {
      const { data } = await axios.post('/deposits/updateDeposit', formData)
      return data
    },

    async deleteDeposit(id) {
      const { data } = await axios.delete(`/deposits/${id}`)
      return data
    },
  },
})