import { defineStore } from "pinia";
import { $fetch } from "ofetch";
import { useUserStore } from "@/stores/userStore";
import { useVendorStore } from "@/stores/vendorStore";
import { db } from "@/utils/db";
import { stringifyArrays } from "../utils/stringifyArrays";
// import {
// returnFavouriteVendorIds,
// returnFavouriteProductIds,
// } from "@/composables/returnFavouriteIds";
import { returnFavouriteProductObject } from "@/utils/returnFavouriteProductObject";

export const useUserFavouritesStore = defineStore("userFavouritesStore", () => {
  const userStore = useUserStore();
  const { user } = storeToRefs(userStore);

  const userFavouriteVendors = ref([]);
  const userFavouriteProducts = ref([]);

  const vendorStore = useVendorStore();

  // Checks if a product is favourite or not
  const isFavouriteProduct = async (id) => {
    if (!user.value) return false;

    const indexedDBFavouriteProducts = await db.favouriteProducts.toArray();
    if (!indexedDBFavouriteProducts || indexedDBFavouriteProducts.length < 0) {
      return false;
    }

    const product = favouriteProducts.find((product) => {
      return product._id === id;
    });

    if (product) {
      return true;
    } else {
      return false;
    }
  };

  // Favourites a Vendor
  const favouriteVendor = async (vendorId, userId) => {
    try {
      const config = useRuntimeConfig();
      const found = await vendorStore.findVendorById(vendorId);

      if (!found) {
        return;
      }

      const { favouriteVendorIds } = await returnFavouriteVendorIds();

      // Check if the vendor is already a favourite
      if (favouriteVendorIds.includes(vendorId)) {
        // Remove vendor from IndexedDB
        await db.favouriteVendors.delete(vendorId);
      } else {
        // Add the vendor to IndexedDB
        await db.favouriteVendors.add(
          stringifyArrays(vendorStore.vendor) // Ensure nested arrays are stringified,
        );
      }

      const updatedFavouriteVendors = await db.favouriteVendors.toArray();

      // Update the user favourite vendors
      const response = await $fetch(
        `${config.public.apiBaseUrl}/users/favourites/${userId}`,
        {
          method: "PUT",
          body: {
            favouriteVendors: updatedFavouriteVendors,
          },
          credentials: "include",
        }
      );
    } catch (error) {
      throw new Error("Error favouriting vendor: " + error);
    }
  };

  // Favourite a Product
  const favouriteProduct = async (vendorId, product, userId) => {
    try {
      const config = useRuntimeConfig();

      const { favouriteProductIds } = await returnFavouriteProductIds();

      // Check if the product is already a favourite
      if (favouriteProductIds.includes(product._id)) {
        // Remove product from IndexedDB
        await db.favouriteProducts.delete(product._id);
      } else {
        // Add the product to IndexedDB
        const foundProduct = await returnFavouriteProductObject({
          product,
          vendor: vendorId,
        });
        await db.favouriteProducts.add(foundProduct);
      }

      const updatedFavouriteProducts = await db.favouriteProducts.toArray();

      const favouriteProductsToSend = updatedFavouriteProducts.map(
        (product) => {
          return {
            productId: product._id,
            vendor: product.vendorId,
          };
        }
      );

      // Update the user favourite products
      const response = await $fetch(
        `${config.public.apiBaseUrl}/users/favourites/${userId}`,
        {
          method: "PUT",
          body: {
            favouriteProducts: favouriteProductsToSend,
          },
          credentials: "include",
        }
      );
    } catch (error) {
      throw new Error("Error favouriting vendor: " + error);
    }
  };

  return {
    isFavouriteProduct,
    favouriteVendor,
    favouriteProduct,
    userFavouriteVendors,
    userFavouriteProducts,
  };
});
