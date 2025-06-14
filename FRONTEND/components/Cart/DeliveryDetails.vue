<template>
  <div class="flex items-center justify-between py-3 px-2 font-manrope text-md">
    <div class="flex items-center">
      <UIcon
        :name="firstIcon"
        class="text-gray-800 text-xl mr-4"
        v-if="firstIcon"
      />
      <p class="text-black text-sm tracking-wider uppercase">{{ text }}</p>
    </div>

    <div class="flex items-center cursor-pointer">
      <UIcon
        :name="secondIcon"
        v-if="secondIcon"
        class="text-primary text-xl"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  firstIcon: {
    type: String,
  },
  secondIcon: {
    type: String,
  },
});
</script>
