const tagMapper = (tags) => {
  return tags?.map(tag => {
    return {
      id: tag.id,
      label: tag.name,
      value: tag.name,
    }
  })
}

const categoryMapper = (categories) => {
  return categories?.map(category => {
    return {
      id: category.id,
      label: category.name,
      value: category.name,
    }
  })
}

const statusOptions = () => {
  return [
    {
      label: translate('statuses.active'),
      value: "active",
    },
    {
      label: translate('statuses.inactive'),
      value: "inactive",
    },
  ]
}

const activeFilterOptions = () => {
  const options = [
    {
      label: translate('globals.all'),
      value: '',
    },
    ...statusOptions()
  ]

  return {
    selected: options[0],
    options: options,
    bulkOptions: [...statusOptions()]
  }
}

const tagsFilterOptions = () => {
  return {
    selected: [],
    options: [],
  }
}

const categoriesFilterOptions = () => {
  let allCategories = {
    label: translate('globals.all'),
    value: '',
  }

  return {
    initial: allCategories,
    selected: allCategories,
    options: [],
  }
}

const handleBulkDelete = (callback) => {
  renderPopup({
    showing: true,
    heading: translate('alerts.heading'),
    message: translate('digital_assets.bulk_delete_message'),
    confirm_text: translate('alerts.confirm_text'),
    cancel_text: translate('buttons.cancel'),
    type: 'error',
    callback: callback,
  })
}

const handleSingleDelete = (callback) => {
  renderPopup({
    showing: true,
    heading: translate('alerts.heading'),
    message: translate('digital_assets.delete_message'),
    confirm_text: translate('alerts.confirm_text'),
    cancel_text: translate('buttons.cancel'),
    type: 'error',
    callback: callback,
  })
}

export const digitalAssetsData = () => {
  return {
    viewType: VIEW_TYPE_GRID,
    showActions: false,
    tagMapper: tagMapper,
    categoryMapper: categoryMapper,
    isCheckedAll: false,
    checkedAssets: [],
    tagsToApplyBulk: [],
    filters: {
      active: activeFilterOptions(),
      tags: tagsFilterOptions(),
      categories: categoriesFilterOptions(),
      search: "",
    },
    handlers: {
      bulkDelete: handleBulkDelete,
      singleDelete: handleSingleDelete,
    },
    bulkUpdate: {
      status: {},
      category: {},
      tags: [],
    }
  }
}

export const singleDigitalAssetData = () => {
  return {
    tagMapper: tagMapper,
    categoryMapper: categoryMapper,
    digitalAsset: {},
    categories: [],
    tags: [],
    statuses: statusOptions(),
    selected: {
      category: {},
      status: {},
      tags: [],
    },
    preview: {
      show: false,
      url: "",
    },
    formHasErrors: false,
    formErrors: [],
    errorMessages: {
      name: translate("digital_assets.errors.name")
    }
  }
}