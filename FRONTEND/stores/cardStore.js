import { defineStore } from "pinia";

export const useCardStore = defineStore("card", () => {
  // CHECK OUT USING MASKA FOR FORM FIELDS
  const cardFormState = reactive({
    cardNumber: undefined,
    cardExpiryDate: undefined,
    cardCVV: undefined,
  });

  return {
    cardFormState,
  };
});
