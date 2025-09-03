<template>
  <template
    v-if="
      profileType == 'consumer' && !creatingProfile && !settingBrowserStorage
    "
  >
    <PageConsumer @profileCreation="handleProfileCreation" />
  </template>

  <template
    v-else-if="
      profileType == 'delivery_person' &&
      !creatingProfile &&
      !settingBrowserStorage
    "
  >
    <PageDeliveryPerson @profileCreation="handleProfileCreation" />
  </template>

  <template
    v-else-if="
      profileType == 'vendor' && !creatingProfile && !settingBrowserStorage
    "
  >
    <PageVendor @profileCreation="handleProfileCreation" />
  </template>

  <template v-else
    ><PageConsumer
      @profileCreation="handleProfileCreation"
      v-if="!creatingProfile"
  /></template>

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

import { useLogInStore } from "@/stores/logInStore";
import { useUserStore } from "@/stores/userStore";
import { useProfileStore } from "@/stores/profileStore";
import { storeToRefs } from "pinia";

import { storeUserAndProfiles } from "@/composables/usecases/storeUserAndProfiles";

import { useRoute } from "vue-router";

const route = useRoute();
const profileType = ref("");

const logInStore = useLogInStore();
const { clearError } = logInStore;
const { creatingProfile } = storeToRefs(logInStore);

const userStore = useUserStore();
const profileStore = useProfileStore();

const settingBrowserStorage = ref(false);
const showBrowserStorageErrorModal = ref(false);

var error = ref({});

const handleProfileCreation = async (payload) => {
  try {
    settingBrowserStorage.value = true;

    await storeUserAndProfiles(userStore.getUser(), profileStore.getProfiles());

    await navigateTo(navigateToURL);
  } catch (error) {
    showBrowserStorageErrorModal.value = true;
  } finally {
    settingBrowserStorage.value = false;
  }
};

onMounted(() => {
  clearError();
  profileType.value = route.query?.profileType;

  if (!profileType.value || profileType.value == "") {
    return navigateTo("/auth/profile");
  }
});
</script>
