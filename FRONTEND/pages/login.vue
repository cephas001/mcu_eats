<template>
  <section class="py-5 px-6">
    <div class="text-center mt-10 mb-5">
      <h1 class="font-bold text-2xl mb-3">Welcome</h1>
      <p class="text-md font-manrope tracking-tight">
        Continue with one of the following options
      </p>
    </div>

    <ErrorMessageFormDisplay
      :errorMessage="signUpLogInErrors"
      classList="text-center"
    />
    <!-- Signup and Login Form -->
    <UForm
      class="mb-5 flex flex-col gap-3"
      :class="[signUpLogInErrors != '' ? 'mt-4' : '']"
      :state="formState"
      v-if="!showAdditionalForm"
    >
      <CustomFormField
        labelText="Email"
        placeholder="Email"
        name="email"
        type="email"
        :state="formState"
        :error
        @update="formState.email = $event"
        @clearError="clearError"
      />
      <CustomFormField
        labelText="First Name"
        placeholder="First"
        name="firstName"
        type="text"
        :state="formState"
        v-if="signupPage"
        :error
        @update="formState.first = $event"
        @clearError="clearError"
      />
      <CustomFormField
        labelText="Last Name"
        placeholder="Last"
        name="lastName"
        type="text"
        :state="formState"
        v-if="signupPage"
        :error
        @update="formState.last = $event"
        @clearError="clearError"
      />
      <CustomFormField
        labelText="Password"
        placeholder="Password"
        name="password"
        type="password"
        :state="formState"
        :error
        @update="formState.password = $event"
        @clearError="clearError"
      />
      <CustomFormField
        labelText="Confirm Password"
        placeholder="Confirm Password"
        name="confirmPassword"
        type="password"
        :state="formState"
        :error
        v-if="signupPage"
        @update="formState.confirmPassword = $event"
        @clearError="clearError"
      />
      <button
        class="text-white rounded-md p-3 w-full text-center text-md bg-primary"
        @click="toggleForms"
      >
        {{ signupPage ? "Sign Up" : "Log In" }}
      </button>
    </UForm>

    <!-- Room Details / Additional Details Form -->
    <UForm
      class="mb-5 flex flex-col gap-3"
      :state="additionalFormState"
      v-if="showAdditionalForm && signupPage"
    >
      <p
        class="text-md font-manrope tracking-tight w-full text-center text-primary font-bold mb-2"
      >
        Almost there! <br />
        A few more information to get you started.
      </p>
      <!-- GENDER SELECT FIELD -->
      <CustomFormField
        labelText="Gender"
        name="gender"
        type="select"
        :state="additionalFormState"
        :items="additionalFormState.genderList"
        :error
        @update="additionalFormState.genderValue = $event"
        @clearError="clearError"
      />
      <!-- COLLEGE SELECT FIELD -->
      <CustomFormField
        labelText="College"
        name="college"
        type="select"
        :state="additionalFormState"
        :items="additionalFormState.collegeList"
        :error
        @update="additionalFormState.collegeValue = $event"
        @clearError="clearError"
        v-if="showLecturerField"
      />
      <!-- OFFICE NUMBER FIELD -->
      <CustomFormField
        labelText="Office Number"
        placeholder="Your Office Number"
        name="officeNumber"
        type="number"
        :state="additionalFormState"
        :error
        @update="additionalFormState.officeNumber = $event"
        @clearError="clearError"
        v-if="showLecturerField"
      />
      <!-- HOSTEL SELECT FIELD -->
      <CustomFormField
        labelText="Hostel"
        name="hostel"
        type="select"
        :state="additionalFormState"
        :items="additionalFormState.hostelList"
        :error
        @update="additionalFormState.hostelValue = $event"
        @clearError="clearError"
        v-if="!showLecturerField"
      />
      <!-- ROOM NUMBER FIELD -->
      <CustomFormField
        labelText="Room number"
        placeholder="Your Room Number"
        name="roomNumber"
        type="number"
        :state="additionalFormState"
        :error
        @update="additionalFormState.roomNumber = $event"
        @clearError="clearError"
        v-if="!showLecturerField"
      />
      <!-- ROLE SELECT FIELD -->
      <CustomFormField
        labelText="Role"
        name="role"
        type="select"
        :state="additionalFormState"
        :items="additionalFormState.roleList"
        :error
        @update="additionalFormState.roleValue = $event"
        @clearError="clearError"
        v-if="!showLecturerField"
      />
      <button
        type="sumbit"
        class="text-white rounded-md p-3 w-full text-center text-md"
        :class="[false ? 'bg-gray-400' : 'bg-primary']"
        @click="handleFormSubmit"
      >
        Finish
      </button>
      <p class="text-center">
        For {{ showLecturerField ? "students" : "lecturers" }}, please click
        <span
          class="text-primary"
          @click="showLecturerField = !showLecturerField"
          >here.</span
        >
      </p>
      <p class="text-center">
        Click <span class="text-primary" @click="toggleForms">here</span> to go
        back.
      </p>
    </UForm>

    <div class="mt-8 text-sm font-manrope tracking-tight">
      <p>
        This site is protected by reCAPTCHA and the Google
        <NuxtLink class="text-primary">Privacy Policy</NuxtLink> and
        <NuxtLink class="text-primary">Terms of Service</NuxtLink> apply
      </p>
    </div>

    <div class="mt-6 text-center">
      <p class="text-gray-600 mb-2">or with</p>
      <button
        class="flex border-1 border-gray-200 p-4 rounded-full w-full items-center justify-center gap-2 mb-3 font-semibold focus:bg-gray-100"
        @click="googleSignIn"
      >
        <img
          src="@/assets/images/google.73c708cb.svg"
          alt="Google Icon"
        />Google
      </button>
      <button
        class="flex border-1 border-gray-200 p-4 rounded-full w-full items-center justify-center gap-2 mb-3 font-semibold focus:bg-gray-100"
        @click="facebookSignIn"
      >
        <img
          src="@/assets/images/facebook.e4480188.svg"
          alt="Facebook Icon"
        />Facebook
      </button>
    </div>

    <div class="mt-6">
      <p
        class="text-center tracking-wide font-manrope"
        :class="[signupPage ? 'flex flex-col' : '']"
      >
        {{ signupPage ? "Already have an account?" : "No account? " }}
        <NuxtLink class="text-primary font-bold" @click="toggleAction">{{
          signupPage ? "Login here" : "Signup here"
        }}</NuxtLink>
      </p>
    </div>

    <div class="mt-8 text-gray-600 text-center font-manrope" v-if="signupPage">
      <p>
        By creating an account, you automatically accept our
        <NuxtLink to="/" class="font-poppins text-primary"
          >Terms of service</NuxtLink
        >,
        <NuxtLink class="font-poppins text-primary">Privacy Policy</NuxtLink>
        and
        <NuxtLink class="font-poppins text-primary">Cookies Policy</NuxtLink>
      </p>
    </div>
  </section>
</template>

<script setup>
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { reactive, watch } from "vue";
import {
  checkFormEmail,
  checkFormFirstName,
  checkFormLastName,
  checkFormPassword,
  checkConfirmPassword,
  checkRoomNumber,
} from "../utils/formValidation";
import { postNewUserToDB } from "../utils/postNewUserToDB";
import { useUserStore } from "@/stores/userStore";

// To reset the User state
const userStore = useUserStore();

// Check Utils
const { $storeToken } = useNuxtApp();
const { $firebaseAuth } = useNuxtApp();

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

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
const showAdditionalForm = ref(false);
const showLecturerField = ref(false);

// Gets passed dowm to Form Field component and displays the errors if any
const error = ref({
  errorMessage: "",
  inputName: "",
  errorList: [],
});
const clearError = () => {
  error.value.errorMessage = "";
  error.value.inputName = "";
  error.value.errorList = [];
};

const { y } = useScroll(window);
const signupPage = ref(true);

const signUpLogInErrors = ref("");

// Checks the form values before attempting to signup a user
const checkDetails = () => {
  // Clears previous error message before displaying new ones
  clearError();

  // Checks the email
  if (checkFormEmail(formState.email) !== "") {
    error.value = {
      errorMessage: checkFormEmail(formState.email),
      inputName: "email",
    };
    showAdditionalForm.value = false;
  } else if (checkFormFirstName(formState.firstName) !== "") {
    error.value = {
      errorMessage: checkFormFirstName(formState.firstName),
      inputName: "firstName",
    };
    showAdditionalForm.value = false;
  } else if (checkFormLastName(formState.lastName) !== "") {
    error.value = {
      errorMessage: checkFormLastName(formState.lastName),
      inputName: "lastName",
    };
    showAdditionalForm.value = false;
  } else if (checkFormPassword(formState.password) !== "") {
    if (checkFormPassword(formState.password) == "stronger") {
      error.value = {
        errorMessage: "Please enter a stronger password",
        inputName: "password",
        errorList: [
          "Password must be eight characters or more.",
          "Password must have a minimum of:",
          "One uppercase character",
          "One lowercase character",
          "One digit and one special character.",
        ],
      };
    } else {
      error.value = {
        errorMessage: checkFormPassword(formState.password),
        inputName: "password",
      };
    }
    showAdditionalForm.value = false;
  } else if (
    checkConfirmPassword(formState.password, formState.confirmPassword) !== ""
  ) {
    error.value = {
      errorMessage: checkConfirmPassword(
        formState.password,
        formState.confirmPassword
      ),
      inputName: "confirmPassword",
    };
    showAdditionalForm.value = false;
  } else if (checkRoomNumber(additionalFormState.roomNumber) !== "") {
    error.value = {
      errorMessage: checkRoomNumber(additionalFormState.roomNumber),
      inputName: "roomNumber",
    };
  } else {
    return true;
  }
};

// Toggle Forms
const toggleForms = () => {
  if (signupPage.value) {
    showAdditionalForm.value = !showAdditionalForm.value;
  } else {
    handleFormSubmit();
  }
};

// Toggle Sign Up or Log In page
const toggleAction = () => {
  y.value = 0;
  clearError();
  signUpLogInErrors.value = "";
  signupPage.value = !signupPage.value;
};

const handleFormSubmit = () => {
  if (signupPage.value) {
    if (!checkDetails()) {
      return;
    } else {
      signUp(formState.email, formState.password);
    }
  } else {
    if (checkFormEmail(formState.email) !== "") {
      error.value = {
        errorMessage: checkFormEmail(formState.email),
        inputName: "email",
      };
    } else if (formState.password == "" || formState.password == undefined) {
      error.value = {
        errorMessage: checkFormPassword(formState.password),
        inputName: "password",
      };
    } else {
      login(formState.email, formState.password);
    }
  }
};

// Manual Sign Up
const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      $firebaseAuth,
      email,
      password
    );
    const user = userCredential.user;

    await postNewUserToDB(
      user,
      formState,
      additionalFormState,
      showLecturerField.value
    );
    await navigateTo("/");
  } catch (error) {
    if (error.code == "auth/email-already-in-use") {
      y.value = 0;
      signUpLogInErrors.value = "Email already in use. Please log in instead.";
    }
    console.log(error);
  }
};

// Manual Log In
const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      $firebaseAuth,
      email,
      password
    );

    $storeToken(userCredential.user.accessToken);
    await navigateTo("/");
  } catch (error) {
    if (error.code == "auth/invalid-credential") {
      signUpLogInErrors.value = "Invalid email or password";
    }
  }
};

// Google Sign In
const googleSignIn = async () => {
  try {
    const result = await signInWithPopup($firebaseAuth, googleProvider);
    const user = result.user;

    const config = useRuntimeConfig();

    const response = await $fetch(
      `${config.public.apiBaseUrl}/users/${user.uid}`
    );

    if (!response.found) {
      try {
        await postNewUserToDB(
          user,
          formState,
          additionalFormState,
          showLecturerField.value
        );
        await navigateTo("/");
      } catch (error) {
        console.log(error);
      }
    } else {
      $storeToken(user.accessToken);
      await navigateTo("/");
    }
  } catch (error) {
    console.log(error);
    signUpLogInErrors.value = "An error occurred. Please try again";
  }
};

// Facebook Sign In
const facebookSignIn = async () => {
  try {
    const result = await signInWithPopup($firebaseAuth, facebookProvider);
    const user = result.user;

    const config = useRuntimeConfig();
    const response = await $fetch(
      `${config.public.apiBaseUrl}/users/${user.uid}`
    );

    if (!response.found) {
      try {
        await postNewUserToDB(
          user,
          formState,
          additionalFormState,
          showLecturerField.value
        );
        await navigateTo("/");
      } catch (error) {
        console.log(error);
      }
    } else {
      $storeToken(user.accessToken);
      await navigateTo("/");
    }
  } catch (error) {
    console.log(error);
    signUpLogInErrors.value = "An error occurred. Please try again";
  }
};

onMounted(() => {
  const token = useCookie("auth_token");

  if (token.value || token.value != "" || token.value == "") {
    token.value = null;
  }
});
</script>
