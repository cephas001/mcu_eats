import { navigateTo } from "nuxt/app";

export const storeSelectedProfileWithTypeUsingUseCase = async (type) => {
  try {
    const { $selectUserProfileUseCase } = useNuxtApp();
    await $selectUserProfileUseCase(type);
  } catch (error) {
    throw error;
  }
};
