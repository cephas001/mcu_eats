import { useVendorStore } from "@/stores/vendorStore";
import { storeToRefs } from "pinia";

import { vendorProfilePresenter } from "../infrastructure/presenters/vendorProfilePresenter";

export const setVendorsInState = async () => {
  const vendorStore = useVendorStore();
  const { vendors } = storeToRefs(vendorStore);

  const {
    $expressUserBackendService,
    $storeVendorProfilesUseCase,
    $retrieveVendorProfilesUseCase,
    $clearVendorProfilesUseCase,
  } = useNuxtApp();

  const filterAndReturnVendorsByType = (vendors, vendorType) => {
    return vendors.filter((vendor) => vendor.type == vendorType);
  };

  const setVendorsRestaurantsAndOthersInPiniaStore = (vendors) => {
    vendorStore.setVendors(vendors);

    const restaurants = filterAndReturnVendorsByType(vendors, "restaurant");
    const retailers = filterAndReturnVendorsByType(vendors, "retailer");
    const shops = filterAndReturnVendorsByType(vendors, "shop");

    vendorStore.setRestaurants(restaurants);
    vendorStore.setShops(shops);
    vendorStore.setRetailers(retailers);
  };

  if (vendors.value) {
    return;
  }

  try {
    const vendors = await $retrieveVendorProfilesUseCase();

    if (vendors) {
      setVendorsRestaurantsAndOthersInPiniaStore(vendors);
      return;
    }
  } catch (error) {
    if (error.type == "ValidationError") {
      await $clearVendorProfilesUseCase();
    }
  }

  try {
    const fetchedVendors = await $expressUserBackendService.getVendorProfiles();

    var modifiedVendors = vendorProfilePresenter(fetchedVendors);

    setVendorsRestaurantsAndOthersInPiniaStore(modifiedVendors);
  } catch (error) {
    console.log(error);
  }

  try {
    const storedProfiles = await $storeVendorProfilesUseCase(modifiedVendors);
  } catch (error) {
    console.log(error);
  }
};
