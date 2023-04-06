export const useRewardsRequest = async (params = { page: 1, latest: true}) => {
    return $fetch(`${useRuntimeConfig().apiUrl}/rewards`, {
        headers: await useCommonHeaders().value,
        query: {
            page: params.page,
            limit: 15,
            latest: params.latest
        },
    })
}

export const useSingleRewardRequest = async (id) => {
    return $fetch(`${useRuntimeConfig().apiUrl}/rewards/${id}`, {
        headers: await useCommonHeaders().value,
    })
}

export const useDeleteSingleRewardRequest = async (id) => {
    return $fetch(`${useRuntimeConfig().apiUrl}/rewards/${id}`, {
        method: 'DELETE',
        headers: await useCommonHeaders().value,
    })
}

export const useDeleteBulkRewardsRequest = async (ids) => {
  return $fetch(`${useRuntimeConfig().apiUrl}/rewards`, {
    method: "DELETE",
    headers: await useCommonHeaders().value,
    body: {
      rewards: ids,
    }
  })
}

export const useUpdateRewardRequest = async (data) => {
    return $fetch(`${useRuntimeConfig().apiUrl}/rewards/${data.id}`, {
        method: 'PUT',
        headers: await useCommonHeaders().value,
        body: data
    })
}

export const useCreateRewardRequest = async (data) => {
    return $fetch(`${useRuntimeConfig().apiUrl}/rewards`, {
        method: 'POST',
        headers: await useCommonHeaders().value,
        body: data,
    })
}