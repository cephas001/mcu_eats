import { defineStore } from "pinia";
import { $fetch } from "ofetch";
import { useCookie } from "nuxt/app";

export const useUserStore = defineStore(
  "user",
  () => {
    const user = ref(null);
    const loggedIn = ref({});

    const open = ref(false);

    const setUser = (newUser) => {
      user.value = newUser;
    };

    const fetchUserDetails = async (firebaseDetails) => {
      try {
        const token = useCookie("auth_token");
        const config = useRuntimeConfig();

        if (!token.value || token.value == "") {
          loggedIn.value = false;
          user.value = {};
          return "no token";
        } else {
          var response;
          if (!firebaseDetails) {
            response = await $fetch(
              `${config.public.apiBaseUrl}/loggedInUser`,
              {
                headers: {
                  Authorization: `Bearer ${token.value}`,
                },
              }
            );
          } else {
            response = await $fetch(
              `${config.public.apiBaseUrl}/loggedInUserFirebaseDetails`,
              {
                headers: {
                  Authorization: `Bearer ${token.value}`,
                },
              }
            );
          }

          if (response.error == "Invalid or expired token") {
            token.value = null;
            loggedIn.value = false;
            user.value = {};
            return;
          }

          if (response.error == "Unauthorized: No token provided") {
            loggedIn.value = false;
            user.value = {};
            return;
          }

          if (!response.user) {
            token.value = null;
            loggedIn.value = false;
            user.value = {};
            return;
          } else {
            loggedIn.value = true;
            user.value = response.user;
            console.log(response.user);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    const favouriteOrNot = (id) => {
      if (!user.value._id) {
        return false;
      }
      const vendor = user.value.favouriteVendors.find((vendorObject) => {
        return vendorObject.vendor._id === id;
      });
      if (vendor) {
        return true;
      } else {
        return false;
      }
    };

    const favouriteVendor = async (vendorId) => {
      try {
        const config = useRuntimeConfig();
        const token = useCookie("auth_token");
        if (!user.value._id) {
          await fetchUserDetails();
          if (!user.value._id) {
            return;
          }
        }
        var backendResponse = ref(null);
        if (favouriteOrNot(vendorId)) {
          backendResponse.value = await $fetch(
            `${config.public.apiBaseUrl}/users/favourites/${user.value._id}`,
            {
              method: "PUT",
              body: {
                removeFavouriteVendor: true,
                vendorId: vendorId,
              },
              headers: {
                Authorization: `Bearer ${token.value}`,
              },
            }
          );
        } else {
          backendResponse.value = await $fetch(
            `${config.public.apiBaseUrl}/users/favourites/${user.value._id}`,
            {
              method: "PUT",
              body: {
                favouriteVendors: [
                  ...user.value.favouriteVendors,
                  { vendor: vendorId },
                ],
              },
              headers: {
                Authorization: `Bearer ${token.value}`,
              },
            }
          );
        }

        if (backendResponse.value.user) {
          user.value = backendResponse.value.user;
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
      loggedIn,
      user,
      open,
    };
  },
  {
    persist: {
      storage: localStorage,
    },
  }
);
