<template>
  <section
    class="flex flex-col items-center justify-center overflow-hidden touch-none pointer-events-none"
    :class="[
      loaderIsEmbedded
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
  loaderIsEmbedded: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="css" scoped>
.custom-loader {
  width: 60px;
  height: 60px;
  background: #9f7240;
  border-radius: 9px;
  --c: radial-gradient(farthest-side, #000 92%, #0000);
  --s: 18px 18px;
  -webkit-mask: var(--c) left 4px top 4px, var(--c) right 4px top 4px,
    var(--c) right 4px bottom 4px, var(--c) left 4px bottom 4px,
    linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  -webkit-mask-repeat: no-repeat;
  animation: cu4 1.5s infinite;
}

@keyframes cu4 {
  0% {
    -webkit-mask-size: 0 0, 0 0, 0 0, 0 0, auto;
  }
  12.5% {
    -webkit-mask-size: var(--s), 0 0, 0 0, 0 0, auto;
  }
  25% {
    -webkit-mask-size: var(--s), var(--s), 0 0, 0 0, auto;
  }
  37.5% {
    -webkit-mask-size: var(--s), var(--s), var(--s), 0 0, auto;
  }
  50% {
    -webkit-mask-size: var(--s), var(--s), var(--s), var(--s), auto;
  }
  62.5% {
    -webkit-mask-size: 0 0, var(--s), var(--s), var(--s), auto;
  }
  75% {
    -webkit-mask-size: 0 0, 0 0, var(--s), var(--s), auto;
  }
  87.5% {
    -webkit-mask-size: 0 0, 0 0, 0 0, var(--s), auto;
  }
  100% {
    -webkit-mask-size: 0 0, 0 0, 0 0, 0 0, auto;
  }
}
</style>
