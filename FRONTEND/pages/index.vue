<template>
  <LoadingIconLarge
    :loading="true"
    imageSrc="/Pulse@1x-1.0s-200px-200px.svg"
    class="animate-none"
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
