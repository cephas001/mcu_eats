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
import { useLogInStore } from "@/stores/logInStore";
import { useUserStore } from "@/stores/userStore";

const userStore = useUserStore();
const { clearError } = useLogInStore();

const router = useRouter();

const emit = defineEmits([
  "error",
  "performingLoginSignup",
  "settingStorage",
  "showModal",
]);

const providerSignIn = async (provider) => {
  clearError();
  var userToStore = null;
  var profiles = null;

  try {
    const {
      $useSignUpUserWithProviderUseCase,
      $expressAuthBackendService,
      $expressUserBackendService,
    } = useNuxtApp();

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

    const profiledIds = user.profiles.map((profile) => profile.profileId);

    const profilesData = await $expressUserBackendService.getProfilesData(
      profiledIds
    );

    userToStore = user;
    profiles = profilesData;

    userStore.setUser(user);
    userStore.setProfiles(profilesData);
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
    const { $useIndexedDBUserRepo, $useIndexedDBProfileRepo } = useNuxtApp();

    await $useIndexedDBUserRepo.clearUser();
    await $useIndexedDBProfileRepo.clearProfiles();

    await $useIndexedDBUserRepo.storeUser(userToStore);
    await $useIndexedDBProfileRepo.storeProfiles(profiles);
  } catch (error) {
    emit("showModal", true);
  }
};
</script>
