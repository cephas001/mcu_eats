<template>
  <section class="px-6 pt-22 pb-20">
    <div class="w-full text-right">
      <h1>{{ user?.name }}</h1>
      <p class="text-sm font-semibold">
        {{ user?.email }}
      </p>
    </div>

    <div class="mt-15">
      <!-- DETAILS -->
      <ProfileCard
        text="General details"
        url="/profile/details"
        :verifiedEmail="user?.verifiedEmail"
        iconName="i-material-symbols-person-2-outline"
      />
      <!-- PROFILES -->
      <ProfileCard
        text="My profiles"
        url="/profile/my-profiles"
        iconName="i-material-symbols-person-pin-outline-rounded"
      />
      <!-- ORDERS -->
      <ProfileCard
        text="My orders"
        url="/orders"
        iconName="i-material-symbols-shopping-bag-speed-outline"
        v-if="selectedProfile?.type == 'consumer'"
      />
      <!-- MESSAGES -->
      <ProfileCard
        text="Messages"
        url="/orders"
        iconName="i-material-symbols-android-messages-outline"
      />
      <!-- ADDRESSES -->
      <ProfileCard
        text="Saved addresses"
        url="/profile/addresses"
        iconName="i-material-symbols-light-location-on-outline-rounded"
        v-if="selectedProfile?.type == 'consumer'"
      />
      <!-- FAVOURITES -->
      <ProfileCard
        text="Favourites"
        url="/profile/favourites"
        iconName="i-material-symbols-favorite-outline"
        v-if="selectedProfile?.type == 'consumer'"
      />
      <!-- ITEM SUGGESTIONS -->
      <ProfileCard
        text="Item suggestions"
        iconName="i-material-symbols-garden-cart-outline-sharp"
        url=""
        v-if="selectedProfile?.type == 'consumer'"
      />
      <!-- SAVED NOTES -->
      <ProfileCard
        text="Saved notes"
        url="/profile/notes"
        iconName="i-material-symbols-light-chat-outline-rounded"
        v-if="selectedProfile?.type == 'consumer'"
      />
      <!-- HELP/FEEDBACK -->
      <ProfileCard
        text="Help / Feedback"
        url="/profile/feedback"
        iconName="i-material-symbols-light-help-outline"
      />
    </div>
  </section>
</template>

<script setup>
import { useUserStore } from "@/stores/userStore";
import { useProfileStore } from "@/stores/profileStore";
import { storeToRefs } from "pinia";

definePageMeta({
  middleware: ["check-user-and-profiles"],
});

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const profileStore = useProfileStore();
const { selectedProfile } = storeToRefs(profileStore);
</script>
