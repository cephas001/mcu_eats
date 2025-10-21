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
      @click.prevent="navigateTo('/general/search')"
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

  <LoadingIconSpinner :loading="fetchingData" />
</template>

<script setup>
import { onMounted } from "vue";
import { useVendorStore } from "@/stores/vendorStore";
import { storeToRefs } from "pinia";
import { checkVendors } from "@/composables/state/checkVendors";

definePageMeta({
  middleware: ["check-selected-profile", "check-user-and-profiles"],
  allowAnonymous: true,
  specificUserType: ["consumer"],
});

const favouriteIds = ref([]);

const fetchingData = ref(false);

const vendorStore = useVendorStore();
const { restaurants, retailers, shops } = storeToRefs(vendorStore);

onMounted(async () => {
  await checkVendors();
});
</script>
