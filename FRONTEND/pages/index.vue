<template>
  <LoadingIconLarge
    :loading="true"
    imageSrc="/Pulse@1x-1.0s-200px-200px.svg"
    class="animate-none"
  />
</template>

<script setup>
import { navigateTo } from "nuxt/app";
import { onMounted } from "vue";
import { useUserStore } from "@/stores/userStore";
const userStore = useUserStore();

onMounted(async () => {
  try {
    const selectedProfile = await userStore.getSelectedProfile();
    if (!selectedProfile) {
      return await navigateTo("/consumer");
    }

    const { type } = selectedProfile;
    if (type === "consumer") {
      return await navigateTo("/consumer");
    } else if (type === "delivery_person") {
      return await navigateTo("/delivery-person");
    } else if (type === "vendor") {
      return await navigateTo("/vendor");
    }
  } catch (error) {
    return await navigateTo("/consumer");
  }
});
</script>
