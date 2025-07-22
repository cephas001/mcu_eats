<template>
  <section
    class="flex flex-col justify-center py-5 px-6 min-h-[70vh]"
    v-if="!tryingToRegister"
  >
    <div class="px-3 mt-7">
      Step 2 of
      <span
        class="border-b-primary_light border-l-primary_light border-r-primary border-t-primary border-2 px-2 py-1 rounded-full ml-[0.5px]"
        >3</span
      >
    </div>
    <div class="text-center mt-7 mb-5">
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
  <UModal
    v-model:open="showErrorModal"
    :dismissible="false"
    @close:prevent="navigateTo('/auth/profile')"
    class="bg-white pb-4"
    title="An error occurred"
  >
    <template #content>
      <div class="px-5 py-10">
        <h1 class="mt-2 tracking-wide flex flex-col gap-2">
          <span
            >Login was successful, but an error occurred while trying to save
            your data locally.</span
          ><span> This might result in more frequent network calls.</span>
        </h1>
        <div class="mt-3 flex gap-2">
          <button
            @click="navigateTo('/auth/profile')"
            class="bg-black text-white text-sm tracking-wider py-2 px-3 rounded-md"
          >
            Proceed
          </button>
        </div>
      </div>
    </template>
  </UModal>
</template>

<script setup>
import { useLogInStore } from "@/stores/logInStore";
import { useUserStore } from "@/stores/userStore";
import { storeToRefs } from "pinia";
import { navigateTo, useNuxtApp } from "nuxt/app";
import { onMounted } from "vue";

const logInStore = useLogInStore();
const userStore = useUserStore();

const { registrationForm, displayError, clearError } = useLogInStore();

const { registrationErrors } = storeToRefs(logInStore);

const tryingToRegister = ref(false);
const settingLocalStorage = ref(false);
const showErrorModal = ref(false);

const handleRegister = async () => {
  tryingToRegister.value = true;
  try {
    const { $expressAuthBackendService, $expressUserBackendService } =
      useNuxtApp();

    const { id, email, verifiedEmail } =
      await $expressAuthBackendService.verifyToken();

    if (!id) return;
    console.log(registrationForm.categoryValue?.toLowerCase());
    const user = await $expressUserBackendService.registerUser({
      id,
      email,
      name: registrationForm.name,
      verifiedEmail,
      phoneNumber: registrationForm.phoneNumber,
      role: "user",
      category: registrationForm.categoryValue?.toLowerCase(),
    });

    try {
      tryingToRegister.value = false;
      settingLocalStorage.value = true;

      await navigateTo(`/auth/profile?category=${user?.category}`);
    } catch (error) {
      showErrorModal.value = true;
    }
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
    console.error(error);
  } finally {
    tryingToRegister.value = false;
  }
};

onMounted(() => {
  clearError();
});
</script>
