import { useUserStore } from "@/stores/userStore";
import { useProfileStore } from "@/stores/profileStore";

export const setUserAndProfiles = (user, profiles, setSelectedProfile) => {
  try {
    const userStore = useUserStore();
    const profileStore = useProfileStore();

    userStore.setUser(user);
    profileStore.setProfiles(profiles);
    if (setSelectedProfile) {
      profileStore.setSelectedProfile(profiles[0]);
    }
  } catch (error) {
    throw error;
  }
};
