import {useNuxtApp} from "#app"

export const translate = (key, param = {}) => {
  const nuxtApp = useNuxtApp()
  return nuxtApp.$i18n?.t(key, param)
}