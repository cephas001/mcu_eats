<template>
  <p class="text-center">
    For {{ showStaffFields ? "students" : "staffs" }}, please click
    <span class="text-primary" @click="showStaffFields = !showStaffFields"
      >here.</span
    >
  </p>
</template>

<script setup>
import { useAuthStore } from "@/stores/authStore";
import { storeToRefs } from "pinia";
const loginStore = useAuthStore();
const { showStaffFields } = storeToRefs(loginStore);
</script>
