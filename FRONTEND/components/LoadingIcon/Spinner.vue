<template>
  <section
    class="flex flex-col items-center justify-center overflow-hidden touch-none pointer-events-none"
    :class="[
      isLoaderEmbedded
        ? 'absolute bg-background/90 left-0 right-0 top-0 bottom-0 z-999 '
        : 'h-[80vh] bg-transparent',
    ]"
    v-if="loading"
  >
    <div class="custom-loader"></div>
    <h1 class="text-lg mt-4 font-manrope tracking-wide">
      {{ text }}
    </h1>
  </section>
</template>

<script setup>
const props = defineProps({
  loading: {
    type: Boolean,
    required: true,
  },
  text: {
    type: String,
  },
  isLoaderEmbedded: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="css" scoped>
.custom-loader {
  width: 60px;
  height: 60px;
  display: grid;
  border: 4px solid #0000;
  border-radius: 50%;
  border-color: #a3b18a #0000;
  animation: s6 1s infinite linear;
}
.custom-loader::before,
.custom-loader::after {
  content: "";
  grid-area: 1/1;
  margin: 2px;
  border: inherit;
  border-radius: 50%;
}
.custom-loader::before {
  border-color: #9f7240 #0000;
  animation: inherit;
  animation-duration: 0.5s;
  animation-direction: reverse;
}
.custom-loader::after {
  margin: 8px;
}

@keyframes s6 {
  100% {
    transform: rotate(1turn);
  }
}
</style>
