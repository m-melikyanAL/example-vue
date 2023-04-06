<script setup>
const props = defineProps({
  data: {
    type: Object,
    default: singleDigitalAssetData(),
  }
})

const digitalAssetData = reactive(props.data)

const setSelectedData = () => {
  digitalAssetData.selected.category = digitalAssetData.categories.find(cat => cat.value === digitalAssetData.digitalAsset.category)
  digitalAssetData.selected.tags = digitalAssetData.digitalAsset.tags.map(tag => tag.name)
  digitalAssetData.selected.status = digitalAssetData.statuses.find(status => status.value === digitalAssetData.digitalAsset.status)
}

const handleSave = async () => {
  if (digitalAssetData.digitalAsset.name?.length < 2) {
    digitalAssetData.formHasErrors = true
    digitalAssetData.formErrors.push("name")
  }

  if (digitalAssetData.formHasErrors) {
    return
  }

  showLoader()

  useUpdateDigitalAssetRequest({
    id: digitalAssetData.digitalAsset.id,
    categories: [digitalAssetData.selected.category.id],
    status: digitalAssetData.selected.status.value,
    tags: digitalAssetData.selected.tags,
    name: digitalAssetData.digitalAsset.name,
  })
    .then(response => {

      digitalAssetData.digitalAsset = response.data

      setSelectedData()

      hideLoader()
      useRouter().back()
    })
    .catch(() => hideLoader())
}

const handleUpdateTags = (tagsInput) => {
  digitalAssetData.selected.tags = tagsInput
}

const handleNameInput = (event) => {
  digitalAssetData.digitalAsset.name = event.target.value
  digitalAssetData.formHasErrors = false
  digitalAssetData.formErrors = digitalAssetData.formErrors.filter(error => error !== "name")
}

setSelectedData()
</script>

<template>
  <div class="flex flex-col md:flex-row">
    <img
      v-if="digitalAssetData.digitalAsset.url && digitalAssetData.digitalAsset.type === 'image'"
      :src="digitalAssetData.digitalAsset.url"
      class="w-42 h-42 md:w-64 md:h-64 rounded-xl object-cover mx-auto md:mx-0 cursor-pointer"
      @click="digitalAssetData.preview.show = true">
    <video
      v-if="digitalAssetData.digitalAsset.url && digitalAssetData.digitalAsset.type === 'video'"
      width="256"
      height="256"
      class="bg-black-dark rounded-xl w-42 h-42 md:w-64 md:h-64"
      muted
      controls>
      <source
        :src="digitalAssetData.digitalAsset.url"
        type="video/mp4">
    </video>

    <div class="md:ml-10 my-6 md:my-0 sm:min-w-[480px]">
      <form
        class="m-0 p-0"
        @submit.prevent="() => {}">
        <div class="flex flex-col mb-5">
          <label
            for="name"
            class="text-xs text-black-light opacity-70 font-bold mb-3">
            {{ $t('digital_assets.name') }}
          </label>
          <input
            :value="digitalAssetData.digitalAsset.name"
            type="text"
            class="w-full font-normal text-black-light text-sm py-3 px-4 rounded-lg border-gray-light border focus:outline-none focus:border-gray-light"
            :class="{'border-error': digitalAssetData.formHasErrors && digitalAssetData.formErrors.includes('name')}"
            @input="handleNameInput">
          <div
            v-if=" digitalAssetData.formHasErrors && digitalAssetData.formErrors.includes('name')"
            class="my-1.5 text-xs text-error">
            {{ digitalAssetData.errorMessages.name }}
          </div>
        </div>
        <div class="flex flex-col mb-5">
          <label
            for="category"
            class="text-xs text-black-light opacity-70 font-bold mb-3">
            {{ $t('digital_assets.category') }}
          </label>
          <Select
            :selected="digitalAssetData.selected.category"
            :options="digitalAssetData.categories"
            @selected="digitalAssetData.selected.category = $event" />
        </div>

        <div class="flex flex-col mb-5">
          <label
            for="status"
            class="text-xs text-black-light opacity-70 font-bold mb-3">
            {{ $t('globals.status') }}
          </label>
          <Select
            :selected="digitalAssetData.selected.status"
            :options="digitalAssetData.statuses"
            @selected="digitalAssetData.selected.status = $event" />
        </div>

        <div class="flex flex-col mb-5">
          <label
            class="text-xs text-black-light opacity-70 font-bold mb-3">
            {{ $t('digital_assets.tags') }}
          </label>

          <TextToTag
            :tags="digitalAssetData.selected.tags"
            @update-tags="handleUpdateTags" />
        </div>

        <div class="flex justify-end">
          <Button
            class="bg-success text-white px-10 mr-3"
            @click="handleSave">
            {{ $t('buttons.save') }}
          </Button>
        </div>

      </form>
    </div>

    <Preview
      v-if="digitalAssetData.preview.show && digitalAssetData.digitalAsset.type === 'image'"
      :url="digitalAssetData.digitalAsset.url"
      @close="digitalAssetData.preview.show = false" />
  </div>
</template>