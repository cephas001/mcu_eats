<template>
  <section class="py-5 px-6" v-if="!tryingToCreateProfile">
    <div class="text-center mt-10 mb-5">
      <h1 class="font-bold text-2xl mb-3">Consumer</h1>
      <p class="text-md font-manrope tracking-tight">
        Set up a consumer profile.
      </p>
    </div>

    <p class="text-center">
      For {{ showStaffFields ? "students" : "lecturers" }}, please click
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
    :loading="tryingToCreateProfile"
    imageSrc="/Pulse@1x-1.0s-200px-200px.svg"
    class="animate-none"
  />
</template>

<script setup>
import { useLogInStore } from "@/stores/logInStore";
import { navigateTo } from "nuxt/app";
import { storeToRefs } from "pinia";

const logInStore = useLogInStore();

const { profileRegistrationForm, displayError, clearError } = logInStore;
const { profileRegistrationErrors } = storeToRefs(logInStore);

const tryingToCreateProfile = ref(false);
const showStaffFields = ref(false);

const handleFormSubmit = async () => {
  tryingToCreateProfile.value = true;

  try {
    const { $expressUserBackendService } = useNuxtApp();

    const response = await $expressUserBackendService.verifyToken();

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

    console.log(savedProfile, updatedUser);

    await navigateTo("/");
  } catch (error) {
    console.log(error);
    profileRegistrationErrors.value = "";

    if (error.type == "ValidationError") {
      if (error.errorList) {
        const { inputName, errorMessage } = error.errorList[0];
        displayError(errorMessage, inputName.split(".")[1]);
      } else {
        displayError(error.message, error.inputName);
      }

      return;
    }

    if (error.type == "UserAlreadyExistsError") {
      profileRegistrationErrors.value = error.message;

      return;
    }

    if (error.type == "InvalidTokenError") {
      await navigateTo("auth/login");

      return;
    }

    clearError();

    profileRegistrationErrors.value = "An unexpected error occurred";
  } finally {
    tryingToCreateProfile.value = false;
  }
};
</script>
