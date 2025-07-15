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

const { clearError } = useLogInStore();

const router = useRouter();

const emit = defineEmits([
  "error",
  "performingLoginSignup",
  "settingStorage",
  "showModal",
]);

const providerSignIn = async (provider) => {
  // emit("performingLoginSignup", true);
  clearError();
  emit("showModal", false);
  try {
    const {
      $useSignUpUserWithProviderUseCase,
      $expressAuthBackendService,
      $expressUserBackendService,
      $useIndexedDBUserRepo,
      $useIndexedDBProfileRepo,
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

    await $useIndexedDBUserRepo.clearUser();
    await $useIndexedDBProfileRepo.clearProfiles();

    const user = await $expressAuthBackendService.login(token);

    try {
      emit("performingLoginSignup", false);
      emit("settingStorage", true);

      await $useIndexedDBUserRepo.storeUser(user);
      const profiledIds = user.profiles.map((profile) => profile.profileId);

      const profilesData = await $expressUserBackendService.getProfilesData(
        profiledIds
      );

      await $useIndexedDBProfileRepo.storeProfiles(profilesData);
    } catch (error) {
      emit("showModal", true);
      console.log(error);
    }

    router.back();
  } catch (error) {
    emit("performingLoginSignup", false);
    if (error.type == "UserExistenceError") {
      return await navigateTo("/auth/register");
    }

    if (error.type == "ProfileExistenceError") {
      return await navigateTo("/auth/profile");
    }

    emit("error", error.message);
  } finally {
    emit("performingLoginSignup", false);
    emit("settingStorage", false);
  }
};
</script>
