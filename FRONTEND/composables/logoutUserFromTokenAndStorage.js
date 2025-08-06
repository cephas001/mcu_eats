import { useUserStore } from "@/stores/userStore";
import { useProfileStore } from "@/stores/profileStore";

export const logoutUserFromTokenAndStorage = async () => {
  const userStore = useUserStore();
  const profileStore = useProfileStore();

  const { $clearUserUseCase, $clearUserProfilesUseCase } = useNuxtApp();

  try {
    await $fetch("/api/logout");
  } catch (error) {
    console.log(error);
    throw error;
  }

  try {
    userStore.clearUser();
    userStore.setGuest(true);
    profileStore.clearProfiles();
  } catch (error) {
    console.log(error);
    throw error;
  }

  try {
    await $clearUserUseCase();
    await $clearUserProfilesUseCase();
  } catch (error) {
    console.log(error);
    throw error;
  }
};
