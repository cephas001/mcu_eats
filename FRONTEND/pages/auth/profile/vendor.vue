<template>
  <section class="pb-5 pt-15 px-6" v-if="!tryingToCreateProfile">
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
        type="number"
        inputMode="numeric"
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

  <LoadingIconLarge
    :loading="settingLocalStorage"
    class="animate-none"
    imageSrc="/Rolling@1x-1.0s-200px-200px.svg"
    text="Setting up things for you..."
  />

  <LocalSaveError
    v-if="showErrorModal"
    action="Profile creation"
    @firstButtonClick="navigateTo('/consumer')"
    :dismissible="false"
    @modalCloseAttempt="navigateTo('/consumer')"
    :showSecondButton="false"
  />

  <LoadingIconLarge
    :loading="tryingToCreateProfile"
    imageSrc="/Pulse@1x-1.0s-200px-200px.svg"
    class="animate-none"
  />
</template>

<script setup>
import { useLogInStore } from "@/stores/logInStore";
import { navigateTo } from "nuxt/app";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/userStore";

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const logInStore = useLogInStore();

const { profileRegistrationForm, displayError, clearError } = logInStore;
const { profileRegistrationErrors } = storeToRefs(logInStore);

const tryingToCreateProfile = ref(false);
const settingLocalStorage = ref(false);
const showErrorModal = ref(false);

const handleFormSubmit = async () => {
  tryingToCreateProfile.value = true;

  var profile = null;

  // Sends data to backend
  try {
    const { $expressUserBackendService, $expressAuthBackendService } =
      useNuxtApp();

    const response = await $expressAuthBackendService.verifyToken();

    const { id } = response;

    const { savedProfile, updatedUser } =
      await $expressUserBackendService.createProfile({
        type: "vendor",
        userId: id,
        data: {
          vendorName: profileRegistrationForm.vendorName?.trim(),
          vendorType: profileRegistrationForm.vendorTypeValue?.toLowerCase(),
          description: profileRegistrationForm.description?.trim(),
          businessNumber: profileRegistrationForm.businessNumber
            ?.toString()
            .trim(),
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
        },
      });

    profile = savedProfile;

    userStore.setUser(updatedUser);
    userStore.addProfile(savedProfile);
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

    return;
  } finally {
    tryingToCreateProfile.value = false;
  }

  // Try to save user and profile data to IndexedDB
  try {
    if (!user?.value) return;

    settingLocalStorage.value = true;

    const { $storeUserUseCase, $addProfileUseCase, $selectProfileUseCase } =
      useNuxtApp();

    await $storeUserUseCase(user.value);
    await $addProfileUseCase(profile);
    await $selectProfileUseCase(profile.type);

    await navigateTo("/vendor");
  } catch (error) {
    showErrorModal.value = true;
  } finally {
    settingLocalStorage.value = false;
  }
};

onMounted(() => {
  clearError();
});
</script>
