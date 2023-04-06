export const useMagazinesRequest = async (page = 1) => {
  return $fetch(`${useRuntimeConfig().apiUrl}/promotions`, {
    headers: await useCommonHeaders().value,
    query: {
      page: page,
      type: "magazine",
    },
  })
}