<template>
  <section class="p-5" v-if="!fetchingData">
    <UInput
      icon="i-material-symbols-search-rounded"
      size="lg"
      variant="outline"
      placeholder="What are you craving for?"
      class="w-full"
      readonly
      :ui="{ base: 'bg-transparent text-black rounded-full' }"
      @click.prevent="navigateTo('/search')"
    />
  </section>

  <section class="px-5 pt-5 pb-2" v-if="!fetchingData">
    <h1 class="font-semibold mb-2 tracking-wide text-lg font-manrope">
      Restaurants
    </h1>

    <VendorsCarousel :vendorList="restaurants" />

    <div
      class="h-50 shadow-md border-1 border-gray-100 flex items-center justify-center rounded-md p-2 text-center"
      v-if="restaurants.length == 0"
    >
      <h1 class="font-manrope font-semibold">
        There are currently no restaurants to display
      </h1>
    </div>
  </section>

  <section class="px-5 pt-5 pb-2" v-if="!fetchingData">
    <h1 class="font-semibold mb-2 tracking-wide text-lg font-manrope">Shops</h1>

    <VendorsCarousel :vendorList="shops" />

    <div
      class="h-50 shadow-md flex items-center justify-center rounded-md border-1 border-gray-100 p-2 text-center"
      v-if="shops.length == 0"
    >
      <h1 class="font-manrope font-semibold">
        There are currently no shops to display
      </h1>
    </div>
  </section>

  <section class="px-5 pt-5 pb-2" v-if="!fetchingData">
    <h1 class="font-semibold mb-2 tracking-wide text-lg font-manrope">
      Retailers
    </h1>

    <VendorsCarousel :vendorList="retailers" />

    <div
      class="h-50 shadow-md flex items-center border-1 border-gray-100 justify-center rounded-md p-2 text-center"
      v-if="retailers.length == 0"
    >
      <h1 class="font-manrope font-semibold">
        There are currently no retailers to display
      </h1>
    </div>
  </section>

  <LoadingIconLarge :loading="fetchingData" />
</template>

<script setup>
import { onMounted } from "vue";
import { useVendorStore } from "@/stores/vendorStore";
import { storeToRefs } from "pinia";
import LoadingIconLarge from "../components/LoadingIconLarge.vue";

const vendorStore = useVendorStore();
const { restaurants, retailers, shops } = storeToRefs(vendorStore);

const fetchingData = ref(true);

onMounted(async () => {
  fetchingData.value = true;
  try {
    await vendorStore.fetchVendors();
  } catch (error) {
    console.error("Error fetching vendors:", error);
  } finally {
    fetchingData.value = false;
  }
});
</script>
