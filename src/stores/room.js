
import { defineStore } from 'pinia'
import { axios } from 'boot/axios'

export const useRoomStore = defineStore('room', {
  actions: {
    async getAllRooms(filter) {
      const { data } = await axios.get(`/rooms${filter}`)
      return data
    },

    async getRoomsFromBuilding(filter) {
      const { data } = await axios.get(`/rooms/getRoomsFromBuilding${filter}`)
      return data
    },

    async getAllRoomsFromBuildingNoPagination(buildingId) {
      const { data } = await axios.get(`/rooms/getAllRoomsFromBuildingNoPagination/${buildingId}`)
      return data
    },

    async createRoom(formData) {
      const { data } = await axios.post('/rooms', formData)
      return data
    },

    async updateRoom(id, formData) {
      const { data } = await axios.put(`/rooms/${id}`, formData)
      return data
    },

    async deleteRoom(id) {
      const { data } = await axios.delete(`/rooms/${id}`)
      return data
    },
  },
})