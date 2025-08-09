import { useProfileStore } from "@/stores/profileStore";

export const setSelectedProfileInStateWithType = (type) => {
  const profileStore = useProfileStore();

  try {
    const saved_profile = profileStore.selectProfile(type);
    if (!saved_profile) {
      throw new Error("Profile does not exist");
    }
  } catch (error) {
    throw error;
  }
};
