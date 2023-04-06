<script setup>
import LaravelLinks from './LaravelLinks'

defineProps({
  meta: {
    type: Object,
    default: {},
  },
  total: {
    type: Number,
    default: 0,
  },
})

defineEmits([
  "navigateToPage",
])
</script>

<template>
  <div class="flex items-center justify-end bg-white">
    <div class="flex flex-1 items-center justify-end">
      <div>
        <nav
          class="isolate inline-flex -space-x-px rounded-md shadow-sm"
          aria-label="Pagination">
          <LaravelLinks
            v-if="Object.keys(meta).length"
            :meta="meta"
            @navigate-to-page="$emit('navigateToPage', $event)" />
        </nav>
      </div>
    </div>
  </div>
</template>