<script setup>
const voucher = ref({})
const fetchedVouchers = useVouchers()

const fetchData = async () => {
  showLoader()
  await useSingleVoucherRequest(useRoute().params.id)
    .then(response => {
      voucher.value = response.data
      hideLoader()
    })
    .catch(() => hideLoader())
}

const resolveVoucher = async () => {
  if (fetchedVouchers.value.item && fetchedVouchers.value.item.length) {
    voucher.value = fetchedVouchers.value
      .item
      .find(fetchedVoucher => fetchedVoucher.id === Number(useRoute().params.id))
  } else {
    await fetchData()
  }
}

onMounted(async () => {
  await resolveVoucher()
})
</script>

<template>
  <div>
  <div class="flex flex-col">
    <img
      :src="voucher.qr_image_url"
      class="max-w-[300px] max-h-[300px] mb-4"
      alt="qr code">
    <div>
      <span class="font-bold">Title</span>: {{ voucher?.title }}
    </div>
    <div>
      <span class="font-bold">Approved By</span>:
      {{ `${voucher?.approved_by?.name} ${voucher?.approved_by?.last_name}` }}
    </div>
    <div>
      <span class="font-bold">Phone Number</span>: +{{ voucher?.phone_country_code }} {{ voucher?.phone_number }}
    </div>
    <div>
      <span class="font-bold">Voucher Value</span>: {{ voucher?.value }}
    </div>
    <div>
      <span class="font-bold">Voucher Type</span>: {{ voucher?.type }}
    </div>
    <div>
      <span class="font-bold">Description</span>: {{ voucher?.description }}
    </div>
  </div>
  <div class="ml-auto flex justify-end">
    <Button
        class="ml-auto bg-cyan text-[13px] text-white font-normal py-1.5 px-6 disabled:bg-cyan-medium"
        >
      {{ $t('buttons.broadcast') }}
    </Button>
  </div>
  </div>
</template>