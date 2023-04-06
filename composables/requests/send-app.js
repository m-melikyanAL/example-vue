export const useSendAppRequest = async (data) => {
  return $fetch(`${useRuntimeConfig().apiUrl}/guests/send-app`, {
    method: 'POST',
    headers: await useCommonHeaders().value,
    body: data,
  })
}