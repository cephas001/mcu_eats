<template>
  <ProfilePageHeader text="Addresses" />

  <section class="mt-5">
    <div class="px-6 flex items-center justify-between">
      <h1 class="font-bold font-manrope text-sm">Selected Address</h1>
      <p class="text-green-700 text-sm" @click="expandSection = true">Change</p>
    </div>
    <div class="flex items-center px-6 py-4 border-y-1 border-y-gray-300 mt-5">
      <UIcon
        name="i-material-symbols-location-on-outline-rounded"
        class="text-xl self-center font-bold mr-4"
      />
      <h1 class="text-sm tracking-wide">Current (Old Chapel Building)</h1>
    </div>
  </section>
  <section class="mt-5 min-h-[80vh]">
    <div class="px-6 flex items-center justify-between">
      <h1 class="font-bold font-manrope text-sm">Saved Addresses</h1>
    </div>
    <div
      class="flex items-center justify-between px-6 py-4 border-y-1 border-y-gray-300 mt-5"
    >
      <div class="flex items-center">
        <UIcon
          name="i-material-symbols-school-outline-rounded"
          class="text-xl self-center font-bold mr-4"
        />
        <h1 class="text-sm tracking-wide">College</h1>
      </div>
      <p class="text-sm text-gray-800">Add address</p>
    </div>
    <div class="flex items-center px-6 py-4 border-b-1 border-b-gray-300">
      <UIcon
        name="i-material-symbols-location-on-outline-rounded"
        class="text-xl self-center font-bold mr-4"
      />
      <h1 class="text-sm tracking-wide">
        Hostel ({{ user?.hostel }}, Room {{ user?.roomNumber }})
      </h1>
    </div>
  </section>

  <PopOverSection
    :expandSection
    :subSectionsList
    :sectionToExpand
    @closeSection="expandSection = false"
    @formSubmitted=""
  >
    <template v-slot:formfields_address>
      <div class="flex items-center bg-gray-200 w-full rounded-full mb-2">
        <ToggleButton
          text="Delivery"
          :selectedOption
          @update:selectedOption="selectedOption = $event"
        />

        <ToggleButton
          text="Pick-up"
          :selectedOption
          @update:selectedOption="selectedOption = $event"
        />
      </div>

      <div
        class="flex items-center py-3 border-y border-gray-200 font-manrope font-bold text-green-800"
      >
        <UIcon name="i-material-symbols-add-2" class="text-lg mr-2" />
        <button class="tracking-wider text-sm">New address</button>
      </div>

      <AddressDetailsCard
        text="Current Location (Old Chapel Building)"
        :selected="false"
      />

      <AddressDetailsCard
        :text="` Hostel (${user?.hostel}, Room ${user?.roomNumber})`"
        :selected="false"
      />

      <AddressDetailsCard text="College" :selected="false" />
    </template>
  </PopOverSection>

  <LoadingIconLarge
    :loading="loadingUser"
    imageSrc="/Pulse@1x-1.0s-200px-200px.svg"
    class="animate-none"
  />
</template>

<script setup>
import { useUserStore } from "@/stores/userStore";
import { onMounted } from "vue";

const userStore = useUserStore();
const { user, loggedIn } = storeToRefs(userStore);
const loadingUser = ref(true);

const expandSection = ref(true);
const sectionToExpand = ref("address");
const subSectionsList = ref([
  {
    name: "address",
    buttonText: "Confirm",
  },
]);

const selectedOption = ref("Delivery");

onMounted(async () => {
  if (!user?.value || !loggedIn?.value) {
    const response = await userStore.fetchUserDetails();
    if (response == "no token") {
      await navigateTo("/login");
      return;
    }
    if (!loggedIn?.value) {
      await navigateTo("/login");
      return;
    }
  } else {
    loadingUser.value = false;
  }
});
</script>
