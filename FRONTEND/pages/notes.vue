<template>
  <section class="px-6 pt-8 pb-2">
    <div class="flex items-center">
      <UIcon
        name="i-material-symbols-arrow-back"
        size="30"
        class="text-primary cursor-pointer"
        @click.prevent="navigateTo('/profile')"
      />
      <h1 class="text-center w-[100%] uppercase">Saved Notes</h1>
    </div>
  </section>
  <section>
    <div
      class="flex items-center justify-center p-5 border-b-2 border-b-gray-200 tracking-tight"
    >
      <div class="flex items-center bg-gray-200 w-full rounded-full">
        <button
          class="w-[50%] bg-transparent text-gray-900 border-1 text-sm"
          :class="[
            'px-6 py-2',
            selectedOption == 'Order Notes'
              ? 'bg-white rounded-full text-black shadow-md border-black/20'
              : 'border-transparent',
          ]"
          @click="selectedOption = 'Order Notes'"
        >
          Order Notes
        </button>

        <button
          class="w-[50%] bg-transparent text-gray-800 border-1 text-sm"
          :class="[
            'px-6 py-2',
            selectedOption == 'Delivery Notes'
              ? 'bg-white rounded-full text-black shadow-md border-black/20'
              : 'border-transparent',
          ]"
          @click="selectedOption = 'Delivery Notes'"
        >
          Delivery Notes
        </button>
      </div>
    </div>
  </section>
  <section class="relative min-h-[60vh] text-center">
    <h1 class="mt-20 text-sm font-semibold tracking-wide">
      No order notes saved yet
    </h1>
    <button
      class="absolute bottom-6 bg-primary text-white left-6 right-6 rounded-md text-sm py-3 tracking-wide"
    >
      Add new order note
    </button>
  </section>
</template>

<script setup>
const selectedOption = ref("Order Notes");
</script>
