<template>
  <LoadingIconLarge :loading="true" />
</template>

<script setup>
import { useUserStore } from "@/stores/userStore";
const userStore = useUserStore();
onMounted(async () => {
  try {
    const token = useCookie("auth_token");
    token.value = null;

    // To reset the User state
    await userStore.fetchUserDetails();
    navigateTo("/login");
  } catch (error) {
    console.log(error);
  }
});
</script>
