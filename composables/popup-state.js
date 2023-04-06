export const usePopupOptions = () => useState('popupOptions', () => {
  return {
    showing: false,
    heading: '',
    message: '',
    callback: '',
    confirm_text: 'Confirm',
    cancel_text: 'Cancel',
    type: 'primary',
  }
})