import { defineStore, storeToRefs } from "pinia";
import { useMessagesStore } from "./messagesStore";

export const useUserStore = defineStore("user", () => {
  const user = ref(null);
  const isGuest = ref(false);

  const {
    $expressAuthBackendService,
    $expressUserBackendService,
    $useIndexedDBUserRepo,
  } = useNuxtApp();

  const messagesStore = useMessagesStore();
  const { messagesTypes } = storeToRefs(messagesStore);

  const setUser = (newUser) => {
    user.value = newUser;
    messagesStore.clearMessages(messagesTypes.value[0]);
    setGuest(false);
  };

  const clearUser = () => {
    user.value = null;
    // await $useIndexedDBUserRepo.clearUser();
  };

  const setProfiles = (profilesData) => {
    // if (!user.value) return;
    profiles.value = profilesData;
  };

  const setGuest = (guestOrNot) => {
    isGuest.value = guestOrNot;
  };

  const checkGuest = () => {
    return isGuest.value;
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

  const getUser = () => {
    try {
      if (isGuest.value) return null;
      return user.value;
    } catch (error) {
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

  return {
    setUser,
    fetchUser,
    updateUser,
    clearUser,
    getUser,
    setGuest,
    checkGuest,
    user,
  };
});
