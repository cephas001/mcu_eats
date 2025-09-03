<template>
  <section class="pb-5 pt-10 px-6">
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
</template>

<script setup>
import { useLogInStore } from "@/stores/logInStore";

import { storeToRefs } from "pinia";

import { createUserProfile } from "@/composables/auth/createUserProfile";

import { handleProfileCreationErrors } from "@/composables/auth/handleProfileCreationErrors";

const logInStore = useLogInStore();

const { profileRegistrationForm, clearError } = logInStore;
const { profileRegistrationErrors, creatingProfile } = storeToRefs(logInStore);

const emit = defineEmits(["profileCreation"]);

const handleFormSubmit = async () => {
  try {
    creatingProfile.value = true;
    await createUserProfile("delivery-person", {
      username: profileRegistrationForm.username?.trim(),
      gender: profileRegistrationForm.genderValue?.trim().toLowerCase(),
      hostel: profileRegistrationForm.hostelValue,
      roomNumber: profileRegistrationForm.roomNumber?.toString().trim(),
      college: profileRegistrationForm.collegeValue,
      department: profileRegistrationForm.departmentValue,
      matricNumber: profileRegistrationForm.matricNumber?.toString().trim(),
    });

    emit("profileCreation", "successful");
  } catch (error) {
    handleProfileCreationErrors(error);
  } finally {
    creatingProfile.value = false;
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
  // clearError();
});
</script>
