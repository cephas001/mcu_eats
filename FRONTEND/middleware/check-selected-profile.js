import { useProfileStore } from "@/stores/profileStore";
import { useUserStore } from "@/stores/userStore";
import { navigateTo } from "nuxt/app";

export default defineNuxtRouteMiddleware((to, from) => {
  const profileStore = useProfileStore();
  const userStore = useUserStore();

  const navigationRoutes = {
    select_profile: "/general/select-profile",
    unathorized_route: "/general/unauthorized",
    logout_route: "/auth/logout",
    login_route: "/auth/login",
    register_route: "/auth/register",
    profile_register_route: "/auth/profile",
    consumer_route: "/consumer",
    delivery_route: "/delivery-person",
    vendor_route: "/vendor",
  };

  if (userStore.isGuest !== null && userStore.isGuest) {
    if (to.meta.allowAnonymous) {
      return;
    } else {
      return navigateTo("/general/unauthorized");
    }
  }

  // Early exit if data exists
  if (userStore.user && profileStore.profiles) {
    if (!profileStore.selectedProfile?.type) {
      return navigateTo("/general/select-profile");
    }

    switch (profileStore.selectedProfile.type) {
      case "consumer":
        if (!to.fullPath.startsWith("/consumer")) {
          return navigateTo(navigationRoutes["consumer_route"]);
        }
        break;
      case "delivery_person":
        if (!to.fullPath.startsWith("/delivery-person")) {
          return navigateTo(navigationRoutes["delivery_route"]);
        }
        break;
      case "vendor":
        if (!to.fullPath.startsWith("/vendor")) {
          return navigateTo(navigationRoutes["vendor_route"]);
        }
        break;
    }
  } else {
    return navigateTo(`/?redirectTo=${to.fullPath}`);
  }
});
