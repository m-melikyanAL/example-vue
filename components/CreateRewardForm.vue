<script setup>
import { valueTypes } from '@/utils/displayValue'
import { useAsyncValidator } from '@vueuse/integrations/useAsyncValidator'
import { rewardRules } from '@/utils/rules'

const router = useRouter()
const route = useRoute()
const showLoader = useShowLoader()
const types = ref(Object.values(valueTypes))
const formHasError = ref(false)
const formErrors = ref({})
const showValidationErrors = ref(false)
const showConfirmModal = ref(false)
const fetchedRewards = useRewards()

const reward = ref({
  amount_from: null,
  amount_to: null,
  value: null,
  type: valueTypes.percentage.value
})

const props = defineProps({
  type: {
    type: String,
    default: 'create',
  },
})

const createItem = async (data) => {
  if (!pass.value) {
    showValidationErrors.value = true
    return
  }

  if (props.type === "edit") {
    showConfirmModal.value = true
  } else {

    showValidationErrors.value = false
    showLoader.value = true
    useCreateRewardRequest(data)
      .then(() => {
        router.back()
        showLoader.value = false
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

  useUpdateRewardRequest(data)
    .then(() => {
      showLoader.value = false
      formHasError.value = false
      router.back()
    })
    .catch((error) => {
      showLoader.value = false
      formHasError.value = true
      formErrors.value = error.data.errors
    })
}

const fetchData = async () => {
  showLoader.value = true
  await useSingleRewardRequest(route.params.id)
    .then(response => {
      reward.value = response.data
      showLoader.value = false
    })
    .catch(() => showLoader.value = false)
}

const resolveReward = async () => {
  if (fetchedRewards.value.item && fetchedRewards.value.item.length) {
    reward.value = fetchedRewards.value.item.find(reward => reward.id === Number(route.params.id))
  } else {
    await fetchData()
  }
}

if (props.type === "edit") {
  resolveReward()
}

const { pass, errorFields } = useAsyncValidator(reward.value, rewardRules())
</script>

<template>
  <form
    class="m-0 p-0 ml-10 min-w-[480px] max-w-2xl"
    @submit.prevent="saveChanges(reward)">
    <div class="flex flex-col mb-5">
      <label for="reward_amount_from"
             class="text-xs text-black-light opacity-70 font-bold mb-3">{{ $t('rewards.form.amount_from') }}</label>
      <div class="relative">
        <span class="font-normal text-black-light text-sm absolute z-10 top-3.5 left-2">{{ getCurrencySymbol() }}</span>
        <input
          type="text"
          id="reward_amount_from"
          v-model="reward.amount_from"
          class="w-full font-normal text-black-light text-sm py-3 px-4 rounded-lg border-gray-light border focus:outline-none focus:border-gray-light"
          :class="{'border-error': ((formHasError && formErrors.hasOwnProperty('amount_from')) || (showValidationErrors &&  errorFields?.amount_from?.length))}" />
      </div>
      <div
        v-if="errorFields?.amount_from?.length && showValidationErrors"
        class="my-1.5 text-xs text-error">
        {{ errorFields?.amount_from[0].message }}
      </div>
      <div
        v-if="formHasError && formErrors.hasOwnProperty('amount_from')"
        class="my-1.5 text-xs text-error">
        {{ formErrors?.amount_from[0] }}
      </div>
    </div>
    <div class="flex flex-col mb-5">
      <label for="reward_amount_to"
             class="text-xs text-black-light opacity-70 font-bold mb-3">{{ $t('rewards.form.amount_to') }}</label>
      <div class="relative">
        <span class="font-normal text-black-light text-sm absolute z-10 top-3.5 left-2">{{ getCurrencySymbol() }}</span>
        <input
          type="text"
          id="reward_amount_from"
          v-model="reward.amount_to"
          class="w-full font-normal text-black-light text-sm py-3 px-4 rounded-lg border-gray-light border focus:outline-none focus:border-gray-light"
          :class="{'border-error': (formHasError && formErrors.hasOwnProperty('amount_to')) || (showValidationErrors &&  errorFields?.amount_to?.length)}"
        />
      </div>
      <div
        v-if="formHasError && formErrors.hasOwnProperty('amount_to')"
        class="my-1.5 text-xs text-error">
        {{ formErrors.amount_to[0] }}
      </div>
      <div
        v-if="errorFields?.amount_to?.length && showValidationErrors"
        class="my-1.5 text-xs text-error">
        {{ errorFields?.amount_to[0].message }}
      </div>
    </div>
    <div class="flex flex-col mb-5">
      <label for="reward_amount"
             class="text-xs text-black-light opacity-70 font-bold mb-3">{{ $t('rewards.form.amount_reward') }}</label>
      <div class="flex">
        <input type="text"
               id="reward_amount"
               v-model="reward.value"
               class="w-full font-normal text-black-light text-sm py-3 px-4 rounded-lg border-gray-light border focus:outline-none focus:border-gray-light"
               :class="{'border-error': (formHasError && formErrors.hasOwnProperty('value')) || (showValidationErrors && errorFields?.value?.length)}" />
        <Select
          v-model="reward.type"
          class="type"
          :options="types"
          :selected="types.find(el => el.value === reward.type)"
          @selected="(data) => reward.type = data.value"/>
      </div>
      <div
        v-if="errorFields?.value?.length && showValidationErrors"
        class="my-1.5 text-xs text-error">
        {{ errorFields?.value[0].message }}
      </div>
      <div
        v-if="formHasError && formErrors.hasOwnProperty('value')"
        class="my-1.5 text-xs text-error">
        {{ formErrors.value[0] }}
      </div>
    </div>
    <Button
      type="submit"
      class="ml-auto bg-primary text-sm text-white font-normal py-3 px-6">
      {{ $t('buttons.save') }}
    </Button>
  </form>
</template>