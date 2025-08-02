<template>
  <LoadingIconLarge
    :loading="true"
    imageSrc="/Pulse@1x-1.0s-200px-200px.svg"
    class="animate-none"
  />
</template>

<script setup>
import { useUserStore } from "@/stores/userStore";
import { useMessagesStore } from "@/stores/messagesStore";
import { db } from "@/utils/db";

const userStore = useUserStore();

const messagesStore = useMessagesStore();
const { messagesTypes } = storeToRefs(messagesStore);

const router = useRouter();
const route = useRoute();
const { $clearUserUseCase, $clearProfilesUseCase } = useNuxtApp();

onMounted(async () => {
  const messageType = messagesTypes.value[0];

  try {
    await $fetch("/api/logout");
  } catch (error) {
    messagesStore.addMessage({
      type: messageType,
      message: "Error during logout. Refresh page.",
    });
  }

  try {
    await $clearUserUseCase();
    await $clearProfilesUseCase();
  } catch (error) {
    console.log(error);
  }

  try {
    userStore.clearUser();
    userStore.setGuest(true);
  } catch (error) {
    messagesStore.addMessage({
      type: messageType,
      message: "Error during logout. Refresh page.",
    });
  }

  if (route.query.redirect) {
    await navigateTo("/login");
  } else {
    await router.back();
  }
});
</script>
