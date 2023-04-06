import { installToaster } from 'maz-ui'

export default defineNuxtPlugin(nuxtApp => {
  const toasterOptions = {
    position: 'top-right',
    timeout: 10000,
    persistent: false,
  }

  nuxtApp.vueApp.use(installToaster, toasterOptions)
})