<template>
  <div class="relative">
    <div
      class="absolute top-[15px] left-5 bg-primary p-1 flex items-center rounded-full z-150"
    >
      <UIcon
        name="i-material-symbols-arrow-back"
        class="text-3xl text-white"
        @click="$router.back()"
      />
    </div>
    <div>
      <Media
        :src="imageUrl"
        class="w-full h-70 object-cover brightness-90"
        :useImageWidthHeight="false"
        placeholderClass="h-70 w-full object-cover"
      />
    </div>
    <UIcon
      :name="`i-material-symbols-favorite${false ? '' : '-outline'}`"
      class="text-white absolute top-5 right-15 font-bold text-3xl"
    />
    <UIcon
      name="i-material-symbols-share"
      class="text-3xl absolute top-5 right-5 text-white"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  imageUrl: {
    type: String,
    default: "/brand_image_placeholder.jpg",
  },
});
</script>
