<template>
  <section class="pb-5 pt-15 px-6">
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
        type="text"
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

    emit("profileCreation", "successful");
  } catch (error) {
    handleProfileCreationErrors(error);
  } finally {
    creatingProfile.value = false;
  }
};

onMounted(() => {
  // clearError();
});
</script>
