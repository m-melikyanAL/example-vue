export const uploadData = reactive({
  fileList: [],
  newFiles: [],
  showUploadDialog: false,
  showUploadPage: false,
  isOver: false,
  size: {
    height: "",
    width: "",
  },
})

export const previewFile = async (event, type, formats, endpoint, fileName) => {
  const regex = `(${formats.join("|")})$`
  const allowedExtensions = new RegExp(regex, "i")

  if (type === "drop") {
    event.preventDefault()
    uploadData.newFiles = [...event.dataTransfer.files].map(
      (item) =>
        item = {
          file: item,
          isLoaded: false,
          isSuccess: false,
          isError: false,
          snackbar: {
            showSnackbar: false,
            errorMessage: "",
          },
        }
    )
  } else {
    uploadData.newFiles = [...event.target.files].map(
      (item) =>
        (item = {
          file: item,
          isLoaded: false,
          isSuccess: false,
          isError: false,
          snackbar: {
            showSnackbar: false,
            errorMessage: "",
          },
        })
    )
  }

  uploadData.fileList = [...uploadData.newFiles, ...uploadData.fileList]

  uploadData.fileList.length && endpoint !== ''
    ? (uploadData.showUploadDialog = true)
    : (uploadData.showUploadDialog = false)

  uploadData.newFiles.forEach((item, index) => {
    const formData = new FormData()

    formData.append(fileName, item.file)

    if (endpoint === "") {
      return
    }

    useUploadUrl(formData, endpoint)
      .then((response) => {
        item.isSuccess = true
        useRecentDigitalAssetsIds().value.push(response.data.id)
        usePreSelectRecentDigitalAssets().value = true
      })
      .catch((error) => {
        if (error === "FetchError: Failed to fetch ()") {
          showUploaderError("Content too large", index)
        }
        item.isError = true
      })
      .finally(() => {
        item.isLoaded = true
        if (
          !allowedExtensions.exec(item.file.name.split(".").pop()) &&
          item.snackbar.errorMessage === ""
        ) {
          showUploaderError(`Allowed: ${formats.join(", ")}`, index)
        }
      })
  })
}

export const showUploaderError = async (message, index) => {
  uploadData.newFiles[index].snackbar.errorMessage = message
  uploadData.newFiles[index].snackbar.showSnackbar = true
  setTimeout(() => {
    uploadData.newFiles[index].snackbar.showSnackbar = false
  }, 4500)
}

export const closeModal = async () => {
  uploadData.fileList = []
  uploadData.showUploadDialog = false
  uploadData.showUploadPage = false
  navigateTo('/digital-assets')
}

export const openUploadPage = async () => {
  uploadData.showUploadPage = true
}
export const dragover = async (event) => {
  event.preventDefault()
  uploadData.isOver = true
}

export const dragleave = async (event) => {
  uploadData.isOver = false
}

export const useUploadUrl = async (formData, endpoint) => {
  return $fetch(`${useRuntimeConfig().apiUrl}/${endpoint}`, {
    method: "POST",
    headers: await useCommonHeaders().value,
    body: formData,
  })
}
