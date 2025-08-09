<template>
  <section class="py-5 px-6" v-if="!tryingToLogin && !settingBrowserStorage">
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
      @showModal="showBrowserStorageErrorModal = $event"
    />

    <LoginSwitchAction page="LoginPage" />
  </section>

  <LoadingIconSpinner :loading="tryingToLogin || settingBrowserStorage" />

  <BrowserStorageErrorModal
    v-if="showBrowserStorageErrorModal"
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

import { getRedirectUrlFromSelectedProfile } from "@/utils/getRedirectUrlFromSelectedProfile";

import { processToken } from "@/composables/processToken";
import { storeUserAndProfilesUsingUseCases } from "@/composables/storeUserAndProfilesUsingUseCases";
import { handleLoginErrors } from "@/composables/handleLoginErrors";
import { useRoute } from "vue-router";

const logInStore = useLogInStore();
const { loginForm, displayError, clearError } = useLogInStore();
const { loginErrors } = storeToRefs(logInStore);

const profileStore = useProfileStore();

const tryingToLogin = ref(false);
const settingBrowserStorage = ref(false);
const showBrowserStorageErrorModal = ref(false);

const route = useRoute();

const getUrlAndRedirect = () => {
  tryingToLogin.value = true;

  var redirectToURL = route.query?.redirectTo;

  if (redirectToURL) return navigateTo(`${redirectToURL}`);

  const selectedProfile = profileStore.getSelectedProfile();

  redirectToURL = getRedirectUrlFromSelectedProfile(selectedProfile);

  return navigateTo(`${redirectToURL}`);
};

const handleLogin = async () => {
  clearError();
  tryingToLogin.value = true;
  showBrowserStorageErrorModal.value = false;

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
    settingBrowserStorage.value = true;

    await storeUserAndProfilesUsingUseCases();
  } catch (error) {
    showBrowserStorageErrorModal.value = true;
    return;
  } finally {
    settingBrowserStorage.value = false;
  }

  getUrlAndRedirect();
};

onMounted(() => {
  clearError();
});
</script>
