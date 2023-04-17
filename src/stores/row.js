
import { defineStore } from 'pinia'
import { axios } from 'boot/axios'

export const useRowStore = defineStore('row', {
  actions: {
    async getAllRows(filter) {
      const { data } = await axios.get(`/rows${filter}`)
      return data
    },

    async getRow(id) {
      const { data } = await axios.get(`/rows/${id}`)
      return data
    },

    async getRowsFromRoom(filter) {
      const { data } = await axios.get(`/rows/getRowsFromRoom${filter}`)
      return data
    },

    async getAllRowsFromRoomNoPagination(roomId) {
      const { data } = await axios.get(`/rows/getAllRowsFromRoomNoPagination/${roomId}`)
      return data
    },

    async createRow(formData) {
      const { data } = await axios.post('/rows', formData)
      return data
    },

    async updateRow(id, formData) {
      const { data } = await axios.put(`/rows/${id}`, formData)
      return data
    },

    async deleteRow(id) {
      const { data } = await axios.delete(`/rows/${id}`)
      return data
    },
  },
})