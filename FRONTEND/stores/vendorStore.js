import { defineStore } from "pinia";
import { $fetch } from "ofetch";

export const useVendorStore = defineStore(
  "vendor",
  () => {
    const restaurants = ref(null);
    const retailers = ref(null);
    const shops = ref(null);

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

    const findVendorById = (id) => {
      if (restaurants?.value) {
        const vendors = [
          ...restaurants.value,
          ...retailers.value,
          ...shops.value,
        ];
        const vendorFound = vendors.find((vendor) => {
          return vendor._id === id;
        });

        if (vendorFound) {
          vendor.value = vendorFound;
          return true;
        } else {
          return false;
        }
      }
    };

    const setVendor = (newVendor) => {
      vendor.value = newVendor;
    };

    return {
      fetchVendors,
      restaurants,
      retailers,
      shops,
      vendor,
      fetchVendorById,
      findVendorById,
      setVendor,
    };
  },
  {
    persist: {
      storage: localStorage,
    },
  }
);
