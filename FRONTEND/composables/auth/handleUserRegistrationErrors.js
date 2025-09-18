import { useAuthStore } from "@/stores/authStore";
import { storeToRefs } from "pinia";

export const handleUserRegistrationErrors = (error) => {
  const authStore = useAuthStore();
  const { displayError, clearError } = authStore;
  const { registrationErrors } = storeToRefs(authStore);

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

  if (error.type == "UserExistenceError") {
    registrationErrors.value = error.message;
    return;
  }

  if (error.type == "InvalidTokenError") {
    return navigateTo("/auth/login");
  }

  registrationErrors.value =
    "An unexpected error occurred. Please try again later.";
};
