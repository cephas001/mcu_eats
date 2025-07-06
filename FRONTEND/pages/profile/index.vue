<template>
  <section v-if="!loadingUser" class="px-6 pt-20 pb-25">
    <div class="w-full text-right">
      <h1>{{ user.firstName + " " + user.lastName }}</h1>
      <p class="text-sm font-semibold">
        {{ user.username ? "@" + user.username : "no username" }}
      </p>
    </div>

    <div class="mt-10">
      <!-- DETAILS -->
      <ProfileCard
        text="My details"
        url="/profile/details"
        :verifiedEmail="user.verifiedEmail"
        iconName="i-material-symbols-person-2-outline"
      />
      <!-- ORDERS -->
      <ProfileCard
        text="My orders"
        url="/orders"
        iconName="i-material-symbols-shopping-bag-speed-outline"
      />
      <!-- SAVED ADDRESSES -->
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
  <LoadingIconLarge :loading="loadingUser" />
</template>

<script setup>
import { useUserStore } from "@/stores/userStore";
import { navigateTo } from "nuxt/app";
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const loadingUser = ref(false);

onMounted(async () => {
  try {
    if (!user) {
      await userStore.fetchUserDetails();
    } else {
      loadingUser.value = false;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loadingUser.value = false;
  }
});
</script>
