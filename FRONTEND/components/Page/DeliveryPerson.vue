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

    <CustomForm
      :formFieldsSchema="deliveryPersonFormFieldsSchema"
      :formState="profileRegistrationForm"
      @formSubmit="handleFormSubmit"
      submitButtonText="Create Profile"
    />
  </section>
</template>

<script setup>
import { useAuthStore } from "@/stores/authStore";
import { storeToRefs } from "pinia";
import { createUserProfile } from "@/composables/auth/createUserProfile";
import { handleProfileCreationErrors } from "@/composables/auth/handleProfileCreationErrors";
import { storeUserAndProfilesAndRedirect } from "@/composables/general/storeUserAndProfilesAndRedirect";
import { watch } from "vue";

const authStore = useAuthStore();

const { profileRegistrationForm } = authStore;
const {
  profileRegistrationErrors,
  creatingProfile,
  deliveryPersonFormFieldsSchema,
} = storeToRefs(authStore);

watch(
  () => profileRegistrationForm.collegeValue,
  () => {
    profileRegistrationForm.departmentList.forEach((collegeAndDepartment) => {
      if (
        collegeAndDepartment.college == profileRegistrationForm.collegeValue
      ) {
        profileRegistrationForm.filteredDepartments =
          collegeAndDepartment.departments;
      }
    });
  }
);

const handleFormSubmit = async () => {
  try {
    creatingProfile.value = true;

    await createUserProfile("delivery_person", {
      username: profileRegistrationForm.username?.trim(),
      gender: profileRegistrationForm.genderValue?.trim().toLowerCase(),
      hostel: profileRegistrationForm.hostelValue,
      roomNumber: profileRegistrationForm.roomNumber?.toString().trim(),
      college: profileRegistrationForm.collegeValue,
      department: profileRegistrationForm.departmentValue,
      matricNumber: profileRegistrationForm.matricNumber?.toString().trim(),
    });

    await storeUserAndProfilesAndRedirect("/delivery-person");
  } catch (error) {
    handleProfileCreationErrors(error);
    return;
  } finally {
    creatingProfile.value = false;
  }
};
</script>
