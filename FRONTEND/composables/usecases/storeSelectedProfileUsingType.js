import { navigateTo } from "nuxt/app";

export const storeSelectedProfileUsingType = async (userId, type) => {
  try {
    const { $SelectUserProfileUseCase } = useNuxtApp();
    await $SelectUserProfileUseCase(userId, type);
  } catch (error) {
    throw error;
  }
};
