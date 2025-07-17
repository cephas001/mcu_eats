<template>
  <LoadingIconLarge
    :loading="true"
    imageSrc="/Pulse@1x-1.0s-200px-200px.svg"
    class="animate-none"
  />
</template>

<script setup>
import { useUserStore } from "@/stores/userStore";
import { db } from "@/utils/db";

const userStore = useUserStore();
const router = useRouter();
const route = useRoute();
const {
  $useLoginUserWithEmailAndPasswordUseCase,
  $expressAuthBackendService,
  $expressUserBackendService,
  $useIndexedDBUserRepo,
  $useIndexedDBProfileRepo,
  $useIndexedDBMessageRepo,
} = useNuxtApp();

onMounted(async () => {
  try {
    await $fetch("/api/logout");

    userStore.clearUser();
    await $useIndexedDBUserRepo.clearUser();
    await $useIndexedDBProfileRepo.clearProfiles();
    await $useIndexedDBMessageRepo.clearMessages();

    if (route.query.redirect) {
      await navigateTo("/login");
    } else {
      await router.back();
    }
  } catch (error) {
    console.log(error);
  }
});
</script>
