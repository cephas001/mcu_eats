<template>
  <section
    class="flex flex-col justify-center py-5 px-6 min-h-[70vh]"
    v-if="!tryingToRegister"
  >
    <div class="text-center mt-10 mb-5">
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
      <button
        class="text-white rounded-md p-3 w-full text-center text-md bg-primary"
        @click="handleFormSubmit"
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
import { useLogInStore } from "@/stores/logInStore";
import { storeToRefs } from "pinia";
import { navigateTo, useNuxtApp } from "nuxt/app";

const logInStore = useLogInStore();

const { registrationForm, displayError, clearError } = useLogInStore();

const { registrationErrors } = storeToRefs(logInStore);

const tryingToRegister = ref(false);

const handleFormSubmit = async () => {
  tryingToRegister.value = true;
  try {
    const { $expressUserBackendService } = useNuxtApp();

    const response = await $expressUserBackendService.verifyToken();

    const { id, email, verifiedEmail } = response;

    if (!id) return;

    await $expressUserBackendService.registerUser({
      id,
      email,
      name: registrationForm.name,
      verifiedEmail,
      phoneNumber: registrationForm.phoneNumber,
      role: "user",
    });

    await navigateTo("/auth/profile");
  } catch (error) {
    registrationErrors.value = "";

    if (error.type == "ValidationError") {
      if (error.errorList) {
        const { inputName, errorMessage } = error.errorList[0];
        displayError(errorMessage, inputName);
      } else {
        displayError(error.message, error.inputName);
      }

      return;
    }

    if (error.type == "UserAlreadyExistsError") {
      registrationErrors.value = error.message;

      return;
    }

    if (error.type == "InvalidTokenError") {
      await navigateTo("auth/login");

      return;
    }

    clearError();

    registrationErrors.value = "An unexpected error occurred";
    console.error(error);
  } finally {
    tryingToRegister.value = false;
  }
};
</script>
