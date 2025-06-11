<template>
  <div
    class="font-manrope flex mb-1 text-left items-center whitespace-nowrap border-b-1 border-gray-300 border-t-1 transition-all w-full overflow-hidden relative"
  >
    <div
      class="flex items-center justify-between px-6 py-4 w-full transition-all duration-400"
      :class="[showEditDelete ? 'translate-x-[-50%] gap-4' : '']"
      ref="el"
    >
      <div class="flex items-center">
        <span class="font-semibold text-sm mr-8 tracking-wide">
          {{ quantity }}x</span
        >
        <p class="font-poppins">{{ productName }}</p>
      </div>
      <div>
        <p>&#8358;{{ (price * quantity).toLocaleString() }}</p>
      </div>
    </div>
    <div
      class="transition-all duration-400 absolute bg-gray-100 p-4"
      :class="[
        showEditDelete
          ? 'right-[80px] w-fit opacity-100'
          : 'opacity-0 right-[-100%] w-0',
      ]"
    >
      <button>Edit</button>
    </div>
    <div
      class="transition-all duration-300 absolute bg-red-100 p-4 text-red-700"
      :class="[
        showEditDelete
          ? 'right-0 w-fit opacity-100'
          : 'opacity-0 right-[-100%] w-0',
      ]"
    >
      <button>Delete</button>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const el = ref(null);
const { isSwiping, direction } = useSwipe(el);

const showEditDelete = ref(false);

watch(direction, (newDirection) => {
  if (newDirection == "left") {
    showEditDelete.value = true;
  } else {
    showEditDelete.value = false;
  }
});
const props = defineProps({
  quantity: {
    type: Number,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});
</script>
