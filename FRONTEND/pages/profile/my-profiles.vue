<template>
  <ProfilePageHeader text="My profiles" classList="mb-4 px-6 pt-8 pb-4" />

  <section class="px-6 min-h-[100vh]">
    <div class="w-full text-right">
      <h1>{{ user?.name }}</h1>
      <p class="text-sm font-semibold">
        {{ user?.email }}
      </p>
    </div>

    <div v-for="profile in profiles" :key="profile.id" class="mt-7 relative">
      <div
        class="bg-primary text-white absolute right-[-2px] rounded-l-sm top-3 py-1 px-2 text-sm"
        v-if="selectedProfile.type == profile.type"
      >
        <p>Selected</p>
      </div>
      <div
        class="bg-white shadow-md rounded-lg p-6 border border-gray-300 font-manrope"
      >
        <!-- Header -->
        <div class="mb-4 flex flex-col gap-1">
          <h1 class="text-md font-semibold text-black">
            {{ profileType(profile.type) }}
          </h1>
          <span class="text-sm text-gray-800">
            Created: {{ new Date(profile.createdAt).toLocaleDateString() }}
          </span>
        </div>

        <!-- User Info -->
        <div class="mb-4">
          <p class="text-sm">
            <span class="font-semibold">Username:</span>
            {{ profile.data.username }}
          </p>
        </div>

        <!-- Action Button -->
        <div>
          <button
            class="bg-primary text-white rounded hover:bg-primary_light transition duration-200 text-sm py-1 px-2"
          >
            Manage
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useUserStore } from "@/stores/userStore";
import { useProfileStore } from "@/stores/profileStore";
import { storeToRefs } from "pinia";
import { computed } from "vue";

definePageMeta({
  middleware: ["check-user-and-profiles"],
});

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const profileStore = useProfileStore();
const { profiles, selectedProfile } = storeToRefs(profileStore);

const profileType = (type) =>
  computed(() => {
    if (type == "consumer") {
      return "Consumer";
    }
    if (type == "delivery_person") {
      return "Delivery Person";
    }
    if (type == "vendor") {
      return "Vendor";
    }
  });
</script>
