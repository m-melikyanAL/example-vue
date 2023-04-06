export const useBlacklistedPhonesRequest = async (params = {page: 1}) => {
  return $fetch(`${useRuntimeConfig().apiUrl}/blacklist-phones`, {
    headers: await useCommonHeaders().value,
    query: {
      page: params.page
    },
  })
}

export const useSingleBlacklistedPhoneRequest = async (id) => {
  return $fetch(`${useRuntimeConfig().apiUrl}/blacklist-phones/${id}`, {
    headers: await useCommonHeaders().value
  })
}

export const useUpdateBlacklistedPhoneRequest = async (id, data) => {
  return $fetch(`${useRuntimeConfig().apiUrl}/blacklist-phones/${id}`, {
    method: 'PUT',
    headers: await useCommonHeaders().value,
    body: data
  })
}

export const useDeleteSingleBlacklistedPhoneRequest = async (id) => {
  return $fetch(`${useRuntimeConfig().apiUrl}/blacklist-phones/${id}`, {
    method: 'DELETE',
    headers: await useCommonHeaders().value,
  })
}

export const useDeleteBulkBlacklistPhonesRequest = async (ids) => {
  return $fetch(`${useRuntimeConfig().apiUrl}/blacklist-phones`, {
    method: "DELETE",
    headers: await useCommonHeaders().value,
    body: {
      phones: ids
    }
  })
}