export const storeUserAndProfiles = async (user, profiles) => {
  const { $storeUserUseCase, $storeUserProfilesUseCase } = useNuxtApp();
  try {
    await $storeUserUseCase(user);
    await $storeUserProfilesUseCase(profiles);
  } catch (error) {
    throw error;
  }
};
