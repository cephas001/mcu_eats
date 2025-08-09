<template>
  <section
    class="pb-5 pt-15 px-6"
    v-if="!tryingToCreateProfile && !settingBrowserStorage"
  >
    <ProfileAuthHeader title="Vendor" text="Set up a vendor profile" />

    <FormErrorMessage
      :errorMessage="profileRegistrationErrors"
      classList="text-center mb-4 mt-4"
    />

    <UForm class="mb-5 flex flex-col gap-3" :state="profileRegistrationForm">
      <!-- VENDOR NAME FIELD -->
      <FormField
        labelText="Name"
        placeholder="Enter your business name"
        name="vendorName"
        type="text"
        :state="profileRegistrationForm"
        @update="profileRegistrationForm.vendorName = $event"
      />
      <!-- VENDOR SELECT FIELD -->
      <FormField
        labelText="Type"
        name="vendorType"
        type="select"
        :state="profileRegistrationForm"
        :items="profileRegistrationForm.vendorTypeList"
        @update="profileRegistrationForm.vendorTypeValue = $event"
      />
      <!-- CATEGORY SELECT FIELD -->
      <FormField
        labelText="Category"
        name="category"
        type="select"
        :state="profileRegistrationForm"
        :items="profileRegistrationForm.categoryList"
        @update="profileRegistrationForm.categoryValue = $event"
      />
      <!-- VENDOR DESCRIPTION -->
      <FormField
        labelText="Description"
        placeholder="Short description of the services you provide"
        name="description"
        type="text"
        :state="profileRegistrationForm"
        @update="profileRegistrationForm.vendorDescription = $event"
      />
      <!-- VENDOR NUMBER FIELD -->
      <FormField
        labelText="Phone Number"
        placeholder="Your Business Phone Number"
        name="businessNumber"
        type="text"
        :state="profileRegistrationForm"
        @update="profileRegistrationForm.businessNumber = $event"
      />
      <!-- EMAIL FIELD -->
      <FormField
        labelText="Email"
        placeholder="An email we can reach"
        name="businessEmail"
        type="email"
        :state="profileRegistrationForm"
        @update="profileRegistrationForm.businessEmail = $event"
      />
      <!-- VENDOR ADDRESS FIELD -->
      <FormField
        labelText="Address"
        placeholder="Enter your business address"
        name="address"
        type="text"
        :state="profileRegistrationForm"
        @update="profileRegistrationForm.address = $event"
      />
      <!-- OPENING TIME -->
      <FormField
        labelText="Opening Time"
        placeholder="What time do you open?"
        name="openingTime"
        type="time"
        :state="profileRegistrationForm"
        @update="profileRegistrationForm.openingTime = $event"
      />
      <!-- CLOSING TIME -->
      <FormField
        labelText="Closing Time"
        placeholder="What time do you close?"
        name="closingTime"
        type="time"
        :state="profileRegistrationForm"
        @update="profileRegistrationForm.closingTime = $event"
      />

      <button
        type="sumbit"
        class="text-white rounded-md p-3 w-full bg-primary text-center text-md"
        @click="handleFormSubmit"
      >
        Create Profile
      </button>
    </UForm>
  </section>

  <LoadingIconSpinner :loading="tryingToCreateProfile || settingBrowserStorage" />

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

import { storeToRefs } from "pinia";

import { createUserProfileAndSetInState } from "@/composables/createUserProfileAndSetInState";
import { storeUserAndProfilesUsingUseCases } from "@/composables/storeUserAndProfilesUsingUseCases";
import { handleProfileCreationErrors } from "@/composables/handleProfileCreationErrors";

const logInStore = useLogInStore();
const { profileRegistrationForm, clearError } = logInStore;
const { profileRegistrationErrors } = storeToRefs(logInStore);

const tryingToCreateProfile = ref(false);
const settingBrowserStorage = ref(false);
const showBrowserStorageErrorModal = ref(false);

const handleFormSubmit = async () => {
  tryingToCreateProfile.value = true;

  try {
    var { savedProfile } = await createUserProfileAndSetInState("vendor", {
      vendorName: profileRegistrationForm.vendorName?.trim(),
      vendorType: profileRegistrationForm.vendorTypeValue?.toLowerCase(),
      description: profileRegistrationForm.description?.trim(),
      businessNumber: profileRegistrationForm.businessNumber?.toString().trim(),
      businessEmail: profileRegistrationForm.businessEmail?.trim(),
      category: profileRegistrationForm.categoryValue?.toLowerCase(),
      address: profileRegistrationForm.address?.toString().trim(),
      openingTime: {
        hour: Number(profileRegistrationForm.openingTime?.split(":")[0]),
        minute: Number(profileRegistrationForm.openingTime?.split(":")[1]),
      },
      closingTime: {
        hour: Number(profileRegistrationForm.closingTime?.split(":")[0]),
        minute: Number(profileRegistrationForm.closingTime?.split(":")[1]),
      },
    });
  } catch (error) {
    handleProfileCreationErrors(error);

    return;
  } finally {
    tryingToCreateProfile.value = false;
  }

  try {
    settingBrowserStorage.value = true;

    await storeUserAndProfilesUsingUseCases(savedProfile.type);

    await navigateTo("/vendor");
  } catch (error) {
    showBrowserStorageErrorModal.value = true;
  } finally {
    settingBrowserStorage.value = false;
  }
};

onMounted(() => {
  clearError();
});
</script>
