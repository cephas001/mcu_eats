<template>
  <LoadingIconLarge :loading="true" />
</template>

<script setup>
import { useUserStore } from "@/stores/userStore";
import { useRoute } from "vue-router";
import { navigateTo } from "nuxt/app";

definePageMeta({
  layout: "blank",
});

const userStore = useUserStore();

onMounted(async () => {
  const route = useRoute();

  const from = route.query.from;
  const mode = route.query.mode;
  const id = route.query.id;

  try {
    if (mode == "verifyEmail") {
      if (id) {
        userStore.updateUser({ verifiedEmail: true });
        if (from) {
          await navigateTo(from);
        } else {
          await navigateTo("/");
        }
      } else {
        await navigateTo("redirected/failed");
      }
    }
  } catch (error) {
    await navigateTo("redirected/failed");
    console.log(error);
  }
});
</script>
