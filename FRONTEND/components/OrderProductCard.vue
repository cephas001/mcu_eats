<template>
  <div class="font-manrope mb-1">
    <div
      class="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white"
    >
      <div class="flex items-center">
        <span class="text-primary font-semibold text-sm mr-8 tracking-wide">
          {{ quantity }}x</span
        >
        <p>{{ productName }}</p>
      </div>
      <p>&#8358;{{ (price * quantity).toLocaleString() }}</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
const props = defineProps({
  quantity: {
    type: Number,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});
</script>
