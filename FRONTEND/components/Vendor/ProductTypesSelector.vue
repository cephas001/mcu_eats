<template>
  <div class="flex gap-4 overflow-x-scroll hide-scrollbar">
    <h1
      v-for="(type, index) in sortedTypes"
      :key="index"
      class="text-gray-900 text-sm whitespace-nowrap py-1 px-3 rounded-full cursor-pointer"
      :class="[type.selected ? 'bg-primary_light' : '']"
      @click="select(type.name)"
    >
      {{ type.name }}
    </h1>
  </div>
</template>

<script setup>
import { useVendorStore } from "@/stores/vendorStore";
const vendorStore = useVendorStore();
const { selectedProductType } = storeToRefs(vendorStore);

const props = defineProps({
  types: {
    type: Array,
    required: true,
  },
});

const uniqueByName = (arr) => {
  const seen = new Map();
  return arr.filter((item) => {
    if (!seen.has(item.name)) {
      seen.set(item.name, true);
      return true;
    }
    return false;
  });
};

const sortedTypes = ref(uniqueByName(props.types));

const select = (name) => {
  sortedTypes.value = sortedTypes.value.map((type) => {
    const isSelected = type.name === name;
    type.selected = isSelected;

    if (isSelected) {
      selectedProductType.value = type;
    }

    return type;
  });
};
</script>
