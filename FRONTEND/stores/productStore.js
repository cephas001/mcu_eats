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
    productImageFile: null,
  });

  const showAddProductForm = ref(false);

  const productCreationError = ref("");

  const productsFilterForm = reactive({
    productState: undefined,
    productStateOptions: ["All", "Archived", "Unarchived"],
    isAvailable: undefined,
  });

  const productsFilterFormSchema = [
    {
      name: "productState",
      type: "select",
      valueVariableName: "productState",
      listVariableName: "productStateOptions",
    },
  ];

  return {
    productsForm,
    showAddProductForm,
    productCreationError,
    productsFilterForm,
    productsFilterFormSchema,
  };
});
