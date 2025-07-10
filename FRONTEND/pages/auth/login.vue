<template>
  <section class="py-5 px-6" v-if="!tryingToLogin">
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
        @click="handleFormSubmit"
      >
        Log In
      </button>
    </UForm>

    <LoginPolicyService />

    <LoginSocialMediaService />

    <LoginSwitchAction page="LoginPage" />
  </section>
  <LoadingIconLarge
    :loading="tryingToLogin"
    imageSrc="/Pulse@1x-1.0s-200px-200px.svg"
    class="animate-none"
  />
</template>

<script setup>
import { useLogInStore } from "@/stores/logInStore";
import { navigateTo, useNuxtApp } from "nuxt/app";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const tryingToLogin = ref(false);

const logInStore = useLogInStore();

const { loginForm, displayError } = useLogInStore();

const { loginErrors } = storeToRefs(logInStore);
const router = useRouter();

const handleFormSubmit = async () => {
  tryingToLogin.value = true;

  try {
    const {
      $useLoginUserWithEmailAndPasswordUseCase,
      $expressAuthBackendService,
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

    const user = await $expressAuthBackendService.login(token);

    console.log(user);

    if (response.message !== "Success") {
      throw new Error("Failed to store auth token in cookie");
    }

    router.back();
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
  }
};
</script>
