<template>
  <div
    class="bg-black mt-5 border-4 border-black text-white flex flex-col gap-5 pt-15 px-6 pb-15"
  >
    <div class="w-fit">
      <img
        src="/mcu_eats_logo_.png"
        alt="Logo Image"
        class="w-[150px] cursor-pointer"
      />
    </div>

    <div class="flex flex-col gap-3">
      <h1 class="font-bold underline">Links of interest</h1>
      <NuxtLink to="/">About us</NuxtLink>
      <NuxtLink to="/">FAQ</NuxtLink>
      <NuxtLink to="/">Contact us</NuxtLink>
      <NuxtLink to="/">Security</NuxtLink>
    </div>

    <div class="flex flex-col gap-3">
      <h1 class="font-bold underline">Follow us</h1>
      <NuxtLink to="/">Instagram</NuxtLink>
      <NuxtLink to="/">Twitter</NuxtLink>
    </div>

    <div class="flex flex-col gap-3">
      <h1 class="font-bold underline">Top categories: McU</h1>
      <p>Swallow</p>
      <p>Snacks and Grills</p>
      <p>Sationeries</p>
    </div>
    <p class="text-center w-full mt-1">
      &copy; 2025 McU Eats. All rights reserved.
    </p>
  </div>
</template>
