export const useDiscountsRequest = async (params = { page: 1, latest: true}) => {
    return $fetch(`${useRuntimeConfig().apiUrl}/discounts`, {
        headers: await useCommonHeaders().value,
        query: {
            page: params.page,
            limit: 15,
            latest: params.latest
        },
    })
}

export const useSingleDiscountRequest = async (id) => {
    return $fetch(`${useRuntimeConfig().apiUrl}/discounts/${id}`, {
        headers: await useCommonHeaders().value,
    })
}

export const useDeleteSingleDiscountRequest = async (id) => {
    return $fetch(`${useRuntimeConfig().apiUrl}/discounts/${id}`, {
        method: 'DELETE',
        headers: await useCommonHeaders().value,
    })
}

export const useDeleteBulkDiscountsRequest = async (ids) => {
  return $fetch(`${useRuntimeConfig().apiUrl}/discounts`, {
    method: "DELETE",
    headers: await useCommonHeaders().value,
    body: {
      discounts: ids
    }
  })
}

export const useUpdateDiscountRequest = async (data) => {
    return $fetch(`${useRuntimeConfig().apiUrl}/discounts/${data.id}`, {
        method: 'PUT',
        headers: await useCommonHeaders().value,
        body: data
    })
}

export const useCreateDiscountRequest = async (data) => {
    return $fetch(`${useRuntimeConfig().apiUrl}/discounts`, {
        method: 'POST',
        headers: await useCommonHeaders().value,
        body: data
    })
}
