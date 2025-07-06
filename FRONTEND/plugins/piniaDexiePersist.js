import { defineNuxtPlugin } from "nuxt/app";
import { db } from "../utils/db";
import { stringifyArrays } from "../utils/stringifyArrays";

export default defineNuxtPlugin((nuxtApp) => {
  // key: {store name}
  const PRESIST_CONFIG = {
    cart: {
      key: "cart",
    },
    vendor: {
      key: "vendors",
    },
    userFavouritesStore: {
      key: "userFavouriteVendors",
    },
  };

  nuxtApp.$pinia.use(({ store }) => {
    const config = PRESIST_CONFIG[store.$id];
    if (!config) return;

    const unsubscribe = store.$subscribe(async (mutation, state) => {
      try {
        if (mutation.storeId === "cart") {
          const cartData = state.cart.map((item) => stringifyArrays(item)); // Ensure nested arrays are stringified
          await db.cart.bulkPut(cartData);
        }

        if (mutation.storeId === "vendor") {
          if (state.vendors) {
            const vendorData = state.vendors.map((vendor) =>
              stringifyArrays(vendor)
            ); // Stringify nested arrays in vendors
            await db.vendors.bulkPut(vendorData);
          }
        }

        if (mutation.storeId === "userFavouritesStore") {
          if (state.userFavouriteVendors) {
            const favouriteVendorsData = state.userFavouriteVendors.map(
              (vendor) => stringifyArrays(vendor)
            );
            await db.favouriteVendors.bulkPut(favouriteVendorsData);
          }
          if (state.userFavouriteProducts) {
            const favouriteProductsData = state.userFavouriteProducts.map(
              (product) => stringifyArrays(product)
            );
            await db.favouriteProducts.bulkPut(favouriteProductsData);
          }
        }
      } catch (error) {
        console.error(`Error persisting ${mutation.storeId}`, error);
      }
    });

    // loadInitialState();

    nuxtApp.hook("app:beforeMount", () => {
      unsubscribe();
    });
  });
});
