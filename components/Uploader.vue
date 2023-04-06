<script setup>
import { previewFile, uploadData } from "@/utils/uploader"

const props = defineProps({
  url: {
    type: String,
    default: "",
  },
  size: {
    type: String,
    default: "lg",
  },
  formats: {
    type: Array,
    default: [],
  },
  endpoint: {
    type: String,
    default: "",
  },
  imgSize: {
    type: String,
    default: "",
  },
  fileName: {
    type: String,
    default: "asset"
  }
})

const emit = defineEmits([
  "uploadStarted",
])

const preview = ref('')

function previewFiles(event, type) {
  previewFile(event, type, props.formats, props.endpoint, props.fileName)
  if (props.endpoint) {
    return
  }

  let input = type === "drop"
    ? event.dataTransfer
    : event.target

  if (!input.files.length) {
    return
  }

  let reader = new FileReader()
  reader.onload = (e) => {
    preview.value = e.target.result
  }
  reader.readAsDataURL(input.files[0])
}

function generateSize(size) {
  const sizesObj = {
    sm: { height: "192px", width: "384px" },
    lg: { height: "530px", width: "100%" },
    full: { height: "100%", width: "100%" },
  }

  return sizesObj[size]
}

function removeImage() {
  preview.value = ""
  uploadData.fileList = []
}

onMounted(() => {
  uploadData.fileList = []
})
</script>

<template>
  <div>
    <div
      key="1"
      class="grid grid-cols-1 z-[5]"
      @dragover="dragover"
      @drop="previewFiles($event, 'drop'); emit('uploadStarted')"
      @dragleave="dragleave">
      <div
        v-if="!endpoint && !preview || endpoint"
        :class="{ hovered: uploadData.isOver }"
        :style="`height: ${generateSize(size).height}; width: ${ generateSize(size).width }`"
        class="upload-box hover:text-primary z-[5] w-full h-[100vh] flex items-center max-h-[520px] select-none rounded-[16px] duration-300 cursor-pointer mt-5 relative">
        <input
          id="file"
          type="file"
          class="cursor-pointer absolute w-full h-full z-[7] opacity-0"
          multiple
          @input="previewFiles($event, 'upload'); emit('uploadStarted')" />

        <div
          class="my-0 mx-auto flex flex-col items-center text-[20px] font-light mb-[30px]">
          <img
            class="h-20 my-0 mx-auto"
            src="@/components/icons/upload-icon.png" />
          <span>{{ $t('upload.drop_message') }}</span>
          <span><i>{{ $t('upload.click_message') }}</i></span>
          <span>{{ formats.join(", ") }}</span>
        </div>
      </div>
      <div
        v-else-if="!endpoint"
        class="flex text-gray-light">
        <div class="relative">
          <img
            :src="preview"
            alt="preview"
            class="h-[192px] w-[192px] rounded-lg my-2 relative">
          <IconsCloseIcon
            class="absolute top-4 right-2 w-6 h-6 bg-gray rounded-full bg-opacity-30 text-white cursor-pointer"
            @click="removeImage()" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.upload-box {
  border: 1px dashed #d9d9d9;
}
.upload-box:hover {
  border: 1px dashed #7367f0 !important;
}
.hovered {
  border: 1px dashed #7367f0 !important;
  color: #7367f0;
}
.upload-box img {
  filter: invert(74%) sepia(11%) saturate(148%) hue-rotate(182deg)
    brightness(103%) contrast(95%);
}
body {
  background-color: #e2e2e2;
}
</style>
