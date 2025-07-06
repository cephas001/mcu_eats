<template>
  <div class="flex items-center mb-7" @click="navigateTo(url)">
    <div
      class="bg-gray-300 flex items-center rounded-full text-center p-1 mr-5"
    >
      <UIcon :name="iconName" class="text-xl self-center" />
    </div>
    <h1 class="flex gap-5 items-center text-sm tracking-wide">
      {{ text }}
      <span
        class="bg-primary text-white px-4 py-1 rounded-full text-[10px] tracking-wide"
        v-if="text == 'My details' && !verifiedEmail"
        >Verify email</span
      >
    </h1>
    <UIcon
      name="i-material-symbols-light-chevron-right"
      class="text-2xl self-center font-bold ml-auto"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  verifiedEmail: {
    type: Boolean,
    default: false,
  },
  text: {
    type: String,
    required: true,
  },
  url: {
    type: String,
  },
  iconName: {
    type: String,
  },
});
</script>
