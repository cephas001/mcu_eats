<template>
  <section
    class="pb-5 pt-10 px-6 relative"
    v-if="!tryingToCreateProfile && !settingBrowserStorage"
  >
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
      <div v-for="formField in consumerFormFieldsSchema" :key="formField.name">
        <FormField
          :labelText="formField.label"
          :placeholder="formField.label"
          :name="formField.name"
          :type="formField.type"
          :inputMode="formField.inputMode"
          :state="profileRegistrationForm"
          :items="profileRegistrationForm[formField.listVariableName]"
          @update="
            profileRegistrationForm[formField.valueVariableName] = $event
          "
          v-if="
            showStaffFields == formField.staffField || formField.generalField
          "
        />
      </div>

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
    v-if="showBroswerStorageErrorModal"
    action="Profile creation"
    @firstButtonClick="navigateTo('/consumer')"
    :dismissible="false"
    @modalCloseAttempt="navigateTo('/consumer')"
    :showSecondButton="false"
  />
</template>

<script setup>
import { navigateTo } from "nuxt/app";
import { onMounted } from "vue";
import { useRoute } from "vue-router";

import { useLogInStore } from "@/stores/logInStore";
import { storeToRefs } from "pinia";

import { createUserProfileAndSetInState } from "@/composables/createUserProfileAndSetInState";
import { storeUserAndProfilesUsingUseCases } from "@/composables/storeUserAndProfilesUsingUseCases";
import { handleProfileCreationErrors } from "@/composables/handleProfileCreationErrors";

const route = useRoute();
const category = ref("");

const logInStore = useLogInStore();
const { profileRegistrationForm, clearError } = logInStore;
const { profileRegistrationErrors } = storeToRefs(logInStore);

const tryingToCreateProfile = ref(false);
const showStaffFields = ref(false);
const settingBrowserStorage = ref(false);
const showBroswerStorageErrorModal = ref(false);

const consumerFormFieldsSchema = [
  {
    label: "Username",
    placeholder: "Choose a display name",
    name: "username",
    type: "text",
    valueVariableName: "username",
    generalField: true,
  },
  {
    label: "Gender",
    name: "gender",
    type: "select",
    valueVariableName: "genderValue",
    listVariableName: "genderList",
    generalField: true,
  },
  {
    label: "Hostel",
    name: "hostel",
    type: "select",
    valueVariableName: "hostelValue",
    listVariableName: "hostelList",
    staffField: false,
  },
  {
    label: "Room number",
    placeholder: "Your Room Number",
    name: "roomNumber",
    type: "number",
    valueVariableName: "roomNumber",
    inputMode: "numeric",
    staffField: false,
  },
  {
    label: "College",
    name: "college",
    type: "select",
    valueVariableName: "collegeValue",
    listVariableName: "collegeList",
    staffField: true,
  },
  {
    label: "Office Number",
    placeholder: "Your Office Number",
    name: "officeNumber",
    type: "number",
    inputMode: "numeric",
    staffField: true,
  },
];

const handleFormSubmit = async () => {
  tryingToCreateProfile.value = true;

  try {
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

    var { savedProfile } = await createUserProfileAndSetInState(
      "consumer",
      showStaffFields ? staffConsumerData : studentConsumerData
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

    await navigateTo("/consumer");
  } catch (error) {
    showBroswerStorageErrorModal.value = true;
  } finally {
    settingBrowserStorage.value = false;
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
