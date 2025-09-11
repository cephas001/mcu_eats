<template>
  <div>
    <!-- No header/footer, just the content -->
    <slot />
  </div>
</template>

<script setup>
onMounted(() => {
  console.log("here");
});
</script>
