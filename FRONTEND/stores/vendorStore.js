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

  const fetchVendors = async () => {
    if (vendors.value) return;

    try {
      // Check if vendors are already stored in IndexedDB
      const indexedDBvendors = await db.vendors.toArray();
      if (indexedDBvendors?.length > 0) {
        const stringifiedEmbeddedRestaurants = await db.vendors
          .where("type")
          .equals("restaurant")
          .toArray();
        const stringifiedEmbeddedRetailers = await db.vendors
          .where("type")
          .equals("retailer")
          .toArray();
        const stringifiedEmbeddedShops = await db.vendors
          .where("type")
          .equals("shop")
          .toArray();

        restaurants.value = parseArrays(stringifiedEmbeddedRestaurants);
        retailers.value = parseArrays(stringifiedEmbeddedRetailers);
        shops.value = parseArrays(stringifiedEmbeddedShops);

        vendors.value = [
          ...restaurants.value,
          ...retailers.value,
          ...shops.value,
        ];

        lastFetched.value = Date.now();
        return;
      }

      // If not found in IndexedDB, fetch from API
      const config = useRuntimeConfig();
      const response = await $fetch(`${config.public.apiBaseUrl}/vendors`);

      restaurants.value = response.restaurants;
      retailers.value = response.retailers;
      shops.value = response.shops;

      vendors.value = [
        ...restaurants.value,
        ...retailers.value,
        ...shops.value,
      ];

      lastFetched.value = Date.now();
    } catch (error) {
      console.error("Error fetching vendors:", error);
      throw new Error("Error fetching vendors: " + error);
    }
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

  const findVendorById = async (id) => {
    const indexDBVendor = await db.vendors.get(id);
    if (indexDBVendor) {
      vendor.value = parseArrays([indexDBVendor])[0];
      return true;
    } else {
      return false;
    }
  };

  const setVendor = (newVendor) => {
    vendor.value = newVendor;
  };

  return {
    restaurants,
    retailers,
    shops,
    vendor,
    selectedProductType,
    vendors,
    lastFetched,
    fetchVendors,
    fetchVendorById,
    findVendorById,
    setVendor,
  };
});
