export const storeUserAndProfiles = async (user, profiles) => {
  const { $CreateUserUseCase, $CreateUserProfilesUseCase } = useNuxtApp();
  try {
    await $CreateUserUseCase(user);
    await $CreateUserProfilesUseCase(user?.id, profiles);
  } catch (error) {
    throw error;
  }
};
