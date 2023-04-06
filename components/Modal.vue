<script setup>
import { vOnClickOutside } from '@vueuse/components'

const modalOptions = useModalOptions()

const closeModal = () => {
  dismissModal()
}
</script>

<template>
  <template v-if="modalOptions.showing">
    <div class="fixed top-0 left-0 z-40 overflow-hidden bg-black-dark bg-opacity-70 w-screen h-screen flex items-center justify-center p-5 transition">
      <div class="relative">
        <ButtonIcon
          @click="closeModal"
          class="absolute -top-3 -right-2 z-40 bg-white cursor-pointer ml-auto rounded-full">
          <IconsX class="text-black-light w-10 h-10"/>
        </ButtonIcon>

        <div v-on-click-outside="closeModal"
             class="relative bg-white rounded-xl p-5 overflow-x-hidden overflow-y-scroll"
             :class="{ 'w-[640px]': modalOptions.size === 'md', 'w-[960px]': modalOptions.size === 'lg', 'w-full': modalOptions.size === 'full'}">

          <div id="modal-content" class="mt-2.5 px-6"></div>

        </div>
      </div>

    </div>
  </template>
</template>