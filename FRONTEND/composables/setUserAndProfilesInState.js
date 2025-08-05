import { useUserStore } from "@/stores/userStore";
import { useProfileStore } from "@/stores/profileStore";

import { navigateTo, useNuxtApp } from "nuxt/app";

export const setUserAndProfilesInState = async (redirectTo) => {
  const {
    $retrieveUserByIdUseCase,
    $retrieveUserProfilesUseCase,
    $retrieveUserSelectedProfileUseCase,
    $expressAuthBackendService,
    $expressUserBackendService,
    $storeUserUseCase,
    $storeUserProfilesUseCase,
  } = useNuxtApp();

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
    } else {
      return await navigateTo(navigationRoutes["unathorized_route"]);
    }
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
    switch (error.type) {
      case "ValidationError":
        if (!userStore.isGuest) {
          userStore.setGuest(true);
          return navigateTo(navigationRoutes["consumer_route"]);
        }
      case "InvalidTokenError":
        if (userStore.alreadyPromptedUserToLogin) {
          // redirect to logout page instead (fix!)
          await $fetch("/api/logout");
          userStore.setGuest(true);
          return navigateTo(navigationRoutes["consumer_route"]);
        }
        userStore.setAlreadyPromptedUserToLogin(true);
        return navigateTo(navigationRoutes["login_route"]);
      default:
        userStore.setGuest(true);
        return navigateTo(navigationRoutes["consumer_route"]);
    }
  }

  // Attempt to load cached data
  try {
    const user = await $retrieveUserByIdUseCase(userId);
    const profiles = await $retrieveUserProfilesUseCase(userId);

    userStore.setUser(user);
    profileStore.setProfiles(profiles);

    const selectedProfile = await $retrieveUserSelectedProfileUseCase(userId);

    profileStore.setSelectedProfile(selectedProfile);

    if (redirectTo) return await navigateTo(redirectTo);

    return await navigateTo(navigationRoutes["consumer_route"]);
  } catch (error) {
    if (error.type === "ProfileExistenceError") {
      return await navigateTo(navigationRoutes["select_profile"]);
    }
    if (error.type === "ValidationError") {
      return await navigateTo(navigationRoutes["logout_route"]);
    }
  }

  // Fallback: Fetch fresh data
  try {
    const user = await $expressAuthBackendService.login();
    const profileIds = user.profiles.map((p) => p.profileId);

    const profiles =
      await $expressUserBackendService.getProfilesDataByProfileIds(profileIds);

    userStore.setUser(user);
    profileStore.setProfiles(profiles);
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
    await $storeUserUseCase(userStore.user);
    await $storeUserProfilesUseCase(profileStore.profiles);
  } catch (error) {
    console.log(error);
  }

  if (redirectTo) return await navigateTo(redirectTo);

  return await navigateTo(navigationRoutes["consumer_route"]);
};
