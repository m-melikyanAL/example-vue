<template>
  <PageTitle
    class="mb-8"
    has-back>
    {{ $t('upload.title') }}
  </PageTitle>
  <Uploader
    size="lg"
    :formats="['png', 'jpg', 'jpeg', 'pdf', 'mp4']"
    img-size="200px"
    endpoint="digital-assets" />
</template>
