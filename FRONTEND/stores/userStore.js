import { defineStore } from "pinia";
import { $fetch } from "ofetch";
import { navigateTo } from "nuxt/app";
import { db } from "@/utils/db";
import { stringifyArrays } from "@/utils/stringifyArrays";
import { useVendorStore } from "@/stores/vendorStore";
import { returnFavouriteProductObject } from "@/utils/returnFavouriteProductObject";

export const useUserStore = defineStore("user", () => {
  const user = ref(null);
  const profiles = ref(null);
  const loggedIn = ref(false);
  const isGuest = ref(false);

  const {
    $expressAuthBackendService,
    $expressUserBackendService,
    $useIndexedDBUserRepo,
    $useIndexedDBProfileRepo,
    $useIndexedDBMessageRepo,
  } = useNuxtApp();

  const setUser = async (newUser) => {
    user.value = newUser;
    setGuest(false);
    await $useIndexedDBMessageRepo.clearMessages("user_authentication");
  };

  const clearUser = async () => {
    user.value = null;
    await $useIndexedDBUserRepo.clearUser();
  };

  const clearProfiles = async () => {
    profiles.value = null;
    await $useIndexedDBProfileRepo.clearProfiles();
  };

  const setProfiles = (profilesData) => {
    if (!user.value) return;
    profiles.value = profilesData;
  };

  const addProfile = (profile) => {
    if (!user.value) return;
    if (!profiles.value) return;
    setProfiles([...profiles.value, profile]);
  };

  const setGuest = (guestOrNot) => {
    isGuest.value = guestOrNot;
  };

  const addressFormState = reactive({
    tag: undefined,
    address: undefined,
  });

  const fetchUser = async () => {
    try {
      if (isGuest.value) return;

      const messages = await $useIndexedDBMessageRepo.getMessages(
        "user_authentication"
      );
      if (messages.length > 0) return;

      const fetchedUser = await $expressAuthBackendService.login();

      if (fetchedUser) {
        const profiledIds = fetchedUser.profiles.map(
          (profile) => profile.profileId
        );

        const profilesData = await $expressUserBackendService.getProfilesData(
          profiledIds
        );

        setUser(fetchedUser);
        setProfiles(profilesData);

        await $useIndexedDBUserRepo.storeUser(fetchedUser);
        await $useIndexedDBProfileRepo.storeProfiles(profilesData);

        return fetchedUser;
      }

      return null;
    } catch (error) {
      if (
        (error.type == "ValidationError" || error.type == "UnexpectedError") &&
        !isGuest.value
      ) {
        setGuest(true);
        await clearUser();
        await clearProfiles();
        return;
      }

      if (error.type == "InvalidTokenError") {
        await clearUser();
        await clearProfiles();

        await $useIndexedDBMessageRepo.saveMessage(
          "Please login",
          "user_authentication"
        );
        return;
      }

      if (error.type == "UserExistenceError") {
        await clearUser();
        await clearProfiles();
        await $useIndexedDBMessageRepo.saveMessage(
          "Please login to finish registration",
          "user_authentication"
        );
        return;
      }

      if (error.type == "ProfileExistenceError") {
        await clearUser();
        await clearProfiles();
        await $useIndexedDBMessageRepo.saveMessage(
          "Please login to finish registration",
          "user_authentication"
        );
        return;
      }

      if (error.type == "UnexpectedError") {
        await clearUser();
        await clearProfiles();
        await $useIndexedDBMessageRepo.saveMessage(
          "Please retry login",
          "user_authentication"
        );
        return;
      }
      throw error;
    }
  };

  const getUser = async () => {
    try {
      if (isGuest.value) return;

      if (user.value && profiles.value) return user.value;

      const localUser = await $useIndexedDBUserRepo.getUser();
      if (localUser) setUser(localUser);

      const storedProfiles = await $useIndexedDBProfileRepo.getProfiles();

      if (storedProfiles) {
        setProfiles(storedProfiles);
        return localUser;
      }

      const dbUser = await fetchUser();

      return dbUser;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const updateUser = async (userId, newUserData) => {
    try {
      const user = await $expressUserBackendService.updateUser(
        userId,
        newUserData
      );

      setUser(user);
      await $useIndexedDBUserRepo.storeUser(user);

      return user;
    } catch (error) {
      throw error;
    }
  };

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

  return {
    fetchUserDetails,
    setUser,
    fetchUser,
    setUserDetailsInIndexDB,
    updateUser,
    clearUser,
    getUser,
    setGuest,
    addProfile,
    setProfiles,
    loggedIn,
    user,
    addressFormState,
  };
});
