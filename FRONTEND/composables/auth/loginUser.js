import { setUserAndProfiles } from "../state/setUserAndProfiles";
import { fetchUserAndProfiles } from "./fetchUserAndProfiles";

export const loginUser = async (token, callBack, shouldNotHandleErrors) => {
  try {
    await $fetch("/api/login", {
      method: "POST",
      body: {
        token,
      },
    });

    if (typeof callBack === "function") {
      await callBack();
      return;
    }

    const { user, profiles } = await fetchUserAndProfiles();

    setUserAndProfiles(user, profiles);

    return { user, profiles };
  } catch (error) {
    if (shouldNotHandleErrors) {
      throw error;
    }

    if (error.type == "UserExistenceError") {
      await navigateTo("/auth/register");
    }

    if (error.type == "ProfileExistenceError") {
      await navigateTo("/auth/profile");
    }

    throw error;
  }
};
