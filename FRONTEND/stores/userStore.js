import { defineStore } from "pinia";
import { useMessagesStore } from "./messagesStore";

export const useUserStore = defineStore("user", () => {
  const user = ref(null);
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

  const setUser = (newUser) => {
    user.value = newUser;
    setGuest(false);
    // await $useIndexedDBMessageRepo.clearMessages("user_authentication");
  };

  const clearUser = () => {
    user.value = null;
    // await $useIndexedDBUserRepo.clearUser();
  };

  const clearProfiles = () => {
    profiles.value = null;
    // await $useIndexedDBProfileRepo.clearProfiles();
  };

  const setProfiles = (profilesData) => {
    // if (!user.value) return;
    profiles.value = profilesData;
  };

  const setSelectedProfile = (profile) => {
    // if (!user.value) return;
    selectedProfile.value = profile;
  };

  const addProfile = (profile) => {
    // if (!user.value) return;
    // if (!profiles.value) return;
    setProfiles([...profiles.value, profile]);
  };

  const setGuest = (guestOrNot) => {
    isGuest.value = guestOrNot;
  };

  const storeUser = async (userData) => {
    try {
      await $useIndexedDBUserRepo.storeUser(userData);
    } catch (error) {
      throw error;
    }
  };

  const storeProfiles = async (profilesData) => {
    try {
      await $useIndexedDBProfileRepo.storeProfiles(profilesData);
    } catch (error) {
      throw error;
    }
  };

  const fetchUser = async () => {
    try {
      if (isGuest.value) return null;

      // const messages = await $useIndexedDBMessageRepo.getMessages(
      //   "user_authentication"
      // );
      const messages = messagesStore.getMessages("user_authentication");

      if (messages.length > 0) return null;

      const fetchedUser = await $expressAuthBackendService.login();

      if (!fetchedUser) return null;

      const profiledIds = fetchedUser.profiles.map(
        (profile) => profile.profileId
      );

      const profilesData = await $expressUserBackendService.getProfilesData(
        profiledIds
      );

      setUser(fetchedUser);
      setProfiles(profilesData);

      return { user: fetchedUser, profiles: profilesData };
    } catch (error) {
      clearUser();
      clearProfiles();

      if (
        (error.type == "ValidationError" || error.type == "UnexpectedError") &&
        !isGuest.value
      ) {
        setGuest(true);
        return;
      }

      if (error.type == "InvalidTokenError") {
        messagesStore.addMessage({
          type: "user_authentication",
          text: "Please login",
        });
        // await $useIndexedDBMessageRepo.saveMessage(
        //   "Please login",
        //   "user_authentication"
        // );
        return;
      }

      if (error.type == "UserExistenceError") {
        messagesStore.addMessage({
          type: "user_authentication",
          text: "Please login to finish registration",
        });
        // await $useIndexedDBMessageRepo.saveMessage(
        //   "Please login to finish registration",
        //   "user_authentication"
        // );
        return;
      }

      if (error.type == "ProfileExistenceError") {
        messagesStore.addMessage({
          type: "user_authentication",
          text: "Please login to finish registration",
        });
        // await $useIndexedDBMessageRepo.saveMessage(
        //   "Please login to finish registration",
        //   "user_authentication"
        // );
        return;
      }

      if (error.type == "UnexpectedError") {
        messagesStore.addMessage({
          type: "user_authentication",
          text: "Please retry login",
        });
        // await $useIndexedDBMessageRepo.saveMessage(
        //   "Please retry login",
        //   "user_authentication"
        // );
        return;
      }

      throw error;
    }
  };

  const getUser = async () => {
    try {
      if (isGuest.value) return null;

      if (user.value && profiles.value) return user.value;

      const localUser = await $useIndexedDBUserRepo.getUser();
      if (localUser) setUser(localUser);

      const storedProfiles = await $useIndexedDBProfileRepo.getProfiles();

      if (storedProfiles) {
        setProfiles(storedProfiles);
        return localUser;
      }

      try {
        const data = await fetchUser();
        if (!data) return null;
        const { user, profiles } = data;
        return { user, profiles };
      } catch (error) {
        throw error;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const updateUser = async (userId, newUserData) => {
    try {
      const user = await $expressUserBackendService.updateUser(
        userId,
        newUserData
      );

      setUser(user);
      await $useIndexedDBUserRepo.storeUser(user);

      return user;
    } catch (error) {
      throw error;
    }
  };

  const getSelectedProfile = async () => {
    if (isGuest.value) return null;
    if (selectedProfile.value) return selectedProfile.value;

    const selectedProfileIndexedDB =
      await $useIndexedDBProfileRepo.getSelectedProfile();

    if (selectedProfileIndexedDB) {
      setSelectedProfile(selectedProfileIndexedDB);
    }

    return selectedProfileIndexedDB;
  };

  const selectProfile = async (profileType) => {
    try {
      const existingProfile = profiles.value.find(
        (profile) => profile.type === profileType
      );
      if (!existingProfile) return null;

      setSelectedProfile(existingProfile);

      const selectedProfile = await $useIndexedDBProfileRepo.selectProfile(
        profileType
      );

      if (selectedProfile) {
        return selectedProfile;
      } else {
        return existingProfile;
      }
    } catch (error) {
      throw error;
    }
  };

  return {
    setUser,
    fetchUser,
    updateUser,
    clearUser,
    getUser,
    setGuest,
    addProfile,
    setProfiles,
    getSelectedProfile,
    selectProfile,
    user,
  };
});
