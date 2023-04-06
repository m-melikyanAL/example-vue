export const useBroadcastsRequest = async (params = {
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

export const useCreateCampaignRequest = async (data) => {
  return $fetch(`${useRuntimeConfig().apiUrl}/campaigns`, {
    method: "POST",
    headers: await useCommonHeaders().value,
    body: data
  })
}

export const useResendCampaignRequest = async (id) => {
  return $fetch(`${useRuntimeConfig().apiUrl}/campaigns/resend/${id}`, {
    headers: await useCommonHeaders().value,
  })
}

export const useCampaignsRequest = async (params = {
  channel: "",
  date: "",
  client_type: "",
  page: "1",
  search_filter: "",
}) => {
  return $fetch(`${useRuntimeConfig().apiUrl}/campaigns`, {
    headers: await useCommonHeaders().value,
    query: {
      channel: params.channel,
      date: params.date,
      client_type: params.client_type,
      page: params.page,
      search_filter: params.search_filter,
    }
  })
}

export const useDeleteSingleCampaignRequest = async (id) => {
  return $fetch(`${useRuntimeConfig().apiUrl}/campaigns/${id}`, {
    method: "DELETE",
    headers: await useCommonHeaders().value,
  })
}

export const useDeleteBulkCampaignsRequest = async (ids) => {
  return $fetch(`${useRuntimeConfig().apiUrl}/campaigns`, {
    method: "DELETE",
    headers: await useCommonHeaders().value,
    body: {
      campaigns: ids,
    }
  })
}