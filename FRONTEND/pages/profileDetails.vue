<template>
  <section class="px-6 mt-6 mb-8">
    <div class="flex items-center">
      <UIcon
        name="i-material-symbols-arrow-back"
        size="30"
        class="text-primary cursor-pointer"
        @click.prevent="navigateTo('/profile')"
      />
      <h1 class="text-center w-[100%] tracking-wider">My details</h1>
    </div>
  </section>

  <section class="min-h-[80vh] pb-5" v-if="!loadingUser">
    <!-- Name -->
    <ProfileDetailsCard
      text="Name"
      :subtext="user.firstName + ' ' + user.lastName"
      :edit="true"
      iconName="i-material-symbols-light-person-outline"
    />
    <!-- Username -->
    <ProfileDetailsCard
      text="Username"
      :subtext="user.username ? '@' + user.username : 'NOT SET'"
      iconName="i-material-symbols-light-person-outline"
    />
    <!-- Phone Number -->
    <ProfileDetailsCard
      text="Phone Number"
      :edit="true"
      :subtext="user.phoneNumber ? user.phoneNumber : 'NOT SET'"
      iconName="i-material-symbols-call"
    />
    <!-- Email -->
    <ProfileDetailsCard
      :text="user.verifiedEmail ? 'Email (verified)' : 'Email (unverified)'"
      :edit="true"
      :subtext="user.email"
      iconName="i-material-symbols-light-mail-outline"
    />
    <!-- Gender -->
    <ProfileDetailsCard
      text="Gender"
      :subtext="user.gender"
      iconName="i-material-symbols-supervisor-account-outline"
    />
  </section>
  <LoadingIconLarge
    :loading="loadingUser"
    imageSrc="/Pulse@1x-1.0s-200px-200px.svg"
    class="animate-none"
  />
</template>

<script setup>
import { useUserStore } from "@/stores/userStore";
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const loadingUser = ref(true);

onMounted(async () => {
  try {
    if (user.value == {}) {
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
