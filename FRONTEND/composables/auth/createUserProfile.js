import { useUserStore } from "@/stores/userStore";
import { useProfileStore } from "@/stores/profileStore";

export const createUserProfile = async (profileType, profileObject) => {
  const userStore = useUserStore();

  const profileStore = useProfileStore();
  try {
    const { $userApiService, $authApiService } = useNuxtApp();

    const response = await $authApiService.verifyToken();

    const { id } = response;

    const { createdProfile, updatedUser } =
      await $userApiService.createUserProfile({
        type: profileType,
        userId: id,
        ...profileObject,
      });

    userStore.setUser(updatedUser);
    profileStore.addProfile(createdProfile);
    profileStore.selectProfile(createdProfile.type);

    return { createdProfile, updatedUser };
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
};
