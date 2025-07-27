import { useUserStore } from "@/stores/userStore";
import { navigateTo } from "nuxt/app";

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (process.client) {
    const userStore = useUserStore();

    try {
      const selectedProfile = userStore.getSelectedProfile();

      const type = selectedProfile?.type;

      if (type === "consumer") {
        return navigateTo("/consumer");
      }
      if (type === "delivery_person") {
        return navigateTo("/delivery-person");
      }
      if (type === "vendor") {
        return navigateTo("/vendor");
      }
    } catch (error) {
      return navigateTo("/consumer");
    }

    try {
      const { $getSelectedProfileUseCase } = useNuxtApp();

      const selectedProfile = await $getSelectedProfileUseCase();
      userStore.setSelectedProfile(selectedProfile);

      const type = selectedProfile?.type;

      if (!type) {
        return navigateTo("/consumer");
      }
      if (type === "consumer") {
        return navigateTo("/consumer");
      }
      if (type === "delivery_person") {
        return navigateTo("/delivery-person");
      }
      if (type === "vendor") {
        return navigateTo("/vendor");
      }
    } catch (error) {
      if (error.type === "ProfileExistenceError") {
        return navigateTo("/general/select-profile");
      }

      if (error.type === "ValidationError") {
        return navigateTo("auth/logout");
      }

      return navigateTo("/consumer");
    }
  }
});
