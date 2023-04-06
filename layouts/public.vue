<script setup>
const showLoader = useShowLoader()
</script>

<template>
  <div class="flex min-h-[100vh] bg-white">
    <div class="container mx-auto py-10">
      <slot/>
    </div>
  </div>
  <div
    v-if="showLoader"
    class="fixed top-0 left-0 bg-white bg-opacity-80 z-30 w-screen h-screen flex items-center justify-center p-5">
    <Loader class="w-12 h-12"/>
  </div>
</template>