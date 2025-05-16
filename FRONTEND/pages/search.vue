<template>
  <section>
    <div class="w-full flex items-center px-1 border-b-1 border-b-primary">
      <UIcon
        name="i-material-symbols-arrow-back"
        size="30"
        class="text-primary cursor-pointer"
        @click.prevent="navigateTo('/')"
      />
      <UInput
        size="xl"
        variant="ghost"
        class="w-full"
        autofocus
        placeholder="Search dishes, restaurants or cuisines"
        :ui="{
          base: 'rounded-none focus:bg-transparent focus:text-black',
        }"
      />
    </div>
  </section>

  <section class="p-5">
    <div class="h-[70vh] flex flex-col gap-4 justify-center items-center">
      <UIcon
        name="i-material-symbols-search"
        class="size-20 text-gray-500"
        :ui="{ wrapper: 'text-center' }"
      />
      <h1 class="text-black tracking-wide">
        Search dishes, restaurants or cuisines
      </h1>
    </div>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "blank",
});
</script>
