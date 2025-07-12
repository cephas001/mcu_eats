<template>
  <section
    class="bg-transparent h-[80vh] overflow-hidden flex flex-col items-center justify-center"
    v-if="loading"
  >
    <img :src="imageSrc" :class />
    <h1 class="text-xl mt-4" v-if="text">{{ text }}</h1>
  </section>
</template>

<script setup>
const props = defineProps({
  loading: {
    type: Boolean,
    required: true,
  },
  imageSrc: {
    type: String,
    default: "/loading2.png",
  },
  class: {
    type: String,
    default: "animate-pulse",
  },
  text: {
    type: String,
  },
});
</script>
