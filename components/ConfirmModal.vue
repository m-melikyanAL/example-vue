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
    <div class="w-[350px] h-[150px] bg-white rounded-xl p-5">
      <div class="">
        <h3 class="font-bold text-black-dark text-lg text-center">{{ props.heading }}</h3>
      </div>
      <div class="mt-10 flex justify-center gap-6">
        <Button @click="$emit('cancel')" class="text-black-light mr-2 px-6 py-2 border-gray-light border ">
          Cancel
        </Button>
        <Button @click="$emit('approve')" class="text-white bg-success px-8 py-2">
          Yes
        </Button>
      </div>
    </div>
  </div>
</template>