<template>
  <LoadingIconLarge
    :loading="true"
    imageSrc="/Pulse@1x-1.0s-200px-200px.svg"
    class="animate-none"
  />
</template>

<script setup>
import { useUserStore } from "@/stores/userStore";
const userStore = useUserStore();
onMounted(async () => {
  try {
    const response = await $fetch("/api/logout");

    if (response.message == "Logged out") {
      // Sets the user in session storage
      userStore.setUser(null);
      await navigateTo("/login");
    } else {
      throw new Error("An error occurred");
    }
  } catch (error) {
    console.log(error);
  }
});
</script>
