<template>
  <section class="pb-5 pt-10 px-6 relative">
    <ProfileAuthHeader title="Consumer" text="Set up a consumer profile" />

    <p class="text-center">
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
      <div
        v-for="formField in consumerFormFieldsSchemaGeneral.concat(
          showStaffFields
            ? consumerFormFieldsSchemaStaffs
            : consumerFormFieldsSchemaStudents
        )"
        :key="formField.name"
      >
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
</template>

<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";

import { useLogInStore } from "@/stores/logInStore";
import { storeToRefs } from "pinia";

import { createUserProfile } from "@/composables/auth/createUserProfile";

import { handleProfileCreationErrors } from "@/composables/auth/handleProfileCreationErrors";

const route = useRoute();
const category = ref("");

const logInStore = useLogInStore();
const { profileRegistrationForm } = logInStore;
const { profileRegistrationErrors, creatingProfile } = storeToRefs(logInStore);

const showStaffFields = ref(false);

const consumerFormFieldsSchemaStaffs = ref([
  {
    label: "College",
    name: "college",
    type: "select",
    valueVariableName: "collegeValue",
    listVariableName: "collegeList",
  },
  {
    label: "Office Number",
    placeholder: "Your Office Number",
    name: "officeNumber",
    type: "number",
    inputMode: "numeric",
  },
]);

const consumerFormFieldsSchemaStudents = ref([
  {
    label: "Hostel",
    name: "hostel",
    type: "select",
    valueVariableName: "hostelValue",
    listVariableName: "hostelList",
  },
  {
    label: "Room number",
    placeholder: "Your Room Number",
    name: "roomNumber",
    type: "number",
    valueVariableName: "roomNumber",
    inputMode: "numeric",
  },
]);

const consumerFormFieldsSchemaGeneral = ref([
  {
    label: "Username",
    placeholder: "Choose a display name",
    name: "username",
    type: "text",
    valueVariableName: "username",
  },
  {
    label: "Gender",
    name: "gender",
    type: "select",
    valueVariableName: "genderValue",
    listVariableName: "genderList",
  },
]);

const emit = defineEmits(["profileCreation"]);

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

  emit("profileCreation", "successful");
};

onMounted(() => {
  category.value = route.query?.category;

  if (category.value == "staff") {
    showStaffFields.value = true;
  }
});
</script>
