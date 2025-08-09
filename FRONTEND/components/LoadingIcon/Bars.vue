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
  width:60px;
  height:75px;
  --c:linear-gradient(#9F7240 0 0);
  background: 
    var(--c) 0%   50%,
    var(--c) 50%  50%,
    var(--c) 100% 50%;
  background-size:9px 50%;
  background-repeat: no-repeat;
  animation:b7 1s infinite linear alternate;
}
@keyframes b7 {
    20% {background-size:9px 20% ,9px 50% ,9px 50% }
    40% {background-size:9px 100%,9px 20% ,9px 50% }
    60% {background-size:9px 50% ,9px 100%,9px 20% }
    80% {background-size:9px 50% ,9px 50% ,9px 100%}
}
</style>
