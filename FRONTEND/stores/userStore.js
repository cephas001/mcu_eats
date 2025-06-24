import { defineStore } from "pinia";
import { $fetch } from "ofetch";
import { navigateTo, useCookie } from "nuxt/app";

export const useUserStore = defineStore(
  "user",
  () => {
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

    const fetchUserDetails = async (firebaseDetails) => {
      try {
        const config = useRuntimeConfig();

        const response = await $fetch(
          `${config.public.apiBaseUrl}/${
            !firebaseDetails ? "loggedInUser" : "loggedInUserFirebaseDetails"
          }`,
          {
            credentials: "include",
          }
        );

        if (!response.user) {
          setUser(null);
          return await navigateTo("/logout");
        }

        setUser(response.user);
      } catch (error) {
        console.log(error);
      }
    };

    const favouriteOrNot = (id) => {
      if (!user.value) {
        return false;
      } else {
        return false;
        const vendor = user.value.favouriteVendors.find((vendorObject) => {
          return vendorObject.vendor._id === id;
        });
        if (vendor) {
          return true;
        } else {
          return false;
        }
      }
    };

    const favouriteVendor = async (vendorId) => {
      try {
        const config = useRuntimeConfig();

        if (!user) {
          await fetchUserDetails();
        }

        const body = favouriteOrNot(vendorId)
          ? {
              removeFavouriteVendor: true,
              vendorId: vendorId,
            }
          : {
              favouriteVendors: [
                ...user.value.favouriteVendors,
                { vendor: vendorId },
              ],
            };
        const response = await $fetch(
          `${config.public.apiBaseUrl}/users/favourites/${user.value._id}`,
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
      favouriteVendor,
      favouriteOrNot,
      updateUser,
      loggedIn,
      user,
      addressFormState,
    };
  },
  {
    persist: {
      enabled: true,
      strategies: [
        { storage: typeof window !== "undefined" ? sessionStorage : undefined },
      ],
    },
  }
);
