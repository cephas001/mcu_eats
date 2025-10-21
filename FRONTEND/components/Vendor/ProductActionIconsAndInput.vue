<template>
  <div class="flex w-fit rounded-md gap-1 pt-3 text-xl">
    <div
      class="bg-primary_light rounded-full p-1 flex items-center"
      @click="increment"
    >
      <UIcon name="i-material-symbols-add-2-rounded" />
    </div>

    <div
      class="bg-primary_light rounded-full p-1 flex items-center"
      @click="decrement"
    >
      <UIcon name="i-material-symbols-remove" />
    </div>

    <input
      type="text"
      disabled
      class="w-[50px] ml-3 font-manrope"
      :class="[productCount < 1 ? 'hidden' : 'visible']"
      v-model="internalCount"
    />
  </div>

  <UIcon
    :name="`i-material-symbols-favorite${product.favourited ? '' : '-outline'}`"
    class="text-black absolute right-0 top-0 font-bold text-3xl"
    :class="false ? 'animate-[var(--animate-pingOnce)]' : ''"
  />
</template>

<script setup>
import { defineProps, defineEmits, ref, watch, onMounted } from "vue";
import { checkProductInCart } from "@/composables/state/checkProductInCart";
import { getProductInCart } from "@/composables/state/getProductInCart";

const props = defineProps({
  productCount: {
    type: Number,
    required: true,
  },
  product: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["update:productCount"]);

const internalCount = ref(props.productCount);

watch(
  () => props.productCount,
  (val) => (internalCount.value = val)
);

function increment() {
  emit("update:productCount", props.productCount + 1);
}

function decrement() {
  if (props.productCount > 0)
    emit("update:productCount", props.productCount - 1);
}

onMounted(async () => {
  const inCart = await checkProductInCart(props.product.id);
  if (inCart) {
    const productInCart = await getProductInCart(props.product.id);
    emit("update:productCount", productInCart.quantity);
  }
});
</script>
