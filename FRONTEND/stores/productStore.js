import { defineStore } from "pinia";
import { ref } from "vue";

export const useProductStore = defineStore("product", () => {
  const productsForm = reactive({
    name: undefined,
    description: undefined,
    price: undefined,
    quantityAvailable: undefined,
    category: undefined,
    productCategoryList: ["Food", "Beverage", "Snack", "Other"],
    isAvailableList: ["Yes", "No"],
    available: undefined,
  });

  const showAddProductForm = ref(false);

  const productCreationError = ref("");

  return { productsForm, showAddProductForm,productCreationError };
});
