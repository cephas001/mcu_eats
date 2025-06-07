import { defineStore } from "pinia";
import { $fetch } from "ofetch";

export const useUserStore = defineStore("user", () => {
  const user = ref({});
  const loggedIn = ref({});

  const fetchUserDetails = async (firebaseDetails) => {
    try {
      const token = useCookie("auth_token");
      const config = useRuntimeConfig();
      if (!token.value || token.value == "") {
        loggedIn.value = false;
        user.value = {};
      } else {
        var response;
        if (!firebaseDetails) {
          response = await $fetch(`${config.public.apiBaseUrl}/loggedInUser`, {
            headers: {
              Authorization: `Bearer ${token.value}`,
            },
          });
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
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    fetchUserDetails,
    loggedIn,
    user,
  };
});
