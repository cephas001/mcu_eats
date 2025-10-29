<template>
  <p class="flex items-center gap-4 px-5 pb-3">
    <UIcon name="i-material-symbols-search" class="text-gray-500" />
    <UInput
      size="xl"
      variant="ghost"
      placeholder="Search menu items"
      :ui="{
        base: 'rounded-none text-sm pl-0 hover:bg-transparent cursor-pointer focus:bg-transparent focus:text-black',
      }"
    />
  </p>
</template>

<script setup></script>
