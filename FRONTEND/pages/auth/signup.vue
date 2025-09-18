<template>
  <section class="py-5 px-6" v-if="!tryingToSignIn">
    <div class="px-1 mt-7">
      Step 1 of
      <span
        class="border-b-background border-x-background border-t-primary border-2 px-2 py-1 rounded-full ml-[0.5px]"
        >3</span
      >
    </div>

    <div class="text-center mt-9 mb-5">
      <h1 class="font-bold text-2xl mb-3">Signup</h1>
      <p class="text-md font-manrope tracking-tight">
        Please continue with one of the following options
      </p>
    </div>

    <FormErrorMessage
      :errorMessage="signUpErrors"
      classList="text-center mb-4"
    />

    <CustomForm
      :formFieldsSchema="signupFormFieldsSchema"
      :formState="signUpForm"
      submitButtonText="Sign Up"
      :classList="signUpErrors != '' ? 'mt-4' : ''"
      @formSubmit="handleSignUp"
    />

    <LoginPolicyService />

    <LoginSignupServiceProviders
      @error="signUpErrors = $event"
      @showModal="showErrorModal = $event"
    />

    <LoginSwitchAction page="SignUpPage" />

    <LoginPrivacyCookiePolicy />
  </section>

  <LoadingIconSpinner :loading="tryingToSignIn" />
</template>

<script setup>
import { navigateTo, useNuxtApp } from "nuxt/app";
import { onMounted } from "vue";

import { useAuthStore } from "@/stores/authStore";

import { storeToRefs } from "pinia";

import { loginUser } from "@/composables/auth/loginUser";
import { handleSignupErrors } from "@/composables/auth/handleSignupErrors";

const authStore = useAuthStore();
const { signUpForm, clearError } = useAuthStore();
const { signUpErrors, signupFormFieldsSchema } = storeToRefs(authStore);

const tryingToSignIn = ref(false);

const handleSignUp = async () => {
  clearError();
  tryingToSignIn.value = true;
  try {
    const { $signupUserWithEmailAndPasswordUseCase } = useNuxtApp();

    // Sign User Up
    const { token } = await $signupUserWithEmailAndPasswordUseCase({
      email: signUpForm.email,
      password: signUpForm.password,
      confirmPassword: signUpForm.confirmPassword,
    });

    await loginUser(
      token,
      async () => {
        await navigateTo("/auth/register");
      },
      true
    );
  } catch (error) {
    handleSignupErrors(error);
  } finally {
    tryingToSignIn.value = false;
  }
};

onMounted(() => {
  clearError();
});
</script>
