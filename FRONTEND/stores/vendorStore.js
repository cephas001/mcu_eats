import { defineStore } from "pinia";
import { $fetch } from "ofetch";
import { db } from "../utils/db";

export const useVendorStore = defineStore("vendor", () => {
  const restaurants = ref(null);
  const retailers = ref(null);
  const shops = ref(null);

  const vendors = ref(null);

  const lastFetched = ref(null);

  const vendor = ref(null);

  const selectedProductType = ref({});

  const parseStringifiedProductAndMap = (array) => {
    return array.map((rawVendor) => {
      return { ...rawVendor, products: JSON.parse(rawVendor.products) };
    });
  };

  const fetchVendors = async () => {
    if (vendors.value) return;

    const indexedDBvendors = await db.vendors.toArray();
    if (indexedDBvendors?.length > 0) {
      const rawRestaurants = await db.vendors
        .where("type")
        .equals("restaurant")
        .toArray();
      const rawRetailers = await db.vendors
        .where("type")
        .equals("retailer")
        .toArray();
      const rawShops = await db.vendors.where("type").equals("shop").toArray();

      restaurants.value = parseStringifiedProductAndMap(rawRestaurants);
      retailers.value = parseStringifiedProductAndMap(rawRetailers);
      shops.value = parseStringifiedProductAndMap(rawShops);

      return;
    }

    const config = useRuntimeConfig();
    try {
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
      vendor.value = parseStringifiedProductAndMap([indexDBVendor])[0];
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
