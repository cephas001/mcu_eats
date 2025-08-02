<template>
  <ProfilePageHeader text="Orders" classList="mb-4 px-6 pt-8 pb-4" />
</template>

<script setup>
definePageMeta({
  middleware: ["check-user-and-profiles"],
});
</script>
