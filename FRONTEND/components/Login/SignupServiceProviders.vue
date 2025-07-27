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

import { navigateTo, useNuxtApp } from "nuxt/app";

import { useLogInStore } from "@/stores/logInStore";
import { useUserStore } from "@/stores/userStore";
import { useProfileStore } from "@/stores/profileStore";

import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const { clearError } = useLogInStore();

const profileStore = useProfileStore();
const { profiles } = storeToRefs(profileStore);

const emit = defineEmits([
  "error",
  "performingLoginSignup",
  "settingStorage",
  "showModal",
]);

const providerSignIn = async (provider) => {
  clearError();

  try {
    const {
      $signUpUserWithProviderUseCase,
      $expressAuthBackendService,
      $expressUserBackendService,
    } = useNuxtApp();

    const { token } = await $signUpUserWithProviderUseCase(provider);

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

    const profiledIds = user.profiles.map((profile) => profile.profileId);

    const profilesData = await $expressUserBackendService.getProfilesData(
      profiledIds
    );

    userStore.setUser(user);
    profileStore.setProfiles(profilesData);
    profileStore.setSelectedProfile(profilesData[0]);
  } catch (error) {
    if (error.type == "UserExistenceError") {
      return await navigateTo("/auth/register");
    }

    if (error.type == "ProfileExistenceError") {
      return await navigateTo("/auth/profile");
    }

    emit("error", error.message);

    return;
  }

  try {
    if (!user?.value || !profiles?.value) return;

    const { $storeUserUseCase, $storeProfilesUseCase } = useNuxtApp();

    await $storeUserUseCase(user.value);
    await $storeProfilesUseCase(profiles.value);
  } catch (error) {
    emit("showModal", true);
  }

  try {
    const { $getSelectedProfileUseCase } = useNuxtApp();

    const selectedProfile = await $getSelectedProfileUseCase();

    profileStore.setSelectedProfile(selectedProfile);

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
  }
};
</script>
