<template>
  <section :class="[classList]">
    <div class="flex items-center">
      <UIcon
        name="i-material-symbols-arrow-back"
        size="30"
        class="text-primary cursor-pointer"
        @click.prevent="$router.back()"
      />
      <h1 class="text-center w-[100%]">{{ text }}</h1>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  classList: {
    type: String,
    default: "px-6 pt-8 pb-4",
  },
});
</script>
