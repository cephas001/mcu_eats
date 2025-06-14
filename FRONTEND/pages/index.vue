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
      :vendorsLength="restaurants.length"
      vendorType="restaurants"
    />
  </section>

  <section class="px-5 pt-5 pb-2" v-if="!fetchingData">
    <h1 class="font-semibold mb-2 tracking-wide text-lg font-manrope">Shops</h1>

    <VendorCarousel :vendorList="shops" />

    <VendorEmptyStateCard :vendorsLength="shops.length" vendorType="shops" />
  </section>

  <section class="px-5 pt-5 pb-2" v-if="!fetchingData">
    <h1 class="font-semibold mb-2 tracking-wide text-lg font-manrope">
      Retailers
    </h1>

    <VendorCarousel :vendorList="retailers" />

    <VendorEmptyStateCard
      :vendorsLength="retailers.length"
      vendorType="retailers"
    />
  </section>

  <LoadingIconLarge :loading="fetchingData" />
</template>

<script setup>
import { onMounted } from "vue";
import { useVendorStore } from "@/stores/vendorStore";
import { useUserStore } from "@/stores/userStore";
import { storeToRefs } from "pinia";
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const fetchingData = ref(true);

const vendorStore = useVendorStore();
const { restaurants, retailers, shops } = storeToRefs(vendorStore);
onMounted(async () => {
  if (!user?.value?._id) {
    await userStore.fetchUserDetails();
  }
  if (!restaurants?.value) {
    fetchingData.value = true;
    try {
      await vendorStore.fetchVendors();
    } catch (error) {
      console.error("Error fetching vendors:", error);
    } finally {
      fetchingData.value = false;
    }
  } else {
    fetchingData.value = false;
  }
});
</script>
