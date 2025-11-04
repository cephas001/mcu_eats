<template>
  <NuxtImg :src :class :custom="true" v-slot="{ imgAttrs, isLoaded, src }">
    <!-- Show the actual image when loaded -->
    <img v-if="isLoaded" v-bind="imgAttrs" :src="src" />

    <!-- Show a placeholder with the same width & height -->
    <img
      v-if="!isLoaded"
      :width="useImageWidthHeight ? imgAttrs.width : 'auto'"
      :height="useImageWidthHeight ? imgAttrs.height : 'auto'"
      src="/placeholder_.jpg"
      :class="`animate-pulse mx-auto ${placeholderClass}`"
    />
  </NuxtImg>
</template>

<script setup>
const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    default: "",
  },
  placeholderClass: {
    type: String,
    default: "",
  },
  useImageWidthHeight: {
    type: Boolean,
    default: true,
  },
});
</script>
