<template>
  <PageTitle
    class="mb-8"
    has-back>
    {{ $t('discounts.edit') }} #{{ useRoute().params.id }}
  </PageTitle>
  <ClientOnly>
    <DiscountForm type="edit" />
  </ClientOnly>
</template>
