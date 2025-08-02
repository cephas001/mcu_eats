<template>
  <h1>Delivery person</h1>
</template>

<script setup>
definePageMeta({
  middleware: ["check-user-and-profiles", "check-selected-profile"],
});
</script>
