import { defineStore } from "pinia";
import {
  checkFormEmail,
  checkRoomNumber,
  checkOfficeNumber,
  checkFormPassword,
  checkFormLastName,
  checkFormFirstName,
  checkConfirmPassword,
} from "~/utils/formValidation";

export const useLogInStore = defineStore("logIn", () => {
  // Toggles a loader for trying to signin/login
  const tryingToSignIn = ref(false);

  // Holds the data emitted from the Form Field component Signup and Login Form
  const formState = reactive({
    email: undefined,
    password: undefined,
    firstName: undefined,
    lastName: undefined,
    password: undefined,
    confirmPassword: undefined,
  });

  // Holds the data emitted from the Form Field component in Additional Details Form
  const additionalFormState = reactive({
    hostelList: ["Atuwase Hall", "Glenn Borris", "Jehovah Shammah"],
    genderList: ["Male", "Female"],
    roleList: ["Delivery Person", "Consumer"],
    collegeList: ["COLNAS", "COLCOM"],
    college: "COLNAS",
    gender: "Male",
    role: "Consumer",
    hostel: "Atuwase Hall",
    roomNumber: undefined,
    officeNumber: undefined,
  });

  // Toggle additional form and lecturer only form fields
  const showAdditionalForm = ref(false);
  const showLecturerFields = ref(false);

  // Gets passed dowm to Form Field component and displays the errors if any
  const error = ref({
    errorMessage: "",
    inputName: "",
    errorList: [],
  });

  // Displays error
  const displayError = (errorMessage, inputName, errorList) => {
    error.value = {
      errorMessage: errorMessage,
      inputName: inputName,
      ...(errorList && { errorList: errorList }),
    };
    // In a case where a user proceeds to the additional form without inputting correct details in the previous form, this would return them back to the previous form to correct their details
    if (inputName !== "roomNumber") {
      showAdditionalForm.value = false;
    }
  };

  // Clears any error
  const clearError = () => {
    error.value.errorMessage = "";
    error.value.inputName = "";
    error.value.errorList = [];
    signUpLogInErrors.value = "";
  };

  // Maintains whether the signup page is still being displayed or not
  const signupPage = ref(false);

  // Displays any errors associated with signup or login
  const signUpLogInErrors = ref("");

  // Validate the form values before attempting to signup a user
  const checkDetails = (lecturer) => {
    // Clears previous error message before displaying new ones
    clearError();

    // Checks the email
    if (checkFormEmail(formState.email) !== "") {
      displayError(checkFormEmail(formState.email), "email");
      return;
    }

    // Checks the firstname
    if (checkFormFirstName(formState.firstName) !== "") {
      displayError(checkFormFirstName(formState.firstName), "firstName");
      return;
    }

    // Checks the lastname
    if (checkFormLastName(formState.lastName) !== "") {
      displayError(checkFormLastName(formState.lastName), "lastName");
      return;
    }

    // Checks the password
    if (checkFormPassword(formState.password) !== "") {
      // Checks if error is that a stronger password is required
      if (checkFormPassword(formState.password) == "stronger") {
        displayError("Please enter a stronger password", "password", [
          "Password must be eight characters or more.",
          "Password must have a minimum of:",
          "One uppercase character",
          "One lowercase character",
          "One digit and one special character.",
        ]);
      } else {
        // Any other password relate errors
        displayError(checkFormPassword(formState.password), "password");
      }
      return;
    }

    // Checks the confirm password
    if (
      checkConfirmPassword(formState.password, formState.confirmPassword) !== ""
    ) {
      displayError(
        checkConfirmPassword(formState.password, formState.confirmPassword),
        "confirmPassword"
      );
      return;
    }

    // Checks the room number
    if (checkRoomNumber(additionalFormState.roomNumber) !== "" && !lecturer) {
      displayError(
        checkRoomNumber(additionalFormState.roomNumber),
        "roomNumber"
      );
      return;
    }

    // Checks the office number
    if (
      checkOfficeNumber(additionalFormState.officeNumber) !== "" &&
      lecturer
    ) {
      displayError(
        checkOfficeNumber(additionalFormState.OfficeNumber),
        "roomNumber"
      );
      return;
    }

    return true;
  };

  // Toggle additional form for users who sign up manually
  const toggleNextForm = () => {
    showAdditionalForm.value = !showAdditionalForm.value;
    clearError();
  };

  // Toggles the sign up or log in form
  const toggleAction = () => {
    clearError();
    signUpLogInErrors.value = "";
    signupPage.value = !signupPage.value;
    if (showAdditionalForm.value) {
      showAdditionalForm.value = false;
    }
  };

  return {
    formState,
    additionalFormState,
    showAdditionalForm,
    showLecturerFields,
    error,
    signupPage,
    signUpLogInErrors,
    tryingToSignIn,
    displayError,
    clearError,
    checkDetails,
    toggleNextForm,
    toggleAction,
  };
});
