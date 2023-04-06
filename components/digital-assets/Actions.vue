<script setup>
import { vOnClickOutside } from '@vueuse/components'

const show = ref(false)

const handleOutside = () => {
  show.value = false
}
</script>

<template>
  <button
    v-on-click-outside="handleOutside"
    class="relative"
    @click.self="show = !show">
    {{ $t("digital_assets.actions") }}
    <div
      class="absolute -top-28 -right-2"
      :class="{ hidden: !show }">
      <div class="w-full flex flex-col space-y-4 text-white bg-black-dark p-2 rounded-full bg-opacity-80">
        <slot />
      </div>
    </div>
  </button>
</template>