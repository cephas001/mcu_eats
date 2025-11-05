export const storeUserAndProfiles = async (user, profiles) => {
  const { $CreateUserUseCase, $CreateUserProfilesUseCase, $DeleteUserUseCase } =
    useNuxtApp();
  try {
    await $DeleteUserUseCase(null);
    await $CreateUserUseCase(user);
    await $CreateUserProfilesUseCase(user?.id, profiles);
  } catch (error) {
    throw error;
  }
};
