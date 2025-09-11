import { useUserStore } from "@/stores/userStore";
import { useProfileStore } from "@/stores/profileStore";
import { updateStoredUserProfile } from "../usecases/updateStoredUserProfile";

export const updateUserProfile = async ({ profileType, profileId, data }) => {
  const profileStore = useProfileStore();

  try {
    const { $expressUserBackendService, $expressAuthBackendService } =
      useNuxtApp();

    const response = await $expressAuthBackendService.verifyToken();

    const { id } = response;

    var updatedUserProfile = await $expressUserBackendService.updateUserProfile(
      {
        userId: id,
        profileType,
        profileId,
        data,
      }
    );

    profileStore.updateProfile(profileId, updatedUserProfile);
  } catch (error) {
    if (error.type == "InvalidTokenError" || error.message.includes("token")) {
      await navigateTo("/auth/login");
    }

    if (error.type == "UserExistenceError") {
      await navigateTo("/auth/register");
    }

    throw error;
  }

  try {
    await updateStoredUserProfile(updatedUserProfile.id, updatedUserProfile);
  } catch (error) {
    throw error;
  }
};
