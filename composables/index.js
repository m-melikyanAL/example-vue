export { useLoginRequest } from './requests/login'

export {
  usePromotionsRequest,
  useSinglePromotionRequest,
  usePublicSinglePromotionRequest,
  useBulkDeletePromotionsRequest,
  useUpdatePromotionRequest,
  useCreatePromotionRequest,
} from './requests/promotions'

export { useMagazinesRequest } from './requests/magazines'

export {
  useBlacklistedPhonesRequest,
  useSingleBlacklistedPhoneRequest,
  useUpdateBlacklistedPhoneRequest,
  useDeleteSingleBlacklistedPhoneRequest,
  useDeleteBulkBlacklistPhonesRequest,
} from './requests/blacklisted-phones'

export {
  useBroadcastsRequest,
  useCampaignsRequest,
  useDeleteBulkCampaignsRequest,
  useDeleteSingleCampaignRequest,
  useCreateCampaignRequest,
  useResendCampaignRequest,
} from './requests/broadcasts'

export {
  useRewardsRequest,
  useSingleRewardRequest,
  useDeleteSingleRewardRequest,
  useUpdateRewardRequest,
  useCreateRewardRequest,
  useDeleteBulkRewardsRequest,
} from './requests/rewards'

export {
  useDiscountsRequest,
  useSingleDiscountRequest,
  useDeleteSingleDiscountRequest,
  useUpdateDiscountRequest,
  useCreateDiscountRequest,
  useDeleteBulkDiscountsRequest,
} from './requests/discounts'

export {
  useDigitalAssetsRequest,
  useDeleteSingleDigitalAssetRequest,
  useDeleteBulkDigitalAssetsRequest,
  useSingleDigitalAssetRequest,
  useUpdateBulkDigitalAssetsRequest,
  useUploadDigitalAssetsRequest,
  useUpdateDigitalAssetRequest,
} from './requests/digital-assets'

export {
  useGuestsRequest,
  useDeleteSingleGuestRequest,
  useDeleteBulkGuestsRequest,
  useUpdateGuestRequest,
} from './requests/guests'

export { useMarketingManagerDataRequest } from './requests/marketing-manager'

export {
  useVouchersRequest,
  useSingleVoucherRequest,
  useDeleteSingleVoucherRequest,
  useUpdateVoucherRequest,
  useCreateVoucherRequest,
  useDeleteBulkVouchersRequest,
} from './requests/vouchers'

export {
  useSendAppRequest,
} from './requests/send-app'

export {
  useMessageTemplatesListRequest,
  useCreateMessageTemplateRequest,
  useSingleMessageTemplateRequest,
  useUpdateMessageTemplateRequest,
  useDeleteSingleMessageRequest,
  useDeleteBulkMessagesRequest,
} from './requests/messages'

export {
  useStaffListRequest,
  useSingleStaffRequest,
  useCreateStaffRequest,
  useUpdateStaffRequest,
  useBulkDeleteStaffRequest,
  useDeleteStaffRequest,
} from './requests/staff'