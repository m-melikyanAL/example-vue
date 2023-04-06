export const useVouchersRequest = async (params = { page: 1, latest: true}) => {
    return $fetch(`${useRuntimeConfig().apiUrl}/vouchers`, {
        headers: await useCommonHeaders().value,
        query: {
            page: params.page,
            limit: 15,
            latest: params.latest
        },
    })
}

export const useSingleVoucherRequest = async (id) => {
    return $fetch(`${useRuntimeConfig().apiUrl}/vouchers/${id}`, {
        headers: await useCommonHeaders().value,
    })
}

export const useDeleteSingleVoucherRequest = async (id) => {
    return $fetch(`${useRuntimeConfig().apiUrl}/vouchers/${id}`, {
        method: 'DELETE',
        headers: await useCommonHeaders().value,
    })
}

export const useDeleteBulkVouchersRequest = async (ids) => {
  return $fetch(`${useRuntimeConfig().apiUrl}/vouchers`, {
    method: "DELETE",
    headers: await useCommonHeaders().value,
    body: {
      vouchers: ids
    }
  })
}

export const useUpdateVoucherRequest = async (data) => {
    return $fetch(`${useRuntimeConfig().apiUrl}/vouchers/${data.id}`, {
        method: 'PATCH',
        headers: await useCommonHeaders().value,
        body: data
    })
}

export const useCreateVoucherRequest = async (data) => {
    return $fetch(`${useRuntimeConfig().apiUrl}/vouchers`, {
        method: 'POST',
        headers: await useCommonHeaders().value,
        body: data
    })
}