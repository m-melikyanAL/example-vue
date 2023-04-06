<script setup>
const showTable = ref(false)
const assets = useAssets()
const params = useDigitalAssetQueryParams()

const fetchData = async () => {
  showLoader()

  params.value.assets = useRecentDigitalAssetsIds().value.length > 0
    ? useRecentDigitalAssetsIds().value
    : []

  useDigitalAssetsRequest(params.value)
    .then((response) => {
      assets.value.item = response.data
      assets.value.meta = response.meta
      hideLoader()
      showTable.value = true
    })
    .catch(() => {
      hideLoader()
    })
}

const handleDeleteSingle = async (id) => {
  showLoader()
  useDeleteSingleDigitalAssetRequest(id)
    .then(() => fetchData())
}

const handleBulkDelete = async (ids) => {
  showLoader()
  useDeleteBulkDigitalAssetsRequest(ids)
    .then(() => fetchData())
}

const handleBulkUpdate = (data) => {
  showLoader()
  useUpdateBulkDigitalAssetsRequest(data)
    .then(() => fetchData())
}

const handleTagsFilterChange = (tagOptions) => {
  params.value.tags = tagOptions.map(tagOption => tagOption.value)
  params.value.page = "1"
  fetchData()
}

onMounted(() => {
  if (usePreSelectRecentDigitalAssets().value === true) {
    params.value.status = "inactive"
  }

  fetchData()
})
</script>

<template>
  <PageTitle
    class="mb-8"
    has-back
    has-upload>
    {{ $t('digital_assets.title') }}
    <template v-slot:buttons>
      <UploadButton />
    </template>
  </PageTitle>

  <DigitalAssets
    v-if="showTable"
    :items="assets.item"
    :meta="assets.meta"
    :search-filter="params.search"
    @navigate-to-page="params.page = $event.url ? $event.url.split('page=').pop() : $event; fetchData()"
    @active-filter-changed="params.status = $event.value; params.page = '1'; fetchData()"
    @category-filter-changed="params.categories = $event.value; params.page = '1'; fetchData()"
    @search-filter="params.search = $event; params.page = '1'; fetchData()"
    @tags-filter-changed="handleTagsFilterChange"
    @delete-single-asset="handleDeleteSingle"
    @delete-bulk-assets="handleBulkDelete"
    @bulk-update="handleBulkUpdate" />
</template>
