export default defineEventHandler((event) => {
  if (event.node.req.url.startsWith('/public')) {
    return
  }

  const token = getCookie(event, useRuntimeConfig().authTokenName)

  if (!token && event.node.req.url !== '/login' && event.node.req.url !== '/api/login') {
    sendRedirect(event, '/login', 401)
  }

  if (token && event.node.req.url === '/login') {
    sendRedirect(event, '/', 401)
  }
})