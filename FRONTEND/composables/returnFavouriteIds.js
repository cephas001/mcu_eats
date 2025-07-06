import { db } from "@/utils/db";

export const returnFavouriteVendorIds = async () => {
  const indexedDBFavouriteVendors = await db.favouriteVendors.toArray();
  const favouriteVendorIds = indexedDBFavouriteVendors.map((vendor) => {
    return vendor._id;
  });
  return {
    favouriteVendorIds,
  };
};

export const returnFavouriteProductIds = async () => {
  const indexedDBFavouriteProducts = await db.favouriteProducts.toArray();
  const favouriteProductIds = indexedDBFavouriteProducts.map((product) => {
    return product._id;
  });
  return {
    favouriteProductIds,
  };
};
