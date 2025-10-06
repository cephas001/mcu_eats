<template>
  <table class="min-w-full text-sm font-manrope" v-if="products.length !== 0">
    <ProductsTableHeader />

    <ProductsTableBody :products />
  </table>

  <div class="text-center" v-else>
    <h1 class="text-md">Add your first product!</h1>
  </div>
</template>

<script setup>
const props = defineProps({
  products: {
    type: Array,
    required: true,
  },
});
</script>
