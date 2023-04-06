<template>
  <PageTitle
    class="mb-8"
    has-back>
    {{ $t('vouchers.view') }} #{{ useRoute().params.id }}
  </PageTitle>
  <VouchersShow />
</template>
