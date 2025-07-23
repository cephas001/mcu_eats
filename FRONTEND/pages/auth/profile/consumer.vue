<template>
  <section class="pb-5 pt-10 px-6" v-if="!tryingToCreateProfile">
    <ProfileAuthHeader title="Consumer" text="Set up a consumer profile" />

    <p
      class="text-center"
      v-if="category !== 'staff' && category !== 'student'"
    >
      For {{ showStaffFields ? "students" : "staffs" }}, please click
      <span class="text-primary" @click="showStaffFields = !showStaffFields"
        >here.</span
      >
    </p>

    <FormErrorMessage
      :errorMessage="profileRegistrationErrors"
      classList="text-center mb-4 mt-4"
    />

    <UForm class="mb-5 flex flex-col gap-3" :state="profileRegistrationForm">
      <!-- USERNAME FIELD -->
      <FormField
        labelText="Username"
        placeholder="Choose a display name"
        name="username"
        type="text"
        :state="profileRegistrationForm"
        @update="profileRegistrationForm.username = $event"
      />
      <!-- GENDER SELECT FIELD -->
      <FormField
        labelText="Gender"
        name="gender"
        type="select"
        :state="profileRegistrationForm"
        :items="profileRegistrationForm.genderList"
        @update="profileRegistrationForm.genderValue = $event"
      />
      <!-- HOSTEL SELECT FIELD -->
      <FormField
        labelText="Hostel"
        name="hostel"
        type="select"
        :state="profileRegistrationForm"
        :items="profileRegistrationForm.hostelList"
        @update="profileRegistrationForm.hostelValue = $event"
        v-if="!showStaffFields"
      />
      <!-- ROOM NUMBER FIELD -->
      <FormField
        labelText="Room number"
        placeholder="Your Room Number"
        name="roomNumber"
        type="number"
        inputMode="numeric"
        :state="profileRegistrationForm"
        @update="profileRegistrationForm.roomNumber = $event"
        v-if="!showStaffFields"
      />
      <!-- COLLEGE SELECT FIELD -->
      <FormField
        labelText="College"
        name="college"
        type="select"
        :state="profileRegistrationForm"
        :items="profileRegistrationForm.collegeList"
        @update="profileRegistrationForm.collegeValue = $event"
        v-if="showStaffFields"
      />
      <!-- OFFICE NUMBER FIELD -->
      <FormField
        labelText="Office Number"
        placeholder="Your Office Number"
        name="officeNumber"
        inputMode="numeric"
        type="number"
        :state="profileRegistrationForm"
        @update="profileRegistrationForm.officeNumber = $event"
        v-if="showStaffFields"
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
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores/userStore";

const route = useRoute();
const category = ref("");

const logInStore = useLogInStore();
const userStore = useUserStore();

const { profileRegistrationForm, displayError, clearError } = logInStore;
const { profileRegistrationErrors } = storeToRefs(logInStore);

const tryingToCreateProfile = ref(false);
const showStaffFields = ref(false);
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

    const generalConsumerData = {
      username: profileRegistrationForm.username?.trim(),
      gender: profileRegistrationForm.genderValue?.trim().toLowerCase(),
    };

    const staffConsumerData = {
      ...generalConsumerData,
      officeNumber: profileRegistrationForm.officeNumber?.toString().trim(),
      college: profileRegistrationForm.collegeValue,
    };

    const studentConsumerData = {
      ...generalConsumerData,
      hostel: profileRegistrationForm.hostelValue,
      roomNumber: profileRegistrationForm.roomNumber?.toString().trim(),
    };

    const { savedProfile, updatedUser } =
      await $expressUserBackendService.createProfile({
        type: "consumer",
        userId: id,
        data: showStaffFields ? staffConsumerData : studentConsumerData,
      });

    try {
      tryingToCreateProfile.value = false;
      settingLocalStorage.value = true;

      await userStore.setUser(updatedUser);
      userStore.addProfile(savedProfile);

      await $useIndexedDBUserRepo.storeUser(updatedUser);
      await $useIndexedDBProfileRepo.addProfile(savedProfile);

      await navigateTo("/consumer");
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
  category.value = route.query?.category;

  if (category.value == "staff") {
    showStaffFields.value = true;
  }
});
</script>
