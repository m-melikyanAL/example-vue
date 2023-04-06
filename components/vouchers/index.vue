<script setup>
const { t } = useI18n()

const props = defineProps({
  items: {
    type: Array,
    default: []
  },
  meta: {
    type: Object,
    default: {}
  }
})

const emit = defineEmits([
  "navigateToPage",
  "deleteSingle",
  "deleteBulk",
])

const checkAll = ref(false)
const checkedItems = ref([])

const handleCheckAllChange = async () => {
  checkedItems.value = checkAll.value
    ? props.items.map(voucher => voucher.id)
    : []
}

const handleSingleDelete = async (id) => {
  renderPopup({
    showing: true,
    heading: ref(t('alerts.heading')),
    message: ref(t('vouchers.delete_message')),
    type: "error",
    confirm_text: ref(t('alerts.confirm_text')),
    cancel_text: ref(t('buttons.cancel')),
    callback: () => {
      emit("deleteSingle", id)
      dismissPopup()
    },
  })
}

const handleBulkDelete = async () => {
  renderPopup({
    showing: true,
    heading: ref(t('alerts.heading')),
    message: ref(t('vouchers.bulk_delete_message')),
    confirm_text: ref(t('alerts.confirm_text')),
    cancel_text: ref(t('buttons.cancel')),
    type: 'error',
    callback: () => {
      emit("deleteBulk", checkedItems.value)
      checkAll.value = false
      checkedItems.value = []
      dismissPopup()
    }
  })
}
</script>

<template>
  <div
    v-if="checkedItems.length"
    class="ml-auto flex justify-end">
    <Button
      class="ml-auto bg-error text-[13px] text-white font-normal py-3 px-6 disabled:bg-error-medium"
      :disabled="checkedItems.length < 1"
      @click="handleBulkDelete">
      {{ $t('buttons.delete') }} ({{ checkedItems.length }})
    </Button>
  </div>

  <table class="w-full table-auto max-w-6xl">
    <thead>
      <tr>
        <th>
          <input
            v-model="checkAll"
            class="cursor-pointer"
            type="checkbox"
            @change="handleCheckAllChange">
        </th>
        <th>{{ $t('globals.title') }}</th>
        <th>{{ $t('vouchers.list.room_no') }}</th>
        <th>{{ $t('vouchers.list.phone_no') }}</th>
        <th>{{ $t('vouchers.list.value_display') }}</th>
        <th>{{ $t('vouchers.list.expiration_date') }}</th>
        <th>{{ $t('vouchers.list.tags') }}</th>
        <th>{{ $t('globals.actions') }}</th>
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="item in items"
        :key="item.id">
        <td>
          <input
            :id="item.id"
            :key="item.id"
            v-model="checkedItems"
            type="checkbox"
            class="cursor-pointer"
            :value="item.id">
        </td>
        <td>{{ item.title }}</td>
        <td>{{ item.room_number }}</td>
        <td>{{ getFormattedPhoneNumber(item.phone_country_code, item.phone_number) }}</td>
        <td>{{ getDisplayValue(item.value_type, item.value) }}</td>
        <td>{{ formatDateTime(item.expires_at) }}</td>
        <td>
          <span
            v-for="tag in item.tags"
            :key="tag.id"
            class="mx-1 py-1 px-1.5 bg-white-dark rounded-md border border-gray-medium">
            {{ tag.name }}
          </span>
        </td>
        <td>
          <div class="flex items-center  max-w-[196px]">
            <NuxtLink :to="`/vouchers/${item.id}/view`">
              <ButtonIcon class="mr-3">
                <IconsEyeIcon class="text-gray" />
              </ButtonIcon>
            </NuxtLink>
            <NuxtLink :to="`/vouchers/${item.id}/edit`">
              <ButtonIcon class="mr-3">
                <IconsEditIcon class="text-gray" />
              </ButtonIcon>
            </NuxtLink>
            <ButtonIcon @click="handleSingleDelete(item.id)">
              <IconsTrashIcon class="text-gray" />
            </ButtonIcon>
          </div>
        </td>
      </tr>
    </tbody>
  </table>

  <Pagination
    v-if="items.length"
    :meta="meta"
    @navigate-to-page="emit('navigateToPage', $event)" />
</template>