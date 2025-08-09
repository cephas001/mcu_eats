<template>
  <UModal
    v-model:open="showSelectProfileModal"
    class="bg-background text-black pb-4 font-manrope"
    title="Choose a profile"
    description="Select one of your profiles to continue"
    color="neutral"
    :close="{
      color: 'primary',
      variant: 'outline',
      class: 'rounded-full',
    }"
    :ui="{
      content: 'text-black',
      title: 'text-black',
      description: 'text-black',
    }"
    @close="showSelectProfileModal = false"
    v-if="!selectingProfile"
  >
    <template #body>
      <URadioGroup
        v-model="selectedProfileType"
        :items="profileOptions"
        variant="card"
        class="text-black"
        :ui="{
          label: 'text-black',
          description: 'text-gray-800',
          indicator: 'bg-primary',
        }"
    /></template>

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
import { useProfileStore } from "@/stores/profileStore";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";

import { setSelectedProfileInStateWithType } from "@/composables/setSelectedProfileInStateWithType";
import { storeSelectedProfileWithTypeUsingUseCase } from "@/composables/storeSelectedProfileWithTypeUsingUseCase";
import { navigateTo } from "nuxt/app";
import { watch } from "vue";

const route = useRoute();

const profileOptions = ref([
  {
    label: "Loading...",
    description: "",
    value: "null",
  },
]);
const selectedProfileType = ref("");

const profileStore = useProfileStore();
const { showSelectProfileModal, selectedProfile } = storeToRefs(profileStore);
const selectingProfile = ref(false);

const handleSelectProfile = async () => {
  if (selectedProfileType.value == "") {
    return;
  }

  try {
    setSelectedProfileInStateWithType(selectedProfileType.value);
  } catch (error) {
    console.log(error);
  }

  try {
    selectingProfile.value = true;

    await storeSelectedProfileWithTypeUsingUseCase(selectedProfileType.value);
  } catch (error) {
    console.log(error);
    selectingProfile.value = false;
  }

  selectingProfile.value = false;

  if (!route.meta.specificUserType) {
    showSelectProfileModal.value = false;
    if (route.fullPath == "/general/select-profile") {
      return navigateTo("/");
    }
    return;
  }

  if (!route.meta.specificUserType.includes(selectedProfileType.value)) {
    showSelectProfileModal.value = false;
    return navigateTo("/");
  }

  showSelectProfileModal.value = false;
};

const getProfileNameFromType = (profileType) => {
  if (profileType == "delivery_person") {
    return "Delivery Person";
  }
  return profileType.charAt(0).toUpperCase() + profileType.slice(1);
};

watch(showSelectProfileModal, (newVal, oldVal) => {
  const profiles = profileStore.getProfiles();

  if (!profiles || profiles?.length == 0) {
    navigateTo("/consumer");
  }

  profileOptions.value = profiles.map((profile, index) => {
    if (selectedProfile?.value?.type == profile.type) {
      selectedProfileType.value = profile.type;
    } else {
      if (index == 0) {
        selectedProfileType.value = profile.type;
      }
    }

    return {
      label: `${getProfileNameFromType(profile.type)} Profile`,
      description: `${profile.data.username || profile.data.vendorName}`,
      value: profile.type,
    };
  });
});
</script>
