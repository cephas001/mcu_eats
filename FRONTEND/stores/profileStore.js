import { defineStore } from "pinia";
import { useMessagesStore } from "./messagesStore";

export const useProfileStore = defineStore("profile", () => {
  const profiles = ref(null);
  const selectedProfile = ref(null);

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
    if (!profiles.value) profiles.value = [profile];
    setProfiles([...profiles.value, profile]);
  };

  const getSelectedProfile = () => {
    return selectedProfile.value;
  };

  const selectProfile = (profileType) => {
    try {
      if (!profiles.value || profiles.value?.length == 0) {
        return null;
      }

      const existingProfile = profiles.value.find(
        (profile) => profile.type === profileType
      );

      if (!existingProfile) return null;

      setSelectedProfile(existingProfile);

      return existingProfile;
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
    selectedProfile,
  };
});
