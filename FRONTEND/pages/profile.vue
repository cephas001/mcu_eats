<template>
  <section class="px-8 font-manrope pb-5" v-if="!loadingUser">
    <header class="mt-5 py-3 text-center text-lg">
      <h1 class="font-bold text-gray-800 uppercase tracking-wide">Details</h1>
    </header>

    <!-- Name -->
    <ProfilePart
      text="Name"
      :subtext="user.firstName + ' ' + user.lastName"
      :edit="true"
      iconName="i-material-symbols-light-person-outline"
    />
    <!-- Phone Number -->
    <ProfilePart
      text="Phone Number"
      :edit="true"
      :subtext="user.phoneNumber ? user.phoneNumber : 'SET PHONE NUMBER'"
      iconName="i-material-symbols-call"
    />
    <!-- Email -->
    <ProfilePart
      :text="user.verifiedEmail ? 'Email (verified)' : 'Email (unverified)'"
      :edit="true"
      :subtext="user.email"
      iconName="i-material-symbols-light-mail-outline"
    />
    <!-- Gender -->
    <ProfilePart
      text="Gender"
      :subtext="user.gender"
      iconName="i-material-symbols-supervisor-account-outline"
    />
  </section>
  <LoadingIconLarge :loading="loadingUser" />
</template>

<script setup>
import { useUserStore } from "@/stores/userStore";
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const loadingUser = ref(true);

onMounted(async () => {
  try {
    await userStore.fetchUserDetails();
  } catch (error) {
    console.log(error);
  } finally {
    loadingUser.value = false;
  }
});
</script>
