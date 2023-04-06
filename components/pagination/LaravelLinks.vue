<script setup>
defineProps({
  meta: {
    type: Object,
    default: {},
  },
})

defineEmits([
  "navigateToPage",
])
</script>

<template>
  <template
    v-for="(link, index) in meta.links"
    :key="index">
    <button
      v-if="index === 0"
      :disabled="link.url === null"
      class="relative inline-flex items-center rounded-l-md border border-gray-light bg-white px-1.5 sm:px-2 sm:py-2"
      @click="$emit('navigateToPage', link)">
      <IconsChevronLeft
        class="h-4 w-4"
        aria-hidden="true" />
    </button>

    <button
      v-else-if="index < meta.links.length - 1 && link.label !== '...'"
      aria-current="page"
      :disabled="link.active"
      class="relative inline-flex items-center border border-gray-light px-3 sm:px-4 py-1.5 text-xs text-black-light"
      :class="{'bg-primary': link.active, 'text-white': link.active}"
      @click="$emit('navigateToPage', link)">
      {{ link.label }}
    </button>

    <button
      v-else-if="link.label === '...'"
      disabled
      class="relative inline-flex items-center border border-gray-light px-1.5 sm:px-4 py-1 text-xs text-black-light text-gray-medium">
      {{ link.label }}
    </button>

    <button
      v-else-if="index === meta.links.length -1"
      :disabled="link.url === null"
      class="relative inline-flex items-center rounded-r-md border border-gray-light px-1.5 sm:px-2 sm:py-2 text-sm"
      @click="$emit('navigateToPage', link)">
      <IconsChevronRight
        class="h-4 w-4"
        aria-hidden="true" />
    </button>

  </template>
</template>