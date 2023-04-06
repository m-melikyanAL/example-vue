<script setup>
defineEmits([
  "close",
])

defineProps({
  url: {
    type: String,
    default: "",
  }
})
</script>

<template>
  <div
    class="fixed z-20 h-screen w-screen p-3 bg-black-dark bg-opacity-90 top-0 left-0 right-0"
    @click.self="$emit('close')">
    <button
      type="button"
      class="absolute right-0 top-0 cursor-pointer p-4 bg-black-dark bg-opacity-20 rounded-full"
      @click="$emit('close')">
      <IconsX class="w-10 h-10 text-white" />
    </button>
    <img
      :src="url"
      class="w-full h-full object-scale-down"
      @click.self="$emit('close')">
  </div>
</template>