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

    <NoVendorsCard
      :vendorsLength="restaurants.length"
      vendorType="restaurants"
    />
  </section>

  <section class="px-5 pt-5 pb-2" v-if="!fetchingData">
    <h1 class="font-semibold mb-2 tracking-wide text-lg font-manrope">Shops</h1>

    <VendorsCarousel :vendorList="shops" />

    <NoVendorsCard :vendorsLength="shops.length" vendorType="shops" />
  </section>

  <section class="px-5 pt-5 pb-2" v-if="!fetchingData">
    <h1 class="font-semibold mb-2 tracking-wide text-lg font-manrope">
      Retailers
    </h1>

    <VendorsCarousel :vendorList="retailers" />

    <NoVendorsCard :vendorsLength="retailers.length" vendorType="retailers" />
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
  fetchingData.value = true;
  try {
    await vendorStore.fetchVendors();
    if (!user.value._id) {
      const response = await userStore.fetchUserDetails();
      if (response == "no token") {
        userStore.setUser({});
      }
    }
  } catch (error) {
    console.error("Error fetching vendors:", error);
  } finally {
    fetchingData.value = false;
  }
});
</script>
