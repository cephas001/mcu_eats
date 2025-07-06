import { useVendorStore } from "@/stores/vendorStore";

export const returnFavouriteProductObject = async (product) => {
  try {
    const vendorStore = useVendorStore();
    const { vendors } = storeToRefs(vendorStore);

    if (!vendors.value) {
      await vendorStore.fetchVendors();
    }

    const vendor = vendors.value.find(
      (vendor) => vendor._id === product.vendor
    );
    if (vendor) {
      const foundProduct = vendor.products.find((fproduct) => {
        return fproduct._id === product.productId;
      });
      foundProduct["favourited"] = true;
      foundProduct["vendorName"] = vendor.name;
      foundProduct["vendorId"] = vendor._id;
      foundProduct["vendorOpeningTime"] = vendor.opening_time;
      foundProduct["vendorClosingTime"] = vendor.closing_time;
      foundProduct["vendorTakingOrders"] = vendor.taking_orders;

      return stringifyArrays(foundProduct);
    }
  } catch (error) {
    console.error("Error returning favourite product object:", error);
    return null;
  }
};
