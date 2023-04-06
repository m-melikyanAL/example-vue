<script setup>
const props = defineProps({
  tags: {
    type: Array,
    default: []
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits([
  'updateTags'
])


const tagsInput = ref(props.tags ? props.tags : [])

const tag = ref('')

const addTag = () => {
  if(!tag.value) {
    return
  }

  if (tagsInput.value.find(tagOption => tagOption === tag.value)) {
    return
  }

  tagsInput.value.push(tag.value)
  tag.value = ''
  emit('updateTags', tagsInput.value)
}

function deleteTag(index) {
  tagsInput.value = tagsInput.value.filter((item, i) => i !== index)
  emit('updateTags', tagsInput.value)
}
</script>

<template>
  <div class="flex flex-wrap px-4 py-1 w-full font-normal text-black-light text-sm rounded-lg border-gray-light border focus:outline-none focus:border-gray-light">
    <div class="min-h-[36px] flex gap-2 flex-wrap max-w-[300px] items-center">
      <div
        v-for="(tagName, index) in tagsInput"
        :key="`tag__${index}`"
        class="max-w-full h-8 flex items-center gap-1 leading-4 px-3 text-black-dark bg-violet-light select-none rounded-[16px]"
        :class="{'cursor-pointer' : !disabled}">
        <span class="mb-0.5 whitespace-nowrap overflow-hidden">{{ tagName }}</span>
        <IconsCloseIcon
          v-if="!disabled"
          class="w-4 h-4 text-black-light"
          @click="deleteTag(index)" />
      </div>
    </div>
    <input
      v-model="tag"
      :placeholder="$t('vouchers.form.tags_placeholder')"
      :class="{'pl-4' : tagsInput.length}"
      class="min-h-[36px] focus:outline-none focus:border-gray-light"
      type="text"
      :disabled="disabled"
      @keyup.enter="addTag">
  </div>
</template>