import { defineStore } from "pinia";

export const useProductStore = defineStore("product", () => {
  const productsForm = reactive({
    name: undefined,
    description: undefined,
    price: undefined,
    quantityAvailable: undefined,
    productType: undefined,
    productTypeList: ["Food", "Beverage", "Snack", "Other"],
  });

  return { productsForm };
});
