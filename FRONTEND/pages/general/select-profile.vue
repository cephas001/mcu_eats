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
        :items="profileList"
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
import { useLogInStore } from "@/stores/logInStore";
import { navigateTo } from "nuxt/app";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { user, profiles } = storeToRefs(userStore);

const { registrationForm, displayError } = useLogInStore();

const route = useRoute();
const category = ref("");
const profileList = ref([]);

const handleSelectProfile = async () => {
  // EXTRA CHECK LATER, CHECK INDEXEDDB FIRST
  if (!profiles.value || !user.value) return await navigateTo("/auth/login");

  if (!registrationForm.profileValue) {
    displayError("Please select a profile", "profile");
    return;
  }

  try {
    switch (registrationForm.profileValue) {
      case "Consumer":
        const consumer_profile = userStore.getProfile("consumer");
        userStore.setSelectedProfile(consumer_profile);
        break;
      case "Delivery Person":
        const delivery_profile = userStore.getProfile("delivery_person");
        userStore.setSelectedProfile(delivery_profile);
        break;
      case "Vendor":
        const vendor_profile = userStore.getProfile("vendor");
        userStore.setSelectedProfile(vendor_profile);
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
    await navigateTo("/");
  }
};

onMounted(async () => {
  try {
    const user = await userStore.fetchUser();

    if (!user) {
      return await navigateTo("/");
    }

    profileList.value = user.profiles.map((profile) => {
      if (profile.type == "delivery_person") {
        return "Delivery Person";
      }
      return profile.type.charAt(0).toUpperCase() + profile.type.slice(1);
    });
    console.log(profileList.value);
  } catch (error) {
    return await navigateTo("/");
  }
});
</script>
