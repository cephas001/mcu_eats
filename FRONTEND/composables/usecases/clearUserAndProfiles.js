export const clearUserAndProfilesUsecase = async () => {
  const { $DeleteUserUseCase, $DeleteUserProfiles } = useNuxtApp();

  try {
    await $DeleteUserUseCase();
    await $DeleteUserProfiles();
  } catch (error) {
    throw error;
  }
};
