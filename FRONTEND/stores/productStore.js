import { useProfileStore } from "./profileStore";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useProductStore = defineStore("product", () => {
  const products = ref([]);
  const allProducts = ref([]);
  const archivedProducts = ref([]);
  const unarchivedProducts = ref([]);

  const profileStore = useProfileStore();
  const { $productApiService } = useNuxtApp();

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

  const setProducts = async () => {
    const vendorProfile = profileStore.getProfile("vendor");

    if (!vendorProfile) return;

    const vendorProducts = await $productApiService.getAllVendorProducts(
      vendorProfile.id
    );

    if (!vendorProducts) {
      return navigateTo("/?redirectTo='/vendor/products'");
    }

    archivedProducts.value = vendorProducts.archivedProducts;
    unarchivedProducts.value = vendorProducts.unarchivedProducts;
    allProducts.value = vendorProducts.allProducts;

    products.value = allProducts.value;
  };

  const filterProducts = async (productState) => {
    await setProducts();

    if (products.value.length === 0) return;

    switch (productState) {
      case "Archived":
        products.value = archivedProducts.value;
        break;
      case "Unarchived":
        products.value = unarchivedProducts.value;
        break;
      default:
        products.value = allProducts.value;
        break;
    }
  };

  return {
    productsForm,
    showAddProductForm,
    productCreationError,
    productsFilterForm,
    productsFilterFormSchema,
    products,
    filterProducts,
    setProducts,
  };
});
