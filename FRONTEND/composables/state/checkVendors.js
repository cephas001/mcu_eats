import { useVendorStore } from "@/stores/vendorStore";
import { storeToRefs } from "pinia";

var filterAndReturnVendorsByType = (vendors, vendorType) => {
  return vendors.filter((vendor) => vendor.type == vendorType);
};

var setVendors = (vendors) => {
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

  const {
    $expressUserBackendService,
    $storeVendorProfilesUseCase,
    $retrieveVendorProfilesUseCase,
    $clearVendorProfilesUseCase,
  } = useNuxtApp();

  if (vendors.value) {
    console.log("here");
    return;
  }

  try {
    const vendors = await $retrieveVendorProfilesUseCase();

    if (vendors) {
      console.log(vendors);
      setVendors(vendors);
      return;
    }
  } catch (error) {
    if (error.type == "ValidationError") {
      await $clearVendorProfilesUseCase();
    }
  }

  try {
    var fetchedVendors = await $expressUserBackendService.getVendorProfiles();

    if (!fetchedVendors || fetchedVendors?.length == 0) {
      return;
    }
    console.log(fetchedVendors);
    setVendors(fetchedVendors);
  } catch (error) {
    console.log(error);
  }

  try {
    await $storeVendorProfilesUseCase(fetchedVendors);
  } catch (error) {
    console.log(error);
  }
};
