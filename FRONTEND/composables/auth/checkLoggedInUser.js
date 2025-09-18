import { useUserStore } from "@/stores/userStore";
import { useProfileStore } from "@/stores/profileStore";

import { navigateTo, useNuxtApp } from "nuxt/app";

import { logoutUser } from "./logoutUser";
import { retrieveUserAndProfiles } from "../usecases/retrieveUserAndProfiles";
import { fetchUserAndProfiles } from "./fetchUserAndProfiles";
import { setUserAndProfiles } from "../state/setUserAndProfiles";
import { storeUserAndProfiles } from "../usecases/storeUserAndProfiles";

export const checkLoggedInUser = async (redirectTo) => {
  const { $authApiService } = useNuxtApp();

  const navigationRoutes = {
    select_profile: "/general/select-profile",
    unauthorized_route: "/general/unauthorized", // fixed typo
    logout_route: "/auth/logout",
    login_route: "/auth/login",
    register_route: "/auth/register",
    profile_register_route: "/auth/profile",
    consumer_route: "/consumer",
  };

  const userStore = useUserStore();
  const profileStore = useProfileStore();

  const user = userStore.getUser();
  const profiles = profileStore.getProfiles();
  const selectedProfile = profileStore.getSelectedProfile();

  // Early exit if data exists
  if (user && profiles) {
    if (!selectedProfile?.type) {
      return await navigateTo(navigationRoutes.select_profile);
    }

    if (redirectTo) return await navigateTo(redirectTo);
  }

  // Verify Token first
  let userID = null;
  try {
    const response = await $authApiService.verifyToken();
    userID = response?.id;
  } catch (error) {
    await logoutUser();

    if (error?.type === "InvalidTokenError") {
      return navigateTo(navigationRoutes.login_route);
    }

    return navigateTo(navigationRoutes.consumer_route);
  }

  // Attempt to load cached data
  try {
    await retrieveUserAndProfiles(userID);

    if (redirectTo) return await navigateTo(redirectTo);
  } catch (error) {
    console.log(error);
    if (error?.type === "ProfileSelectionError") {
      return await navigateTo(navigationRoutes.select_profile);
    }
  }

  // Fallback: Fetch fresh data
  let fetchedUser = null;
  let fetchedProfiles = null;
  try {
    const { user, profiles } = await fetchUserAndProfiles();

    fetchedUser = user;
    fetchedProfiles = profiles;

    setUserAndProfiles(user, profiles, false);
  } catch (error) {
    switch (error?.type) {
      case "UserExistenceError":
        return navigateTo(navigationRoutes.register_route);
      case "ProfileExistenceError":
        return navigateTo(navigationRoutes.profile_register_route);
    }
  }

  try {
    if (fetchedUser && fetchedProfiles) {
      await storeUserAndProfiles(fetchedUser, fetchedProfiles); // use fetched data directly

      return await navigateTo(navigationRoutes.select_profile);
    }
  } catch (error) {
    console.error("Failed to store user and profiles:", error);
  }

  userStore.setGuest(true);
  return await navigateTo(navigationRoutes.consumer_route);
};
