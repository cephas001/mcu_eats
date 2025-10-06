<template>
  <div class="max-w-4xl mx-auto p-6">
    <!-- Product Image -->
    <div class="rounded-md overflow-hidden shadow-lg">
      <Media src="/restaurant/food1.jpg" class="w-full h-64 object-cover" />
    </div>

    <!-- Product Details -->
    <div class="mt-6 space-y-4">
      <h1 class="text-black flex flex-col">
        <span class="uppercase text-gray-900 text-sm font-bold tracking-wide"
          >Name:
        </span>
        <span class="text-xl">Rice</span>
      </h1>
      <p class="flex flex-col">
        <span class="uppercase text-gray-900 text-sm font-bold tracking-wide"
          >Description:</span
        >
        <span>Corn Rice is very sweet </span>
      </p>
      <p>
        <span class="font-semibold text-2xl text-primary">₦3000</span
        ><span class="italic text-sm"> change</span>
      </p>

      <!-- Customization -->
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700"
            >Quantity</label
          >
          <input
            type="number"
            v-model="quantity"
            min="1"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const product = ref({});
const quantity = ref(1);
const notes = ref("");

// onMounted(async () => {
//   const res = await fetch(`/api/products/${route.params.id}`);
//   product.value = await res.json();
// });

const addToCart = () => {
  console.log("Added to cart:", {
    ...product.value,
    quantity: quantity.value,
    notes: notes.value,
  });
};
</script>
