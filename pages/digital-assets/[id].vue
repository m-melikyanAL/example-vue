<script setup>
const data = reactive(singleDigitalAssetData())

const fetchData = async () => {
  showLoader()
  await useSingleDigitalAssetRequest(useRoute().params.id)
    .then(response => {
      data.digitalAsset = response.data
      data.categories = data.categoryMapper(response.meta.categories)
      data.tags = data.tagMapper(response.meta.tags)
      hideLoader()
    })
    .catch(() => hideLoader())
}

const resolveAsset = async () => {
  if (useAssets().value.item?.length) {
    data.digitalAsset = useAssets().value.item.find(asset => asset.id === Number(useRoute().params.id))
    data.categories = data.categoryMapper(useAssets().value.meta.categories)
    data.tags = data.tagMapper(useAssets().value.meta.tags)
  } else {
    await fetchData()
  }
}

onMounted(() => {
  resolveAsset()
})
</script>

<template>
  <PageTitle
    class="mb-8"
    has-back
    has-upload>
    {{ $t('digital_assets.edit') }} {{ useRoute().params.id }}
    <template v-slot:buttons>
      <UploadButton />
    </template>
  </PageTitle>
  <ClientOnly>
    <DigitalAssetsForm
      v-if="Object.keys(data.digitalAsset).length"
      :data="data" />
  </ClientOnly>
</template>