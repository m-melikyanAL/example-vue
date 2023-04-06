export const useMessageTemplatesListRequest = async (params = {
  page: 1
}) => {
  return $fetch(`${useRuntimeConfig().apiUrl}/message-templates`, {
    method: 'GET',
    headers: await useCommonHeaders().value,
    query: {
      type: params.type,
      page: params.page,
      is_automated: params.is_automated
    },
  })
}

export const useCreateMessageTemplateRequest = async (data) => {
  return $fetch(`${useRuntimeConfig().apiUrl}/message-templates`, {
    method: "POST",
    headers: await useCommonHeaders().value,
    body: data
  })
}

export const useSingleMessageTemplateRequest = async (id) => {
  return $fetch(`${useRuntimeConfig().apiUrl}/message-templates/${id}`, {
    headers: await useCommonHeaders().value,
  })
}

export const useUpdateMessageTemplateRequest = async (data) => {
  return $fetch(`${useRuntimeConfig().apiUrl}/message-templates/${data.id}`, {
    method: "PATCH",
    headers: await useCommonHeaders().value,
    body: data
  })
}

export const useDeleteSingleMessageRequest = async (id) => {
  return $fetch(`${useRuntimeConfig().apiUrl}/message-templates/${id}`, {
    method: 'DELETE',
    headers: await useCommonHeaders().value,
  })
}

export const useDeleteBulkMessagesRequest = async (ids) => {
  return $fetch(`${useRuntimeConfig().apiUrl}/message-templates`, {
    method: "DELETE",
    headers: await useCommonHeaders().value,
    body: {
      messageTemplates: ids
    }
  })
}