<template>
  <section class="pb-5 pt-10 px-6 relative">
    <ProfileAuthHeader title="Consumer" text="Set up a consumer profile" />

    <ConsumerStaffFieldsToggler />

    <FormErrorMessage
      :errorMessage="profileRegistrationErrors"
      classList="text-center mb-4 mt-4"
    />

    <CustomForm
      :formFieldsSchema="
        consumerFormFieldsSchemaGeneral.concat(
          showStaffFields
            ? consumerFormFieldsSchemaStaffs
            : consumerFormFieldsSchemaStudents
        )
      "
      :formState="profileRegistrationForm"
      @formSubmit="handleFormSubmit"
      submitButtonText="Create Profile"
    />
  </section>
</template>

<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import { storeToRefs } from "pinia";
import { createUserProfile } from "@/composables/auth/createUserProfile";
import { handleProfileCreationErrors } from "@/composables/auth/handleProfileCreationErrors";
import { storeUserAndProfilesAndRedirect } from "@/composables/general/storeUserAndProfilesAndRedirect";

const route = useRoute();
const category = ref("");

const authStore = useAuthStore();
const { profileRegistrationForm } = authStore;
const {
  profileRegistrationErrors,
  creatingProfile,
  showStaffFields,
  consumerFormFieldsSchemaStaffs,
  consumerFormFieldsSchemaStudents,
  consumerFormFieldsSchemaGeneral,
} = storeToRefs(authStore);

const handleFormSubmit = async () => {
  try {
    creatingProfile.value = true;

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

    await createUserProfile(
      "consumer",
      showStaffFields.value ? staffConsumerData : studentConsumerData
    );
  } catch (error) {
    handleProfileCreationErrors(error);
    return;
  } finally {
    creatingProfile.value = false;
  }

  await storeUserAndProfilesAndRedirect("/consumer");
};

onMounted(() => {
  category.value = route.query?.category;

  if (category.value == "staff") {
    showStaffFields.value = true;
  }
});
</script>
