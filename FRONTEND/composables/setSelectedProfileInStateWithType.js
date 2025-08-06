import { useProfileStore } from "@/stores/profileStore";

export const setSelectedProfileInStateWithType = (type) => {
  const profileStore = useProfileStore();

  try {
    switch (type) {
      case "Consumer":
        const consumer_profile = profileStore.selectProfile("consumer");
        if (!consumer_profile) {
          throw new Error("Profile does not exist");
        }
        break;
      case "Delivery Person":
        const delivery_profile = profileStore.selectProfile("delivery_person");
        if (!delivery_profile) {
          throw new Error("Profile does not exist");
        }
        break;
      case "Vendor":
        const vendor_profile = profileStore.selectProfile("vendor");
        if (!vendor_profile) {
          throw new Error("Profile does not exist");
        }
        break;
      default:
        throw new Error("Profile does not exist");
    }
  } catch (error) {
    throw error;
  }
};
