export const useStaffListRequest = async (params = {
  page: "1",
  search_filter: "",
}) => {
  return $fetch(`${useRuntimeConfig().apiUrl}/users`, {
    headers: await useCommonHeaders().value,
    query: {
      page: params.page,
      search_filter: params.search_filter,
    }
  })
}

export const useSingleStaffRequest = async (id) => {
  return $fetch(`${useRuntimeConfig().apiUrl}/users/${id}`, {
    headers: await useCommonHeaders().value,
  })
}

export const useCreateStaffRequest = async (data) => {
  return $fetch(`${useRuntimeConfig().apiUrl}/users`, {
    method: "POST",
    headers: await useCommonHeaders().value,
    body: data,
  })
}

export const useUpdateStaffRequest = async (data) => {
  return $fetch(`${useRuntimeConfig().apiUrl}/users/${data.id}`, {
    method: "PATCH",
    headers: await useCommonHeaders().value,
    body: data,
  })
}

export const useBulkDeleteStaffRequest = async (ids) => {
  return $fetch(`${useRuntimeConfig().apiUrl}/users`, {
    method: "DELETE",
    headers: await useCommonHeaders().value,
    body: {
      users: ids,
    }
  })
}

export const useDeleteStaffRequest = async (id) => {
  return $fetch(`${useRuntimeConfig().apiUrl}/users/${id}`, {
    method: "DELETE",
    headers: await useCommonHeaders().value,
  })
}