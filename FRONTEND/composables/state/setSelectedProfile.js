import { useProfileStore } from "@/stores/profileStore";

export const setSelectedProfile = (type) => {
  const profileStore = useProfileStore();

  try {
    const profile = profileStore.selectProfile(type);
    if (!profile) {
      throw new Error("Profile does not exist");
    }
  } catch (error) {
    throw error;
  }
};
