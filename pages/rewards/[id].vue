<template>
  <PageTitle
    class="mb-8"
    has-back>
    {{ $t('rewards.edit') }} #{{ useRoute().params.id }}
  </PageTitle>
  <ClientOnly>
    <CreateRewardForm type="edit" />
  </ClientOnly>
</template>