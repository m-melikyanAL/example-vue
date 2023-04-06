export const useGuestsRequest = async (params = {
  page: "1",
  type: "all_guests",
  has_email: "",
  has_phone_number: "",
  search_filter: "",
}) => {
  return $fetch(`${useRuntimeConfig().apiUrl}/clients`, {
    headers: await useCommonHeaders().value,
    query: {
      page: params.page,
      guest_type: params.type,
      has_email: params.has_email,
      has_phone_number: params.has_phone_number,
      search_filter: params.search_filter,
    }
  })
}

export const useDeleteSingleGuestRequest = async (id) => {
  return $fetch(`${useRuntimeConfig().apiUrl}/clients/${id}`, {
    method: 'DELETE',
    headers: await useCommonHeaders().value,
  })
}

export const useDeleteBulkGuestsRequest = async (ids) => {
  return $fetch(`${useRuntimeConfig().apiUrl}/clients/bulk-delete`, {
    method: 'DELETE',
    headers: await useCommonHeaders().value,
    body: {
      guests: ids
    }
  })
}

export const useUpdateGuestRequest = async (id, data) => {
  return $fetch(`${useRuntimeConfig().apiUrl}/clients/${id}`, {
    method: 'PATCH',
    headers: await useCommonHeaders().value,
    body: data
  })
}