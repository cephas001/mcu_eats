import { useUserStore } from "@/stores/userStore";
import { useProfileStore } from "@/stores/profileStore";

export const processToken = async (token, callBack) => {
  try {
    const userStore = useUserStore();
    const profileStore = useProfileStore();

    const { $expressAuthBackendService, $expressUserBackendService } =
      useNuxtApp();

    await $fetch("/api/login", {
      method: "POST",
      body: {
        token,
      },
    });

    if (typeof callBack === "function") {
      await callBack();
      return;
    }

    const user = await $expressAuthBackendService.login(token);

    const profileIds = user.profiles.map((profile) => profile.profileId);

    const profilesData =
      await $expressUserBackendService.getProfilesDataByProfileIds(profileIds);

    userStore.setUser(user);
    profileStore.setProfiles(profilesData);
    profileStore.setSelectedProfile(profilesData[0]);
  } catch (error) {
    throw error;
  }
};
