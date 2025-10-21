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

    <VendorProductActionIconsAndInput
      @update:productCount="updateCart"
      v-if="!favouritePage"
      :productCount="product.count"
      :product
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
import { useVendorStore } from "@/stores/vendorStore";
import { useCartStore } from "../../stores/cartStore";
import { compareTime } from "@/utils/compareTime";

const vendorStore = useVendorStore();
const { setVendor } = vendorStore;

const cartStore = useCartStore();

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
