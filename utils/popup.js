export const renderPopup = (params = {
  showing: true,
  heading: '',
  message: '',
  callback: '',
  confirm_text: translate('alerts.confirm'),
  cancel_text: translate('buttons.cancel'),
  type: 'primary',
}) => {
  usePopupOptions().value = {
    showing: params.showing,
    heading: params.heading,
    message: params.message,
    callback: params.callback,
    confirm_text: params.confirm_text,
    cancel_text: params.cancel_text,
    type: params.type,
  }
}

export const dismissPopup = () => {
  usePopupOptions().value = {
    showing: false,
    heading: '',
    message: '',
    callback: '',
    confirm_text: translate('alerts.confirm'),
    cancel_text: translate('buttons.cancel'),
    type: 'primary',
  }
}