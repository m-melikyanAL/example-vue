<template>
  <div
    v-if="showUploadDialog"
    class="fixed right-4 bottom-4 w-[450px] h-[350px] bg-white drop-shadow-2xl rounded-md z-10">
    <div class="bg-primary-hover flex justify-between items-center h-11 rounded-tl-md rounded-tr-md p-2 px-4">
      <span class="text-white">{{ fileList.length }} uploads complete</span>
      <Button
        class="px-1 py-1 rotate-45"
        @click="$emit('close-modal')">
        <IconsPlusIcon />
      </Button>
    </div>
    <div class="overflow-y-auto h-[310px]">
      <div
        v-for="(item, index) in fileList"
        :key="`file_${index}`"
        class="flex items-center justify-between pl-6 pr-6 pb-2 pt-2 border-b-gray-light border-b gap-2 max-w-full">
        <span class="break-words">{{ item.file.name }}</span>
        <div
          class="min-w-[22px] h-[22px] rounded-full flex justify-center items-center"
          :class="{ 'bg-success' : item.isSuccess, 'bg-error' : item.isError }">
          <img
            v-if="!item.isLoaded"
            class="w-[22px] h-[22px]"
            src="../components/icons/loader.gif">
          <img
            v-else-if="item.isSuccess"
            class="w-[14px] h-[14px] success-icon"
            src="../components/icons/succes.png">
          <IconsPlusIcon
            v-else
            class="rotate-45" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UploadDialog",
  props: {
    showUploadDialog: Boolean,
    fileList: Array,
  }
}
</script>

<style scoped>
.success-icon {
  filter: invert(100%) sepia(99%) saturate(2%) hue-rotate(37deg) brightness(112%) contrast(100%);
}
</style>