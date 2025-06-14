import { defineStore } from "pinia";

export const useCardStore = defineStore("card", () => {
  const cardFormState = reactive({
    cardNumber: undefined,
    cardExpiryDate: undefined,
    cardCVV: undefined,
  });

  return {
    cardFormState,
  };
});
