import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/authStore";
import { useUserStore } from "@/stores/userStore";
import { useProfileStore } from "@/stores/profileStore";
import { storeUserAndProfiles } from "@/composables/usecases/storeUserAndProfiles";

export const storeUserAndProfilesAndRedirect = async (navigateToURL) => {
  const authStore = useAuthStore();
  const { showBrowserStorageErrorModal, settingBrowserStorage } =
    storeToRefs(authStore);

  const userStore = useUserStore();
  const profileStore = useProfileStore();

  try {
    settingBrowserStorage.value = true;

    await storeUserAndProfiles(userStore.getUser(), profileStore.getProfiles());

    await navigateTo(navigateToURL);
  } catch (error) {
    console.log(error);
    showBrowserStorageErrorModal.value = true;
  } finally {
    settingBrowserStorage.value = false;
  }
};
