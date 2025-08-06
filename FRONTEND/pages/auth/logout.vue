<template>
  <LoadingIconLarge
    :loading="true"
    imageSrc="/Pulse@1x-1.0s-200px-200px.svg"
    class="animate-none"
  />
</template>

<script setup>
import { logoutUserFromTokenAndStorage } from "@/composables/logoutUserFromTokenAndStorage";

const router = useRouter();
const route = useRoute();

onMounted(async () => {
  await logoutUserFromTokenAndStorage();

  if (route.query.redirect) {
    await navigateTo("/login");
  } else {
    await router.back();
  }
});
</script>
