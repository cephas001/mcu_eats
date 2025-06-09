<template>
  <section class="p-6">
    <div class="flex items-center">
      <UIcon
        name="i-material-symbols-arrow-back"
        size="30"
        class="text-primary cursor-pointer"
        @click.prevent="navigateTo('/profile')"
      />
      <h1 class="text-center w-[100%]">Help / Feedback</h1>
    </div>
    <div class="flex justify-center items-center mt-4 flex-col">
      <Media src="/background_theme_image.png" class="w-[150px]" />
      <p class="text-sm text-gray-600 tracking-wide">Version 0.0.0</p>
    </div>
  </section>
  <section class="pb-6 pt-4">
    <div>
      <div
        class="flex items-center px-6 py-4 border-y-1 border-y-gray-300"
        @click="navigateTo('/support')"
      >
        <h1 class="text-sm tracking-wide">Contact support</h1>
        <UIcon
          name="i-material-symbols-light-chevron-right"
          class="text-2xl self-center font-bold ml-auto text-primary"
        />
      </div>
      <div class="flex items-center px-6 py-4 border-b-1 border-b-gray-300">
        <h1 class="text-sm tracking-wide">FAQ's</h1>
        <UIcon
          name="i-material-symbols-light-chevron-right"
          class="text-2xl self-center font-bold ml-auto text-primary"
        />
      </div>
      <div class="flex items-center px-6 py-4 border-b-1 border-b-gray-300">
        <h1 class="text-sm tracking-wide">User policy</h1>
        <UIcon
          name="i-material-symbols-light-chevron-right"
          class="text-2xl self-center font-bold ml-auto text-primary"
        />
      </div>
      <div
        class="flex items-center px-6 py-4 border-b-1 border-b-gray-300"
        @click="navigateTo('/complaints')"
      >
        <h1 class="text-sm tracking-wide">Complaints & Feedback</h1>
        <UIcon
          name="i-material-symbols-light-chevron-right"
          class="text-2xl self-center font-bold ml-auto text-primary"
        />
      </div>
      <div
        class="flex items-center px-6 py-4 border-b-1 border-b-gray-300"
        @click="shareApp"
      >
        <h1 class="text-sm tracking-wide">Share this app with friends</h1>
        <UIcon
          name="i-material-symbols-light-chevron-right"
          class="text-2xl self-center font-bold ml-auto text-primary"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { navigateTo } from "nuxt/app";

const shareApp = () => {
  if (navigator.share) {
    navigator
      .share({
        title: "Check out this app!",
        text: "Join me on this amazing platform!",
        url: "https://super-journey-5p95pj5grgwf7xvq-3000.app.github.dev/",
      })
      .catch((error) => console.log("Error sharing:", error));
  } else {
    alert("Sharing is not supported in this browser");
  }
};
</script>
