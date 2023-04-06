export default defineEventHandler(async (event) => {
  return getCookie(event, useRuntimeConfig().authTokenName)
})