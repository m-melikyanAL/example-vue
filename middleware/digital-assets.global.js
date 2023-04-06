export default defineNuxtRouteMiddleware((to, from) => {
  if (from.path === "/digital-assets" && !to.path.includes("/digital-assets")) {
    useRecentDigitalAssetsIds().value = []
  }

  if (!from.path.includes("/digital-assets")) {
    resetDigitalAssetsQueryParams()
    resetDigitalAssetsFilters()
  }
})