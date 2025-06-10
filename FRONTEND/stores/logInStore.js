import { defineStore } from "pinia";

export const useLogInStore = defineStore(
  "logIn",
  () => {
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
      if (inputName !== "roomNumber" && inputName !== "officeNumber") {
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

    // Toggle additional form for users who sign up manually
    const toggleNextForm = () => {
      signupPage.value = true;
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

    // Hides the 'click here to go back' if user gets redirected from Google or Facebook authentication and also if the users gets to the additional form during manual sign up
    const hideOptionToGoBack = ref(false);

    return {
      formState,
      additionalFormState,
      showAdditionalForm,
      showLecturerFields,
      error,
      signupPage,
      signUpLogInErrors,
      tryingToSignIn,
      hideOptionToGoBack,
      displayError,
      clearError,
      toggleNextForm,
      toggleAction,
    };
  },
  {
    persist: {
      storage: sessionStorage,
    },
  }
);
