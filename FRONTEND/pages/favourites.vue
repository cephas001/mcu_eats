<template>
  <section class="px-6 pt-6 pb-2">
    <div class="flex items-center">
      <UIcon
        name="i-material-symbols-arrow-back"
        size="30"
        class="text-primary cursor-pointer"
        @click.prevent="navigateTo('/profile')"
      />
      <h1 class="text-center w-[100%] uppercase">Favourites</h1>
    </div>
  </section>

  <section class="min-h-[80vh]">
    <header class="z-1000 sticky top-0 text-md shadow-md pt-4 bg-white">
      <div class="flex items-center justify-center w-full">
        <button
          v-for="tab in tabs"
          :key="tab"
          class="pb-3 px-1 text-sm relative w-full"
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

    <div class="container relative min-h-[calc(80vh-100px)]">
      <div
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <div class="flex flex-col items-center justify-center">
          <UIcon
            name="i-material-symbols-light-favorite"
            class="text-gray-400 w-25 h-25"
          />
          <p class="text-center whitespace-nowrap text-sm">
            You have no favourites yet
          </p>
          <div class="mt-5">
            <button
              class="px-6 py-2 cursor-pointer text-white bg-primary rounded-md text-sm"
              @click="navigateTo('/')"
            >
              Explore Products
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { navigateTo } from "nuxt/app";

const tabs = ["Vendors", "Products"];
const activeTab = ref("Vendors");
</script>
