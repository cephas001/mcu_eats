import { defineStore } from "pinia";
import { $fetch } from "ofetch";
import { db } from "../utils/db";
import { parseArrays } from "../utils/parseArrays";

export const useVendorStore = defineStore("vendor", () => {
  const restaurants = ref(null);
  const retailers = ref(null);
  const shops = ref(null);

  const vendors = ref(null);

  const lastFetched = ref(null);

  const vendor = ref(null);

  const selectedProductType = ref({});

  const setVendors = (payload) => {
    vendors.value = payload;
    console.log(vendors.value);
  };

  const setRestaurants = (payload) => {
    restaurants.value = payload;
  };

  const setShops = (payload) => {
    shops.value = payload;
  };

  const setRetailers = (payload) => {
    retailers.value = payload;
  };

  const findVendorById = (id) => {
    if (!vendors.value) return null;

    const vendor = vendors.value.find((vendor) => vendor.id === id);
    return vendor;
  };

  const fetchVendorById = async (id) => {
    try {
      const config = useRuntimeConfig();
      const response = await $fetch(
        `${config.public.apiBaseUrl}/vendors/${id}`
      );
      vendor.value = response.vendor;
      return true;
    } catch (error) {
      console.error("Error fetching vendor:", error);
      vendor.value = null;
      return false;
    }
  };

  const setVendor = (payload) => {
    vendor.value = payload;
  };

  return {
    restaurants,
    retailers,
    shops,
    vendor,
    selectedProductType,
    vendors,
    lastFetched,
    setVendors,
    setRestaurants,
    setRetailers,
    setShops,
    fetchVendorById,
    findVendorById,
    setVendor,
  };
});
