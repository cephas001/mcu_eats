<template>
  <div
    v-if="products?.length > 0"
    v-for="product in products"
    :key="product._id"
  >
    <VendorProduct :product :vendorId :vendorName />
  </div>
  <div v-else>
    <h1 class="py-5 text-sm text-center">
      {{
        productFetchErrorMessage !== ""
          ? productFetchErrorMessage
          : "This vendor has no products yet."
      }}
    </h1>
  </div>
</template>

<script setup>
const props = defineProps({
  products: {
    type: Array,
    required: true,
  },
  vendorId: {
    type: String,
    required: true,
  },
  vendorName: {
    type: String,
    required: true,
  },
  productFetchErrorMessage: {
    type: String,
    required: false,
    default: "",
  },
});
</script>
