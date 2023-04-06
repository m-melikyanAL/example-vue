<script setup>
const props = defineProps({
  heading: {
    type: String,
    default: ''
  },
  text: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="fixed top-0 left-0 bg-black-dark bg-opacity-10 w-screen h-screen flex items-center justify-center p-5 transition">
    <div class="w-[500px] h-[200px] bg-white rounded-xl p-5">
      <div class="h-1/3">
        <h3 class="font-bold text-black-dark text-lg m-0">{{ props.heading }}</h3>
      </div>
      <div class="h-1/3">
        <p class="text-sm text-black-light m-0">{{ props.text }}</p>
      </div>
      <div class="h-1/3 flex justify-end items-end">
        <Button @click="$emit('cancel')" class="text-black-light mr-2 px-8 py-2 border-gray-light border ">
          Cancel
        </Button>
        <Button @click="$emit('approve')" class="text-white bg-error px-8 py-2 ">
          Yes, Delete
        </Button>
      </div>
    </div>
  </div>
</template>