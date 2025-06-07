import { useLogInStore } from "@/stores/logInStore";

export function useFormValidationMethods() {
  const { formState, additionalFormState, displayError } = useLogInStore();

  // Validates email
  const checkFormEmail = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (formState.email == "" || formState.email == undefined) {
      displayError("Please enter an email address", "email");
      return;
    }
    if (!emailRegex.test(formState.email)) {
      displayError("Please enter a valid email address", "email");
      return;
    }
  };

  // Validates first name
  const checkFormFirstName = () => {
    const nameRegex = /^[a-zA-z]+$/;

    if (formState.firstName == "" || formState.firstName == undefined) {
      displayError("Please enter a first name", "firstName");
      return;
    }
    if (!nameRegex.test(formState.firstName)) {
      displayError("Please enter a valid first name", "firstName");
      return;
    }
  };

  // Validates last name
  const checkFormLastName = () => {
    const nameRegex = /^[a-zA-z]+$/;

    if (formState.lastName == "" || formState.lastName == undefined) {
      displayError("Please enter a last name", "lastName");
      return;
    }
    if (!nameRegex.test(formState.lastName)) {
      displayError("Please enter a valid last name", "lastName");
      return;
    }
  };

  // Validates password
  const checkFormPassword = () => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (formState.password == "" || formState.password == undefined) {
      displayError("Please enter a password", "password");
      return;
    }
    if (!passwordRegex.test(formState.password)) {
      displayError("Please enter a stronger password", "password", [
        "Password must be eight characters or more.",
        "Password must have a minimum of:",
        "One uppercase character",
        "One lowercase character",
        "One digit and one special character.",
      ]);
      return;
    }
  };

  // Validates confirm password
  const checkConfirmPassword = () => {
    if (
      formState.confirmPassword == "" ||
      formState.confirmPassword == undefined
    ) {
      displayError("Please enter your password again", "confirmPassword");
      return;
    }
    if (formState.password !== formState.confirmPassword) {
      displayError("Passwords do not match", "confirmPassword");
      return;
    }
  };

  // Validates room number
  const checkRoomNumber = () => {
    const roomNumberRegex = /^\d+$/;
    if (
      additionalFormState.roomNumber == "" ||
      additionalFormState.roomNumber == undefined
    ) {
      displayError("Please enter a room number", "roomNumber");
      return;
    }
    if (!roomNumberRegex.test(additionalFormState.roomNumber)) {
      displayError("Please enter a valid room number", "roomNumber");
      return;
    }
  };

  // Validates office number
  const checkOfficeNumber = () => {
    const officeNumberRegex = /^\d+$/;
    if (
      additionalFormState.officeNumber == "" ||
      additionalFormState.officeNumber == undefined
    ) {
      displayError("Please enter an office number", "officeNumber");
      return;
    }
    if (!officeNumberRegex.test(additionalFormState.officeNumber)) {
      displayError("Please enter a valid office number", "officeNumber");
      return;
    }
  };

  return {
    checkFormEmail,
    checkFormFirstName,
    checkFormLastName,
    checkFormPassword,
    checkConfirmPassword,
    checkRoomNumber,
    checkOfficeNumber,
  };
}
