<template>
  <div class="text-center mb-5">
    <div
      class="text-center mb-3 flex justify-center gap-2 items-center text-primary tracking-wide"
      @click="router.back()"
    >
      <UIcon name="i-material-symbols-arrow-back" class="text-xl" />
      <span>Back</span>
    </div>
    <h1 class="font-bold text-2xl mb-3">{{ title }}</h1>
    <p class="text-md font-manrope tracking-tight">
      {{ text }}
    </p>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

const props = defineProps({
  title: {
    type: String,
  },
  text: {
    type: String,
  },
});
</script>
