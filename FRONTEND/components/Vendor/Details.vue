<template>
  <div class="px-5 pt-5 relative">
    <div class="absolute right-10 top-[-35px]">
      <!-- avatar -->
      <img
        src="@/assets/images/avatars/avatar.jpg"
        class="w-[70px] rounded-full"
      />
    </div>
    <h1 class="tracking-wide font-semibold mb-1">{{ vendorName }}</h1>
    <p class="text-gray-500 text-sm mb-1">{{ description }}</p>
    <p
      class="text-sm flex items-center gap-2 text-gray-500 font-manrope font-semibold"
    >
      <UIcon
        name="i-material-symbols-kid-star-sharp"
        class="text-yellow-500"
      />5.0 Excellent (20+)
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  vendorName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
</script>
