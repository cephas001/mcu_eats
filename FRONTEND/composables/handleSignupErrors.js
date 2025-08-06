import { useLogInStore } from "@/stores/logInStore";
import { storeToRefs } from "pinia";

export const handleSignupErrors = (error) => {
  const logInStore = useLogInStore();
  const { displayError, clearError } = logInStore;
  const { signUpErrors } = storeToRefs(logInStore);

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

  signUpErrors.value = "An unexpected error occurred";
};
