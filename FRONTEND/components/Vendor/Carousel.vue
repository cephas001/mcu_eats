<template>
  <UCarousel
    v-slot="{ item }"
    :items="vendorList"
    dots
    class="rounded-md shadow-lg text-sm mb-5 cursor-pointer hover:shadow-lg focus:shadow-lg"
  >
    <!-- <VendorCard :vendor="item" :favouriteIds /> -->
    <VendorCard :vendor="item" />
  </UCarousel>
</template>

<script setup>
const props = defineProps({
  vendorList: {
    type: Array,
  },
  // favouriteIds: {
  //   type: Array,
  // },
});
</script>
