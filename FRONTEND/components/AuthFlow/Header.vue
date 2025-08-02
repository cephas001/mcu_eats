<template>
  <div class="text-center mt-10 mb-5">
    <h1 class="font-bold text-2xl mb-3">{{ mainText }}</h1>
    <p class="text-md font-manrope tracking-tight">
      {{ subText }}
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  mainText: {
    type: String,
    required: true,
  },
  subText: {
    type: String,
    required: true,
  },
});
</script>
