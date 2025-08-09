<template>
  <LoadingIconBars
    :loading="true"
  />
</template>

<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { setUserAndProfilesInState } from "@/composables/setUserAndProfilesInState";

const route = useRoute();

onMounted(async () => {
  await setUserAndProfilesInState(route.query?.redirectTo);
});
</script>
