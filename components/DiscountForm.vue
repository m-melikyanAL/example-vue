<script setup>
import { valueTypes } from '@/utils/displayValue'
import { discountRules } from '@/utils/rules'
import { useAsyncValidator } from '@vueuse/integrations/useAsyncValidator'

const { t } = useI18n();
const showLoader = useShowLoader()
const router = useRouter()
const route = useRoute()
const types = ref(Object.values(valueTypes))
const statuses = ref(discountStatuses())
const formHasError = ref(false)
const formErrors = ref({})
const showValidationErrors = ref(false)
const fetchedDiscounts = useDiscounts()
const showConfirmModal = ref(false)

const discount = ref({
  name: null,
  code: null,
  value: null,
  type: valueTypes.percentage.value,
  started_at: null,
  ended_at: null,
  status: "active"
})

const props = defineProps({
  type: {
    type: String,
    default: 'create',
  },
})
const fetchData = async () => {
  showLoader.value = true
  await useSingleDiscountRequest(route.params.id)
    .then(response => {
      discount.value = response.data
      showLoader.value = false
    })
    .catch(() => showLoader.value = false)
}
const resolveDiscount = async () => {
  if (fetchedDiscounts.value.item && fetchedDiscounts.value.item.length) {
    discount.value = fetchedDiscounts.value.item.find(discount => discount.id === Number(route.params.id))
  } else {
    await fetchData()
  }
}

const createItem = async (data) => {
  if (!pass.value) {
    showValidationErrors.value = true
    return
  }
  if (props.type === "edit") {
    showConfirmModal.value = true
  } else {
    showLoader.value = true
    useCreateDiscountRequest(data)
      .then(() => {
        router.back()
        showLoader.value = false
        formHasError.value = false
        navigateTo('/discounts')
      })
      .catch((error) => {
        showLoader.value = false
        formHasError.value = true
        formErrors.value = error.data.errors
      })
  }
}
const saveChanges = async (data) => {
  if (props.type === "create") {
    createItem(data)
    return
  }

  if (!pass.value) {
    showValidationErrors.value = true
    return
  }
  showLoader.value = true
  useUpdateDiscountRequest(data)
    .then(() => {
      showLoader.value = false
      formHasError.value = false
      navigateTo('/discounts')
    })
    .catch((error) => {
      showLoader.value = false
      formHasError.value = true
      formErrors.value = error.data.errors
    })
}

if (props.type === "edit") {
  resolveDiscount()
}
const { pass, errorFields } = useAsyncValidator(discount.value, discountRules())

</script>
<template>
  <form
    class="m-0 p-0 ml-10 min-w-[480px] max-w-2xl"
    @submit.prevent="saveChanges(discount)">
    <div class="flex flex-col mb-5">
      <label
        for="discount_name"
        class="text-xs text-black-light opacity-70 font-bold mb-3">{{ $t('globals.name') }}</label>
      <div class="relative">
        <input
          type="text"
          id="discount_name"
          v-model="discount.name"
          class="w-full font-normal text-black-light text-sm py-3 px-4 rounded-lg border-gray-light border focus:outline-none focus:border-gray-light"
          :class="{'border-error': formHasError && formErrors.hasOwnProperty('name') || showValidationErrors && errorFields?.name?.length}" />
      </div>
      <div
        v-if="formHasError && formErrors.hasOwnProperty('name')"
        class="my-1.5 text-xs text-error">
        {{ formErrors.name[0] }}
      </div>
      <div
        v-if="errorFields?.name?.length && showValidationErrors"
        class="my-1.5 text-xs text-error">
        {{ errorFields?.name[0].message }}
      </div>
    </div>
    <div class="flex flex-col mb-5">
      <label
        for="discount_code"
        class="text-xs text-black-light opacity-70 font-bold mb-3">{{ $t('discounts.form.code') }}</label>
      <div class="relative">
        <input
          v-model="discount.code"
          type="text"
          id="discount_code"
          class="w-full font-normal text-black-light text-sm py-3 px-4 rounded-lg border-gray-light border focus:outline-none focus:border-gray-light"
          :class="{'border-error': formHasError && formErrors.hasOwnProperty('code') || showValidationErrors && errorFields?.code?.length}" />
      </div>
      <div
        v-if="formHasError && formErrors.hasOwnProperty('code')"
        class="my-1.5 text-xs text-error">
        {{ formErrors.code[0] }}
      </div>
      <div
        v-if="errorFields?.code?.length && showValidationErrors"
        class="my-1.5 text-xs text-error">
        {{ errorFields?.code[0].message }}
      </div>
    </div>
    <div class="flex flex-col mb-5">
      <label
        for="discount"
        class="text-xs text-black-light opacity-70 font-bold mb-3">{{ $t('discounts.form.value_display') }}</label>
      <div class="flex">
        <input
          v-model="discount.value"
          type="text"
          id="discount"
          class="w-full font-normal text-black-light text-sm py-3 px-4 rounded-lg border-gray-light border focus:outline-none focus:border-gray-light"
          :class="{'border-error': formHasError && formErrors.hasOwnProperty('value') || showValidationErrors && errorFields?.value?.length}" />
        <Select
          v-model="discount.type"
          class="type"
          :options="types"
          :selected="types.find(el => el.value === discount.type)"
          @selected="(data) => discount.type = data.value" />
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
    <ClientOnly>
      <div class="mb-5">
        <div class="flex">
          <div class="flex w-full flex-col">
            <label
              for="started_at"
              class="text-xs text-black-light opacity-70 font-bold mb-3">
              {{ $t('discounts.form.start_date') }}
            </label>
            <Datepicker
              id="started_at"
              auto-apply
              :enable-time-picker=false
              v-model="discount.started_at" />
          </div>
          <div class="flex w-full flex-col">
            <label
              for="ended_at"
              class="text-xs text-black-light opacity-70 font-bold mb-3">
              {{ $t('discounts.form.end_date') }}
            </label>
            <Datepicker
              id="ended_at"
              :enable-time-picker=false
              auto-apply
              v-model="discount.ended_at" />
          </div>
        </div>
      </div>
    </ClientOnly>
    <div class="flex flex-col mb-5">
      <label
        for="discount_code"
        class="text-xs text-black-light opacity-70 font-bold mb-3">
        {{ $t('globals.status') }}
      </label>
      <Select
        v-model="discount.status"
        class="w-full"
        :options="statuses"
        :selected="statuses.find(el => el.value === discount.status)"
        @selected="(data) => discount.status = data.value" />
    </div>
    <Button
      type="submit"
      class="ml-auto bg-primary text-sm text-white font-normal py-3 px-6">
      {{ $t('buttons.save') }}
    </Button>
  </form>
</template>