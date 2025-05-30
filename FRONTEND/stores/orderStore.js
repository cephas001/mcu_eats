import { defineStore } from "pinia";

export const useOrderStore = defineStore("order", () => {
  const totalPrice = ref(0);
  const viewOrdersBtn = ref(false);
  const selectedType = ref({});

  return {
    totalPrice,
    viewOrdersBtn,
    selectedType,
  };
});
