export default defineEventHandler(async (event) => {
  deleteCookie(event, useRuntimeConfig().authTokenName)

  event.node.res.end()
})