<template>
  <section class="flex flex-col justify-center py-5 px-6 min-h-[70vh]">
    <div class="text-center mt-10 mb-5">
      <h1 class="font-bold text-2xl mb-3">Select Default Profile</h1>
      <p class="text-md font-manrope tracking-tight">
        Select one of your profiles to continue.
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
        @click="handleSelectProfile"
      >
        Continue
      </button>
    </UForm>
  </section>
</template>

<script setup>
import { navigateTo } from "nuxt/app";
import { onMounted } from "vue";

import { useUserStore } from "@/stores/userStore";
import { useProfileStore } from "@/stores/profileStore";
import { useLogInStore } from "@/stores/logInStore";

import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const profileStore = useProfileStore();
const { profiles } = storeToRefs(profileStore);

const { registrationForm, displayError } = useLogInStore();

const handleSelectProfile = async () => {
  if (!profiles.value || !user.value) return await navigateTo("/");

  if (!registrationForm.profileValue) {
    displayError("Please select a profile", "profile");
    return;
  }

  try {
    switch (registrationForm.profileValue) {
      case "Consumer":
        const consumer_profile = profileStore.selectProfile("consumer");
        if (!consumer_profile) {
          displayError("Profile does not exists", "profile");
          return;
        }
        break;
      case "Delivery Person":
        const delivery_profile = profileStore.selectProfile("delivery_person");
        if (!delivery_profile) {
          displayError("Profile does not exists", "profile");
          return;
        }
        break;
      case "Vendor":
        const vendor_profile = profileStore.selectProfile("vendor");
        if (!vendor_profile) {
          displayError("Profile does not exists", "profile");
          return;
        }
        break;
      default:
        displayError("Invalid profile selected", "profile");
        return;
    }
  } catch (error) {
    console.log(error);
  }

  try {
    const { $selectProfileUseCase } = useNuxtApp();
    switch (registrationForm.profileValue) {
      case "Consumer":
        await $selectProfileUseCase("consumer");
        // console.log("here");
        await navigateTo("/consumer");
        break;
      case "Delivery Person":
        await $selectProfileUseCase("delivery_person");
        await navigateTo("/delivery-person");
        break;
      case "Vendor":
        await $selectProfileUseCase("vendor");
        await navigateTo("/vendor");
        break;
      default:
        displayError("Invalid profile selected", "profile");
        return;
    }
  } catch (error) {
    await navigateTo("/consumer");
  }
};

onMounted(() => {
  try {
    const user = userStore.getUser();
    console.log(user);

    if (!user) {
      registrationForm.profileList = [];
      return;
    }

    registrationForm.profileList = user.profiles.map((profile) => {
      if (profile.type == "delivery_person") {
        return "Delivery Person";
      }
      return profile.type.charAt(0).toUpperCase() + profile.type.slice(1);
    });
  } catch (error) {
    console.log(error);
  }
});
</script>
