<template>
  <LoadingIconSpinner :loading="true" />
</template>

<script setup>
import { logoutUser } from "@/composables/auth/logoutUser";

const route = useRoute();

onMounted(async () => {
  await logoutUser();

  if (route.query?.redirectToLogin) {
    await navigateTo("/auth/login");
  } else {
    await navigateTo("/");
  }
});
</script>
