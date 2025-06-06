<template>
  <section class="py-5 px-6" v-if="!tryingToSignIn">
    <div class="text-center mt-10 mb-5">
      <h1 class="font-bold text-2xl mb-3">Welcome</h1>
      <p class="text-md font-manrope tracking-tight">
        Continue with one of the following options
      </p>
    </div>

    <ErrorMessageFormDisplay
      :errorMessage="signUpLogInErrors"
      classList="text-center mb-4"
    />
    <!-- Signup -->
    <UForm
      class="mb-5 flex flex-col gap-3"
      :class="[signUpLogInErrors != '' ? 'mt-4' : '']"
      :state="formState"
      v-if="!showAdditionalForm && signupPage"
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
        @update="formState.confirmPassword = $event"
        @clearError="clearError"
      />
      <button
        class="text-white rounded-md p-3 w-full text-center text-md bg-primary"
        @click="toggleNextForm"
      >
        Sign Up
      </button>
    </UForm>

    <!-- Login Form -->
    <UForm
      class="mb-5 flex flex-col gap-3"
      :class="[signUpLogInErrors != '' ? 'mt-4' : '']"
      :state="formState"
      v-if="!showAdditionalForm && !signupPage"
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
        labelText="Password"
        placeholder="Password"
        name="password"
        type="password"
        :state="formState"
        :error
        @update="formState.password = $event"
        @clearError="clearError"
      />
      <button
        class="text-white rounded-md p-3 w-full text-center text-md bg-primary"
        @click="handleFormSubmit"
      >
        Log In
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
        v-if="showLecturerFields"
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
        v-if="showLecturerFields"
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
        v-if="!showLecturerFields"
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
        v-if="!showLecturerFields"
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
        v-if="!showLecturerFields"
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
        For {{ showLecturerFields ? "students" : "lecturers" }}, please click
        <span
          class="text-primary"
          @click="showLecturerFields = !showLecturerFields"
          >here.</span
        >
      </p>
      <p class="text-center">
        Click <span class="text-primary" @click="toggleNextForm">here</span> to
        go back.
      </p>
    </UForm>

    <div class="mt-8 text-sm font-manrope tracking-tight">
      <p>
        This site is protected by reCAPTCHA and the Google
        <NuxtLink class="text-primary">Privacy Policy</NuxtLink> and
        <NuxtLink class="text-primary">Terms of Service</NuxtLink> apply
      </p>
    </div>

    <div class="mt-6 text-center" v-if="!showAdditionalForm">
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
  <LoadingIconLarge
    :loading="tryingToSignIn"
    imageSrc="/Pulse@1x-1.0s-200px-200px.svg"
    class="animate-none"
  />
</template>

<script setup>
import { checkFormEmail, checkFormPassword } from "../utils/formValidation";
import { useCookie } from "nuxt/app";
import { useLogInStore } from "@/stores/logInStore";
import { storeToRefs } from "pinia";
import { useFirebaseAuthMethods } from "@/composables/firebaseAuthMethods";

const { socialSignIn, manualSignUp, manualLogIn } = useFirebaseAuthMethods();

const logInStore = useLogInStore();

const {
  formState,
  additionalFormState,
  checkDetails,
  toggleNextForm,
  toggleAction,
  displayError,
  clearError,
} = useLogInStore();

const {
  showAdditionalForm,
  showLecturerFields,
  signUpLogInErrors,
  error,
  signupPage,
  tryingToSignIn,
} = storeToRefs(logInStore);

const { y } = useScroll(window);

const handleFormSubmit = async () => {
  if (signupPage.value && showAdditionalForm.value) {
    if (!checkDetails(showLecturerFields.value)) {
      return;
    } else {
      const response = await manualSignUp();
      if (response == "redirect") {
        await navigateTo("/");
      }
    }
  } else {
    if (checkFormEmail(formState.email) !== "") {
      displayError(checkFormEmail(formState.email), "email");
    } else if (formState.password == "" || formState.password == undefined) {
      displayError(checkFormPassword(formState.password), "password");
    } else {
      const response = await manualLogIn();
      if (response == "redirect") {
        await navigateTo("/");
      }
    }
  }
};

// Google Sign In
const googleSignIn = async () => {
  const response = await socialSignIn("google");
  if (response == "redirect") {
    await navigateTo("/");
  }
};

// Facebook Sign In
const facebookSignIn = async () => {
  const response = await socialSignIn("facebook");
  if (response == "redirect") {
    await navigateTo("/");
  }
};

onMounted(() => {
  const authToken = useCookie("auth_token");
  authToken.value = null;
});
</script>
