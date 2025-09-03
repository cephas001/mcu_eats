import { useUserStore } from "@/stores/userStore";
import { useProfileStore } from "@/stores/profileStore";

import { navigateTo, useNuxtApp } from "nuxt/app";

import { logoutUser } from "./logoutUser";
import { retrieveUserAndProfiles } from "../usecases/retrieveUserAndProfiles";
import { fetchUserAndProfiles } from "./fetchUserAndProfiles";
import { setUserAndProfiles } from "../state/setUserAndProfiles";
import { storeUserAndProfiles } from "../usecases/storeUserAndProfiles";

export const checkLoggedInUser = async (redirectTo) => {
  const { $expressAuthBackendService } = useNuxtApp();

  const navigationRoutes = {
    select_profile: "/general/select-profile",
    unathorized_route: "/general/unauthorized",
    logout_route: "/auth/logout",
    login_route: "/auth/login",
    register_route: "/auth/register",
    profile_register_route: "/auth/profile",
    consumer_route: "/consumer",
  };

  const userStore = useUserStore();
  const profileStore = useProfileStore();

  const guest = userStore.checkGuest();

  if (guest) {
    if (redirectTo == "/consumer") {
      return;
    }
    return await navigateTo(navigationRoutes["unathorized_route"]);
  }

  const user = userStore.getUser();

  const profiles = profileStore.getProfiles();
  const selectedProfile = profileStore.getSelectedProfile();

  // Early exit if data exists
  if (user && profiles) {
    if (!selectedProfile?.type) {
      return await navigateTo(navigationRoutes["select_profile"]);
    }
    if (redirectTo) return await navigateTo(redirectTo);

    return await navigateTo(navigationRoutes["consumer_route"]);
  }

  // Verify Token first
  try {
    const response = await $expressAuthBackendService.verifyToken();

    var { id: userId } = response;
  } catch (error) {
    await logoutUser();

    switch (error.type) {
      case "TokenExistenceError":
        return navigateTo(navigationRoutes["consumer_route"]);
      case "InvalidTokenError":
        return navigateTo(navigationRoutes["login_route"]);
      default:
        return navigateTo(navigationRoutes["consumer_route"]);
    }
  }

  // Attempt to load cached data
  try {
    await retrieveUserAndProfiles(userId);

    if (redirectTo) return await navigateTo(redirectTo);

    return await navigateTo(navigationRoutes["consumer_route"]);
  } catch (error) {
    if (error.type === "ProfileExistenceError") {
      return await navigateTo(navigationRoutes["select_profile"]);
    }

    if (error.type === "ValidationError") {
      await logoutUser();
    }
  }

  // Fallback: Fetch fresh data
  try {
    const { user, profiles } = await fetchUserAndProfiles();

    setUserAndProfiles(user, profiles, false);
  } catch (error) {
    switch (error.type) {
      case "InvalidTokenError":
        return navigateTo(navigationRoutes["login_route"]);
      case "UserExistenceError":
        return navigateTo(navigationRoutes["register_route"]);
      case "ProfileExistenceError":
        return navigateTo(navigationRoutes["profile_register_route"]);
      default:
        userStore.setGuest(true);
        return navigateTo(navigationRoutes["consumer_route"]);
    }
  }

  try {
    await storeUserAndProfiles(userStore.getUser(), profileStore.getProfiles());

    return await navigateTo(navigationRoutes["select_profile"]);
  } catch (error) {
    console.log(error);
  }

  if (redirectTo) return await navigateTo(redirectTo);

  return await navigateTo(navigationRoutes["consumer_route"]);
};
