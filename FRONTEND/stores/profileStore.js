import { defineStore } from "pinia";

export const useProfileStore = defineStore("profile", () => {
  const profiles = ref(null);
  const selectedProfile = ref(null);
  const showSelectProfileModal = ref(false);

  const clearProfiles = () => {
    profiles.value = null;
    selectedProfile.value = null;
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
    if (!profiles.value) {
      profiles.value = [profile];
      return;
    }
    setProfiles([...profiles.value, profile]);
    console.log(profiles.value);
  };

  const getSelectedProfile = () => {
    return selectedProfile.value;
  };

  const updateProfile = (profileId, updatedUserProfile) => {
    profiles.value = profiles.value.map((profile) => {
      if (profile.id == profileId) {
        return updatedUserProfile;
      } else {
        return profile;
      }
    });
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
    updateProfile,
    profiles,
    selectedProfile,
    showSelectProfileModal,
  };
});
