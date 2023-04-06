export const useLoginRequest = async (data) => {
  return $fetch(`${useRuntimeConfig().apiUrl}/login`, {
    method: 'POST',
    body: data
  })
}