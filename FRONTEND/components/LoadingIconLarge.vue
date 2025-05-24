<template>
  <section
    class="bg-transparent h-[80vh] overflow-hidden flex flex-col items-center justify-center"
    v-if="loading"
  >
    <img :src="imageSrc" class="animate-pulse" />
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
});
</script>
