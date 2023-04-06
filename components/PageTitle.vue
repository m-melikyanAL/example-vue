<script setup>
const router = useRouter()

defineProps({
  hasBack: {
    type: Boolean,
    default: false,
  },
  hasUpload: {
    type: Boolean,
    default: false,
  }
})
const handleBack = () => {
  router.back()
}
</script>

<template>
  <div class="flex justify-between">
    <div class="flex">
      <Button
        v-if="hasBack"
        class="w-8 h-8 border border-gray-light rounded-md text-black-light mr-5 px-0 py-0"
        @click="handleBack">
        <IconsBack class="w-12 h-5" />
      </Button>
      <h1 class="font-black text-xl md:text-2xl">
        <slot></slot>
      </h1>
    </div>
    <div
      v-if="$slots.buttons"
      class="flex flex-row justify-end">
      <slot name="buttons"></slot>
    </div>

  </div>
</template>