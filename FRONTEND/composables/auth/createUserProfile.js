import { useUserStore } from "@/stores/userStore";
import { useProfileStore } from "@/stores/profileStore";

export const createUserProfile = async (profileType, profileToStore) => {
  const userStore = useUserStore();
  const profileStore = useProfileStore();

  try {
    const {
      $consumerApiService,
      $deliverypersonApiService,
      $vendorApiService,
    } = useNuxtApp();

    let createdProfile = null;
    let userToStore = null;

    if (profileType == "consumer") {
      const { savedProfile, updatedUser } =
        await $consumerApiService.createConsumer(profileToStore);

      createdProfile = savedProfile;
      userToStore = updatedUser;
    } else if (profileType == "delivery_person") {
      const { savedProfile, updatedUser } =
        await $deliverypersonApiService.createDeliveryPerson(profileToStore);

      createdProfile = savedProfile;
      userToStore = updatedUser;
    } else if (profileType == "vendor") {
      const { savedProfile, updatedUser } =
        await $vendorApiService.createVendor(profileToStore);

      createdProfile = savedProfile;
      userToStore = updatedUser;
    } else {
      throw new Error("Invalid profile type");
    }

    if (!userToStore || !createdProfile) return;
    console.log(userToStore, createdProfile);
    userStore.setUser(userToStore);
    profileStore.addProfile(createdProfile);
    profileStore.selectProfile(createdProfile.type);

    return { createdProfile, userToStore };
  } catch (error) {
    console.log(error);

    if (error.type === "InvalidTokenError" || error.message.includes("token")) {
      await navigateTo("/auth/login");
    }

    if (error.type === "UserExistenceError") {
      await navigateTo("/auth/register");
    }

    throw error;
  }
};
