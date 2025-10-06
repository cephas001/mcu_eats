<template>
  <template v-if="profileType == 'delivery_person' && notLoading">
    <PageDeliveryPerson />
  </template>

  <template v-else-if="profileType == 'vendor' && notLoading">
    <PageVendor />
  </template>

  <template v-else-if="profileType == 'consumer' && notLoading">
    <PageConsumer />
  </template>

  <template v-else>
    <LoadingIconCustom :loading="true" v-if="notLoading" />
  </template>

  <LoadingIconSpinner :loading="!notLoading" />

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

const notLoading = computed(
  () => !creatingProfile.value && !settingBrowserStorage.value
);

onMounted(() => {
  clearError();
  profileType.value = route.query?.profileType;

  if (!profileType.value || profileType.value == "") {
    return navigateTo("/auth/profile");
  }
});
</script>
