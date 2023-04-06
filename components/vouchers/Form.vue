<script setup>
import { useAsyncValidator } from '@vueuse/integrations/useAsyncValidator'

const props = defineProps({
  type: {
    type: String,
    default: 'create',
  },
})

const formHasError = ref(false)
const formErrors = ref({})
const voucherTypes = ref(getVoucherTypes())
const types = Object.values(voucherTypes.value)
const voucherValueTypes = ref(voucherPercentageOptions)

const voucher = ref({
  title: '',
  type: voucherTypes.value.phone.value,
  tags: [],
  room_no: '',
  phone_country_code: '',
  phone_number: '',
  value: 0,
  is_percentage: false,
  expires_at: null,
  qr_image_url: "",
})

const phoneNumber = ref(voucher.value.phone_number)
const countryCode = ref(voucher.value.phone_country_code)
const tags = ref(voucher.value.tags)
const showValidationErrors = ref(false)
const fetchedVouchers = useVouchers()
const route = useRoute()
const phoneNumberHasError = ref(false)

const fetchData = async () => {
  showLoader()
  await useSingleVoucherRequest(route.params.id)
    .then(response => {
      voucher.value = response.data
      phoneNumber.value = voucher.value.phone_number
      countryCode.value = voucher.value.phone_country_code
      tags.value = voucher.value.tags.map(tag => tag.name)
      hideLoader()
    })
    .catch(() => hideLoader())
}

const resolveVoucher = async () => {
  if (fetchedVouchers.value.item && fetchedVouchers.value.item.length) {
    voucher.value = fetchedVouchers.value.item.find(voucher => voucher.id === Number(route.params.id))
    phoneNumber.value = voucher.value.phone_number
    countryCode.value = voucher.value.phone_country_code
    tags.value = voucher.value.tags.map(tag => tag.name)
  } else {
    await fetchData()
  }
}

if (props.type === "edit" || props.type === "view") {
  await resolveVoucher()
}

const { pass, errorFields } = useAsyncValidator(voucher.value, voucherRules())

const handlePhoneNumberUpdate = ($event) => {
  phoneNumber.value = $event.phoneNumber
  countryCode.value = $event.countryCode
  formHasError.value = false
  if ($event.isValid === false) {
    formHasError.value = true
    formErrors.value.phone_number = true
  }
  phoneNumberHasError.value = false
}

function updateTags(tagsInput) {
  tags.value = tagsInput
}

const saveChanges = async (data) => {
  showLoader()
  data.phone_number = phoneNumber.value
  data.phone_country_code = countryCode.value
  data.tags = tags.value
  useUpdateVoucherRequest(data)
    .then(() =>
      hideLoader(),
      formHasError.value = false
    )
    .catch((error) => {
      hideLoader()
      formHasError.value = true
      formErrors.value = error.data.errors
    })
}

const submit = () => {
  let data = voucher.value

  if (!pass.value || formHasError.value) {
    phoneNumberHasError.value = Object.keys(formErrors.value).includes("phone_number")
    showValidationErrors.value = true
    return
  }

  if (props.type === "edit") {
    saveChanges(data)

    return
  }

  showLoader()
  data.tags = tags

  if (voucher.value.type === voucherTypes.value.phone.value) {
    delete data.room_number
    data.phone_number = phoneNumber.value
    data.phone_country_code = countryCode.value
  } else {
    delete data.phone_number
    delete data.phone_country_code
  }

  useCreateVoucherRequest(data)
    .then(() => {
      useRouter().back()
      hideLoader()
    })
    .catch((error) => {
      hideLoader()
      formHasError.value = true
      formErrors.value = error.data.errors
    })
}
</script>

<template>
  <div class="flex">
    <form class="m-0 p-0 ml-10 min-w-[480px] max-w-2xl">
      <div class="flex flex-col mb-5">
        <label
          for="voucher_title"
          class="text-xs text-black-light opacity-70 font-bold mb-3">
          {{ $t('vouchers.form.title') }}
        </label>
        <input
          id="voucher_title"
          v-model="voucher.title"
          type="text"
          class="w-full font-normal text-black-light text-sm py-3 px-4 rounded-lg border-gray-light border focus:outline-none focus:border-gray-light"
          :class="{'border-error': formHasError && formErrors.hasOwnProperty('title') || showValidationErrors && errorFields?.title?.length}"
          :disabled="type === 'view'">
        <div
          v-if="formHasError && formErrors.hasOwnProperty('title')"
          class="my-1.5 text-xs text-error">
          {{ formErrors.title[0] }}
        </div>
        <div
          v-if="errorFields?.title?.length && showValidationErrors"
          class="my-1.5 text-xs text-error">
          {{ errorFields?.title[0].message }}
        </div>
      </div>
      <div class="flex flex-col mb-5">
        <label
          for="voucher_type"
          class="text-xs text-black-light opacity-70 font-bold mb-3">
          {{ $t('vouchers.form.type') }}{{ type !== 'create' }}
        </label>
        <Select
          v-model="voucher.type"
          class="w-full"
          :options="types"
          :selected="types.find(el => el.value === voucher.type)"
          :disabled="type !== 'create'"
          @selected="(data) => voucher.type = data.value" />
      </div>
      <div
        v-if="voucher.type === voucherTypes.room.value"
        class="flex flex-col mb-5">
        <label
          for="room_no"
          class="text-xs text-black-light opacity-70 font-bold mb-3">{{ $t('vouchers.form.room_no') }}</label>
        <div class="flex">
          <input
            id="room_no"
            v-model="voucher.room_number"
            type="number"
            class="w-full font-normal text-black-light text-sm py-3 px-4 rounded-lg border-gray-light border focus:outline-none focus:border-gray-light">
        </div>
      </div>
      <div
        v-else-if="type === 'edit' && voucher.phone_number || type !== 'edit'"
        class="flex flex-col mb-5">
        <label
          for="phone_no"
          class="text-xs text-black-light opacity-70 font-bold mb-3">{{ $t('vouchers.form.phone_no') }}</label>
        <PhoneNumberInput
          :numeric-country-code="voucher.phone_country_code"
          :phone-number="voucher.phone_number"
          :disabled="type !== 'create'"
          :has-error="phoneNumberHasError"
          @update="handlePhoneNumberUpdate" />
      </div>
      <div class="mb-5">
        <div class=" w-full ">
          <label
            for="expiration_date"
            class="text-xs text-black-light opacity-70 font-bold mb-3">
            {{ $t('vouchers.form.expiration_date') }}
          </label>
          <ClientOnly>
            <Datepicker
              id="expiration_date"
              v-model="voucher.expires_at"
              :disabled="type === 'view'"
              :enable-time-picker="false"
              auto-apply />
          </ClientOnly>
        </div>
      </div>
      <div class="flex flex-col mb-5">
        <label
          for="voucher_voucher_tags"
          class="text-xs text-black-light opacity-70 font-bold mb-3">{{ $t('vouchers.form.tags') }}
          {{ type === 'view' }}</label>
        <TextToTag
          :tags="tags"
          :disabled="type === 'view'"
          @update-tags="updateTags" />
      </div>
      <div class="flex flex-col mb-5">
        <label
          for="voucher_value"
          class="text-xs text-black-light opacity-70 font-bold mb-3">
          {{ $t('vouchers.form.value_display') }}
        </label>
        <div class="flex">
          <input
            id="voucher_value"
            v-model.number="voucher.value"
            type="text"
            class="w-full font-normal text-black-light text-sm py-3 px-4 rounded-lg border-gray-light border focus:outline-none focus:border-gray-light"
            :class="{'border-error': formHasError && formErrors.hasOwnProperty('value') || showValidationErrors && errorFields?.value?.length}"
            :disabled="type === 'view'">
          <Select
            class="type"
            :options="voucherValueTypes"
            :selected="voucher.is_percentage
              ? voucherValueTypes.find(option => option.value === 'percentage')
              : voucherValueTypes.find(option => option.value !== 'percentage')"
            :disabled="type === 'view'"
            @selected="(option) => voucher.is_percentage = option.value === 'percentage'" />
        </div>
        <div
          v-if="formHasError && formErrors.hasOwnProperty('value')"
          class="my-1.5 text-xs text-error">
          {{ formErrors.value[0] }}
        </div>
        <div
          v-if="errorFields?.value?.length && showValidationErrors"
          class="my-1.5 text-xs text-error">
          {{ errorFields?.value[0].message }}
        </div>
      </div>
      <Button
        v-if="type !== 'view'"
        class="ml-auto bg-primary text-xs text-white font-normal py-3 px-6"
        @click="submit">
        {{ $t('buttons.save') }}
      </Button>
    </form>
    <div 
      v-if="type === 'view'"
      class="mt-5 ml-20">
      <img
        v-if="voucher.qr_image_url"
        :src="voucher.qr_image_url"
        class="w-[300px] h-[300px]"
        width="300"
        height="300">
    </div>
  </div>
</template>