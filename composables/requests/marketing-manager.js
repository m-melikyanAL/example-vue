export const useMarketingManagerDataRequest = async () => {
  return $fetch(`${useRuntimeConfig().apiUrl}/dashboard-data`, {
    method: 'GET',
    headers: await useCommonHeaders().value
  })
}