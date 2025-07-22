<template>
  <section v-if="!loadingUser" class="px-6 pt-22 pb-20">
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
        url="/profile/details"
        iconName="i-material-symbols-person-pin-outline-rounded"
      />
      <!-- ORDERS -->
      <ProfileCard
        text="My orders"
        url="/orders"
        iconName="i-material-symbols-shopping-bag-speed-outline"
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
      />
      <!-- FAVOURITES -->
      <ProfileCard
        text="Favourites"
        url="/profile/favourites"
        iconName="i-material-symbols-favorite-outline"
      />
      <!-- ITEM SUGGESTIONS -->
      <ProfileCard
        text="Item suggestions"
        iconName="i-material-symbols-garden-cart-outline-sharp"
        url=""
      />
      <!-- SAVED NOTES -->
      <ProfileCard
        text="Saved notes"
        url="/profile/notes"
        iconName="i-material-symbols-light-chat-outline-rounded"
      />
      <!-- HELP/FEEDBACK -->
      <ProfileCard
        text="Help / Feedback"
        url="/profile/feedback"
        iconName="i-material-symbols-light-help-outline"
      />
    </div>
  </section>
  <LoadingIconLarge
    :loading="loadingUser"
    imageSrc="/Pulse@1x-1.0s-200px-200px.svg"
    class="animate-none"
  />
</template>

<script setup>
import { useUserStore } from "@/stores/userStore";
import { navigateTo } from "nuxt/app";
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const loadingUser = ref(false);

onMounted(async () => {
  try {
    loadingUser.value = true;
    const user = await userStore.fetchUser();
    if (!user) {
      return await navigateTo("/");
    }
  } catch (error) {
    return await navigateTo("/");
  }

  loadingUser.value = false;
});
</script>
