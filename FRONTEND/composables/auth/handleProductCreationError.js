import { useAuthStore } from "@/stores/authStore";
import { useProductStore } from "@/stores/productStore";
import { storeToRefs } from "pinia";

export const handleProductCreationErrors = (error) => {
  const authStore = useAuthStore();
  const productStore = useProductStore();
  const { productCreationError } = storeToRefs(productStore);

  const { displayError, clearError } = authStore;

  clearError();

  if (error.type == "ValidationError") {
    if (error.errorList) {
      const { inputName, errorMessage } = error.errorList[0];
      displayError(errorMessage, inputName);
    } else {
      displayError(error.message, error.inputName);
    }

    return;
  }

  if (error.type == "InvalidCredentialsError") {
    productCreationError.value = error.message;

    return;
  }

  if (error.type == "InvalidTokenError") {
    navigateTo("/auth/login");
    return;
  }

  productCreationError.value =
    "An unexpected error occurred. Please try again later.";
};
