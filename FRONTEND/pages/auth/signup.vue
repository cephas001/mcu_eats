<template>
  <section class="py-5 px-6" v-if="!tryingToSignIn">
    <div class="px-1 mt-7">
      Step 1 of
      <span
        class="border-b-primary_light border-x-primary_light border-t-primary border-2 px-2 py-1 rounded-full ml-[0.5px]"
        >3</span
      >
    </div>

    <div class="text-center mt-9 mb-5">
      <h1 class="font-bold text-2xl mb-3">Welcome</h1>
      <p class="text-md font-manrope tracking-tight">
        Continue with one of the following options
      </p>
    </div>

    <FormErrorMessage
      :errorMessage="signUpErrors"
      classList="text-center mb-4"
    />

    <!-- Signup -->
    <UForm
      class="mb-5 flex flex-col gap-3"
      :class="[signUpErrors != '' ? 'mt-4' : '']"
      :state="signUpForm"
    >
      <FormField
        labelText="Email"
        placeholder="Email"
        name="email"
        type="email"
        :state="signUpForm"
        @update="signUpForm.email = $event"
      />
      <FormField
        labelText="Password"
        placeholder="Password"
        name="password"
        type="password"
        :state="signUpForm"
        @update="signUpForm.password = $event"
      />
      <FormField
        labelText="Confirm Password"
        placeholder="Confirm Password"
        name="confirmPassword"
        type="password"
        :state="signUpForm"
        @update="signUpForm.confirmPassword = $event"
      />
      <button
        class="text-white rounded-md p-3 w-full text-center text-md bg-primary"
        @click="handleSignUp"
      >
        Sign Up
      </button>
    </UForm>

    <LoginPolicyService />

    <LoginSignupServiceProviders
      @error="signUpErrors = $event"
      @showModal="showErrorModal = $event"
    />

    <LoginSwitchAction page="SignUpPage" />

    <LoginPrivacyCookiePolicy />
  </section>

  <LoadingIconLarge
    :loading="settingLocalStorage"
    class="animate-none"
    imageSrc="/Rolling@1x-1.0s-200px-200px.svg"
    text="Setting up things for you..."
  />

  <LoadingIconLarge
    :loading="tryingToSignIn"
    imageSrc="/Pulse@1x-1.0s-200px-200px.svg"
    class="animate-none"
  />

  <LocalSaveError
    v-if="showErrorModal"
    action="Login"
    @firstButtonClick="navigateTo('/')"
    :showSecondButton="false"
  />
</template>

<script setup>
import { navigateTo, useNuxtApp } from "nuxt/app";
import { onMounted } from "vue";

import { useLogInStore } from "@/stores/logInStore";

import { storeToRefs } from "pinia";

import { processToken } from "@/composables/processToken";

const logInStore = useLogInStore();
const { signUpForm, displayError, clearError } = useLogInStore();
const { signUpErrors } = storeToRefs(logInStore);

const tryingToSignIn = ref(false);
const settingLocalStorage = ref(false);
const showErrorModal = ref(false);

const handleSignUp = async () => {
  clearError();
  tryingToSignIn.value = true;
  try {
    const { $signUpUserWithEmailAndPasswordUseCase } = useNuxtApp();

    // Sign User Up
    const { token } = await $signUpUserWithEmailAndPasswordUseCase({
      email: signUpForm.email,
      password: signUpForm.password,
      confirmPassword: signUpForm.confirmPassword,
    });

    await processToken(token, async () => {
      await navigateTo("/auth/register");
    });
  } catch (error) {
    if (error.type == "ValidationError") {
      if (error.errorList) {
        const { inputName, errorMessage } = error.errorList[0];
        displayError(errorMessage, inputName);
      } else {
        displayError(error.message, error.inputName);
      }
      return;
    }

    if (error.type == "UserExistenceError") {
      signUpErrors.value = error.message;
      return;
    }

    if (error.type == "UnexpectedError") {
      signUpErrors.value = error.message;
      return;
    }

    signUpErrors.value = "An unexpected error occurred";
  } finally {
    tryingToSignIn.value = false;
  }
};

onMounted(() => {
  clearError();
});
</script>
