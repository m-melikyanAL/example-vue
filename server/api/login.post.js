export default defineEventHandler(async (event) => {
  const response = await $fetch(`${useRuntimeConfig().apiUrl}/login`, {
    method: 'POST',
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: await readBody(event)
  })

  if (response.token) {
    setCookie(event, useRuntimeConfig().authTokenName, response.token, {
      httpOnly: true,
      secure: useRuntimeConfig().isProduction,
      maxAge: 60 * 60 * 24 * 7,
    })
  }

  return response
})