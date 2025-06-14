<template>
  <div
    class="flex items-center justify-around pl-2 pr-5 py-5 bg-white text-md"
    :class="[!deleteIcon ? 'pl-8 pr-8' : '']"
  >
    <UIcon
      name="i-material-symbols-arrow-back"
      class="text-primary cursor-pointer text-2xl"
      @click.prevent="$router.back()"
    />
    <div
      class="flex flex-col items-center font-manrope"
      :class="[!deleteIcon ? 'text-center w-[100%]' : '']"
    >
      <h1 class="font-semibold uppercase">{{ text }}</h1>
      <p class="text-gray-800 text-md tracking-wide">
        {{ finalCart.length }} vendor{{ finalCart.length > 1 ? "s" : "" }},
        {{ items }} item{{ items > 1 ? "s" : "" }}
      </p>
    </div>

    <UIcon
      v-if="deleteIcon"
      name="i-material-symbols-delete-outline-rounded"
      @click="cartStore.clearCart"
      class="text-xl text-red-500 cursor-pointer"
    />
  </div>
</template>

<script setup>
import { useCartStore } from "@/stores/cartStore";
import { defineProps } from "vue";

const cartStore = useCartStore();
const { finalCart, items } = storeToRefs(cartStore);

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  deleteIcon: {
    type: Boolean,
  },
});
</script>
