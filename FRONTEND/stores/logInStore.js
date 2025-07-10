import { defineStore } from "pinia";

export const useLogInStore = defineStore("logIn", () => {
  // Toggles a loader for trying to signin/login
  const tryingToSignIn = ref(false);

  // Holds the data emitted from the Form Field component Signup and Login Form
  const signUpForm = reactive({
    email: undefined,
    password: undefined,
    name: undefined,
    password: undefined,
    confirmPassword: undefined,
    phoneNumber: undefined,
  });

  const loginForm = reactive({
    email: undefined,
    password: undefined,
  });

  const registrationForm = reactive({
    name: undefined,
    profileList: ["Consumer", "Delivery Person", "Vendor"],
    profileValue: undefined,
    phoneNumber: undefined,
  });

  const profileRegistrationForm = reactive({
    username: undefined,
    genderList: ["Male", "Female"],
    genderValue: undefined,
    roomNumber: undefined,
    officeNumber: undefined,
    college: undefined,
    department: undefined,
    matricNumber: undefined,
    vendorName: undefined,
    vendorTypeList: ["Restaurant", "Retailer", "Shop"],
    description: undefined,
    hostelList: ["Atuwase Hall", "Glenn Borris", "Jehovah Shammah"],
    hostelValue: undefined,
    categoryList: [
      "Pastries",
      "Snacks and Grills",
      "Stationeries",
      "Quick Meals",
      "Swallow and More",
      "Electronics",
    ],
    collegeList: ["COLNAS", "COLCOM"],
    collegeValue: undefined,
    categoryValue: undefined,
    openingTime: undefined,
    closingTime: undefined,
    address: undefined,
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

  // // Displays error
  // const displayError = (errorMessage, inputName, errorList) => {
  //   error.value = {
  //     errorMessage: errorMessage,
  //     inputName: inputName,
  //     ...(errorList && { errorList: errorList }),
  //   };
  //   // In a case where a user proceeds to the additional form without inputting correct details in the previous form, this would return them back to the previous form to correct their details
  //   if (inputName !== "roomNumber" && inputName !== "officeNumber") {
  //     showAdditionalForm.value = false;
  //   }
  // };

  // Displays error
  const displayError = (errorMessage, inputName, errorList) => {
    error.value = {
      errorMessage: errorMessage,
      inputName: inputName,
      ...(errorList && { errorList: errorList }),
    };
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

  // Display any errors associated with signup, registration
  const signUpErrors = ref("");
  const registrationErrors = ref("");
  const profileRegistrationErrors = ref("");
  const loginErrors = ref("");

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
    signUpForm,
    registrationForm,
    profileRegistrationForm,
    loginForm,
    additionalFormState,
    showAdditionalForm,
    showLecturerFields,
    error,
    signupPage,
    signUpLogInErrors,
    loginErrors,
    signUpErrors,
    tryingToSignIn,
    registrationErrors,
    hideOptionToGoBack,
    profileRegistrationErrors,
    displayError,
    clearError,
    toggleNextForm,
    toggleAction,
  };
});
