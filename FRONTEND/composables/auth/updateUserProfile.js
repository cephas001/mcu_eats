import { useProfileStore } from "@/stores/profileStore";

export const updateUserProfile = async ({ profileType, profileId, data }) => {
  const profileStore = useProfileStore();
  const { $expressUserBackendService, $expressAuthBackendService } =
    useNuxtApp();

  try {
    const response = await $expressAuthBackendService.verifyToken();

    var { id } = response;

    var updatedUserProfile = await $expressUserBackendService.updateUserProfile(
      {
        userId: id,
        profileType,
        profileId,
        data,
      }
    );

    if (!updatedUserProfile)
      throw new Error("An error occurred while updating");

    profileStore.updateProfile(profileId, updatedUserProfile);
  } catch (error) {
    console.log(error);
    if (error.type == "InvalidTokenError" || error.message.includes("token")) {
      await navigateTo("/auth/login");
    }

    if (error.type == "UserExistenceError") {
      await navigateTo("/auth/register");
    }

    throw error;
  }

  try {
    var profiles = await $expressUserBackendService.getUserProfiles(id, [
      profileType,
    ]);
    if (!profiles) {
      throw new Error("Profile not fetched");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }

  const { $overwriteStoredUserProfileUseCase } = useNuxtApp();

  try {
    const newProfileValue = profiles[0];
    const profile = await $overwriteStoredUserProfileUseCase(
      profileId,
      newProfileValue
    );

    return profile;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
