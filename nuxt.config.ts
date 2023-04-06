// https://v3.nuxtjs.org/api/configuration/nuxt.config
import enText from "./lang/en/index.js"
export default defineNuxtConfig({
  css: ["maz-ui/css/main.css", "@/assets/css/app.css"],
  modules: ["@nuxtjs/tailwindcss", "@vueuse/nuxt",
    [
      "@nuxtjs/i18n",
      {
        locales: ["en"],
        defaultLocale: "en",
        vueI18n: {
          legacy: false,
          messages: {
            en: {
             ...enText
            },
          }
        }
      }
    ]
  ],
  runtimeConfig: {
    // apiUrl: process.env.API_URL,
    apiUrl: 'http://127.0.0.1:8000',
    authTokenName: 'token',
    isProduction: process.env.APP_ENV === "production",
    public: {
      // apiUrl: process.env.API_URL,
      apiUrl: 'http://127.0.0.1:8000',
    },
  },
  build: {
    transpile: ["maz-ui", "@vuepic/vue-datepicker"],
  },
  plugins: [
    { src: '~/plugins/quill-editor.js', mode: 'client' },
    { src: '~/plugins/datepicker.js', mode: 'client' },
  ],
  imports: {
    dirs: [
      "utils/**"
    ]
  }
})
