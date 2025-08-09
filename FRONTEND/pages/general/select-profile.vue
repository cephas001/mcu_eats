<template>
  <section class="h-[100vh]"></section>
</template>

<script setup>
import { onMounted } from "vue";
import { useProfileStore } from "@/stores/profileStore";
import { storeToRefs } from "pinia";

const profileStore = useProfileStore();
const { showSelectProfileModal } = storeToRefs(profileStore);

onMounted(() => {
  showSelectProfileModal.value = true;
});
</script>
