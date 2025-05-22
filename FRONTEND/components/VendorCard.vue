<template>
  <div class="relative">
    <div
      class="bg-primary w-fit py-1 px-2 rounded-r-full absolute top-10 left-[-4px] text-white text-sm z-100"
    >
      {{ vendor.category }}
    </div>
    <Media
      :src="vendor.image"
      class="rounded-t-md"
      @click.self="openVendor(vendor.id, vendor.open)"
    />
    <!-- icon to favorite would be to the top right -->
    <UIcon
      :name="`i-material-symbols-favorite${vendor.favourite ? '' : '-outline'}`"
      class="text-black absolute z-100 top-3 right-3 font-bold text-3xl"
      :class="vendor.favourite ? 'animate-[var(--animate-pingOnce)]' : ''"
      @click.self="favouriteVendor(vendor.id)"
    />
    <div
      class="bg-black/50 absolute inset-0 flex flex-col items-center justify-center gap-5 text-white text-lg"
      v-if="!vendor.open"
    >
      <p class="font-semibold">Closed</p>

      <p>Opens at 7:00am</p>
    </div>
  </div>

  <div
    class="py-3 pl-5 flex justify-left items-center"
    @click="openVendor(vendor.id)"
  >
    <div>
      <!-- avatar -->
      <img
        src="@/assets/images/avatars/avatar.jpg"
        class="w-[40px] rounded-full"
      />
    </div>
    <div class="ml-2 w-[70%]">
      <h1 class="font-semibold tracking-wide">{{ vendor.name }}</h1>
      <p
        class="text-gray-700 text-sm whitespace-nowrap overflow-hidden text-ellipsis"
      >
        {{ vendor.description }}
      </p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  vendor: {
    type: Object,
  },
});

const openVendor = () => {
  console.log("opened");
};

const favouriteVendor = () => {
  console.log("favourited");
};
</script>
