<template>
  <div
    :class="`flex items-center pb-3 border-b-1 border-b-gray-200 ${classList} font-manrope `"
  >
    <div class="flex items-center">
      <UIcon :name="iconName" class="text-xl self-center font-bold mr-2" />
      <h1 class="text-sm tracking-wide truncate">
        {{ address ? tag + " (" + address + ")" : tag }}
      </h1>
    </div>
    <UCheckbox
      v-if="showSelected"
      v-model="selectedOption"
      variant="outline"
      color="green"
      class="ml-auto"
    />
    <p class="ml-auto text-sm text-gray-800" v-if="!address">Add address</p>
    <p
      class="ml-auto text-sm text-gray-800"
      v-if="address && !showSelected && showEdit"
    >
      Edit
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  tag: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  selected: {
    type: Boolean,
  },
  showSelected: {
    type: Boolean,
    default: true,
  },
  showEdit: {
    type: Boolean,
    default: true,
  },
  classList: {
    type: String,
  },
  iconName: {
    type: String,
    default: "i-material-symbols-location-on-outline-rounded",
  },
});

const selectedOption = ref(props.selected);
</script>
