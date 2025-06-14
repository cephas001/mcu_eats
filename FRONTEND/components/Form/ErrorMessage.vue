<template v-if="errorMessage != ''">
  <p
    :class="[
      classList != '' ? `${classList}` : '',
      'w-full pt-1 text-sm text-red-600 tracking-widest',
    ]"
  >
    {{ errorMessage }}
  </p>
  <ul
    v-for="(error, index) in errorList"
    :key="index"
    class="text-sm italic"
    v-if="errorList"
  >
    <li>{{ error }}</li>
  </ul>
</template>

<script setup>
import { defineProps } from "vue";
const props = defineProps({
  errorMessage: {
    type: String,
    required: true,
  },
  errorList: {
    type: Array,
    required: false,
  },
  classList: {
    type: String,
    required: false,
  },
});
</script>
