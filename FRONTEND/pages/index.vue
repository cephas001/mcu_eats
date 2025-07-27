<template>
  <LoadingIconLarge
    :loading="true"
    imageSrc="/Pulse@1x-1.0s-200px-200px.svg"
    class="animate-none"
  />
</template>

<script setup>
definePageMeta({
  middleware: ["check-selected-profile"],
});
</script>
