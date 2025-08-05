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

  <LocalSaveError
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
import { useUserStore } from "@/stores/userStore";
import { useProfileStore } from "@/stores/profileStore";

import { storeToRefs } from "pinia";

import { getRedirectUrl } from "@/utils/getRedirectUrl";

import { processToken } from "@/composables/processToken";
import { useRoute } from "vue-router";

const logInStore = useLogInStore();
const { loginForm, displayError, clearError } = useLogInStore();
const { loginErrors } = storeToRefs(logInStore);

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const profileStore = useProfileStore();
const { profiles } = storeToRefs(profileStore);

const tryingToLogin = ref(false);
const settingLocalStorage = ref(false);
const showErrorModal = ref(false);

const route = useRoute();

const getRedirectUrlAndRedirect = () => {
  tryingToLogin.value = true;

  const redirectToQuery = route.query?.redirectTo;

  if (redirectToQuery) return navigateTo(`${redirectToQuery}`);

  const selectedProfile = profileStore.getSelectedProfile();

  const redirectTo = getRedirectUrl(selectedProfile);

  return navigateTo(`${redirectTo}`);
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
    clearError();

    if (error.type == "ValidationError") {
      if (error.errorList) {
        const { inputName, errorMessage } = error.errorList[0];
        displayError(errorMessage, inputName);
      } else {
        displayError(error.message, error.inputName);
      }
      return;
    }

    if (error.type == "InvalidCredentialsError") {
      loginErrors.value = error.message;
    }

    if (error.type == "UserExistenceError") {
      return await navigateTo("/auth/register");
    }

    if (error.type == "ProfileExistenceError") {
      return await navigateTo("/auth/profile");
    }

    if (error.type == "UnexpectedError") {
      loginErrors.value = "An unexpected error occurred";
    }

    return;
  } finally {
    tryingToLogin.value = false;
  }

  try {
    if (!user?.value || !profiles?.value) return;
    settingLocalStorage.value = true;

    const {
      $storeUserUseCase,
      $storeUserProfilesUseCase,
      $retrieveUserSelectedProfileUseCase,
    } = useNuxtApp();

    await $storeUserUseCase(user.value);
    await $storeUserProfilesUseCase(profiles.value);

    const selectedProfile = await $retrieveUserSelectedProfileUseCase(
      user.value.id
    );

    profileStore.setSelectedProfile(selectedProfile);
  } catch (error) {
    console.log(error);
    if (error.type === "ProfileExistenceError") {
      return await navigateTo("/general/select-profile");
    }

    if (error.type === "LocalStorageError") {
      getRedirectUrlAndRedirect();
    }

    if (error.type === "ValidationError") {
      return await navigateTo("/auth/logout");
    }

    showErrorModal.value = true;
    return;
  } finally {
    settingLocalStorage.value = false;
  }

  getRedirectUrlAndRedirect();
};

onMounted(() => {
  clearError();
});
</script>
