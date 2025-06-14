<template>
  <div class="flex items-center justify-between mb-2">
    <h1 class="flex items-center gap-1">
      {{ text }}
      <UIcon
        name="i-material-symbols-help"
        class="text-lg"
        v-if="explanation"
      />
    </h1>
    <span>&#8358;{{ price.toLocaleString() }}</span>
  </div>
</template>

<script setup>
const props = defineProps({
  price: {
    type: Number,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  explanation: {
    type: Boolean,
  },
});
</script>
