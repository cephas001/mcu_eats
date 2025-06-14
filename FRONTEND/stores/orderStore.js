import { defineStore } from "pinia";

export const useOrderStore = defineStore(
  "order",
  () => {
    return {};
  },
  {
    persist: {
      storage: localStorage,
    },
  }
);
