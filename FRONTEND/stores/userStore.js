import { defineStore } from "pinia";
import { $fetch } from "ofetch";
import { navigateTo } from "nuxt/app";
import { db } from "@/utils/db";
import { stringifyArrays } from "@/utils/stringifyArrays";
import { useVendorStore } from "@/stores/vendorStore";
import { returnFavouriteProductObject } from "@/utils/returnFavouriteProductObject";

export const useUserStore = defineStore("user", () => {
  const user = ref(null);
  const loggedIn = ref(false);

  const setUser = (newUser) => {
    user.value = newUser;
    if (newUser !== null) return (loggedIn.value = true);
    loggedIn.value = false;
  };

  const addressFormState = reactive({
    tag: undefined,
    address: undefined,
  });

  const fetchUserDetails = async (justSearchIndexedDB, redirect) => {
    if (user.value && loggedIn.value) return;

    try {
      // Check if user details are already stored in IndexedDB
      const userFromIndexDB = await db.user.toArray();
      if (userFromIndexDB.length > 0) {
        setUser(userFromIndexDB[0]);
        return;
      }

      if (justSearchIndexedDB) {
        return;
      }

      // If not found in IndexedDB, fetch from API
      const config = useRuntimeConfig();
      const response = await $fetch(
        `${config.public.apiBaseUrl}/loggedInUser`,
        {
          credentials: "include",
        }
      );

      if (!response.user) {
        setUser(null);
        if (redirect) {
          return await navigateTo({
            path: "/logout",
            query: { redirect: true },
          });
        }
        return await navigateTo("/logout");
      }

      setUserDetailsInIndexDB(response.user);
      setUser(response.user);
    } catch (error) {
      console.error("Error fetching user details:", error);
      throw new Error("Error fetching user details: " + error);
    }
  };

  const setUserDetailsInIndexDB = async (user) => {
    try {
      const vendorStore = useVendorStore();
      const { vendors } = storeToRefs(vendorStore);

      if (!vendors.value) {
        await vendorStore.fetchVendors();
      }

      const favouriteVendorsToBeStored = user.favouriteVendors.map(
        (vendorFav) => {
          const vendor = vendors.value.find(
            (storedVendor) => storedVendor._id === vendorFav.vendor
          );
          return stringifyArrays(vendor);
        }
      );

      // Clear existing favourite products and store new ones
      await db.favouriteProducts.clear();

      user.favouriteProducts.forEach(async (product) => {
        const foundProduct = await returnFavouriteProductObject(product);

        await db.favouriteProducts.add(foundProduct);
      });

      const { favouriteVendors, favouriteProducts, ...restOfTheUserObject } =
        user;

      // Clear existing data and store new user data
      await db.user.clear();
      await db.user.put(stringifyArrays(restOfTheUserObject));

      // Clear existing data and store new favourite vendors
      await db.favouriteVendors.clear();
      await db.favouriteVendors.bulkPut(favouriteVendorsToBeStored);

      // Clear existing cart if user has no cart
      if (!user.cart) {
        await db.cart.clear();
      }
    } catch (error) {
      console.log("Error saving user data locally:", error);
      throw new Error("Error saving user data locally: " + error);
    }
  };

  const updateUser = async (body) => {
    try {
      const config = useRuntimeConfig();
      const response = await $fetch(
        `${config.public.apiBaseUrl}/users/${user.value._id}`,
        {
          method: "PUT",
          body,
          credentials: "include",
        }
      );

      if (response.user) {
        setUser(response.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    fetchUserDetails,
    setUser,
    setUserDetailsInIndexDB,
    updateUser,
    loggedIn,
    user,
    addressFormState,
  };
});
