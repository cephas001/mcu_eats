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

    <LoginSignupServiceProviders
      @error="showProviderError"
      @performingLoginSignup="displayLoginLoader"
      @settingStorage="displayStorageLoader"
      @showModal="displayModal"
    />

    <LoginSwitchAction page="SignUpPage" />

    <LoginPrivacyCookiePolicy />
  </section>

  <LoadingIconLarge
    :loading="tryingToSignIn"
    imageSrc="/Pulse@1x-1.0s-200px-200px.svg"
    class="animate-none"
  />
  <UModal
    v-model:open="showErrorModal"
    class="bg-white pb-4"
    title="An error occurred"
  >
    <template #content>
      <div class="px-5 py-10">
        <h1 class="mt-2 tracking-wide">
          Login was successful, but an error occurred while trying to save your
          data locally. <br />
          This might result in more frequent network calls.
        </h1>
        <div class="mt-3 flex gap-2">
          <button
            @click="router.back()"
            class="bg-black text-white text-sm tracking-wider py-2 px-3 rounded-md"
          >
            Proceed
          </button>
        </div>
      </div>
    </template>
  </UModal>
  <LoadingIconLarge
    :loading="settingLocalStorage"
    class="animate-none"
    imageSrc="/Rolling@1x-1.0s-200px-200px.svg"
    text="Setting up things for you..."
  />
</template>

<script setup>
import { useLogInStore } from "@/stores/logInStore";
import { storeToRefs } from "pinia";
import { navigateTo, useNuxtApp } from "nuxt/app";
import { onMounted } from "vue";

const router = useRouter();

const logInStore = useLogInStore();

const { signUpForm, displayError, clearError } = useLogInStore();

const { signUpErrors } = storeToRefs(logInStore);

const tryingToSignIn = ref(false);
const settingLocalStorage = ref(false);
const showErrorModal = ref(false);

const handleSignUp = async () => {
  clearError();
  tryingToSignIn.value = true;
  try {
    const {
      $useSignUpUserWithEmailAndPasswordUseCase,
      $useIndexedDBUserRepo,
      $useIndexedDBProfileRepo,
    } = useNuxtApp();

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

    await $useIndexedDBUserRepo.clearUser();
    await $useIndexedDBProfileRepo.clearProfiles();

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

const displayLoginLoader = (payload) => {
  tryingToSignIn.value = payload;
};

const displayStorageLoader = (payload) => {
  settingLocalStorage.value = payload;
};

const displayModal = (payload) => {
  showErrorModal.value = payload;
};

onMounted(() => {
  clearError();
  signUpErrors.value = "";
});
</script>
