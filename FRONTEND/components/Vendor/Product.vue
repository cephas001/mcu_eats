<template>
  <div class="relative">
    <p
      class="font-bold text-sm font-manrope uppercase mb-2 tracking-wide text-primary"
      v-if="favouritePage"
      @click="checkAndNavigate"
    >
      {{ product.vendorName }}
    </p>
    <h1 class="mb-4" @click="checkAndNavigate">{{ product.name }}</h1>
    <p class="text-gray-600 text-sm">
      {{ product.description }}
    </p>
    <p class="text-sm font-bold tracking-wider font-manrope">
      &#8358;{{ product.price.toLocaleString() }}
    </p>
    <div class="flex w-fit rounded-md gap-1 pt-3 text-xl" v-if="!favouritePage">
      <div class="bg-primary_light rounded-full p-1 flex items-center">
        <UIcon
          name="i-material-symbols-add-2-rounded"
          @click="
            updateCart(
              product,
              product.vendorId || vendorId,
              product.vendorName || vendorName,
              'increase'
            )
          "
        />
      </div>
      <div class="bg-primary_light rounded-full p-1 flex items-center">
        <UIcon
          name="i-material-symbols-remove"
          @click="
            updateCart(
              product,
              product.vendorId || vendorId,
              product.vendorName || vendorName,
              'decrease'
            )
          "
        />
      </div>
      <input
        type="text"
        disabled
        class="w-[50px] ml-3 font-manrope"
        :class="[product.count < 1 ? 'hidden' : 'visible']"
        v-model="product.count"
      />
    </div>
    <UIcon
      :name="`i-material-symbols-favorite${
        product.favourited ? '' : '-outline'
      }`"
      class="text-black absolute right-0 top-0 font-bold text-3xl"
      :class="animate ? 'animate-[var(--animate-pingOnce)]' : ''"
      @click.self="favouriteProduct"
    />
  </div>
  <UModal v-model:open="open" class="bg-white pb-4" title="Action Required">
    <template #content>
      <div class="text-center px-5 py-10">
        <h1 class="mt-2 tracking-wide text-lg">Login to complete action</h1>
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
  <UModal v-model:open="openModal" class="bg-white pb-4" title="Message">
    <template #content>
      <div class="text-center px-5 py-10 flex items-center h-48">
        <h1 class="mt-2 tracking-wide">
          This vendor is not taking orders right now.
        </h1>
      </div>
    </template>
  </UModal>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

import { useUserStore } from "@/stores/userStore";
import { useCartStore } from "@/stores/cartStore";
import { storeToRefs } from "pinia";
import { useVendorStore } from "@/stores/vendorStore";
import { compareTime } from "@/utils/compareTime";
import { useUserFavouritesStore } from "@/stores/userFavouritesStore";

const userFavouritesStore = useUserFavouritesStore();

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const { setUser } = userStore;

const cartStore = useCartStore();
const { updateCart } = cartStore;

const vendorStore = useVendorStore();
const { setVendor } = vendorStore;

const open = ref(false);

const openModal = ref(false);

const animate = ref(false);

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
  favouritePage: {
    type: Boolean,
  },
  vendorId: {
    type: String,
  },
  vendorName: {
    type: String,
  },
});

const emit = defineEmits(["unfavourite"]);

const favouriteProduct = async () => {
  const user = await db.user.toArray();
  if (!user || user.length === 0) {
    open.value = true;
    return;
  }
  animate.value = true;

  try {
    userFavouritesStore.favouriteProduct(
      props.vendorId,
      props.product,
      user[0]._id
    );
  } catch (error) {
    console.log(error);
  }
};

const checkAndNavigate = () => {
  if (props.favouritePage) {
    var open = compareTime(
      props.product.vendorClosingTime.hour,
      props.product.vendorClosingTime.minute,
      props.product.vendorTakingOrders
    );
    if (open) {
      setVendor(null);
      navigateTo(
        `/vendors/${props.product.vendorId}?type=${props.product.type}`
      );
    } else {
      openModal.value = true;
    }
  }
};
</script>
