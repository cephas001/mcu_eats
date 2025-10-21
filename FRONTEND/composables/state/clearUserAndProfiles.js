import { useUserStore } from "@/stores/userStore";
import { useProfileStore } from "@/stores/profileStore";

export const clearUserAndProfilesState = () => {
  const userStore = useUserStore();
  const profileStore = useProfileStore();

  try {
    userStore.clearUser();
    profileStore.clearProfiles();
    userStore.setGuest(true);
  } catch (error) {
    throw error;
  }
};
