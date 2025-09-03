import { useUserStore } from "@/stores/userStore";
import { useProfileStore } from "@/stores/profileStore";

export const clearUserAndProfilesState = () => {
  const userStore = useUserStore();
  const profileStore = useProfileStore();

  try {
    userStore.clearUser();
    userStore.setGuest(true);
    profileStore.clearProfiles();
  } catch (error) {
    throw error;
  }
};
