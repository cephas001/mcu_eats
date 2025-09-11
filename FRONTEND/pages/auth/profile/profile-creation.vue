<template>
  <template
    v-if="
      profileType == 'delivery_person' &&
      !creatingProfile &&
      !settingBrowserStorage
    "
  >
    <PageDeliveryPerson />
  </template>

  <template
    v-else-if="
      profileType == 'vendor' && !creatingProfile && !settingBrowserStorage
    "
  >
    <PageVendor />
  </template>

  <template
    v-else-if="
      profileType == 'consumer' && !creatingProfile && !settingBrowserStorage
    "
  >
    <PageConsumer />
  </template>

  <template v-else>
    <LoadingIconSpinner
      :loading="true"
      v-if="!creatingProfile && !settingBrowserStorage"
    />
  </template>

  <LoadingIconSpinner :loading="creatingProfile || settingBrowserStorage" />

  <BrowserStorageErrorModal
    v-if="showBrowserStorageErrorModal"
    action="Profile creation"
    @firstButtonClick="navigateTo('/consumer')"
    :dismissible="false"
    @modalCloseAttempt="navigateTo('/consumer')"
    :showSecondButton="false"
  />
</template>

<script setup>
import { navigateTo } from "nuxt/app";
import { useAuthStore } from "@/stores/authStore";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";

const route = useRoute();
const profileType = ref("");

const authStore = useAuthStore();
const { clearError } = authStore;
const { creatingProfile, showBrowserStorageErrorModal, settingBrowserStorage } =
  storeToRefs(authStore);

onMounted(() => {
  clearError();
  profileType.value = route.query?.profileType;

  if (!profileType.value || profileType.value == "") {
    return navigateTo("/auth/profile");
  }
});
</script>
