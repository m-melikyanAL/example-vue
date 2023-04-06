<script setup>
definePageMeta({
  layout: "auth",
})

const showLoader = useShowLoader()

const password = ref("")
const userName = ref("")
const formHasError = ref(false)

const handleLogin = async () => {
  showLoader.value = true

  useLoginRequest({
    username: userName.value,
    password: password.value,
  })
    .then((response) => {
      const cookie = useCookie('token')
      cookie.value = response.token
      useAuthToken().value = response.token
      navigateTo("/")

      showLoader.value = false
    })
    .catch(() => {
      formHasError.value = true
      showLoader.value = false
    })
}
</script>

<template>
  <div class="mt-5 w-80">
    <img src="/images/logo.png" />
    <div v-if="formHasError" class="mt-5 mb-3 text-xs text-error">
      {{ $t('errors.login_form') }}
    </div>
    <form @submit.prevent="handleLogin">
      <div class="flex flex-col my-2 mb-5">
        <label
          for="username"
          class="text-xs text-black-light opacity-70 font-bold mb-3"
          >{{ $t('globals.username') }}</label
        >
        <input
          id="username"
          v-model="userName"
          type="text"
          :placeholder="$t('globals.username')"
          class="font-normal text-black-light text-sm py-3 px-4 rounded-lg border-gray-light border focus:outline-none focus:border-gray-light"
          :class="{ 'border-error': formHasError }"
          @input="formHasError = false"
        />
      </div>
      <div class="flex flex-col my-2 mb-5">
        <label
          for="password"
          class="text-xs text-black-light opacity-70 font-bold mb-3"
          >{{ $t('globals.password') }}</label
        >
        <input
          id="password"
          v-model="password"
          type="password"
          :placeholder="$t('globals.password')"
          class="font-normal text-black-light text-sm py-3 px-4 rounded-lg border-gray-light border focus:outline-none focus:border-gray-light"
          :class="{ 'border-error': formHasError }"
          @input="formHasError = false"
        />
      </div>
      <Button
        type="submit"
        class="justify-center my-2 bg-primary hover:bg-primary-hover w-80 text-white"
      >
        {{ $t('buttons.sign_in') }}
      </Button>
    </form>
  </div>
</template>
