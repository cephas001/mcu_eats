import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {
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
    vendorTypeValue: undefined,
    vendorDescription: undefined,
    businessNumber: undefined,
    businessEmail: undefined,
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
    filteredDepartments: [],
    openingTime: undefined,
    closingTime: undefined,
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

  const creatingProfile = ref(false);

  const tryingToLogin = ref(false);
  const settingBrowserStorage = ref(false);

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

  const showStaffFields = ref(false);
  const showBrowserStorageErrorModal = ref(false);

  const deliveryPersonFormFieldsSchema = ref([
    {
      label: "Username",
      name: "username",
      type: "text",
      valueVariableName: "username",
      placeholder: "Choose a display name",
    },
    {
      label: "Gender",
      name: "gender",
      type: "select",
      listVariableName: "genderList",
      valueVariableName: "genderValue",
    },
    {
      label: "Hostel",
      name: "hostel",
      type: "select",
      listVariableName: "hostelList",
      valueVariableName: "hostelValue",
    },
    {
      label: "Room number",
      name: "roomNumber",
      type: "number",
      inputMode: "numeric",
      valueVariableName: "roomNumber",
      placeholder: "Your Room Number",
    },
    {
      label: "College",
      name: "college",
      type: "select",
      listVariableName: "collegeList",
      valueVariableName: "collegeValue",
    },
    {
      label: "Department",
      name: "department",
      type: "select",
      listVariableName: "filteredDepartments",
      valueVariableName: "departmentValue",
      dependentFieldName: "collegeValue",
    },
    {
      label: "Matric Number",
      name: "matricNumber",
      type: "number",
      valueVariableName: "matricNumber",
      placeholder: "Your Matric Number",
      dependentFieldName: "departmentValue",
    },
  ]);

  const consumerFormFieldsSchemaStaffs = ref([
    {
      label: "College",
      name: "college",
      type: "select",
      valueVariableName: "collegeValue",
      listVariableName: "collegeList",
    },
    {
      label: "Office Number",
      placeholder: "Your Office Number",
      name: "officeNumber",
      type: "number",
      inputMode: "numeric",
    },
  ]);

  const consumerFormFieldsSchemaStudents = ref([
    {
      label: "Hostel",
      name: "hostel",
      type: "select",
      valueVariableName: "hostelValue",
      listVariableName: "hostelList",
    },
    {
      label: "Room number",
      placeholder: "Your Room Number",
      name: "roomNumber",
      type: "number",
      valueVariableName: "roomNumber",
      inputMode: "numeric",
    },
  ]);

  const consumerFormFieldsSchemaGeneral = ref([
    {
      label: "Username",
      placeholder: "Choose a display name",
      name: "username",
      type: "text",
      valueVariableName: "username",
    },
    {
      label: "Gender",
      name: "gender",
      type: "select",
      valueVariableName: "genderValue",
      listVariableName: "genderList",
    },
  ]);

  const vendorFormFieldsSchemaOne = ref([
    {
      label: "Name",
      name: "vendorName",
      type: "text",
      valueVariableName: "vendorName",
      placeholder: "Enter your business name",
    },
    {
      label: "Type",
      name: "vendorType",
      type: "select",
      listVariableName: "vendorTypeList",
      valueVariableName: "vendorTypeValue",
    },
    {
      label: "Category",
      name: "category",
      type: "select",
      listVariableName: "categoryList",
      valueVariableName: "categoryValue",
    },
    {
      label: "Description",
      name: "description",
      type: "text",
      valueVariableName: "vendorDescription",
      placeholder: "Short description of the services you provide",
    },
  ]);

  const vendorFormFieldsSchemaTwo = ref([
    {
      label: "Phone Number",
      name: "businessNumber",
      type: "text",
      valueVariableName: "businessNumber",
      placeholder: "Your Business Phone Number",
    },
    {
      label: "Email",
      name: "businessEmail",
      type: "email",
      valueVariableName: "businessEmail",
      placeholder: "An email we can reach",
    },
    {
      label: "Address",
      name: "address",
      type: "text",
      valueVariableName: "address",
      placeholder: "Enter your business address",
    },
    {
      label: "Opening Time",
      name: "openingTime",
      type: "time",
      valueVariableName: "openingTime",
      placeholder: "What time do you open?",
    },
    {
      label: "Closing Time",
      name: "closingTime",
      type: "time",
      valueVariableName: "closingTime",
      placeholder: "What time do you close?",
    },
  ]);

  const vendorFormFieldsSchemaThree = ref([
    {
      label: "Brand Image",
      name: "image",
      valueVariableName: "image",
      fileUpload: true,
      acceptFormats: "image/*",
      description: "SVG, PNG, JPG or GIF",
      trailingIcon: "i-material-symbols-add-photo-alternate-outline",
    },
  ]);

  const loginFormSchema = ref([
    {
      label: "Email",
      placeholder: "Email",
      name: "email",
      type: "email",
      valueVariableName: "email",
    },
    {
      label: "Password",
      placeholder: "Password",
      name: "password",
      type: "password",
      valueVariableName: "password",
    },
  ]);

  const signupFormFieldsSchema = ref([
    {
      label: "Email",
      placeholder: "Email",
      name: "email",
      type: "email",
      valueVariableName: "email",
    },
    {
      label: "Password",
      placeholder: "Password",
      name: "password",
      type: "password",
      valueVariableName: "password",
    },
    {
      label: "Confirm Password",
      placeholder: "Confirm Password",
      name: "confirmPassword",
      type: "password",
      valueVariableName: "confirmPassword",
    },
  ]);

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
    creatingProfile,
    showStaffFields,
    settingBrowserStorage,
    tryingToLogin,
    showBrowserStorageErrorModal,
    deliveryPersonFormFieldsSchema,
    consumerFormFieldsSchemaGeneral,
    consumerFormFieldsSchemaStaffs,
    consumerFormFieldsSchemaStudents,
    vendorFormFieldsSchemaOne,
    vendorFormFieldsSchemaTwo,
    vendorFormFieldsSchemaThree,
    loginFormSchema,
    signupFormFieldsSchema,
    displayError,
    clearError,
  };
});
