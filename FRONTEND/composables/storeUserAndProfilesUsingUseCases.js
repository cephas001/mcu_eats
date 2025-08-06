import { useUserStore } from "@/stores/userStore";
import { useProfileStore } from "@/stores/profileStore";
import { storeToRefs } from "pinia";

export const storeUserAndProfilesUsingUseCases = async (
  profileTypeToSelect
) => {
  const userStore = useUserStore();
  const { user } = storeToRefs(userStore);

  const profileStore = useProfileStore();
  const { profiles } = storeToRefs(profileStore);

  try {
    if (!user?.value || !profiles?.value) return;

    const {
      $storeUserUseCase,
      $storeUserProfilesUseCase,
      $retrieveUserSelectedProfileUseCase,
      $selectUserProfileUseCase,
    } = useNuxtApp();

    await $storeUserUseCase(user.value);
    await $storeUserProfilesUseCase(profiles.value);

    if (profileTypeToSelect) {
      await $selectUserProfileUseCase(profileTypeToSelect);

      profileStore.selectProfile(profileTypeToSelect);

      return;
    }

    const selectedProfile = await $retrieveUserSelectedProfileUseCase(
      user.value.id
    );

    profileStore.setSelectedProfile(selectedProfile);
  } catch (error) {
    if (error.type === "ProfileExistenceError") {
      await navigateTo("/general/select-profile");
    }

    if (error.type === "ValidationError") {
      await navigateTo("/auth/logout");
    }

    throw error;
  }
};
