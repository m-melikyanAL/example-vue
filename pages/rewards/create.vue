<template>
  <div>
    <PageTitle
      class="mb-8"
      has-back>
      {{ $t('rewards.create') }}
    </PageTitle>
    <ClientOnly>
      <CreateRewardForm />
    </ClientOnly>
  </div>
</template>
