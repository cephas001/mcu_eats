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
import { useNuxtApp } from "nuxt/app";
import { defineEmits } from "vue";

const emit = defineEmits(["error"]);

const providerSignIn = async (provider) => {
  try {
    const { $useSignUpUserWithProviderUseCase, $expressAuthBackendService } =
      useNuxtApp();

    const { token } = await $useSignUpUserWithProviderUseCase(provider);

    const response = await $fetch("/api/login", {
      method: "POST",
      body: {
        token,
      },
    });

    if (response.message !== "Success") {
      throw new Error("Failed to store auth token in cookie");
    }

    const user = await $expressAuthBackendService.login(token);

    console.log(user);

    await navigateTo("/");
  } catch (error) {
    if (error.type == "UserExistenceError") {
      return await navigateTo("/auth/register");
    }

    if (error.type == "ProfileExistenceError") {
      return await navigateTo("/auth/profile");
    }

    emit("error", error.message);
  }
};
</script>
