import { defineStore } from "pinia";

export const useMessagesStore = defineStore("messages", () => {
  const messages = ref(null);

  const messagesTypes = ref(["user_authentication"]);

  const setMessages = (newMessages) => {
    messages.value = newMessages;
  };

  const addMessage = (messageObject) => {
    if (!messages.value) {
      messages.value = [];
    }
    messages.value.push(messageObject);
  };

  const clearMessages = (type) => {
    if (!type) {
      messages.value = [];
      return;
    }
    if (!messages.value) return;
    messages.value = messages.value?.filter((message) => message.type !== type);
  };

  const getMessages = (type) => {
    if (!messages.value) {
      return [];
    }
    if (type) {
      return messages.value.filter((message) => message.type === type);
    }
    return messages.value || [];
  };

  return {
    messages,
    messagesTypes,
    setMessages,
    addMessage,
    clearMessages,
    getMessages,
  };
});
