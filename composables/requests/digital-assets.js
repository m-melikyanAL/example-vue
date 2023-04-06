export const useDigitalAssetsRequest = async (params = {
  status: "",
  page: "1",
  categories: "",
  latest: true,
  tags: null,
  assets: null,
  search: "",
}) => {
  return $fetch(`${useRuntimeConfig().apiUrl}/digital-assets`, {
    headers: await useCommonHeaders().value,
    query: {
      page: params.page,
      limit: 15,
      categories: params.categories,
      latest: params.latest,
      status: params.status,
      tags: params.tags ? params.tags.join() : params.tags,
      assets: params.assets ? params.assets.join() : params.assets,
      search: params.search,
    },
  })
}

export const useSingleDigitalAssetRequest = async (id) => {
  return $fetch(`${useRuntimeConfig().apiUrl}/digital-assets/${id}`, {
    headers: await useCommonHeaders().value,
  })
}

export const useDeleteSingleDigitalAssetRequest = async (id) => {
  return $fetch(`${useRuntimeConfig().apiUrl}/digital-assets/${id}`, {
    method: 'DELETE',
    headers: await useCommonHeaders().value,
  })
}

export const useDeleteBulkDigitalAssetsRequest = async (ids) => {
  return $fetch(`${useRuntimeConfig().apiUrl}/digital-assets`, {
    method: 'DELETE',
    headers: await useCommonHeaders().value,
    body: {
      assets: ids,
    }
  })
}

export const useUploadDigitalAssetsRequest = async (formData) => {
  return $fetch(`${useRuntimeConfig().apiUrl}/digital-assets`, {
    method: 'POST',
    headers: await useCommonHeaders().value,
    body: formData,
  })
}

export const useUpdateBulkDigitalAssetsRequest = async (data) => {
  return $fetch(`${useRuntimeConfig().apiUrl}/digital-assets`, {
    method: 'PATCH',
    headers: await useCommonHeaders().value,
    body: data,
  })
}

export const useUpdateDigitalAssetRequest = async (data) => {
  return $fetch(`${useRuntimeConfig().apiUrl}/digital-assets/${data.id}`, {
    method: 'PATCH',
    headers: await useCommonHeaders().value,
    body: {
      categories: data.categories,
      status: data.status,
      tags: data.tags,
      name: data.name,
    }
  })
}