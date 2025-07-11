<template>
  <section class="py-5 px-6" v-if="!tryingToSignIn">
    <div class="text-center mt-10 mb-5">
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

    <LoginSignupServiceProviders @error="showProviderError" />

    <LoginSwitchAction page="SignUpPage" />

    <LoginPrivacyCookiePolicy />
  </section>

  <LoadingIconLarge
    :loading="tryingToSignIn"
    imageSrc="/Pulse@1x-1.0s-200px-200px.svg"
    class="animate-none"
  />
</template>

<script setup>
import { useLogInStore } from "@/stores/logInStore";
import { storeToRefs } from "pinia";
import { navigateTo, useNuxtApp } from "nuxt/app";
import { onMounted } from "vue";

const logInStore = useLogInStore();

const { signUpForm, displayError, clearError } = useLogInStore();

const { signUpErrors } = storeToRefs(logInStore);

const tryingToSignIn = ref(false);

const handleSignUp = async () => {
  tryingToSignIn.value = true;
  try {
    const { $useSignUpUserWithEmailAndPasswordUseCase } = useNuxtApp();

    // Sign User Up
    const { token } = await $useSignUpUserWithEmailAndPasswordUseCase({
      email: signUpForm.email,
      password: signUpForm.password,
      confirmPassword: signUpForm.confirmPassword,
    });

    const response = await $fetch("/api/login", {
      method: "POST",
      body: {
        token,
      },
    });

    if (response.message !== "Success") {
      throw new Error("Failed to store auth token in cookie");
    }

    await navigateTo("/auth/register");
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
    console.error("Unexpected error:", error);
  } finally {
    tryingToSignIn.value = false;
  }
};

const showProviderError = (message) => {
  signUpErrors.value = message;
};

onMounted(() => {
  clearError();
  signUpErrors.value = "";
});
</script>
