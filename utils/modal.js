export const renderModal = async (params = {
  showing: true,
  content: '',
  size: '',
}) => {
  useModalOptions().value = {
    showing: params?.showing ?? true,
    content: params.content,
    size: params?.size ?? 'md'
  }
}

export const dismissModal = async () => {
  useModalOptions().value = {
    showing: false,
    content: '',
    size: 'md'
  }
}
