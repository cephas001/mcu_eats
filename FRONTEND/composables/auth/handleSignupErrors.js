import { useAuthStore } from "@/stores/authStore";
import { storeToRefs } from "pinia";

export const handleSignupErrors = (error) => {
  const authStore = useAuthStore();
  const { displayError, clearError } = authStore;
  const { signUpErrors } = storeToRefs(authStore);

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
    signUpErrors.value = error.message;
    return;
  }

  signUpErrors.value = "An unexpected error occurred. Please try again later.";
};
