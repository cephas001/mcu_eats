<template>
  <ProfilePageHeader text="Addresses" />

  <section class="mt-5">
    <div class="px-6 flex items-center justify-between">
      <h1 class="font-bold font-manrope text-sm">Selected Address</h1>
      <p class="text-green-700 text-sm">Change</p>
    </div>
    <div class="flex items-center px-6 py-4 border-y-1 border-y-gray-300 mt-5">
      <UIcon
        name="i-material-symbols-light-location-on-outline-rounded"
        class="text-2xl self-center font-bold mr-4"
      />
      <h1 class="text-sm tracking-wide">Current (Atuwase, Room 5)</h1>
    </div>
  </section>
  <section class="mt-5 min-h-[80vh]">
    <div class="px-6 flex items-center justify-between">
      <h1 class="font-bold font-manrope text-sm">Saved Addresses</h1>
    </div>
    <div
      class="flex items-center justify-between px-6 py-4 border-y-1 border-y-gray-300 mt-5"
    >
      <div class="flex items-center">
        <UIcon
          name="i-material-symbols-other-houses-outline-rounded"
          class="text-xl self-center font-bold mr-4"
        />
        <h1 class="text-sm tracking-wide">College</h1>
      </div>
      <p class="text-sm text-gray-800">Add address</p>
    </div>
  </section>
</template>

<script setup></script>
