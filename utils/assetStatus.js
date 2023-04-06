export default (status) => {
  return status === 'active' ? translate('statuses.active') : translate('statuses.inactive')
}