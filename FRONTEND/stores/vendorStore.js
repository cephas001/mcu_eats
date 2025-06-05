import { defineStore } from "pinia";
import { $fetch } from "ofetch";

export const useVendorStore = defineStore("vendor", () => {
  const restaurants = ref([]);
  const retailers = ref([]);
  const shops = ref([]);

  const vendor = ref(null);

  const fetchVendors = async () => {
    const config = useRuntimeConfig();
    try {
      const response = await $fetch(`${config.public.apiBaseUrl}/vendors`);

      // Renames fetched vendors to avoid data name clash
      const {
        restaurants: fetchedRestaurants,
        retailers: fetchedRetailers,
        shops: fetchedShops,
      } = response;

      restaurants.value = fetchedRestaurants;
      retailers.value = fetchedRetailers;
      shops.value = fetchedShops;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchVendorById = async (id) => {
    try {
      const config = useRuntimeConfig();
      const response = await $fetch(
        `${config.public.apiBaseUrl}/vendors/${id}`
      );
      vendor.value = response.vendor;
    } catch (error) {
      console.error("Error fetching vendor:", error);
      vendor.value = null;
    }
  };

  return {
    fetchVendors,
    restaurants,
    retailers,
    shops,
    vendor,
    fetchVendorById,
  };
});

