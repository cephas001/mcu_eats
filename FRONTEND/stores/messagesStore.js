import { defineStore } from "pinia";

export const useMessagesStore = defineStore("messages", () => {
  const messages = ref(null);

  const setMessages = (newMessages) => {
    messages.value = newMessages;
  };

  const addMessage = (message, type) => {
    if (!messages.value) {
      messages.value = [];
    }
    messages.value.push({ message, type });
  };

  const clearMessages = (type) => {
    if (!type) {
      messages.value = [];
      return;
    }
    messages.value = messages.value.filter((message) => message.type !== type);
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
    setMessages,
    addMessage,
    clearMessages,
    getMessages,
  };
});
