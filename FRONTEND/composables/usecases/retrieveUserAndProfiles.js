import { setUserAndProfiles } from "../state/setUserAndProfiles";
import { setSelectedProfile } from "../state/setSelectedProfile";

export const retrieveUserAndProfiles = async (userId) => {
  try {
    const {
      $GetUserByIdUseCase,
      $GetUserProfilesUseCase,
      $GetSelectedProfileUseCase,
    } = useNuxtApp();

    const user = await $GetUserByIdUseCase(userId);
    const profiles = await $GetUserProfilesUseCase(userId);

    setUserAndProfiles(user, profiles, false);

    const selectedProfile = await $GetSelectedProfileUseCase(userId);

    setSelectedProfile(selectedProfile.type);
  } catch (error) {
    throw error;
  }
};
