import { defineStore } from "pinia";
import { useMessagesStore } from "./messagesStore";

export const useProfileStore = defineStore("profile", () => {
  const profiles = ref(null);
  const selectedProfile = ref(null);
  const isGuest = ref(false);

  const {
    $expressAuthBackendService,
    $expressUserBackendService,
    $useIndexedDBUserRepo,
    $useIndexedDBProfileRepo,
    $useIndexedDBMessageRepo,
  } = useNuxtApp();

  const messagesStore = useMessagesStore();

  const clearProfiles = () => {
    profiles.value = null;
    // await $useIndexedDBProfileRepo.clearProfiles();
  };

  const getProfile = (type) => {
    return profiles?.value.find((profile) => profile.type === type);
  };

  const getProfiles = () => {
    return profiles.value;
  };

  const setProfiles = (profilesData) => {
    profiles.value = profilesData;
  };

  const setSelectedProfile = (profile) => {
    selectedProfile.value = profile;
  };

  const addProfile = (profile) => {
    if (!profiles.value) profiles.value = [];
    setProfiles([...profiles.value, profile]);
  };

  const getSelectedProfile = () => {
    if (isGuest.value) return null;
    return selectedProfile.value;
  };

  const selectProfile = (profileType) => {
    try {
      const existingProfile = profiles.value.find(
        (profile) => profile.type === profileType
      );

      if (!existingProfile) return null;

      setSelectedProfile(existingProfile);
    } catch (error) {
      throw error;
    }
  };

  return {
    addProfile,
    setProfiles,
    getSelectedProfile,
    selectProfile,
    setSelectedProfile,
    getProfile,
    getProfiles,
    clearProfiles,
    profiles,
  };
});
