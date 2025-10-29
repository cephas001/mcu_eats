<template>
  <div
    class="flex justify-between items-center mb-4 rounded-md gap-4 shadow-md hover:shadow-lg focus:shadow-lg relative border-t-1 border-t-gray-100"
  >
    <div class="py-4 px-4 w-[60%]">
      <p
        class="font-bold text-sm font-manrope uppercase mb-2 tracking-wide text-primary"
        v-if="favouritePage"
        @click="checkAndNavigate"
      >
        {{ product.vendorName }}
      </p>
      <h1 class="mb-3" @click="checkAndNavigate">{{ product.name }}</h1>
      <p class="text-gray-600 text-sm line-clamp-2 mb-1">
        {{ product.description }}
      </p>
      <p class="text-sm font-bold tracking-wider font-manrope">
        &#8358;{{ product.price.toLocaleString() }}
      </p>

      <VendorProductActionIconsAndInput
        @update:productCount="updateCart"
        v-if="!favouritePage && selectedProfile.type !== 'vendor'"
        :productCount="product.count"
        :product
      />
    </div>

    <div class="absolute top-0 right-0 bottom-0 w-[40%]">
      <NuxtImg
        :src="product.productImage || '/restaurant/food3.jpg'"
        alt="Product Image"
        class="w-full h-[100%] object-cover cursor-pointer rounded-r-md bg-gradient-to-t from-black/90 to-transparent bg-blend-overlay"
      />

      <UIcon
        :name="`i-material-symbols-favorite${
          product.favourited ? '' : '-outline'
        }`"
        class="text-black font-bold text-3xl z-100 absolute top-3 right-2 cursor-pointer"
        :class="false ? 'animate-[var(--animate-pingOnce)]' : ''"
      />
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import { useVendorStore } from "@/stores/vendorStore";
import { useProfileStore } from "@/stores/profileStore";
import { useCartStore } from "../../stores/cartStore";
import { compareTime } from "@/utils/compareTime";
import { storeToRefs } from "pinia";

const vendorStore = useVendorStore();
const { setVendor } = vendorStore;

const cartStore = useCartStore();

const profileStore = useProfileStore();
const { selectedProfile } = storeToRefs(profileStore);

const open = ref(false);

const openModal = ref(false);

const {
  $AddItemToCartUseCase,
  $CheckProductInCartUseCase,
  $UpdateCartItemUseCase,
} = useNuxtApp();

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

const updateCart = async (count) => {
  props.product.count = count;

  try {
    const inCart = await $CheckProductInCartUseCase(null, props.product.id);

    if (inCart) {
      await $UpdateCartItemUseCase(null, props.product.id, {
        quantity: props.product.count,
      });

      cartStore.updateItemInCart(props.product.id, {
        quantity: props.product.count,
      });

      console.log(cartStore.getCart());

      return;
    }

    const { cartItem } = await $AddItemToCartUseCase(props.product.id, {
      id: props.product.id,
      productId: props.product.id,
      vendorId: props.vendorId,
      vendorName: props.vendorName,
      quantity: props.product.count,
      unitPrice: props.product.price,
    });

    cartStore.addItemToCart(cartItem);
  } catch (error) {
    console.error("Error", error);
  }
};
</script>
