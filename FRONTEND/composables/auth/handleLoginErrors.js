import { useAuthStore } from "@/stores/authStore";
import { storeToRefs } from "pinia";

export const handleLoginErrors = (error) => {
  const authStore = useAuthStore();
  const { displayError, clearError } = authStore;
  const { loginErrors } = storeToRefs(authStore);

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
    loginErrors.value = error.message;

    return;
  }

  loginErrors.value = "An unexpected error occurred";
};
