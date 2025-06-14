<template><div
  class="h-50 shadow-md border-1 border-gray-100 flex items-center justify-center rounded-md p-2 text-center"
  v-if="vendorsLength == 0"
>
    <h1 class="font-manrope font-semibold">
        There are currently no {{ vendorType }} to display
    </h1>
</div></template>

<script setup>
const props = defineProps({
  vendorsLength: {
    type: Number,
    required: true,
  },
  vendorType: {
    type: String,
    required: true,
  },
});
</script>
