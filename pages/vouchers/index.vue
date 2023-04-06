<script setup>
const cachedVouchers = useVouchers()
const vouchers = ref(cachedVouchers)

let params = {
  page: 1,
  latest: true
}

const fetchData = async () => {
  showLoader()
  useVouchersRequest(params)
    .then(response => {
      vouchers.value.item = response.data
      vouchers.value.meta = response.meta
      hideLoader()
    })
    .catch(() => hideLoader())
}

const handleDeleteSingle = async (id) => {
  showLoader()

  useDeleteSingleVoucherRequest(id)
    .then(() => fetchData())
    .catch(() => hideLoader())
}

const handleDeleteBulk = async (ids) => {
  showLoader()
  useDeleteBulkVouchersRequest(ids)
    .then(() => fetchData())
    .catch(() => hideLoader())
}

onMounted(() => fetchData())
</script>

<template>
  <PageTitle
    class="mb-8"
    has-back>
    {{ $t('vouchers.title') }}
    <template #buttons>
      <NuxtLink to="/vouchers/create">
        <Button class="bg-primary mx-2 text-white">
          <IconsPlusIcon class="inline-block mr-1" />
          {{ $t('buttons.create') }}
        </Button>
      </NuxtLink>
    </template>
  </PageTitle>
  <Vouchers
    :items="vouchers.item"
    :meta="vouchers.meta"
    @navigate-to-page="params.page = $event.url.split('page=').pop(); fetchData()"
    @delete-single="handleDeleteSingle"
    @delete-bulk="handleDeleteBulk" />
</template>
