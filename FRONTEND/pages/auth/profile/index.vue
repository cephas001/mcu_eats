<template>
  <section class="flex flex-col justify-center py-5 px-6 min-h-[70vh]">
    <div class="text-center mt-8 mb-5">
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

const { registrationForm, displayError } = useLogInStore();

const route = useRoute();
const category = ref("");

const handleRegister = async () => {
  if (!registrationForm.profileValue) {
    displayError("Please select a profile", "profile");
    return;
  }

  if (registrationForm.profileValue == "Consumer") {
    await navigateTo(`/auth/profile/consumer?category=${category.value}`);
    return;
  }

  if (registrationForm.profileValue == "Delivery Person") {
    await navigateTo(
      `/auth/profile/delivery-person?category=${category.value}`
    );
    return;
  }

  if (registrationForm.profileValue == "Vendor") {
    await navigateTo(`/auth/profile/vendor?category=${category.value}`);
    return;
  }

  displayError("Please select the right profile", "profile");
};

onMounted(() => {
  category.value = route.query?.category;

  if (category.value == "staff") {
    registrationForm.profileList = registrationForm.profileList.filter(
      (list) => list !== "Delivery Person"
    );
    return;
  }

  if (category.value == "visitor") {
    registrationForm.profileList = ["Consumer"];
    return;
  }
});
</script>
