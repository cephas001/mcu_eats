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

    <VendorCarousel :vendorList="restaurants" />

    <VendorEmptyStateCard
      :vendorsLength="restaurants?.length ? restaurants.length : 0"
      vendorType="restaurants"
    />
  </section>

  <section class="px-5 pt-5 pb-2" v-if="!fetchingData">
    <h1 class="font-semibold mb-2 tracking-wide text-lg font-manrope">Shops</h1>

    <VendorCarousel :vendorList="shops" :favouriteIds />

    <VendorEmptyStateCard
      :vendorsLength="shops?.length ? shops.length : 0"
      vendorType="shops"
    />
  </section>

  <section class="px-5 pt-5 pb-2" v-if="!fetchingData">
    <h1 class="font-semibold mb-2 tracking-wide text-lg font-manrope">
      Retailers
    </h1>

    <VendorCarousel :vendorList="retailers" :favouriteIds />

    <VendorEmptyStateCard
      :vendorsLength="retailers?.length ? retailers.length : 0"
      vendorType="retailers"
    />
  </section>

  <LoadingIconLarge :loading="fetchingData" />
</template>

<script setup>
import { onMounted } from "vue";
import { useVendorStore } from "@/stores/vendorStore";
import { storeToRefs } from "pinia";
import { returnFavouriteVendorIds } from "@/composables/returnFavouriteIds";
import { setVendorsInState } from "@/composables/setVendorsInState";

const { $expressAuthBackendService, $expressUserBackendService } = useNuxtApp();

definePageMeta({
  middleware: ["check-user-and-profiles", "check-selected-profile"],
  allowAnonymous: true,
});

const favouriteIds = ref([]);

const fetchingData = ref(false);

const vendorStore = useVendorStore();
const { restaurants, retailers, shops } = storeToRefs(vendorStore);

onMounted(async () => {
  await setVendorsInState();
});

// onMounted(async () => {
//   const { favouriteVendorIds } = await returnFavouriteVendorIds();
//   favouriteIds.value = favouriteVendorIds;

//   if (!restaurants?.value) {
//     fetchingData.value = true;
//     try {
//       await vendorStore.fetchVendors();
//     } catch (error) {
//       console.error("Error fetching vendors:", error);
//     } finally {
//       fetchingData.value = false;
//     }
//     return;
//   }

//   fetchingData.value = false;
// });
</script>
