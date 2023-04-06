<script setup>
import MazPhoneNumberInput from "maz-ui/components/MazPhoneNumberInput"

const emit = defineEmits([
  "update",
  "countryCodeUpdate",
])

const props = defineProps({
  numericCountryCode: {
    type: String,
    default: "1",
  },
  phoneNumber: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  hasError: {
    type: Boolean,
    default: false,
  }
})

const phoneNumber = ref(props.phoneNumber)

const numericCountryCode = computed(() => {
  if (props.numericCountryCode) {
    return props.numericCountryCode
  }

  return "1"
})
const showIsValid = ref()
const results = ref()

const onlyCountries = ref(phoneCountries)

const getDefaultCountryCode = (numericCountryCode) => {
  return getCountryLetterCode(numericCountryCode)
}

const handleUpdate = ($event) => {
  if (props.disabled) {
    return
  }

  results.value = $event
  showIsValid.value = true
  emit("update", {
    isValid: $event.isValid,
    countryCode: $event.countryCallingCode,
    phoneNumber: $event.formatNational,
  })
}

onMounted(() => {
  showIsValid.value = false
})
</script>

<template>
  <MazPhoneNumberInput
    v-model="phoneNumber"
    size="sm"
    no-search
    show-code-on-list
    no-flags
    no-example
    :default-country-code="getDefaultCountryCode(numericCountryCode)"
    :only-countries="onlyCountries"
    :success="results?.isValid"
    :error="!results?.isValid && showIsValid || hasError === true"
    :disabled="disabled"
    @update="handleUpdate" />
</template>
