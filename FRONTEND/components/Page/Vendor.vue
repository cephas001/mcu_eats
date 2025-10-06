<template>
  <section class="pb-5 pt-15 px-6">
    <ProfileAuthHeader title="Vendor" text="Set up a vendor profile" />

    <FormErrorMessage
      :errorMessage="profileRegistrationErrors"
      classList="text-center mb-3 mt-3"
    />

    <CustomForm
      :formFieldsSchema="vendorFormFieldsSchema"
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

const authStore = useAuthStore();
const { profileRegistrationForm } = authStore;
const { profileRegistrationErrors, creatingProfile, vendorFormFieldsSchema } =
  storeToRefs(authStore);

const handleFormSubmit = async () => {
  try {
    creatingProfile.value = true;

    await createUserProfile("vendor", {
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
    creatingProfile.value = false;
  }

  await storeUserAndProfilesAndRedirect("/vendor");
};
</script>
