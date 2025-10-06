import { useAuthStore } from "@/stores/authStore";
import { storeToRefs } from "pinia";

export const handleProfileCreationErrors = (error) => {
  const authStore = useAuthStore();
  const { displayError, clearError } = authStore;
  const { profileRegistrationErrors } = storeToRefs(authStore);

  clearError();

  if (error.type == "ValidationError") {
    if (error.errorList) {
      const { inputName, errorMessage } = error.errorList[0];
      displayError(
        errorMessage,
        inputName.includes(".") ? inputName.split(".")[0] : inputName
      );
    } else {
      displayError(error.message, error.inputName);
    }

    return;
  }

  if (error.type == "ProfileExistenceError") {
    profileRegistrationErrors.value = error.message + ". Please login instead.";
    return;
  }

  if (error.type == "UnauthorizedError") {
    profileRegistrationErrors.value = error.message;
    return;
  }

  if (error.type == "TokenExistenceError") {
    return navigateTo("/auth/login");
  }

  profileRegistrationErrors.value =
    "An unexpected error occurred. Please try again later.";
};
