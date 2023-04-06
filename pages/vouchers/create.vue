<template>
  <PageTitle
    class="mb-8"
    has-back>
    {{ $t('vouchers.create') }}
  </PageTitle>
  <ClientOnly>
    <VouchersForm />
  </ClientOnly>
</template>
