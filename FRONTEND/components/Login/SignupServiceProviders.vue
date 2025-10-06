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

import { storeToRefs } from "pinia";

import { navigateTo, useNuxtApp } from "nuxt/app";

import { useAuthStore } from "@/stores/authStore";

import { loginUser } from "@/composables/auth/loginUser";
import { storeUserAndProfiles } from "@/composables/usecases/storeUserAndProfiles";

const authStore = useAuthStore();
const { clearError } = authStore;
const { tryingToLogin, settingBrowserStorage } = storeToRefs(authStore);

const emit = defineEmits([
  "error",
  "showModal",
]);

const providerSignIn = async (provider) => {
  clearError();
  tryingToLogin.value = true;

  let fetchedUser = null;
  let fetchedProfiles = null;
  try {
    const { $signUpUserWithProviderUseCase } = useNuxtApp();

    const { token } = await $signUpUserWithProviderUseCase(provider);

    const { user, profiles } = await loginUser(token);
    fetchedUser = user;
    fetchedProfiles = profiles;
  } catch (error) {
    emit("error", error.message);
    return;
  } finally {
    tryingToLogin.value = false;
  }

  try {
    settingBrowserStorage.value = true;
    await storeUserAndProfiles(fetchedUser, fetchedProfiles);
  } catch (error) {
    emit("showModal", true);
  } finally {
    settingBrowserStorage.value = false;
  }

  return await navigateTo("/");
};
</script>
