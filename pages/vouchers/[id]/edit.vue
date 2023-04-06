<template>
  <PageTitle
    class="mb-8"
    has-back>
    {{ $t('vouchers.edit') }} #{{ useRoute().params.id }}
  </PageTitle>
  <ClientOnly>
    <VouchersForm type="edit" />
  </ClientOnly>
</template>
