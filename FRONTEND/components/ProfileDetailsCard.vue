<template>
  <div
    class="flex items-center justify-between bg-white py-4 px-6 border-b-1 border-b-gray-300"
  >
    <div class="flex items-center">
      <UIcon :name="iconName" class="text-2xl text-primary mr-4 self-center" />
      <div class="flex flex-col justify-center">
        <span class="text-sm text-gray-800 font-manrope tracking-wider">{{
          text
        }}</span>
        <p class="text-black text-sm tracking-wide">{{ subtext }}</p>
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
