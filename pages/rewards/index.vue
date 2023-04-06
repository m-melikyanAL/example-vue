<script setup>
const showLoader = useShowLoader()

const cachedRewards = useRewards()

const rewards = ref(cachedRewards)

let params = {
  page: 1,
  latest: true
}

const fetchData = async () => {
  showLoader.value = true
  useRewardsRequest(params)
    .then(response => {
      rewards.value.item = response.data
      rewards.value.meta = response.meta
      showLoader.value = false
    })
    .catch(() => showLoader.value = false)
}

const handleDeleteSingle = async (id) => {
  showLoader.value = true

  useDeleteSingleRewardRequest(id)
    .then(() => fetchData())
    .catch(() => showLoader.value = false)
}

const handleDeleteBulk = async (ids) => {
  showLoader.value = true
  useDeleteBulkRewardsRequest(ids)
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
      {{ $t('rewards.title') }}
      <template v-slot:buttons>
        <NuxtLink to="/rewards/create">
          <Button class="bg-primary mx-2 text-white">
            <IconsPlusIcon class="inline-block mr-1" />
            {{ $t('buttons.create') }}
          </Button>
        </NuxtLink>
      </template>
    </PageTitle>
    <RewardsTable
      :items="rewards.item"
      :meta="rewards.meta"
      @navigate-to-page="params.page = $event.url.split('page=').pop(); fetchData()"
      @delete-single="handleDeleteSingle"
      @delete-bulk="handleDeleteBulk" />
  </div>
</template>
