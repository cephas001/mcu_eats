import { defineNuxtPlugin } from "nuxt/app";
import { db } from "../utils/db";

export default defineNuxtPlugin((nuxtApp) => {
  // key: {store name}
  const PRESIST_CONFIG = {
    cart: {
      key: "cart",
    },
    vendor: {
      key: "vendors",
    },
  };

  nuxtApp.$pinia.use(({ store }) => {
    const config = PRESIST_CONFIG[store.$id];
    if (!config) return;

    // const loadInitialState = async () => {
    //   try {
    //     const savedData = await db.table(config.key).toArray();
    //     if (savedData.length > 0) {
    //       const cartData = await db.cart.toArray();
    //       const vendorData = await db.vendors.toArray();

    //       if (cartData.length > 0) {
    //         store.cart.$patch(cartData[0]); // Patch only cart state
    //       }

    //       if (vendorData.length > 0) {
    //         console.log(store);
    //         store.vendor.$patch({ vendors: vendorData }); // Patch only vendors
    //       }

    //       await db.table(config.key).clear();
    //       await db.table(config.key).bulkAdd(savedData);
    //     }
    //   } catch (error) {
    //     console.log(`Error loading: ${store.$id} from IndexDB`, error);
    //   }
    // };

    function stringifyArrays(obj) {
      if (Array.isArray(obj)) {
        return JSON.stringify(obj); // Convert arrays to string
      } else if (typeof obj === "object" && obj !== null) {
        return Object.keys(obj).reduce((acc, key) => {
          acc[key] = stringifyArrays(obj[key]); // Recursively stringify nested arrays
          return acc;
        }, {});
      }
      return obj; // Return other data types unchanged
    }

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
