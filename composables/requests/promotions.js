export const usePromotionsRequest = async (params = {
  type: '',
  page: 1,
}) => {
  return $fetch(`${useRuntimeConfig().apiUrl}/promotions`, {
    headers: await useCommonHeaders().value,
    query: {
      type: params.type,
      page: params.page
    },
  })
}

export const useSinglePromotionRequest = async (id) => {
  return $fetch(`${useRuntimeConfig().apiUrl}/promotions/${id}`, {
    headers: await useCommonHeaders().value
  })
}

export const usePublicSinglePromotionRequest = async (id) => {
  return $fetch(`${useRuntimeConfig().apiUrl}/public/promotions/${id}`)
}

export const useBulkDeletePromotionsRequest = async (ids) => {
  return $fetch(`${useRuntimeConfig().apiUrl}/promotions`, {
    method: "DELETE",
    headers: await useCommonHeaders().value,
    body: {
      promotions: ids
    }
  })
}

export const useUpdatePromotionRequest = async (promotion) => {
  return $fetch(`${useRuntimeConfig().apiUrl}/promotions/${promotion.id}`, {
    method: "PATCH",
    headers: await useCommonHeaders().value,
    body: promotion
  })
}

export const useCreatePromotionRequest = async (promotion) => {
  return $fetch(`${useRuntimeConfig().apiUrl}/promotions`, {
    method: "POST",
    headers: await useCommonHeaders().value,
    body: promotion
  })
}