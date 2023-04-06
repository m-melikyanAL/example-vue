<script setup>
import { vOnClickOutside } from '@vueuse/components'

const props = defineProps({
  placeholder: {
    type: String,
    default: 'Select'
  },
  selected: {
    type: Array,
    default: [],
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
  "selectionEnded"
])

const isOpen = ref(false)

const handleOutside = () => {
  if (isOpen.value === true) {
    emit("selectionEnded")
  }

  isOpen.value = false
}

const handleSelection = (option) => {
  emit("selected", option)
}

const isOptionSelected = (option) => {
  const optionIndex = props.selected.findIndex(optionElement => optionElement.value === option.value)

  return optionIndex > -1
}

const handleListToggle = () => {
  isOpen.value = !isOpen.value
  if (!isOpen.value) {
    emit("selectionEnded")
  }
}
</script>

<template>
  <div
    v-on-click-outside="handleOutside"
    class="relative">

    <div
      class="select cursor-pointer py-3 pl-2.5 pr-8 relative"
      @click="handleListToggle">

      <div
        v-if="selected.length">
        <span
          v-for="(selectedItem, index) in selected"
          :key="index"
          class="bg-gray-light text-black-light rounded-2xl p-1.5 mx-1">
          {{ selectedItem.label }}
        </span>
      </div>
      <span
        v-else>
        {{ placeholder }}
      </span>

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
        :class="{ 'bg-primary text-white': isOptionSelected(option) }"
        @click="handleSelection(option)">
        {{ option.label }}
      </div>
    </div>
  </div>
</template>
