<template>
     <section class="min-h-screen">
    <header>
            <div 
            class="flex items-center justify-around px-7 py-5"
            >
                <UIcon
                    name="i-material-symbols-light-close"
                    class="text-red-500 w-8 h-8"
                    @click="navigateTo('/transfer')"
                />

                <h2 
                  class="text-black font-manrope font-bold"
                  > Pay with card
                </h2>
            </div>
        </header>

    <div class="container relative min-h-[calc(100vh-100px)]">
      <div
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <div class="flex flex-col items-center justify-center">
          <UIcon
            name="i-material-symbols-light-credit-card-outline"
            class="text-gray-400 w-25 h-25"
          />
          <p class="text-center whitespace-nowrap">
            You have no cards saved
          </p>
          <div class="btn-container mt-5">
            <button
              class="px-6 py-3 rounded-full cursor-pointer text-white bg-primary text-lg"
              @click="navigateTo('/bankCard')"
            >
              Add bank card
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { navigateTo } from 'nuxt/app';
import { useOrderStore } from "@/stores/orderStore";
</script>