import { useLogInStore } from "@/stores/logInStore";
import { storeToRefs } from "pinia";

export const handleProfileCreationErrors = (error) => {
  const logInStore = useLogInStore();
  const { displayError, clearError } = logInStore;
  const { profileRegistrationErrors } = storeToRefs(logInStore);

  clearError();

  if (error.type == "ValidationError") {
    if (error.errorList) {
      const { inputName, errorMessage } = error.errorList[0];
      displayError(errorMessage, inputName.split(".")[1]);
    } else {
      displayError(error.message, error.inputName);
    }

    return;
  }

  if (error.type == "ProfileExistenceError") {
    profileRegistrationErrors.value = error.message;
    return;
  }

  if (error.type == "UnauthorizedError") {
    profileRegistrationErrors.value = error.message;
    return;
  }

  if (error.type == "TokenExistenceError") {
    return navigateTo("/auth/login");
  }

  profileRegistrationErrors.value = "An unexpected error occurred";
};
