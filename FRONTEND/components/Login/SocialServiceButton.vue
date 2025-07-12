<template>
  <button
    class="flex border-1 border-gray-200 p-4 rounded-full w-full items-center justify-center gap-2 mb-3 font-semibold focus:bg-gray-100"
  >
    <img :src="imgSrc" :alt />{{ text }}
  </button>
</template>

<script setup>
const props = defineProps({
  imgSrc: {
    type: String,
  },
  text: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
  },
});
</script>
