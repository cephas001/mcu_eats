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
    <CustomForm
      :formFieldsSchema="loginFormSchema"
      :formState="loginForm"
      submitButtonText="Log In"
      :classList="loginErrors != '' ? 'mt-4' : ''"
      @formSubmit="handleLogin"
    />

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
    @firstButtonClick="getUrlAndRedirect()"
    :showSecondButton="false"
  />
</template>

<script setup>
import { navigateTo, useNuxtApp } from "nuxt/app";
import { onMounted } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { useProfileStore } from "@/stores/profileStore";
import { useUserStore } from "@/stores/userStore";
import { storeToRefs } from "pinia";
import { getRedirectUrlFromSelectedProfile } from "@/utils/getRedirectUrlFromSelectedProfile";
import { loginUser } from "@/composables/auth/loginUser";
import { storeUserAndProfiles } from "@/composables/usecases/storeUserAndProfiles";
import { handleLoginErrors } from "@/composables/auth/handleLoginErrors";
import { useRoute } from "vue-router";

const authStore = useAuthStore();
const { loginForm, clearError } = useAuthStore();
const { loginErrors, loginFormSchema } = storeToRefs(authStore);

const profileStore = useProfileStore();
const { profiles } = storeToRefs(profileStore);

const tryingToLogin = ref(false);
const settingBrowserStorage = ref(false);
const showBrowserStorageErrorModal = ref(false);

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const route = useRoute();

const getUrlAndRedirect = () => {
  tryingToLogin.value = true;

  var redirectToURL = route.query?.redirectTo;

  if (redirectToURL) return navigateTo(`${redirectToURL}`);

  const selectedProfile = profileStore.getSelectedProfile();

  if (!selectedProfile) {
    return navigateTo("/general/select-profile");
  }

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

    await loginUser(token);
  } catch (error) {
    handleLoginErrors(error);
    return;
  } finally {
    tryingToLogin.value = false;
  }

  try {
    settingBrowserStorage.value = true;

    await storeUserAndProfiles(user.value, profiles.value);
  } catch (error) {
    console.log(error);
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
