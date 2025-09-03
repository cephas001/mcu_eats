import { useLogInStore } from "@/stores/logInStore";
import { storeToRefs } from "pinia";

export const handleUserRegistrationErrors = (error) => {
  const logInStore = useLogInStore();
  const { displayError, clearError } = logInStore;
  const { registrationErrors } = storeToRefs(logInStore);

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

  registrationErrors.value = "An unexpected error occurred";
};
