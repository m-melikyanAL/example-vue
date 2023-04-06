<script setup>
import { vOnClickOutside } from '@vueuse/components'

defineProps({
  placeholder: {
    type: String,
    default: 'Select'
  },
  selected: {
    type: Object,
    default: {
      label: "",
      value: "",
    },
  },
  options: {
    type: Array,
    default: []
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits([
  "selected",
])

const isOpen = ref(false)

const handleOutside = () => {
  isOpen.value = false
}

const handleSelection = (option) => {
  isOpen.value = false
  emit("selected", option)
}
</script>

<template>
  <div
    v-on-click-outside="handleOutside"
    class="relative">
    <div
      class="select cursor-pointer p-3 pl-5 relative"
      :class="{'pointer-events-none disabled': disabled}"
      @click="isOpen = !isOpen">
      <span class="capitalize">{{ selected.label ? selected.label : placeholder }}</span>
      <IconsChevronDown
        v-if="!isOpen"
        class="absolute right-2 top-4" />
      <IconsChevronUp
        v-if="isOpen"
        class="absolute right-2 top-4" />
    </div>
    <div
      class="w-full absolute select z-50 mt-2 p-0 max-h-48 overflow-y-scroll"
      :class="{ hidden: !isOpen}">
      <div
        v-for="(option, index) in options"
        :key="index"
        class="cursor-pointer py-2.5 px-5 hover:bg-primary-hover hover:text-white rounded transition-colors flex items-center"
        @click="handleSelection(option)">
        <img
          v-if="option.hasOwnProperty('image_url') && option.image_url"
          width="16"
          height="16"
          class="w-12 h-12 rounded-xl object-cover mr-2.5 -ml-4"
          :src="option.image_url">

        <span class="capitalize">
          {{ option.label }}
        </span>
      </div>
    </div>
  </div>
</template>
<style scoped>
.select.disabled {
  background-color: #f9f9f9;
}
</style>
