<template>
  <section
    class="pb-5 pt-10 px-6"
    v-if="!tryingToCreateProfile && !settingLocalStorage"
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

  <LoadingIconLarge
    :loading="settingLocalStorage"
    class="animate-none"
    imageSrc="/Rolling@1x-1.0s-200px-200px.svg"
    text="Setting up things for you..."
  />

  <LocalSaveError
    v-if="showErrorModal"
    action="Profile creation"
    @firstButtonClick="navigateTo('/delivery-person')"
    :dismissible="false"
    @modalCloseAttempt="navigateTo('/delivery-person')"
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

const logInStore = useLogInStore();
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const { profileRegistrationForm, displayError, clearError } = logInStore;
const { profileRegistrationErrors } = storeToRefs(logInStore);

const tryingToCreateProfile = ref(false);
const settingLocalStorage = ref(false);
const showErrorModal = ref(false);

const handleFormSubmit = async () => {
  tryingToCreateProfile.value = true;

  var profile = null;

  try {
    const { $expressUserBackendService, $expressAuthBackendService } =
      useNuxtApp();

    const response = await $expressAuthBackendService.verifyToken();

    const { id } = response;

    const { savedProfile, updatedUser } =
      await $expressUserBackendService.createProfile({
        type: "delivery_person",
        userId: id,
        data: {
          username: profileRegistrationForm.username?.trim(),
          gender: profileRegistrationForm.genderValue?.trim().toLowerCase(),
          hostel: profileRegistrationForm.hostelValue,
          roomNumber: profileRegistrationForm.roomNumber?.toString().trim(),
          college: profileRegistrationForm.collegeValue,
          department: profileRegistrationForm.departmentValue,
          matricNumber: profileRegistrationForm.matricNumber?.toString().trim(),
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

  try {
    if (!user?.value) return;

    settingLocalStorage.value = true;

    const { $storeUserUseCase, $addProfileUseCase, $selectProfileUseCase } =
      useNuxtApp();

    await $storeUserUseCase(user.value);
    await $addProfileUseCase(profile);
    await $selectProfileUseCase(profile.type);

    await navigateTo("/delivery-person");
  } catch (error) {
    console.log(error);
    showErrorModal.value = true;
  } finally {
    settingLocalStorage.value = false;
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
