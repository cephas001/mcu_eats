<template>
  <button
    class="text-white rounded-md p-3 w-full bg-primary text-center text-md"
  >
    {{ text }}
  </button>
</template>

<script setup>
const props = defineProps({
  text: {
    type: String,
    default: "Submit",
  },
});
</script>
