<template>
  <LoadingIconBars :loading="true" />
</template>

<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { checkLoggedInUser } from "@/composables/auth/checkLoggedInUser";

const route = useRoute();

onMounted(async () => {
  await checkLoggedInUser(route.query?.redirectTo);
});
</script>
