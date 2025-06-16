<template>
  <div class="flex items-center pb-3 border-b-1 border-b-gray-200">
    <div class="flex items-center mr-4">
      <UIcon
        name="i-material-symbols-location-on-outline-rounded"
        class="text-xl self-center font-bold mr-2"
      />
      <h1 class="text-sm tracking-wide truncate">
        {{ text }}
      </h1>
    </div>
    <UCheckbox
      v-model="selectedOption"
      variant="outline"
      color="green"
      class="ml-auto"
    />
    <p class="text-sm text-gray-800" v-if="false">Add address</p>
  </div>
</template>

<script setup>
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  selected: {
    type: Boolean,
  },
});

const selectedOption = ref(props.selected);
</script>
