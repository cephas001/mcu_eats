<template>
  <section class="pb-5 pt-15 px-6">
    <ProfileAuthHeader title="Vendor" text="Set up a vendor profile." />

    <FormErrorMessage
      :errorMessage="profileRegistrationErrors"
      classList="text-center mb-4 mt-4"
    />

    <UForm class="mb-5 flex flex-col gap-3" :state="profileRegistrationForm">
      <!-- VENDORNAME FIELD -->
      <FormField
        labelText="Vendor Name"
        placeholder="Enter your business name"
        name="vendorName"
        type="text"
        :state="profileRegistrationForm"
        @update="profileRegistrationForm.vendorName = $event"
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
      <!-- VENDOR SELECT FIELD -->
      <FormField
        labelText="Vendor Type"
        name="vendorType"
        type="select"
        :state="profileRegistrationForm"
        :items="profileRegistrationForm.vendorTypeList"
        @update="profileRegistrationForm.vendorTypeValue = $event"
      />
      <!-- VENDOR EMAIL FIELD -->
      <FormField
        labelText="Vendor Email"
        name="vendorEmail"
        placeholder="Enter your Business Email"
        type="email"
        :state="profileRegistrationForm"
        @update="profileRegistrationForm.vendorEmail = $event"
      />
      <!-- VENDOR NUMBER FIELD -->
      <FormField
        labelText="Vendor Phone Number"
        placeholder="Your Business Phone Number"
        name="vendorNumber"
        type="number"
        inputMode="numeric"
        :state="profileRegistrationForm"
        @update="profileRegistrationForm.vendorNumber = $event"
      />

      <!-- VENDOR ADDRESS FIELD -->
      <FormField
        labelText="Vendor Address"
        placeholder="Enter your business address"
        name="vendorAddress"
        type="text"
        :state="profileRegistrationForm"
        @update="profileRegistrationForm.vendorAddress = $event"
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
</template>

<script setup>
import { useLogInStore } from "@/stores/logInStore";
import { navigateTo } from "nuxt/app";
import { storeToRefs } from "pinia";

const logInStore = useLogInStore();

const { profileRegistrationForm, displayError, clearError } = logInStore;
const { profileRegistrationErrors } = storeToRefs(logInStore);

const tryingToCreateProfile = ref(false);
const settingLocalStorage = ref(false);
const showErrorModal = ref(false);

const handleFormSubmit = async () => {
  tryingToCreateProfile.value = true;

  try {
    const {
      $expressUserBackendService,
      $expressAuthBackendService,
      $useIndexedDBUserRepo,
      $useIndexedDBProfileRepo,
    } = useNuxtApp();

    const response = await $expressAuthBackendService.verifyToken();

    const { id } = response;

    const { savedProfile, updatedUser } =
      await $expressUserBackendService.createProfile({
        type: "vendor",
        userId: id,
        data: {
          vendorName: profileRegistrationForm.vendorName?.trim(),
          description: profileRegistrationForm.description?.trim(),
          vendorTypeList: profileRegistrationForm.vendorTypeList,
          vendorValue: profileRegistrationForm.vendorValue,
          vendorEmail: profileRegistrationForm.vendorEmail?.trim(),
          vendorNumber: profileRegistrationForm.vendorNumber?.toString().trim(),
          vendorAddress: profileRegistrationForm.vendorAddress
            ?.toString()
            .trim(),
        },
      });

    try {
      tryingToCreateProfile.value = false;
      settingLocalStorage.value = true;

      await $useIndexedDBUserRepo.storeUser(updatedUser);

      await $useIndexedDBProfileRepo.addProfile(savedProfile);

      await navigateTo("/");
    } catch (error) {
      showErrorModal.value = true;
    }
  } catch (error) {
    clearError();

    if (error.type == "ValidationError") {
      if (error.errorList) {
        const { inputName, errorMessage } = error.errorList[0];
        displayError(errorMessage, inputName.split(".")[1]);
      } else {
        displayError(error.message, error.inputName);
      }
      return;
    }

    if (error.type == "InvalidTokenError") {
      return await navigateTo("/auth/login");
    }

    if (error.type == "UserExistenceError") {
      return await navigateTo("/auth/register");
    }

    if (error.type == "ProfileExistenceError") {
      profileRegistrationErrors.value = error.message;
      return;
    }

    if (error.type == "UnauthorizedError") {
      profileRegistrationErrors.value = error.message;
      return;
    }

    profileRegistrationErrors.value = "An unexpected error occurred";
  } finally {
    tryingToCreateProfile.value = false;
  }
};

onMounted(() => {
  clearError();
});
</script>
