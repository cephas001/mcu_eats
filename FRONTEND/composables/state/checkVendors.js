import { useVendorStore } from "@/stores/vendorStore";
import { storeToRefs } from "pinia";

const filterAndReturnVendorsByType = (vendors, vendorType) => {
  return vendors.filter((vendor) => vendor.vendorType == vendorType);
};

const setVendors = (vendors) => {
  const vendorStore = useVendorStore();

  vendorStore.setVendors(vendors);

  const restaurants = filterAndReturnVendorsByType(vendors, "restaurant");
  const retailers = filterAndReturnVendorsByType(vendors, "retailer");
  const shops = filterAndReturnVendorsByType(vendors, "shop");

  vendorStore.setRestaurants(restaurants);
  vendorStore.setShops(shops);
  vendorStore.setRetailers(retailers);
};

export const checkVendors = async () => {
  const vendorStore = useVendorStore();
  const { vendors } = storeToRefs(vendorStore);

  const { $vendorApiService, $CreateVendorsUseCase, $GetVendorsUseCase } =
    useNuxtApp();

  if (vendors.value && vendors?.value?.length > 0) {
    return;
  }

  try {
    const storedVendors = await $GetVendorsUseCase();
    if (storedVendors && storedVendors?.length > 0) {
      setVendors(storedVendors);
      return;
    }
  } catch (error) {
    console.log(error);
  }

  let fetchedVendors = null;
  try {
    fetchedVendors = await $vendorApiService.getVendors();
    console.log(fetchedVendors);
    if (!fetchedVendors || fetchedVendors?.length == 0) {
      return;
    }

    setVendors(fetchedVendors);
  } catch (error) {
    console.log(error);
  }

  try {
    if (!fetchedVendors) return;
    await $CreateVendorsUseCase(fetchedVendors);
  } catch (error) {
    console.log(error);
  }
};
