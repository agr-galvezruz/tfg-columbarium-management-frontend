
import { defineStore } from 'pinia'
import { axios } from 'boot/axios'

export const usePersonStore = defineStore('person', {
  actions: {
    async getAllPeople(filter) {
      const { data } = await axios.get(`/people${filter}`)
      return data
    },
  },
})