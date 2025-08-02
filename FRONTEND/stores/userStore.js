import { defineStore, storeToRefs } from "pinia";
import { useMessagesStore } from "./messagesStore";

export const useUserStore = defineStore("user", () => {
  const user = ref(null);
  const isGuest = ref(null);

  const { $expressUserBackendService, $useIndexedDBUserRepo } = useNuxtApp();

  const messagesStore = useMessagesStore();
  const { messagesTypes } = storeToRefs(messagesStore);

  const setUser = (newUser) => {
    user.value = newUser;
    messagesStore.clearMessages(messagesTypes.value[0]);
    setGuest(false);
  };

  const clearUser = () => {
    user.value = null;
  };

  const setGuest = (guestOrNot) => {
    isGuest.value = guestOrNot;
  };

  const checkGuest = () => {
    return isGuest.value;
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
    updateUser,
    clearUser,
    getUser,
    setGuest,
    checkGuest,
    user,
    isGuest,
  };
});
