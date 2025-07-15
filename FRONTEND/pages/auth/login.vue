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
      @error="showProviderError"
      @performingLoginSignup="displayLoginLoader"
      @settingStorage="displayStorageLoader"
      @showModal="displayModal"
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
  <UModal
    v-model:open="showErrorModal"
    class="bg-white pb-4"
    title="An error occurred"
  >
    <template #content>
      <div class="px-5 py-10">
        <h1 class="mt-2 tracking-wide flex flex-col gap-2">
          <span
            >Login was successful, but an error occurred while trying to save
            your data locally.
          </span>
          <span>This might result in more frequent network calls.</span>
        </h1>
        <div class="mt-3 flex gap-2">
          <button
            @click="router.back()"
            class="bg-black text-white text-sm tracking-wider py-2 px-3 rounded-md"
          >
            Proceed
          </button>
          <button
            @click="handleLogin"
            class="bg-black text-white text-sm tracking-wider p-2 rounded-md"
          >
            Retry Login
          </button>
        </div>
      </div>
    </template>
  </UModal>
</template>

<script setup>
import { useLogInStore } from "@/stores/logInStore";
import { navigateTo, useNuxtApp } from "nuxt/app";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

const tryingToLogin = ref(false);
const settingLocalStorage = ref(false);
const showErrorModal = ref(false);

const logInStore = useLogInStore();

const { loginForm, displayError, clearError } = useLogInStore();

const { loginErrors } = storeToRefs(logInStore);
const router = useRouter();

const handleLogin = async () => {
  clearError();
  tryingToLogin.value = true;
  showErrorModal.value = false;

  try {
    const {
      $useLoginUserWithEmailAndPasswordUseCase,
      $expressAuthBackendService,
      $expressUserBackendService,
      $useIndexedDBUserRepo,
      $useIndexedDBProfileRepo,
    } = useNuxtApp();

    const token = await $useLoginUserWithEmailAndPasswordUseCase({
      email: loginForm.email?.trim(),
      password: loginForm.password?.trim(),
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

    await $useIndexedDBUserRepo.clearUser();
    await $useIndexedDBProfileRepo.clearProfiles();

    const user = await $expressAuthBackendService.login(token);

    try {
      tryingToLogin.value = false;
      settingLocalStorage.value = true;

      await $useIndexedDBUserRepo.storeUser(user);
      const profiledIds = user.profiles.map((profile) => profile.profileId);

      const profilesData = await $expressUserBackendService.getProfilesData(
        profiledIds
      );

      await $useIndexedDBProfileRepo.storeProfiles(profilesData);

      router.back();
    } catch (error) {
      showErrorModal.value = true;
    }
  } catch (error) {
    loginErrors.value = "";
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
  } finally {
    tryingToLogin.value = false;
    settingLocalStorage.value = false;
  }
};

const showProviderError = (message) => {
  loginErrors.value = message;
};

const displayLoginLoader = (payload) => {
  tryingToLogin.value = payload;
};

const displayStorageLoader = (payload) => {
  settingLocalStorage.value = payload;
};

const displayModal = (payload) => {
  showErrorModal.value = payload;
};

onMounted(() => {
  clearError();
});
</script>
