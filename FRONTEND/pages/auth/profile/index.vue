<template>
  <section class="flex flex-col justify-center py-5 px-6 min-h-[70vh]">
    <div class="text-center mt-10 mb-5">
      <h1 class="font-bold text-2xl mb-3">Profile</h1>
      <p class="text-md font-manrope tracking-tight">
        Select a profile to continue. <br />
        You can always create more later.
      </p>
    </div>

    <!-- Register -->
    <UForm class="mb-5 flex flex-col gap-3" :state="registrationForm">
      <FormField
        labelText=""
        name="profile"
        type="select"
        :state="registrationForm"
        :items="registrationForm.profileList"
        @update="registrationForm.profileValue = $event"
      />
      <button
        class="text-white rounded-md p-3 w-full text-center text-md bg-primary"
        @click="handleFormSubmit"
      >
        Continue
      </button>
    </UForm>
  </section>
</template>

<script setup>
import { useLogInStore } from "@/stores/logInStore";
import { navigateTo } from "nuxt/app";

const { registrationForm, displayError } = useLogInStore();

const handleFormSubmit = async () => {
  if (!registrationForm.profileValue) {
    displayError("Please select a profile", "profile");
    return;
  }

  if (registrationForm.profileValue == "Consumer") {
    await navigateTo("/auth/profile/consumer");
    return;
  }

  if (registrationForm.profileValue == "Delivery Person") {
    await navigateTo("/auth/profile/delivery-person");
    return;
  }

  if (registrationForm.profileValue == "Vendor") {
    await navigateTo("/auth/profile/vendor");
    return;
  }

  displayError("Please select the right profile", "profile");
};
</script>
