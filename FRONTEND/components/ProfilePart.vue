<template>
  <div
    class="flex items-center justify-between py-2 border-b border-gray-200 bg-white mt-3"
  >
    <div class="flex items-center">
      <UIcon :name="iconName" class="text-primary text-xl mr-4 self-center" />
      <div class="flex flex-col justify-center">
        <span class="text-sm text-gray-600 font-bold">{{ text }}</span>
        <p class="text-black">{{ subtext }}</p>
      </div>
    </div>

    <div class="flex items-center p-1 cursor-pointer" v-if="edit">
      <UIcon name="i-material-symbols-edit-sharp" class="text-gray-600" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  subtext: {
    type: String,
    required: true,
  },
  iconName: {
    type: String,
    required: true,
  },
  edit: {
    type: Boolean,
  },
});
</script>
