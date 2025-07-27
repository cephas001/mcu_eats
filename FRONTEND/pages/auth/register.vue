<template>
  <section
    class="flex flex-col justify-center py-5 px-6 min-h-[70vh]"
    v-if="!tryingToRegister"
  >
    <div class="px-1 mt-7">
      Step 2 of
      <span
        class="border-b-primary_light border-l-primary_light border-r-primary border-t-primary border-2 px-2 py-1 rounded-full ml-[0.5px]"
        >3</span
      >
    </div>

    <div class="text-center mt-9 mb-5">
      <h1 class="font-bold text-2xl mb-3">Almost There</h1>
      <p class="text-md font-manrope tracking-tight">
        We need just a few more details from you
      </p>
    </div>

    <FormErrorMessage
      :errorMessage="registrationErrors"
      classList="text-center mb-4"
    />

    <!-- Register -->
    <UForm
      class="mb-5 flex flex-col gap-3"
      :class="[registrationErrors != '' ? 'mt-4' : '']"
      :state="registrationForm"
    >
      <FormField
        labelText="Name"
        placeholder="Full name"
        name="name"
        type="text"
        :state="registrationForm"
        @update="registrationForm.name = $event"
      />
      <FormField
        labelText="Phone Number"
        placeholder="Contact Phone Number"
        name="phoneNumber"
        type="text"
        :state="registrationForm"
        @update="registrationForm.phoneNumber = $event"
      />
      <FormField
        labelText="Category"
        name="category"
        type="select"
        :state="registrationForm"
        :items="registrationForm.categoryList"
        @update="registrationForm.categoryValue = $event"
      />
      <button
        class="text-white rounded-md p-3 w-full text-center text-md bg-primary"
        @click="handleRegister"
      >
        Continue
      </button>
    </UForm>
  </section>

  <LoadingIconLarge
    :loading="tryingToRegister"
    imageSrc="/Pulse@1x-1.0s-200px-200px.svg"
    class="animate-none"
  />
</template>

<script setup>
import { navigateTo, useNuxtApp } from "nuxt/app";
import { onMounted } from "vue";

import { useLogInStore } from "@/stores/logInStore";

import { storeToRefs } from "pinia";

const logInStore = useLogInStore();
const { registrationForm, displayError, clearError } = useLogInStore();
const { registrationErrors } = storeToRefs(logInStore);

const tryingToRegister = ref(false);

const handleRegister = async () => {
  tryingToRegister.value = true;

  try {
    const { $expressAuthBackendService, $expressUserBackendService } =
      useNuxtApp();

    const { id, email, verifiedEmail } =
      await $expressAuthBackendService.verifyToken();

    const user = await $expressUserBackendService.registerUser({
      id,
      email,
      name: registrationForm.name,
      verifiedEmail,
      phoneNumber: registrationForm.phoneNumber,
      role: "user",
      category: registrationForm.categoryValue?.toLowerCase(),
    });

    await navigateTo(`/auth/profile?category=${user?.category}`);
  } catch (error) {
    clearError();

    if (error.type == "ValidationError") {
      if (error.errorList) {
        const { inputName, errorMessage } = error.errorList[0];
        displayError(errorMessage, inputName);
      } else {
        displayError(error.message, error.inputName);
      }
      return;
    }

    if (error.type == "UserExistenceError") {
      registrationErrors.value = error.message;
      return;
    }

    if (error.type == "InvalidTokenError") {
      return await navigateTo("/auth/login");
    }

    registrationErrors.value = "An unexpected error occurred";
  } finally {
    tryingToRegister.value = false;
  }
};

onMounted(() => {
  clearError();
});
</script>
