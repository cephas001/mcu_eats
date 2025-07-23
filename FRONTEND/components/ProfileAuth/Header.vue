<template>
  <div class="px-1 mb-10 flex justify-between items-center">
    <div>
      Step 3 of
      <span class="border-primary border-2 px-2 py-1 rounded-full ml-[0.5px]"
        >3</span
      >
    </div>
    <div
      class="text-center flex justify-center gap-2 items-center text-primary tracking-wide"
      @click="router.back()"
    >
      <UIcon name="i-material-symbols-arrow-back" class="text-xl" />
      <span>Back</span>
    </div>
  </div>
  <div class="text-center mb-5 mt-7">
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
