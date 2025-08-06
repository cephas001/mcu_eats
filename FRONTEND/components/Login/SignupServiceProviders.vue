<template>
  <div class="mt-6 text-center">
    <p class="text-gray-600 mb-2">or with</p>

    <LoginSocialServiceButton
      :imgSrc="GoogleIcon"
      alt="Google Icon"
      text="Google"
      @click="providerSignIn('google')"
    />

    <LoginSocialServiceButton
      :imgSrc="FacebookIcon"
      alt="Facebook Icon"
      text="Facebook"
      @click="providerSignIn('facebook')"
    />
  </div>
</template>

<script setup>
import GoogleIcon from "@/assets/images/google.73c708cb.svg";
import FacebookIcon from "@/assets/images/facebook.e4480188.svg";

import { navigateTo, useNuxtApp } from "nuxt/app";

import { useLogInStore } from "@/stores/logInStore";

import { processToken } from "@/composables/processToken";
import { storeUserAndProfilesUsingUseCases } from "@/composables/storeUserAndProfilesUsingUseCases";

const { clearError } = useLogInStore();

const emit = defineEmits([
  "error",
  "performingLoginSignup",
  "settingStorage",
  "showModal",
]);

const providerSignIn = async (provider) => {
  clearError();

  try {
    const { $signUpUserWithProviderUseCase } = useNuxtApp();

    const { token } = await $signUpUserWithProviderUseCase(provider);

    await processToken(token);
  } catch (error) {
    emit("error", error.message);
    return;
  }

  try {
    await storeUserAndProfilesUsingUseCases();
  } catch (error) {
    emit("showModal", true);
  }
};
</script>
