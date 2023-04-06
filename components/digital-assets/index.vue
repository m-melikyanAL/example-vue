<script setup>
import debounce from "lodash"

const props = defineProps({
  items: {
    type: Array,
    default: []
  },
  meta: {
    type: Object,
    default: {}
  },
  searchFilter: {
    type: String,
    default: "",
  }
})

const emit = defineEmits([
  "activeFilterChanged",
  "categoryFilterChanged",
  "navigateToPage",
  "deleteSingleAsset",
  "deleteBulkAssets",
  "updateBulkStatus",
  "tagsFilterChanged",
  "bulkUpdate",
  "searchFilter",
])

const { t } = useI18n()

const data = reactive(digitalAssetsData())
const searchFilter = ref(props.searchFilter)
const cachedSelectedFilters = useDigitalAssetsSelectedFilters()

const mapTags = (tags) => {
  data.filters.tags.options = data.tagMapper(tags)
}

const mapCategories = (categories) => {
  data.filters.categories.options = [
    data.filters.categories.initial,
    ...data.categoryMapper(categories)
  ]
}

const handleCheckAllChange = async () => {
  data.checkedAssets = data.isCheckedAll
    ? props.items.map(item => item.id)
    : []
}

const handleTagsSelect = (tagOptions) => {
  data.filters.tags.selected = tagOptions
}

const handleTagsSelectForBulkApply = (tagOptions) => {
  data.bulkUpdate.tags = tagOptions
}

const handleTagsSelectionEnded = (tagOptions) => {
  data.filters.tags.selected = tagOptions
  emit("tagsFilterChanged", data.filters.tags.selected)
  cachedSelectedFilters.value.tags = tagOptions
}

const handleCategoryFilterChange = (category) => {
    emit(
      "categoryFilterChanged",
      category.value === ref(t('globals.all')) ? "" : category
    )

  data.filters.categories.selected = category

  data.isCheckedAll = false
  handleCheckAllChange()
  data.showActions = false

  cachedSelectedFilters.value.category = category
}

const handleSingleDelete = async (id) => {
  data.handlers.singleDelete(() => {
    emit("deleteSingleAsset", id)
    dismissPopup()
  })
}

const handleBulkDelete = async () => {
  data.handlers.bulkDelete(() => {
    useRecentDigitalAssetsIds().value = []
    emit("deleteBulkAssets", data.checkedAssets)
    data.isCheckedAll = false
    data.checkedAssets = []
    dismissPopup()
  })
}

const handleBulkUpdate = () => {
  let updateData = {
    assets: data.checkedAssets,
  }

  if (data.bulkUpdate.status?.value) {
    updateData.status = data.bulkUpdate.status.value
  }

  if (data.bulkUpdate.category?.value) {
    updateData.category = data.bulkUpdate.category.value
  }

  if (data.bulkUpdate.tags.length) {
    updateData.tags = data.bulkUpdate.tags.map((tag) => tag.value)
  }

  if (useRecentDigitalAssetsIds().value.length) {
    data.filters.active.selected = Object.keys(data.bulkUpdate.status).length
      ? data.bulkUpdate.status
      : data.filters.active.selected

    cachedSelectedFilters.value.active = data.filters.active.selected

    emit("activeFilterChanged", data.filters.active.selected)
  }

  useRecentDigitalAssetsIds().value = []
  emit("bulkUpdate", updateData)

  data.isCheckedAll = false
  handleCheckAllChange()
  data.bulkUpdate = {
    status: {},
    category: {},
    tags: [],
  }
}

const handleGridItemClick = (id) => {
  if (data.checkedAssets.includes(id)) {
    data.checkedAssets = data.checkedAssets.filter(asset => asset !== id)

    return
  }

  data.checkedAssets = [
    ...data.checkedAssets,
    id
  ]
}

const handleActiveFilterChange = (status) => {
  data.filters.active.selected = status
  emit("activeFilterChanged", status)

  data.isCheckedAll = false
  handleCheckAllChange()
  data.showActions = false

  cachedSelectedFilters.value.active = status
}

const handleCreatePromotion = (digitalAssetId) => {
  useDigitalAssetToCreatePromotion().value = props.items.find(digitalAsset => digitalAsset.id === digitalAssetId)
  navigateTo('/promotions/create')
}

const handleNavigation = (event) => {
  emit("navigateToPage", event)
  data.isCheckedAll = false
  handleCheckAllChange()
  data.showActions = false
}

const emitSearch = debounce((searchInput) => {
  data.isCheckedAll = false
  handleCheckAllChange()
  emit("searchFilter", searchInput)
}, 1100)

watch(data, (updatedData) => {
  data.showActions = updatedData.checkedAssets.length > 0
})

watch(props, (updatedProps) => {
  mapTags(updatedProps.meta.tags)
  mapCategories(updatedProps.meta.categories)
})

watch(searchFilter, (searchInput) => {
  emitSearch(searchInput)
})

onMounted(() => {
  data.showActions = usePreSelectRecentDigitalAssets().value
  data.isCheckedAll = data.showActions
  handleCheckAllChange()

  if (data.showActions) {
    data.bulkUpdate.status = data.filters.active.options.find(option => option.value === "inactive")
    data.filters.active.selected = data.bulkUpdate.status
    cachedSelectedFilters.value.active = data.bulkUpdate.status
  }

  mapTags(props.meta.tags)
  mapCategories(props.meta.categories)

  if (cachedSelectedFilters.value.active?.value) {
    data.filters.active.selected = cachedSelectedFilters.value.active
  }
  if (cachedSelectedFilters.value.category?.value) {
    data.filters.categories.selected = cachedSelectedFilters.value.category
  }
  if (cachedSelectedFilters.value.tags.length) {
    data.filters.tags.selected = cachedSelectedFilters.value.tags
  }

  usePreSelectRecentDigitalAssets().value = false
})
</script>

<template>
  <div class="flex flex-col lg:flex-row max-w-screen-xl lg:space-x-4 mb-5 flex-wrap">
    <div class="flex items-center space-x-1 flex-wrap">
      <button
        class="text-gray hover:text-primary-hover transition-colors"
        :class="{ 'text-primary': data.viewType === VIEW_TYPE_LIST}"
        type="button"
        @click="data.viewType = VIEW_TYPE_LIST">
        <IconsList />
      </button>
      <button
        class="text-gray hover:text-primary-hover transition-colors"
        :class="{ 'text-primary': data.viewType === VIEW_TYPE_GRID}"
        type="button"
        @click="data.viewType = VIEW_TYPE_GRID">
        <IconsGrid class="w-6 h-6" />
      </button>
    </div>

    <div
      v-if="!data.showActions"
      class="flex flex-col md:flex-row md:space-x-4 flex-wrap my-2 xl:my-0">
      <Select
        class="mb-3 lg:mb-0"
        :options="data.filters.active.options"
        :selected="data.filters.active.selected"
        @selected="handleActiveFilterChange" />

      <Select
        class="mb-3 lg:mb-0"
        :options="data.filters.categories.options"
        :selected="data.filters.categories.selected"
        @selected="handleCategoryFilterChange" />

      <MultiSelectTags
        v-if="data.filters.tags.options.length"
        class="mb-3 lg:mb-0"
        :placeholder="$t('globals.all')"
        :options="data.filters.tags.options"
        :selected="data.filters.tags.selected"
        @selected="handleTagsSelect"
        @selection-ended="handleTagsSelectionEnded" />
    </div>

    <div
      v-if="data.showActions"
      class="flex flex-col md:flex-row md:space-x-4 flex-wrap my-2 xl:my-0">
      <Select
        class="mb-3 lg:mb-0"
        :placeholder="$t('digital_assets.select_status')"
        :options="data.filters.active.bulkOptions"
        :selected="data.bulkUpdate.status"
        @selected="data.bulkUpdate.status = $event" />

      <Select
        class="mb-3 lg:mb-0"
        :placeholder="$t('digital_assets.select_category')"
        :options="data.filters.categories.options"
        :selected="data.bulkUpdate.category"
        @selected="data.bulkUpdate.category = $event" />

      <MultiSelectTags
        v-if="data.filters.tags.options.length"
        class="mb-3 lg:mb-0"
        :placeholder="$t('digital_assets.select_tags')"
        can-add-tags
        :options="data.filters.tags.options"
        :selected="data.bulkUpdate.tags"
        @selected="handleTagsSelectForBulkApply" />
    </div>

    <div
      v-if="data.checkedAssets.length"
      class="flex space-x-4 lg:justify-end flex-wrap">

      <Button
        class="bg-primary text-[13px] text-white font-normal py-3 px-6 disabled:bg-error-medium"
        :disabled="data.checkedAssets.length < 1"
        @click="handleBulkUpdate">
        {{ $t('buttons.update') }} ({{ data.checkedAssets.length }})
      </Button>

      <Button
        class="bg-error text-[13px] text-white font-normal py-3 px-6 disabled:bg-error-medium"
        :disabled="data.checkedAssets.length < 1"
        @click="handleBulkDelete">
        {{ $t('buttons.delete') }} ({{ data.checkedAssets.length }})
      </Button>
    </div>
  </div>

  <div class="flex flex-col lg:flex-row lg:justify-between lg:items-center text-sm text-gray-medium mb-4">
    <div class="mb-2 lg:mb-0">
      <div>
        {{ $t('globals.showing') }} {{ meta.from }} - {{ meta.to }}
      </div>
      <div>{{ $t('globals.total') }} - {{ meta.total }}</div>
    </div>
    <Pagination
      v-if="items.length && meta?.last_page > 1"
      :meta="meta"
      @navigate-to-page="handleNavigation" />
  </div>

  <div class="flex">
    <div class="mr-auto w-full xs:w-2/3 sm:w-1/2 xl:w-1/3 max-w-[380px]">
      <input
        v-model="searchFilter"
        class="font-normal text-black-light text-sm py-3 px-4 rounded-lg border-gray-light border focus:outline-none focus:border-gray-light w-full"
        :placeholder="$t('digital_assets.search_placeholder')"
        type="text">
    </div>
  </div>

  <table
    v-if="items.length && data.viewType === VIEW_TYPE_LIST"
    class="w-full table-auto max-w-6xl mt-4">
    <thead>
      <tr>
        <th>
          <input
            v-model="data.isCheckedAll"
            class="cursor-pointer"
            type="checkbox"
            @change="handleCheckAllChange">
        </th>
        <th>{{ $t('digital_assets.asset') }}</th>
        <th>{{ $t('globals.id') }}</th>
        <th>{{ $t('digital_assets.category') }}</th>
        <th>{{ $t('digital_assets.tags') }}</th>
        <th>{{ $t('globals.status') }}</th>
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
            v-model="data.checkedAssets"
            type="checkbox"
            class="cursor-pointer"
            :value="item.id">
        </td>

        <td>
          <img
            v-if="item.url && item.type === 'image'"
            class="rounded-xl w-[100px] h-[100px] object-cover"
            width="100"
            height="100"
            :src="item.url">
          <video
            v-if="item.url && item.type === 'video'"
            width="100"
            height="100"
            class="bg-black-dark rounded-xl w-[100px] h-[100px]"
            muted
            controls>
            <source
              :src="item.url"
              type="video/mp4">
          </video>
        </td>

        <td>
          {{ item.id }}
        </td>

        <td>
          {{ item.category }}
        </td>

        <td>
          <span
            v-for="tag in item.tags.map(tag => tag.name)"
            :key="tag.name"
            class="px-2 py-1.5 mx-0.5 rounded-full bg-violet-light hover:text-black-dark-hover text-xs">
            {{ tag }}
          </span>
        </td>

        <td>
          {{ assetStatus(item.status) }}
        </td>

        <td>
          <div class="flex items-center space-x-4">
            <NuxtLink :to="`/digital-assets/${item.id}`">
              <ButtonIcon>
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

  <div
    v-if="items.length && data.viewType === VIEW_TYPE_GRID"
    class="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6 gap-7 my-8">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="asset-grid-item cursor-pointer relative select-none"
      :class="{ 'checked': data.checkedAssets.includes(item.id)}"
      @click.self="handleGridItemClick(item.id)">
      <img
        v-if="item.url && item.type === 'image'"
        class="rounded-xl w-[220px] h-[200px] object-cover select-none mx-auto"
        width="220"
        height="220"
        :src="item.url"
        @click.self="handleGridItemClick(item.id)">
      <video
        v-if="item.url && item.type === 'video'"
        width="220"
        height="220"
        class="bg-black-dark rounded-xl w-[220px] h-[200px] mx-auto"
        muted
        controls
        @click.self="handleGridItemClick(item.id)">
        <source
          :src="item.url"
          type="video/mp4">
      </video>
      <div
        class="absolute bottom-0 left-0 right-0 bg-black-dark flex justify-between px-2 text-white text-opacity-85 text-xs bg-opacity-70 rounded-b-xl max-w-[220px] mx-auto"
        @click.self="handleGridItemClick(item.id)">
        <span class="py-2">{{ $t('globals.id') }} {{ item.id }}</span>

        <DigitalAssetsActions>
          <NuxtLink
            :to="`/digital-assets/${item.id}`">
            <ButtonIcon>
              <IconsEditIcon class="w-[18px] h-[18px]" />
            </ButtonIcon>
          </NuxtLink>
          <ButtonIcon @click="handleSingleDelete(item.id)">
            <IconsTrashIcon class="w-[18px] h-[18px]" />
          </ButtonIcon>
          <ButtonIcon @click="handleCreatePromotion(item.id)">
            <IconsSendPlus class="w-[18px] h-[18px]" />
          </ButtonIcon>
        </DigitalAssetsActions>
      </div>
    </div>
  </div>

  <Pagination
    v-if="items.length && meta?.last_page > 1"
    :meta="meta"
    @navigate-to-page="handleNavigation" />
</template>

<style>
  .asset-grid-item.checked img,
  .asset-grid-item.checked video {
    @apply border-primary-hover border-[5px]
  }
</style>