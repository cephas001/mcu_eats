import { defineStore } from "pinia";

export const useLogInStore = defineStore("logIn", () => {
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
    categoryList: ["Student", "Staff", "Visitor"],
    categoryValue: undefined,
  });

  const profileRegistrationForm = reactive({
    username: undefined,
    genderList: ["Male", "Female"],
    genderValue: undefined,
    roomNumber: undefined,
    officeNumber: undefined,
    college: undefined,
    matricNumber: undefined,
    vendorName: undefined,
    vendorTypeList: ["Restaurant", "Retailer", "Shop"],
    vendorTypeValue: undefined, // PAUL USED AS VENDORTYPE
    description: undefined,
    vendorNumber: undefined,
    vendorEmail: undefined,
    vendorAddress: undefined,
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
    categoryValue: undefined,
    collegeList: ["COLHAS", "COLCOM"],
    collegeValue: undefined,
    openingTime: undefined,
    closingTime: undefined,
    address: undefined,
    departmentList: [
      {
        college: "COLCOM",
        departments: [
          "Computer Science",
          "Software Engineering",
          "Cyber Security",
        ],
      },
      {
        college: "COLHAS",
        departments: [
          "Nursing Science",
          "Medical Laboratory Sciences",
          "Public Health",
        ],
      },
      {
        college: "COLNAS",
        departments: ["Biochemistry", "Microbiology"],
      },
      {
        college: "COLHUM",
        departments: [
          "History and diplomatic studies",
          "English Language",
          "International Relations",
        ],
      },
      {
        college: "COSMAS",
        departments: ["Accounting", "Business Administration"],
      },
    ],
    departmentValue: undefined,
  });

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
  };

  // Display any errors associated with signup, registration
  const signUpErrors = ref("");
  const registrationErrors = ref("");
  const profileRegistrationErrors = ref("");
  const loginErrors = ref("");

  // Clears any error
  const clearError = () => {
    error.value.errorMessage = "";
    error.value.inputName = "";
    error.value.errorList = [];
    loginErrors.value = "";
    signUpErrors.value = "";
    registrationErrors.value = "";
    profileRegistrationErrors.value = "";
  };

  return {
    signUpForm,
    registrationForm,
    profileRegistrationForm,
    loginForm,
    error,
    loginErrors,
    signUpErrors,
    registrationErrors,
    profileRegistrationErrors,
    displayError,
    clearError,
  };
});
