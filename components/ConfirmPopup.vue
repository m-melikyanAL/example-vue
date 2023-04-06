<script setup>
import { vOnClickOutside } from '@vueuse/components'

const popupOptions = usePopupOptions()

const handleConfirm = async () => {
  if (typeof popupOptions.value.callback === 'function') {
    popupOptions.value.callback()
  }
  dismissPopup()
}

const handleCancel = async () => dismissPopup()
</script>

<template>
  <template v-if="popupOptions.showing">
    <div class="fixed top-0 left-0 z-20 overflow-hidden bg-black-dark bg-opacity-70 w-screen h-screen flex items-center justify-center p-5 transition">
      <div
        v-on-click-outside="handleCancel"
        class="w-[500px] h-[200px] bg-white rounded-xl p-5">
        <div class="h-1/3">
          <h3 class="font-bold text-black-dark text-lg m-0">{{ popupOptions.heading }}</h3>
        </div>
        <div class="h-1/3">
          <p class="text-sm text-black-light m-0">{{ popupOptions.message }}</p>
        </div>
        <div class="h-1/3 flex justify-end items-end">
          <Button
            @click="handleCancel"
            class="text-black-light mr-2 px-8 py-2 border-gray-light border">
            {{ popupOptions.cancel_text }}
          </Button>
          <Button
            @click="handleConfirm"
            class="text-white px-8 py-2"
            :class="{'bg-error': popupOptions.type === 'error', 'bg-primary': popupOptions.type === 'primary', 'bg-success': popupOptions.type === 'success'}">
            {{ popupOptions.confirm_text }}
          </Button>
        </div>
      </div>
    </div>
  </template>
</template>