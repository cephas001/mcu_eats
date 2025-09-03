import { setUserAndProfiles } from "../state/setUserAndProfiles";
import { setSelectedProfile } from "../state/setSelectedProfile";

export const retrieveUserAndProfiles = async (userId) => {
  try {
    const {
      $retrieveUserByIdUseCase,
      $retrieveUserProfilesUseCase,
      $retrieveUserSelectedProfileUseCase,
    } = useNuxtApp();

    const user = await $retrieveUserByIdUseCase(userId);
    const profiles = await $retrieveUserProfilesUseCase(userId);

    setUserAndProfiles(user, profiles, false);

    const selectedProfile = await $retrieveUserSelectedProfileUseCase(userId);

    setSelectedProfile(selectedProfile.type);
  } catch (error) {
    throw error;
  }
};
