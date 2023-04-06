<script setup>
const showLoader = useShowLoader()

const cachedDiscounts = useDiscounts()

const discounts = ref(cachedDiscounts)

let params = {
  page: "1",
  latest: true
}

const fetchData = async () => {
  showLoader.value = true

  useDiscountsRequest(params)
    .then(response => {
      discounts.value.item = response.data
      discounts.value.meta = response.meta
      showLoader.value = false
    })
    .catch(() => showLoader.value = false)
}

const handleDeleteSingle = async (id) => {
  showLoader.value = true
  useDeleteSingleDiscountRequest(id)
      .then(() => fetchData())
}

const handleDeleteBulk = async (ids) => {
  showLoader.value = true
  useDeleteBulkDiscountsRequest(ids)
    .then(() => fetchData())
    .catch(() => showLoader.value = false)
}

onMounted(() => fetchData())
</script>

<template>
  <div>
    <PageTitle
      class="mb-8"
      has-back>
      {{ $t('discounts.title') }}
      <template v-slot:buttons>
        <NuxtLink to="discounts/create">
          <Button class="bg-primary mx-2 text-white">
            <IconsPlusIcon class="inline-block mr-1"/>
            {{ $t('buttons.create') }}
          </Button>
        </NuxtLink>
      </template>
    </PageTitle>
    <DiscountsTable
      :items="discounts.item"
      :meta="discounts.meta"
      @navigate-to-page="params.page = $event.url.split('page=').pop(); fetchData()"
      @delete-single="handleDeleteSingle"
      @delete-bulk="handleDeleteBulk" />
  </div>
</template>
