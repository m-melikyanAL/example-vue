<script setup>
import {ref} from 'vue'

const showLoader = ref(useShowLoader())
</script>

<template>
  <div class="flex justify-center min-h-[100vh]">
    <slot/>

    <div
      v-if="showLoader"
      class="fixed top-0 left-0 bg-white bg-opacity-80 z-20 w-screen h-screen flex items-center justify-center p-5">
      <Loader class="w-12 h-12"/>
    </div>
  </div>
</template>