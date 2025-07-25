<template>
  <section class="py-5 px-6" v-if="!tryingToLogin && !settingLocalStorage">
    <div class="text-center mt-10 mb-5">
      <h1 class="font-bold text-2xl mb-3">Welcome</h1>
      <p class="text-md font-manrope tracking-tight">
        Continue with one of the following options
      </p>
    </div>

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
    imageSrc="/Rolling@1x-1.0s-200px-200px.svg"
    text="Setting up things for you..."
  />

  <LocalSaveError
    v-if="showErrorModal"
    action="Login"
    @firstButtonClick="navigateTo('/')"
    :showSecondButton="false"
  />
</template>

<script setup>
import { useLogInStore } from "@/stores/logInStore";
import { navigateTo, useNuxtApp } from "nuxt/app";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { useUserStore } from "@/stores/userStore";

const tryingToLogin = ref(false);
const settingLocalStorage = ref(false);
const showErrorModal = ref(false);

const logInStore = useLogInStore();
const { loginForm, displayError, clearError } = useLogInStore();
const { loginErrors } = storeToRefs(logInStore);

const userStore = useUserStore();
const { user, profiles } = storeToRefs(userStore);

const handleLogin = async () => {
  clearError();
  tryingToLogin.value = true;
  showErrorModal.value = false;

  try {
    const {
      $loginUserWithEmailAndPasswordUseCase,
      $expressAuthBackendService,
      $expressUserBackendService,
    } = useNuxtApp();

    const token = await $loginUserWithEmailAndPasswordUseCase({
      email: loginForm.email?.trim(),
      password: loginForm.password?.trim(),
    });

    await $fetch("/api/login", {
      method: "POST",
      body: {
        token,
      },
    });

    const user = await $expressAuthBackendService.login(token);

    const profiledIds = user.profiles.map((profile) => profile.profileId);

    const profilesData = await $expressUserBackendService.getProfilesData(
      profiledIds
    );

    userStore.setUser(user);
    userStore.setProfiles(profilesData);
    userStore.setSelectedProfile(profilesData[0]);
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
      $storeProfilesUseCase,
      $getSelectedProfileUseCase,
    } = useNuxtApp();

    await $storeUserUseCase(user.value);
    await $storeProfilesUseCase(profiles.value);

    const selectedProfile = await $getSelectedProfileUseCase();

    userStore.setSelectedProfile(selectedProfile);
    await navigateTo("/");
  } catch (error) {
    if (error.type === "ProfileExistenceError") {
      return await navigateTo("/general/select-profile");
    }

    if (error.type === "LocalStorageError") {
      return await navigateTo("/");
    }

    if (error.type === "ValidationError") {
      return await navigateTo("auth/logout");
    }

    showErrorModal.value = true;
  } finally {
    settingLocalStorage.value = false;
  }
};

onMounted(() => {
  clearError();
});
</script>
