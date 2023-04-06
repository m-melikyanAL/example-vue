import {useState} from 'nuxt/app'

export const useAuthToken = () => useState('authToken', async () => await $fetch('/api/token', {
  method: 'POST'
}))

export const useAssets = () => useState('assets', () => {
  return {
    item: [],
    meta: {}
  }
})

export const useRewards = () => useState('rewards', () => {
  return {
    item: [],
    meta: {},
  }
})

export const useDiscounts = () => useState('discounts', () => {
  return {
    item: [],
    meta: {},
  }
})

export const useVouchers = () => useState('vouchers', () => {
  return {
    item: [],
    meta: {},
  }
})

export const useDashboardData = () => useState('dashboardData', () => {
  return {
    "push_ads": null,
    "all_guests": null,
    "local_guests": null,
    "magazines": null,
    "email_sent": null,
    "sms_sent": null,
    "broadcast": null,
    "blacklisted_phones": null,
    "in_house_guests": null,
  }
})

export const useGuestData = () => useState('guestData', () => {
  return {
    "all_guests": null,
    "local_guests": null,
    "local_guests_with_app": null,
    "in_house_guests": null,
    "in_app_all_guests": null
  }
})

export const useShowLoader = () => useState('loader', () => false)

export const useCommonHeaders = () => useState('commonHeader', async () => {
  return {
    authorization: `Bearer ${await useAuthToken().value}`,
    'X-Requested-With': 'XMLHttpRequest',
  }
})

export const useSmsMessageTemplates = () => useState('messageTemplates', () => [])

export const useMarketingPromotions = () => useState('marketingPromotions', () => [])

export const usePromotions = () => useState('promotions', () => {
  return {
    promotions: [],
    meta: {}
  }
})

export const usePhones = () => useState('phones', () => {
  return {
    phones: [],
    meta: {}
  }
})

export const useStaff = () => useState('staff', () => {
  return {
    users: [],
    meta: {},
    roles: [],
  }
})

export const useBroadcasts = () => useState('broadcasts', () => {
  return {
    broadcasts: [],
    meta: {},
    statistics: {
      sms: null,
      email: null,
      push: null,
    }
  }
})

export const useMessages = () => useState('messages', () => {
  return {
    messages: [],
    meta: {},
    type: '',
  }
})

export const usePreSelectRecentDigitalAssets = () => useState('preSelectRecentDigitalAssets', () => false)

export const useRecentDigitalAssetsIds = () => useState('recentDigitalAssetsIds', () => {
  return []
})

export const useDigitalAssetsSelectedFilters = () => useState('digitalAssetsSelectedFilter', () => {
  return {
    active: {},
    category: {},
    tags: [],
  }
})

export const resetDigitalAssetsFilters = () => {
  useDigitalAssetsSelectedFilters().value = {
    active: {},
    category: {},
    tags: [],
  }
}

export const useDigitalAssetQueryParams = () => useState('digitalAssetsQueryParams', () => {
  return {
    status: "",
    page: "1",
    categories: "",
    latest: true,
    tags: null,
    assets: [],
    search: "",
  }
})

export const resetDigitalAssetsQueryParams = () => {
  useDigitalAssetQueryParams().value = {
    status: "",
    page: "1",
    categories: "",
    latest: true,
    tags: null,
    assets: [],
    search: "",
  }
}

export const useDigitalAssetToCreatePromotion = () => useState('digitalAssetToCreatePromotion', () => {
  return {}
})