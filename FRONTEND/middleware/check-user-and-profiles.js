import { useUserStore } from "@/stores/userStore";
import { useProfileStore } from "@/stores/profileStore";

import { navigateTo } from "nuxt/app";

export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore();
  const profileStore = useProfileStore();

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
    return;
  } else {
    return navigateTo(`/?redirectTo=${to.fullPath}`);
  }
});
