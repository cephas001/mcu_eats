<template>
  <div class="relative">
    <div
      class="bg-primary w-fit py-1 px-2 rounded-r-full absolute top-10 left-[-4px] text-white text-sm z-100"
    >
      {{ vendor.category }}
    </div>
    <Media
      src="/restaurant/food1.jpg"
      class="rounded-t-md"
      @click.self="openVendor()"
    />
    <!-- icon to favorite would be to the top right -->
    <UIcon
      :name="`i-material-symbols-favorite${
        favouriteOrNot(vendor._id) ? '' : '-outline'
      }`"
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
        Opens at {{ vendor.opening_time.hour
        }}{{ vendor.opening_time.hour > 11 ? "pm" : "am" }}
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
import { useUserStore } from "@/stores/userStore";
import { useVendorStore } from "@/stores/vendorStore";
import { compareTime } from "@/utils/compareTime";

const userStore = useUserStore();
const { favouriteOrNot, favouriteVendor } = userStore;
const open = ref(false);

const vendorStore = useVendorStore();
const { setVendor } = vendorStore;

const animate = ref(false);

const favouriteVendorComponent = (id) => {
  const token = useCookie("auth_token");
  if (!token.value || token.value == "") {
    open.value = true;
    return;
  }
  animate.value = true;
  favouriteVendor(id);
};

const props = defineProps({
  vendor: {
    type: Object,
  },
});

const isOpen = computed(() => {
  var open = compareTime(
    props.vendor.closing_time.hour,
    props.vendor.closing_time.minute,
    props.vendor.taking_orders
  );
  return open;
});

const openVendor = () => {
  if (isOpen.value) {
    setVendor(null);
    navigateTo(`/vendors/${props.vendor._id}`);
  }
};
</script>
