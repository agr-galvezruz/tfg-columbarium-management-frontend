import axios from 'axios'
import { boot } from 'quasar/wrappers'
import { showNotification } from 'src/utils/quasarComponents'
import { i18n } from 'src/boot/i18n'

const URL = `${process.env.VUE_APP_URL_API}`
console.log(URL)
axios.defaults.baseURL = URL

const updateHeaders = (token) => {
  axios.defaults.headers = { authorization: `Bearer ${token}`, accept: 'application/json' }
}

axios.interceptors.response.use((data) => {
  return data
}, (error) => {
  if (error.code === 'ERR_NETWORK') {
    showNotification(i18n.global.t('database_messages.network_error'))
  }
  else if (error.response.status === 401) {
    showNotification(i18n.global.t('database_messages.database_conection_unauthorized'))
  }
  else if (error.response.status === 403) {
    showNotification(i18n.global.t('database_messages.incorrect_login_data'))
  }
  else if (error.response.status === 500) {
    showNotification(i18n.global.t('database_messages.database_conection_error'))
  }

  // Do something with response error
  return Promise.reject(error)
})

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios
})

export { axios, updateHeaders }