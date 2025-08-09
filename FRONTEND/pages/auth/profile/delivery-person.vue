<template>
  <section
    class="pb-5 pt-10 px-6"
    v-if="!tryingToCreateProfile && !settingBrowserStorage"
  >
    <ProfileAuthHeader
      title="Delivery Person"
      text="Set up a delivery person profile."
    />

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
      />
      <!-- COLLEGE SELECT FIELD -->
      <FormField
        labelText="College"
        name="college"
        type="select"
        :state="profileRegistrationForm"
        :items="profileRegistrationForm.collegeList"
        @update="profileRegistrationForm.collegeValue = $event"
      />
      <!-- DEPARTMENT SELECT FIELD -->
      <FormField
        labelText="Department"
        name="department"
        type="select"
        :state="profileRegistrationForm"
        :items="filteredDepartmentList"
        @update="profileRegistrationForm.departmentValue = $event"
        v-if="profileRegistrationForm.collegeValue"
      />
      <!-- MATRIC NUMBER FIELD -->
      <FormField
        labelText="Matric Number"
        name="matricNumber"
        type="number"
        :state="profileRegistrationForm"
        @update="profileRegistrationForm.matricNumber = $event"
        v-if="profileRegistrationForm.departmentValue"
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
    v-if="showBrowerStorageErrorModal"
    action="Profile creation"
    @firstButtonClick="navigateTo('/delivery-person')"
    :dismissible="false"
    @modalCloseAttempt="navigateTo('/delivery-person')"
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
const showBrowerStorageErrorModal = ref(false);

const handleFormSubmit = async () => {
  tryingToCreateProfile.value = true;

  try {
    var { savedProfile } = await createUserProfileAndSetInState(
      "delivery_person",
      {
        username: profileRegistrationForm.username?.trim(),
        gender: profileRegistrationForm.genderValue?.trim().toLowerCase(),
        hostel: profileRegistrationForm.hostelValue,
        roomNumber: profileRegistrationForm.roomNumber?.toString().trim(),
        college: profileRegistrationForm.collegeValue,
        department: profileRegistrationForm.departmentValue,
        matricNumber: profileRegistrationForm.matricNumber?.toString().trim(),
      }
    );
  } catch (error) {
    handleProfileCreationErrors(error);

    return;
  } finally {
    tryingToCreateProfile.value = false;
  }

  try {
    settingBrowserStorage.value = true;

    await storeUserAndProfilesUsingUseCases(savedProfile.type);

    await navigateTo("/delivery-person");
  } catch (error) {
    showBrowerStorageErrorModal.value = true;
  } finally {
    settingBrowserStorage.value = false;
  }
};

const filteredDepartmentList = computed(() => {
  var departments;
  profileRegistrationForm.departmentList.forEach((collegeAndDepartment) => {
    if (collegeAndDepartment.college == profileRegistrationForm.collegeValue) {
      departments = collegeAndDepartment.departments;
    }
  });
  return departments;
});

onMounted(() => {
  clearError();
});
</script>
