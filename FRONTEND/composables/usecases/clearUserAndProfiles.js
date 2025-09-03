export const clearUserAndProfilesUsecase = async () => {
  const { $clearUserUseCase, $clearUserProfilesUseCase } = useNuxtApp();

  try {
    await $clearUserUseCase();
    await $clearUserProfilesUseCase();
  } catch (error) {
    throw error;
  }
};
