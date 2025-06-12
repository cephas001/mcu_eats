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
        @update="formState.email = $event"
      />
      <CustomFormField
        labelText="First Name"
        placeholder="First"
        name="firstName"
        type="text"
        :state="formState"
        @update="formState.first = $event"
      />
      <CustomFormField
        labelText="Last Name"
        placeholder="Last"
        name="lastName"
        type="text"
        :state="formState"
        @update="formState.last = $event"
      />
      <CustomFormField
        labelText="Password"
        placeholder="Password"
        name="password"
        type="password"
        :state="formState"
        @update="formState.password = $event"
      />
      <CustomFormField
        labelText="Confirm Password"
        placeholder="Confirm Password"
        name="confirmPassword"
        type="password"
        :state="formState"
        @update="formState.confirmPassword = $event"
      />
      <button
        class="text-white rounded-md p-3 w-full text-center text-md bg-primary"
        @click="toggleNextForm"
        :class="[disableButton && !signupPage ? 'bg-gray-400' : 'bg-primary']"
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
        @update="formState.email = $event"
      />
      <CustomFormField
        labelText="Password"
        placeholder="Password"
        name="password"
        type="password"
        :state="formState"
        @update="formState.password = $event"
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
        @update="additionalFormState.genderValue = $event"
      />
      <!-- COLLEGE SELECT FIELD -->
      <CustomFormField
        labelText="College"
        name="college"
        type="select"
        :state="additionalFormState"
        :items="additionalFormState.collegeList"
        @update="additionalFormState.collegeValue = $event"
        v-if="showLecturerFields"
      />
      <!-- OFFICE NUMBER FIELD -->
      <CustomFormField
        labelText="Office Number"
        placeholder="Your Office Number"
        name="officeNumber"
        type="number"
        :state="additionalFormState"
        @update="additionalFormState.officeNumber = $event"
        v-if="showLecturerFields"
      />
      <!-- HOSTEL SELECT FIELD -->
      <CustomFormField
        labelText="Hostel"
        name="hostel"
        type="select"
        :state="additionalFormState"
        :items="additionalFormState.hostelList"
        @update="additionalFormState.hostelValue = $event"
        v-if="!showLecturerFields"
      />
      <!-- ROOM NUMBER FIELD -->
      <CustomFormField
        labelText="Room number"
        placeholder="Your Room Number"
        name="roomNumber"
        type="number"
        :state="additionalFormState"
        @update="additionalFormState.roomNumber = $event"
        v-if="!showLecturerFields"
      />
      <!-- ROLE SELECT FIELD -->
      <CustomFormField
        labelText="Role"
        name="role"
        type="select"
        :state="additionalFormState"
        :items="additionalFormState.roleList"
        @update="additionalFormState.roleValue = $event"
        v-if="!showLecturerFields"
      />
      <button
        type="sumbit"
        class="text-white rounded-md p-3 w-full bg-primary text-center text-md"
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
      <p class="text-center" v-if="!hideOptionToGoBack">
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
import { useCookie } from "nuxt/app";
import { useLogInStore } from "@/stores/logInStore";
import { storeToRefs } from "pinia";
import { useFirebaseAuthMethods } from "@/composables/firebaseAuthMethods";
import { useFormValidationMethods } from "@/composables/formValidation";
import { postNewUserToDB } from "~/utils/postNewUserToDB";
import { useUserStore } from "@/stores/userStore";

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const { socialSignIn, manualSignUp, manualLogIn } = useFirebaseAuthMethods();

const {
  checkFormEmail,
  checkFormFirstName,
  checkFormLastName,
  checkFormPassword,
  checkConfirmPassword,
  checkRoomNumber,
  checkOfficeNumber,
} = useFormValidationMethods();

const logInStore = useLogInStore();

const { formState, additionalFormState, toggleNextForm, toggleAction } =
  useLogInStore();

const {
  showAdditionalForm,
  showLecturerFields,
  signUpLogInErrors,
  error,
  signupPage,
  tryingToSignIn,
  hideOptionToGoBack,
} = storeToRefs(logInStore);

const disableButton = ref(false);
watch(error, (newValue, oldValue) => {
  if (newValue.errorMessage) {
    disableButton.value = true;
  } else {
    disableButton.value = false;
  }
});

const handleFormSubmit = async () => {
  if (signupPage.value && showAdditionalForm.value) {
    // SIGNING UP

    // Checking if token already exists. Hence, user already authenticated through Google/Facebook and just needs to be added to our DB
    const token = useCookie("auth_token");

    if (token.value && token.value != "") {
      // If token exists

      // So users don't see the Google and Facebook icon when they are about to complete their signup
      hideOptionToGoBack.value = true;

      if (showLecturerFields.value) {
        checkOfficeNumber();
      } else {
        checkRoomNumber();
      }

      if (error.value.errorMessage != "") {
        // If form field validation fails
        return;
      } else {
        await userStore.fetchUserDetails(true);
        const response = await postNewUserToDB(
          user.value,
          formState,
          additionalFormState,
          showLecturerFields.value,
          token.value
        );
        if (response.added) {
          tryingToSignIn.value = false;
          await navigateTo("/");
        } else {
          signUpLogInErrors.value = response.message;
        }
      }
    } else {
      // SIGNING UP

      // If token doesn't exists, then the user is trying to sign up manually
      if (showLecturerFields.value) {
        checkOfficeNumber();
      } else {
        checkRoomNumber();
      }
      checkConfirmPassword();
      checkFormPassword();
      checkFormLastName();
      checkFormFirstName();
      checkFormEmail();

      if (error.value.errorMessage !== "") {
        // If form field validation fails
        return;
      } else {
        const response = await manualSignUp();
        if (response == "redirect") {
          await navigateTo("/");
        }
      }
    }
  } else {
    // Logging In
    checkFormEmail();
    checkFormPassword();

    if (error.value.errorMessage !== "") {
      // If form field validation fails
      return;
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
</script>
