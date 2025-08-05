<template>
  <div class="relative">
    <div
      class="bg-primary w-fit py-1 px-2 rounded-r-full absolute top-10 left-[-4px] text-white text-sm z-100"
    >
      {{ capitalizeWords(vendor.category) }}
    </div>
    <Media
      src="/restaurant/food1.jpg"
      class="rounded-t-md"
      @click.self="openVendor()"
    />
    <!-- icon to favorite would be to the top right -->
    <UIcon
      :name="`i-material-symbols-favorite${false ? '' : '-outline'}`"
      class="text-black absolute z-100 top-3 right-3 font-bold text-3xl"
      :class="animate ? 'animate-[var(--animate-pingOnce)]' : ''"
      @click.self="favouriteVendorComponent(vendor._id)"
    />
    <div
      class="bg-black/50 absolute inset-0 flex flex-col items-center justify-center gap-5 text-white text-lg"
      v-if="!isOpen"
    >
      <p class="font-semibold">Closed</p>

      <p>
        Opens at {{ vendor.openingTime.hour
        }}{{ vendor.openingTime.hour > 11 ? "pm" : "am" }}
      </p>
    </div>
  </div>

  <div class="py-3 pl-5 flex justify-left items-center" @click="openVendor()">
    <div>
      <UAvatar src="/avatars/avatar.jpg" />
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

  <UModal v-model:open="open" class="bg-white pb-4" title="Action Required">
    <template #content>
      <div class="text-center px-5 py-10">
        <h1 class="mt-3 tracking-wide text-md">Login to complete action</h1>
        <div class="mt-3">
          <NuxtLink
            to="/login"
            class="bg-black text-white text-sm tracking-wider p-2 rounded-md"
            >Proceed</NuxtLink
          >
        </div>
      </div>
    </template>
  </UModal>
</template>

<script setup>
import { useVendorStore } from "@/stores/vendorStore";
import { compareTime } from "@/utils/compareTime";
import { useUserFavouritesStore } from "@/stores/userFavouritesStore";
import { db } from "@/utils/db";

const open = ref(false);

const vendorStore = useVendorStore();
const { setVendor } = vendorStore;
const userFavouritesStore = useUserFavouritesStore();
const { favouriteVendor } = userFavouritesStore;
const animate = ref(false);

const favouriteVendorComponent = async (id) => {
  const user = await db.user.toArray();
  if (!user || user.length === 0) {
    open.value = true;
    return;
  }
  animate.value = true;

  try {
    favourited.value = !favourited.value;
    await favouriteVendor(id, user[0]._id);
  } catch (error) {
    favourited.value = !favourited.value;
    console.log("Error favouriting vendor:", error);
  }
};

const props = defineProps({
  vendor: {
    type: Object,
  },
  // favouriteIds: {
  //   type: Array,
  // },
});

const isOpen = computed(() => {
  var open = compareTime(
    props.vendor.closingTime.hour,
    props.vendor.closingTime.minute,
    props.vendor.takingOrders
  );
  return true;
});

const capitalizeWords = (str) => {
  return str
    .split(" ") // split into words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // capitalize first letter
    .join(" "); // join back into a string
};

const favourited = ref(false);

// watchEffect(() => {
//   favourited.value = props.favouriteIds?.includes(props.vendor._id) || false;
// });

const openVendor = () => {
  if (isOpen.value) {
    setVendor(null);
    navigateTo(`/vendors/${props.vendor._id}`);
  }
};
</script>
