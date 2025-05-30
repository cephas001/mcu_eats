<template>
  <div
    class="absolute font-manrope bottom-0 left-5 right-5 bg-primary p-2 rounded-md text-white"
    v-if="viewOrdersBtn"
  >
    <button class="w-full relative" @click="navigateTo('/orders')">
      View Orders
      <span class="absolute right-2"
        >&#8358;{{ totalPrice.toLocaleString() }}</span
      >
    </button>
  </div>
</template>

<script setup>
import { useOrderStore } from "@/stores/orderStore";
const orderStore = useOrderStore();
const { totalPrice, viewOrdersBtn } = storeToRefs(orderStore);
</script>
