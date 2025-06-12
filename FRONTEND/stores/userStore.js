import { defineStore } from "pinia";
import { $fetch } from "ofetch";
import { useCookie } from "nuxt/app";

export const useUserStore = defineStore(
  "user",
  () => {
    const user = ref(null);
    const loggedIn = ref(null);

    const setUser = (newUser) => {
      user.value = newUser;
    };

    const setLoggedIn = (newLogin) => {
      loggedIn.value = newLogin;
    };

    const logOut = () => {
      user.value = null;
      loggedIn.value = false;
    };

    const fetchUserDetails = async (firebaseDetails) => {
      try {
        const token = useCookie("auth_token");
        const config = useRuntimeConfig();

        if (!token.value || token.value == "") {
          loggedIn.value = false;
          user.value = null;
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
            user.value = null;
            return;
          }

          if (response.error == "Unauthorized: No token provided") {
            loggedIn.value = false;
            user.value = null;
            return;
          }

          if (!response.user) {
            token.value = null;
            loggedIn.value = false;
            user.value = null;
            return;
          } else {
            loggedIn.value = true;
            user.value = response.user;
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    const favouriteOrNot = (id) => {
      if (!user.value) {
        return false;
      } else {
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

    const updateUser = async (body) => {
      try {
        const token = useCookie("auth_token");
        const config = useRuntimeConfig();
        if (token.value || user?.value) {
          const response = await $fetch(
            `${config.public.apiBaseUrl}/users/${user.value._id}`,
            {
              method: "PUT",
              body,
              headers: {
                Authorization: `Bearer ${token.value}`,
              },
            }
          );
          if (response.update) {
            setUser(response.user);
          }
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
      logOut,
      setLoggedIn,
      updateUser,
      loggedIn,
      user,
    };
  },
  {
    persist: {
      storage: localStorage,
    },
  }
);
