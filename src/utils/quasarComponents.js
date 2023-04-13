import { Loading, QSpinnerBars, Notify } from 'quasar'
import { i18n } from 'src/boot/i18n'

export const showLoading = (message = i18n.global.t('general_texts.loading'), html = false) => {
  Loading.show({
    message: message,
    spinnerColor: 'primary',
    spinner: QSpinnerBars,
    html: html
  })
  return true
}

export const hideLoading = () => {
  Loading.hide()
  return false
}

export const showNotification = (message, type = 'negative', timeout = 2500, position = 'bottom', html = false, actions = []) => {
  Notify.create({
    type: type,
    message: message,
    timeout: timeout,
    position: position,
    html: html,
    actions: actions
  })
}