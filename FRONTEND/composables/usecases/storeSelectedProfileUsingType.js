import { navigateTo } from "nuxt/app";

export const storeSelectedProfileUsingType = async (type) => {
  try {
    const { $selectUserProfileUseCase } = useNuxtApp();
    await $selectUserProfileUseCase(type);
  } catch (error) {
    throw error;
  }
};
