export const useDigitalAssetsViewType = () => useState("digitalAssetsViewType", () => {
  return VIEW_TYPE_GRID
})

export const useDigitalAssetsQueryParams = () => useState("digitalAssetsQueryParams", () => {
  return {
    status: 'active',
    page: '1',
    categories: '',
    latest: true,
  }
})