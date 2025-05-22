<template>
  <section
    class="p-5"
    v-if="restaurants.length > 0 || shops.length > 0 || retailers.length > 0"
  >
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

  <section class="px-5 pt-5 pb-2" v-if="restaurants.length > 0">
    <h1 class="font-semibold mb-2 tracking-wide text-lg font-manrope">
      Restaurants
    </h1>

    <VendorsCarousel :vendorList="restaurants" />
  </section>

  <section class="px-5 pt-5 pb-2" v-if="shops.length > 0">
    <h1 class="font-semibold mb-2 tracking-wide text-lg font-manrope">Shops</h1>

    <VendorsCarousel :vendorList="shops" />
  </section>

  <section class="px-5 pt-5 pb-2" v-if="retailers.length > 0">
    <h1 class="font-semibold mb-2 tracking-wide text-lg font-manrope">
      Retailers
    </h1>

    <VendorsCarousel :vendorList="retailers" />
  </section>

  <section
    class="bg-transparent h-[80vh] overflow-hidden flex flex-col items-center justify-center"
    v-if="restaurants.length == 0 || shops.length == 0 || retailers.length == 0"
  >
    <img src="/loading2.png" class="animate-pulse" />
  </section>
</template>

<script setup>
import { onMounted } from "vue";
const restaurants = ref([]);
const shops = ref([]);
const retailers = ref([]);

const fetchRestaurants = async () => {
  restaurants.value = await $fetch("api/restaurants");
};

const fetchShops = async () => {
  shops.value = await $fetch("api/shops");
};

const fetchRetailers = async () => {
  retailers.value = await $fetch("api/retailers");
};

const favouriteRestaurant = async (restaurantId) => {
  return;

  const response = await $fetch("api/usersRestaurantFavourites", {
    method: "PUT",
    body: { userId: "1", restaurantId },
  });
};

const openRestaurant = (id, open) => {
  return;
  if (open) {
    navigateTo(`/restaurants/${id}`);
  }
};

onMounted(() => {
  fetchRestaurants();
  fetchShops();
  fetchRetailers();
});
</script>
