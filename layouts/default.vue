<script setup>
const showLoader = useShowLoader()
const showSidebar = useShowSidebar()
</script>

<template>
  <button
    v-if="!showSidebar"
    type="button"
    class="pl-6 pt-4 text-black-light lg:hidden absolute top-0 left-0"
    @click="showSidebar = !showSidebar">
    <IconsBars
      class="w-8 h-8" />
  </button>
  <div class="flex flex-row min-h-[100vh] bg-white">
    <div
      class="bg-white-dark lg:border-r-gray-light lg:border-r max-h-[100vh] overflow-y-scroll lg:block fixed pb-24 pt-10 lg:pt-0 z-20"
      :class="{ hidden: !showSidebar }">
      <Sidebar />
    </div>
    <div class="lg:ml-80 container m-10 pt-10 lg:pt-0">
      <slot />
    </div>
    <div
      v-if="showLoader"
      class="fixed top-0 left-0 bg-white bg-opacity-80 z-30 w-screen h-screen flex items-center justify-center p-5">
      <Loader class="w-12 h-12" />
    </div>
    <ConfirmPopup />
    <Modal />

    <Transition
      name="fade"
      mode="out-in">
      <UploadDialog
        :show-upload-dialog="uploadData.showUploadDialog"
        :file-list="uploadData.fileList"
        @close-modal="closeModal" />
    </Transition>

    <Transition
      name="fade"
      mode="out-in">
      <div
        v-if="uploadData.newFiles.filter(item => item.snackbar.errorMessage !== '').length"
        class="z-10 fixed right-4 top-28 flex flex-col gap-2">
        <Transition
          v-for="(file, i) in uploadData.newFiles.filter(item => item.snackbar.errorMessage !== '')"
          :key="`message__${i}`"
          name="fade"
          mode="out-in">
          <div
            v-if="file.snackbar.showSnackbar"
            class="z-10 w-72 h-20 bg-error-medium border border-error rounded-md">
            <div class="flex justify-between p-4">
              <div>
                <span class="text-error text-lg font-bold">
                  Error!
                </span>
                <p class="text-white">
                  {{ file.snackbar.errorMessage }}
                </p>
              </div>
              <IconsX
                class="cursor-pointer"
                @click="file.snackbar.showSnackbar = false" />
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </div>
</template>