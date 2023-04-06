<template>
  <div>
    <PageTitle
      class="mb-8"
      has-back>
      {{ $t('discounts.create') }}
    </PageTitle>
    <ClientOnly>
      <DiscountForm />
    </ClientOnly>
  </div>
</template>
