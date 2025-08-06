<template>
  <section class="py-5 px-6" v-if="!tryingToLogin && !settingLocalStorage">
    <AuthFlowHeader
      mainText="Welcome"
      subText="Continue with one of the following options"
    />

    <FormErrorMessage
      :errorMessage="loginErrors"
      classList="text-center mb-4"
    />

    <!-- Login Form -->
    <UForm
      class="mb-5 flex flex-col gap-3"
      :class="[loginErrors != '' ? 'mt-4' : '']"
      :state="loginForm"
    >
      <FormField
        labelText="Email"
        placeholder="Email"
        name="email"
        type="email"
        :state="loginForm"
        @update="loginForm.email = $event"
      />
      <FormField
        labelText="Password"
        placeholder="Password"
        name="password"
        type="password"
        :state="loginForm"
        @update="loginForm.password = $event"
      />
      <button
        class="text-white rounded-md p-3 w-full text-center text-md bg-primary"
        @click="handleLogin"
      >
        Log In
      </button>
    </UForm>

    <LoginPolicyService />

    <LoginSignupServiceProviders
      @error="loginErrors = $event"
      @showModal="showErrorModal = $event"
    />

    <LoginSwitchAction page="LoginPage" />
  </section>

  <LoadingIconLarge
    :loading="tryingToLogin"
    imageSrc="/Pulse@1x-1.0s-200px-200px.svg"
    class="animate-none"
  />

  <LoadingIconLarge
    :loading="settingLocalStorage"
    class="animate-none"
    imageSrc="/Pulse@1x-1.0s-200px-200px.svg"
    text="Setting up things for you..."
  />

  <BrowserStorageErrorModal
    v-if="showErrorModal"
    action="Login"
    @firstButtonClick="getRedirectUrlAndRedirect()"
    :showSecondButton="false"
  />
</template>

<script setup>
import { navigateTo, useNuxtApp } from "nuxt/app";
import { onMounted } from "vue";

import { useLogInStore } from "@/stores/logInStore";
import { useProfileStore } from "@/stores/profileStore";

import { storeToRefs } from "pinia";

import { getRedirectUrl } from "@/utils/getRedirectUrl";

import { processToken } from "@/composables/processToken";
import { storeUserAndProfilesUsingUseCases } from "@/composables/storeUserAndProfilesUsingUseCases";
import { handleLoginErrors } from "@/composables/handleLoginErrors";
import { useRoute } from "vue-router";

const logInStore = useLogInStore();
const { loginForm, displayError, clearError } = useLogInStore();
const { loginErrors } = storeToRefs(logInStore);

const profileStore = useProfileStore();

const tryingToLogin = ref(false);
const settingLocalStorage = ref(false);
const showErrorModal = ref(false);

const route = useRoute();

const getUrlAndRedirect = () => {
  tryingToLogin.value = true;

  var redirectToURL = route.query?.redirectTo;

  if (redirectToURL) return navigateTo(`${redirectToURL}`);

  const selectedProfile = profileStore.getSelectedProfile();

  redirectToURL = getRedirectUrl(selectedProfile);

  return navigateTo(`${redirectToURL}`);
};

const handleLogin = async () => {
  clearError();
  tryingToLogin.value = true;
  showErrorModal.value = false;

  try {
    const { $loginUserWithEmailAndPasswordUseCase } = useNuxtApp();

    const token = await $loginUserWithEmailAndPasswordUseCase({
      email: loginForm.email?.trim(),
      password: loginForm.password?.trim(),
    });

    await processToken(token);
  } catch (error) {
    handleLoginErrors(error);
    return;
  } finally {
    tryingToLogin.value = false;
  }

  try {
    settingLocalStorage.value = true;

    await storeUserAndProfilesUsingUseCases();
  } catch (error) {
    showErrorModal.value = true;
    return;
  } finally {
    settingLocalStorage.value = false;
  }

  getUrlAndRedirect();
};

onMounted(() => {
  clearError();
});
</script>
