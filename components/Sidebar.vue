<script setup>

const showDropDown = ref(false)

const showSidebar = useShowSidebar()

</script>

<template>
  <div class="w-72 ml-auto">
    <button
      v-if="showSidebar"
      type="button"
      class="pl-6 pt-4 text-black-light lg:hidden absolute top-0 left-0"
      @click="showSidebar = !showSidebar">
      <IconsX
        class="w-8 h-8" />
    </button>
    <div class="ml-5 mt-5">
      <img
        width="80"
        height="80"
        src=""
        alt="Logo">
    </div>
    <nav class="main-nav mb-6">
      <ul>
        <li class="active">
          <NuxtLink class="flex items-center" to="/">
            <IconsDashboardIcon class="mr-2 w-4 h-4 text-gray-light"/>
            {{ $t('globals.dashboard') }}
          </NuxtLink>
        </li>

        <li>
          <NuxtLink class="flex items-center" to="/vouchers">
            <IconsMagazineIcon class="mr-2 w-4 h-4 text-gray-light"/>
            {{ $t('vouchers.sidebar_title') }}
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            class="flex items-center"
            to="/promotions/magazines">
            <IconsMagazineIcon class="mr-2 w-4 h-4 text-gray-light" />
            {{ $t('promotions.titles.magazine') }}
          </NuxtLink>
        </li>
        <li>
          <NuxtLink class="flex items-center" to="/rewards">
            <IconsMagazineIcon class="mr-2 w-4 h-4 text-gray-light"/>
            {{ $t('rewards.sidebar_title') }}
          </NuxtLink>
        </li>
        <li>
          <NuxtLink class="flex items-center" to="/discounts">
            <IconsMagazineIcon class="mr-2 w-4 h-4 text-gray-light"/>
            {{ $t('discounts.title') }}
          </NuxtLink>
        </li>
        <li>
          <button
            class="text-black-light text-sm p-2.5 flex items-center"
            @click="broadcasts = !broadcasts">
            <IconsAntennaIcon class="mr-2 w-4 h-4 text-gray-light" />
            {{ $t('broadcast.sidebar_title') }}
          </button>
        </li>
        <li>
          <NuxtLink to="/digital-assets">
            <IconsGrid class="mr-2 w-5 h-5 text-gray" />
            {{ $t('digital_assets.title') }}
          </NuxtLink>
        </li>
      </ul>
    </nav>
    <div class="flex items-center bg-white rounded-xl py-5 px-4 ml-6 border-violet-light border mr-auto max-w-[200px] max-h-[70px] relative">
      <img class="rounded-b-full w-[40px] h-[40px]"
           src="@/assets/images/avatar.png"
           width="40"
           height="40"
           alt="avatar">
      <div class="flex flex-col mx-3">
        <span class="text-[13px] text-black-light py-0.5">Admin Admin</span>
        <span class="text-[12px] font-light py-0.5">Admin</span>
      </div>
      <button type="button" @click="showDropDown = !showDropDown">
        <IconsMenuIcon/>
      </button>
      <div v-if="showDropDown" class="absolute bg-white -bottom-[120px] left-0 w-full rounded-xl border-violet-light border px-4 py-2 text-[13px] text-black-light font-light">
        <ul>
          <li class="py-2">
            <button
              class="w-full h-full text-left"
              type="button"
              @click="logoutUser()">
              {{ $t('globals.logout') }}
            </button>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>

<style scoped>
  .main-nav {
    @apply pl-6 mt-10 border-b-gray-light border-b pb-7
  }
  .main-nav ul li a {
    @apply flex flex-row items-center text-black-light text-sm p-2.5 rounded-md my-2 w-44
  }
  .main-nav ul li a.router-link-active {
    @apply bg-primary text-white
  }

  .main-nav ul li a.nested {
    @apply my-0
  }

  .sub-nav {
    @apply pl-6 mt-8 mb-9
  }
  .sub-nav ul li {
    @apply text-sm text-black-light mb-6 opacity-70
  }
</style>
