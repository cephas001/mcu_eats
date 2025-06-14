<template>
  <div class="flex gap-4 overflow-x-scroll hide-scrollbar">
    <h1
      v-for="(type, index) in types"
      :key="index"
      class="text-gray-900 text-sm whitespace-nowrap py-1 px-3 rounded-full cursor-pointer"
      :class="[type.selected ? 'bg-primary_light' : '']"
      @click="select(type.id)"
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

const select = (id) => {
  props.types.map((type) => {
    if (id !== type.id) {
      return (type.selected = false);
    }
    selectedProductType.value = type;
    return (type.selected = true);
  });
};
</script>
