import { defineStore } from "pinia";
import { $fetch } from "ofetch";

export const useUserStore = defineStore("user", () => {
  const user = ref({});
  const loggedIn = ref({});

  const fetchUserDetails = async () => {
    try {
      const token = useCookie("auth_token");
      const config = useRuntimeConfig();
      if (!token.value || token.value == "") {
        loggedIn.value = false;
        user.value = {};
      } else {
        const response = await $fetch(
          `${config.public.apiBaseUrl}/loggedInUser`,
          {
            headers: {
              Authorization: `Bearer ${token.value}`,
            },
          }
        );

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

        if (!response.error) {
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
