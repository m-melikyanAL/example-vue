<script setup>
</script>

<template>
  <div class="pt-6">
    <h3 class="font-bold text-black-dark text-lg m-0 -mt-8">{{ $t('globals.qr_code_pop_up_title') }}</h3>
    <img src="/images/perry-qr-code.png" width="250" class="w-[250px] mt-5 mx-auto">

    <Button class="bg-primary hover:bg-primary-hover ml-auto text-white px-0 py-0">
      <a class="px-3.5 py-2.5" href="/images/perry-qr-code.png" download="qr-code.png" >{{ $t('buttons.download_print') }}</a>
    </Button>
  </div>

</template>