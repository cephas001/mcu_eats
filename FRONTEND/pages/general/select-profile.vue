<template>
  <section class="flex flex-col justify-center py-5 px-6 min-h-[70vh]">
    <div class="text-center mt-10 mb-5">
      <h1 class="font-bold text-2xl mb-3">Switch Profile</h1>
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
        @click="handleRegister"
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
const userStore = useUserStore();

const { registrationForm, displayError } = useLogInStore();

const route = useRoute();
const category = ref("");
const profileList = ref([]);

const handleRegister = async () => {
  try {
    if (!registrationForm.profileValue) {
      displayError("Please select a profile", "profile");
      return;
    }

    if (registrationForm.profileValue == "Consumer") {
      const selectedProfile = await userStore.selectProfile("consumer");
      if (!selectedProfile) {
        displayError("Failed to select profile", "profile");
        return;
      }
      await navigateTo(`/consumer`);
      return;
    }

    if (registrationForm.profileValue == "Delivery Person") {
      const selectedProfile = await userStore.selectProfile("delivery_person");
      if (!selectedProfile) {
        displayError("Failed to select profile", "profile");
        return;
      }
      await navigateTo(`/delivery-person`);
      return;
    }

    if (registrationForm.profileValue == "Vendor") {
      const selectedProfile = await userStore.selectProfile("vendor");
      if (!selectedProfile) {
        displayError("Failed to select profile", "profile");
        return;
      }
      await navigateTo(`/vendor`);
      return;
    }

    displayError("Please select the right profile", "profile");
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
