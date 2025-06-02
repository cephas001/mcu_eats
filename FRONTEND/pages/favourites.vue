<template>
  <section class="min-h-screen">
    <header
      class="favourites-header px-6 z-1000 bg-white sticky top-0 text-md shadow-md"
    >
      <div class="flex px-4 py-3 items-center w-full">
        <div>
          <UIcon
            name="i-material-symbols-light-close"
            class="text-red-500 w-8 h-8 mr-4 mt-2"
          />
        </div>
        <div class="flex justify-center font-manrope">
          <h1 class="text-xl font-bold text-gray-800">Favorites</h1>
        </div>
      </div>
      <div class="flex items-center justify-center space-x-5">
        <button
          v-for="tab in tabs"
          :key="tab"
          class="pb-3 px-1 text-sm font-light relative"
          :class="{
            'text-black': activeTab !== tab,
            'text-black': activeTab === tab,
          }"
          @click="activeTab = tab"
        >
          {{ tab }}

          <span
            v-if="activeTab === tab"
            class="absolute bottom-0 top-8 left-0 right-0 h-0.5 bg-primary animate-underline"
          />
        </button>
      </div>
    </header>

    <div class="container relative min-h-[calc(100vh-100px)]">
      <div
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <div class="flex flex-col items-center justify-center">
          <UIcon
            name="i-material-symbols-light-favorite"
            class="text-gray-400 w-25 h-25"
          />
          <p class="text-center whitespace-nowrap">
            You have no favourites nearby
          </p>
          <div class="btn-container mt-5">
            <button
              class="px-6 py-3 rounded-full cursor-pointer text-white bg-primary text-lg"
            >
              Find Food
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const tabs = ["Vendors", "Menu Items"];
const activeTab = ref("Menu Items");
</script>
