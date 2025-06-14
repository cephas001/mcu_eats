<template>
  <div
    class="absolute font-manrope bottom-0 left-5 right-5 bg-primary p-2 rounded-md text-white"
    v-if="totalCartPrice > 0"
  >
    <button class="w-full relative" @click="navigateTo('/cart')">
      View Cart
      <span class="absolute right-2"
        >&#8358;{{ totalCartPrice.toLocaleString() }}</span
      >
    </button>
  </div>
</template>

<script setup>
import { useCartStore } from "@/stores/cartStore";

const cartStore = useCartStore();
const { totalCartPrice } = storeToRefs(cartStore);
</script>
