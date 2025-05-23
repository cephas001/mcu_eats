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

  <section
    class="bg-transparent h-[80vh] overflow-hidden flex flex-col items-center justify-center"
    v-if="fetchingData"
  >
    <img src="/loading2.png" class="animate-pulse" />
  </section>
</template>

<script setup>
import { onMounted } from "vue";

const restaurants = ref([]);
const shops = ref([]);
const retailers = ref([]);

const fetchingData = ref(true);

const fetchVendors = async () => {
  try {
    const response = await $fetch(
      "https://super-journey-5p95pj5grgwf7xvq-5000.app.github.dev/vendors"
    );
    const {
      restaurants: fetchedRestaurants,
      retailers: fetchedRetailers,
      shops: fetchedShops,
    } = response;
    restaurants.value = fetchedRestaurants;
    retailers.value = fetchedRetailers;
    shops.value = fetchedShops;

    fetchingData.value = false;
  } catch (error) {
    console.log(error);
  }
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

onMounted(async () => {
  await fetchVendors();
});
</script>
