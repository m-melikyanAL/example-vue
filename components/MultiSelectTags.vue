<script setup>
import { vOnClickOutside } from '@vueuse/components'

const props = defineProps({
  placeholder: {
    type: String,
    default: 'Select'
  },
  options: {
    type: Array,
    default: []
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  canAddTags: {
    type: Boolean,
    default: false,
  },
  selected: {
    type: Array,
    default: [],
  }
})

const emit = defineEmits([
  "selected",
  "selectionEnded"
])

const isOpen = ref(false)
const searchString = ref("")
const options = ref(props.options)
const selectedOptions = ref(props.selected)
const selectionUpdated = ref(false)
const search = ref(null)

const handleOutside = () => {
  if (isOpen.value === true) {
    emit("selectionEnded", selectedOptions.value)
  }

  isOpen.value = false
  searchString.value = ""
}

const handleSelection = (option) => {
  const tagOptionIndex = selectedOptions.value.findIndex(tagOptionElement => tagOptionElement.value === option.value)

  if (tagOptionIndex > -1) {
    selectedOptions.value.splice(tagOptionIndex, 1)
  } else {
    selectedOptions.value = [
      ...selectedOptions.value,
      option
    ]
  }

  emit("selected", selectedOptions.value)
}

const isOptionSelected = (option) => {
  const optionIndex = selectedOptions.value.findIndex(optionElement => optionElement.value === option.value)

  return optionIndex > -1
}

const handleListToggle = async () => {
  isOpen.value = !isOpen.value

  if (isOpen.value) {
    await nextTick()
    search.value.focus()
    selectionUpdated.value = false
    return
  }

  searchString.value = ""

  if (!selectionUpdated.value) {
    return
  }

  emit("selectionEnded", selectedOptions.value)
}

const addTag = () => {
  if (!props.canAddTags) {
    return
  }

  if (options.value.length) {
    return
  }

  const optionIndex = selectedOptions.value.findIndex(optionElement => optionElement.value === searchString.value)

  if (optionIndex !== -1) {
    return
  }

  selectedOptions.value = [
    ...selectedOptions.value,
    {
      label: searchString.value,
      value: searchString.value,
    }
  ]

  emit("selected", selectedOptions.value)
  searchString.value = ""
}

const handleRemoveTag = (selectedItem) => {
  selectedOptions.value = selectedOptions.value.filter(tag => tag.value !== selectedItem.value)
  emit("selected", selectedOptions.value)
  emit("selectionEnded", selectedOptions.value)
}

watch(searchString, (searchValue) => {
  if (searchValue === "") {
    options.value = props.options

    return
  }
  options.value = props.options.filter(option => option.value.match(searchValue))
})

watch(selectedOptions, () => {
  selectionUpdated.value = true
})
</script>

<template>
  <div
    v-on-click-outside="handleOutside"
    class="relative">
    <div
      class="select cursor-pointer py-3 pl-2.5 pr-8 relative max-h-[46px]"
      @click.self="handleListToggle">
      <div
        v-if="selectedOptions.length"
        @click.self="handleListToggle">
        <span
          v-for="(selectedItem, index) in selectedOptions"
          :key="index"
          class="bg-violet-light text-black-dark rounded-2xl pl-1.5 py-1 mx-1 align-middle"
          @click.self="handleListToggle">
          {{ selectedItem.label }}
          <IconsX
            class="text-black-light w-6 h-6 inline rounded-2xl bg-gray-light align-middle"
            @click="handleRemoveTag(selectedItem)" />
        </span>
      </div>
      <span
        v-else
        @click="handleListToggle">
        {{ placeholder }}
      </span>

      <div @click="handleListToggle">
        <IconsChevronDown
          v-if="!isOpen"
          class="absolute right-2 top-4" />
        <IconsChevronUp
          v-if="isOpen"
          class="absolute right-2 top-4" />
      </div>
    </div>

    <div
      class="w-full absolute select z-50 mt-2 p-0 max-h-64 overflow-y-scroll"
      :class="{ hidden: !isOpen}">
      <input
        ref="search"
        v-model="searchString"
        class="w-full font-normal text-black-light text-sm py-3 px-4 border-gray-light border-b focus:outline-none focus:border-gray-light"
        type="text"
        :placeholder="$t('globals.type_to_search')"
        @keyup.enter="addTag" />
      <template
        v-if="options.length">
        <div
          v-for="(option, index) in options"
          :key="index"
          class="cursor-pointer py-2.5 px-5 hover:bg-primary-hover hover:text-white rounded transition-colors flex items-center mt-1"
          :class="{ 'bg-primary text-white': isOptionSelected(option) }"
          @click="handleSelection(option)">
          {{ option.label }}
        </div>
      </template>
      <template v-if="!options.length && canAddTags">
        <div class="p-2.5">
          Press enter to add tag
        </div>
      </template>
    </div>
  </div>
</template>
