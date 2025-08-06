import { useUserStore } from "@/stores/userStore";
import { useProfileStore } from "@/stores/profileStore";

export const createUserProfileAndSetInState = async (
  profileType,
  profileObject
) => {
  const userStore = useUserStore();

  const profileStore = useProfileStore();

  try {
    const { $expressUserBackendService, $expressAuthBackendService } =
      useNuxtApp();

    const response = await $expressAuthBackendService.verifyToken();

    const { id } = response;

    const { savedProfile, updatedUser } =
      await $expressUserBackendService.createUserProfile({
        type: profileType,
        userId: id,
        data: profileObject,
      });

    userStore.setUser(updatedUser);
    profileStore.addProfile(savedProfile);
    profileStore.selectProfile(savedProfile.type);

    return { savedProfile, updatedUser };
  } catch (error) {
    if (error.type == "InvalidTokenError" || error.message.includes("token")) {
      await navigateTo("/auth/login");
    }

    if (error.type == "UserExistenceError") {
      await navigateTo("/auth/register");
    }

    throw error;
  }
};
