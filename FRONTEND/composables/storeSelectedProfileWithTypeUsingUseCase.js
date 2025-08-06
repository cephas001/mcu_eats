import { navigateTo } from "nuxt/app";

export const storeSelectedProfileWithTypeUsingUseCase = async (type) => {
  try {
    const { $selectUserProfileUseCase } = useNuxtApp();
    switch (type) {
      case "Consumer":
        await $selectUserProfileUseCase("consumer");
        break;
      case "Delivery Person":
        await $selectUserProfileUseCase("delivery_person");
        break;
      case "Vendor":
        await $selectUserProfileUseCase("vendor");
        break;
      default:
        return;
    }
  } catch (error) {
    throw error;
  }
};
