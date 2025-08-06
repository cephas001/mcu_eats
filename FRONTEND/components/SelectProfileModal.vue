<template>
  <UModal
    v-model:open="showSelectProfileModal"
    class="bg-white pb-4 font-manrope"
    title="Choose a profile"
    description="Select one of the profiles below to continue"
    :close="{
      color: 'primary',
      variant: 'outline',
      class: 'rounded-full',
    }"
    :dismissible="false"
    @close="showSelectProfileModal = false"
  >
    <template #body v-if="!selectingProfile">
      <FormField
        labelText=""
        name="profile"
        type="select"
        :state="registrationForm"
        :items="registrationForm.profileList"
        @update="registrationForm.profileValue = $event"
    /></template>

    <template v-if="selectingProfile" #body> loading.... </template>
    <template #footer>
      <button
        class="text-white rounded-md p-3 w-full text-center text-md bg-primary"
        @click="handleSelectProfile"
      >
        Continue
      </button>
    </template>
  </UModal>
</template>

<script setup>
import { useLogInStore } from "@/stores/logInStore";
import { useUserStore } from "@/stores/userStore";
import { useProfileStore } from "@/stores/profileStore";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";

import { setSelectedProfileInStateWithType } from "@/composables/setSelectedProfileInStateWithType";
import { storeSelectedProfileWithTypeUsingUseCase } from "@/composables/storeSelectedProfileWithTypeUsingUseCase";
import { navigateTo } from "nuxt/app";

const { registrationForm, displayError } = useLogInStore();
const userStore = useUserStore();

const route = useRoute();

const profileStore = useProfileStore();
const { showSelectProfileModal } = storeToRefs(profileStore);
const selectingProfile = ref(false);

const handleSelectProfile = async () => {
  if (!registrationForm.profileValue) {
    displayError("Please select a profile", "profile");
    return;
  }

  try {
    setSelectedProfileInStateWithType(registrationForm.profileValue);
  } catch (error) {
    displayError("Profile does not exists", "profile");
  }

  try {
    selectingProfile.value = true;
    await storeSelectedProfileWithTypeUsingUseCase(
      registrationForm.profileValue
    );
    if (
      route.fullPath == "/consumer" ||
      (route.fullPath == "/vendor" &&
        registrationForm.profileValue == "delivery_person")
    ) {
      await navigateTo("/delivery-person");
    }
    if (
      route.fullPath == "/delivery-person" ||
      (route.fullPath == "/vendor" &&
        registrationForm.profileValue == "consumer")
    ) {
      await navigateTo("/consumer");
    }
    if (
      route.fullPath == "/consumer" ||
      (route.fullPath == "/delivery-person" &&
        registrationForm.profileValue == "vendor")
    ) {
      await navigateTo("/vendor");
    }
  } catch (error) {
    selectingProfile.value = false;
    await navigateTo("/consumer");
  }

  selectingProfile.value = false;
  showSelectProfileModal.value = false;
};

onMounted(() => {
  try {
    const user = userStore.getUser();

    if (!user) {
      return navigateTo("/consumer");
    }

    if (user?.profiles.length == 0) {
      return navigateTo("/consumer");
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
