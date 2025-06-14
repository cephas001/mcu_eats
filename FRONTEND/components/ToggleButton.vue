<template>
  <button
    class="w-[50%] bg-transparent text-gray-900 border-1 text-sm"
    :class="[
      'px-6 py-2',
      selectedOption == text
        ? 'bg-white rounded-full text-black shadow-md border-black/20'
        : 'border-transparent',
    ]"
    @click="updateSelectedOption(text)"
  >
    {{ text }}
  </button>
</template>

<script setup>
const props = defineProps({
  selectedOption: {
    type: String,
  },
  text: {
    type: String,
  },
});
const emit = defineEmits(["update:selectedOption"]);
const updateSelectedOption = (option) => {
  emit("update:selectedOption", option);
};
</script>
