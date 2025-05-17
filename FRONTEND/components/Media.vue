<template>
  <NuxtImg :src :class :custom="true" v-slot="{ imgAttrs, isLoaded, src }">
    <!-- Show the actual image when loaded -->
    <img v-if="isLoaded" v-bind="imgAttrs" :src="src" />

    <!-- Show a placeholder with the same width & height -->
    <img
      v-if="!isLoaded"
      :width="imgAttrs.width"
      :height="imgAttrs.height"
      src="/placeholder_.jpg"
      class="animate-pulse"
    />
  </NuxtImg>
</template>

<script setup lang="ts">
const props = defineProps<{ src: string; class?: string }>();
</script>
