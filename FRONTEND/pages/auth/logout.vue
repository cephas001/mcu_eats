<template>
  <LoadingIconSpinner :loading="true" />
</template>

<script setup>
import { logoutUserFromTokenAndStorage } from "@/composables/logoutUserFromTokenAndStorage";

const router = useRouter();
const route = useRoute();

onMounted(async () => {
  await logoutUserFromTokenAndStorage();

  if (route.query.redirectToLogin) {
    await navigateTo("/login");
  } else {
    await navigateTo("/");
  }
});
</script>
