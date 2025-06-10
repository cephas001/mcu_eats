<template>
  <section
    class="h-[70vh] p-10 flex flex-col justify-center items-center text-center"
    v-if="!cart || cart?.length == 0"
  >
    <div class="mb-5">
      <Media src="/no_order.png" />
    </div>
    <div class="font-manrope p-3">
      <h1 class="mb-5 text-gray-800 text-sm tracking-wider">
        We are waiting for your first order
      </h1>
      <UButton
        icon="i-material-symbols-add-shopping-cart"
        class="rounded-full font-poppins py-3 px-4 text-black cursor-pointer"
        label="Order now"
        to="/"
      />
    </div>
  </section>

  <section v-if="cart && cart?.length > 0">
    <!-- Cart Heading -->
    <div class="flex items-center justify-around px-7 py-3 bg-white text-md">
      <div class="flex flex-col items-center font-manrope">
        <h1 class="font-semibold">Cart</h1>
        <p class="text-gray-800 text-sm">
          {{ finalCart.length }} vendor{{ finalCart.length > 1 ? "s" : "" }},
          {{ items }} item{{ items > 1 ? "s" : "" }}
        </p>
      </div>

      <div>
        <button class="text-red-500 text-sm" @click="clearCart">Clear</button>
      </div>
    </div>

    <!-- Delivery and Pickup buttons -->
    <div>
      <div
        class="flex items-center justify-center p-5 border-b-2 border-t-5 border-t-gray-200 border-b-gray-200 tracking-tight"
      >
        <div class="flex items-center bg-gray-200 w-full rounded-full">
          <button
            class="w-[50%] bg-transparent text-gray-900 border-1 text-sm"
            :class="[
              'px-6 py-2',
              selectedOption == 'delivery'
                ? 'bg-white rounded-full text-black shadow-md border-black/20'
                : 'border-transparent',
            ]"
            @click="selectedOption = 'delivery'"
          >
            Delivery
          </button>

          <button
            class="w-[50%] bg-transparent text-gray-800 border-1 text-sm"
            :class="[
              'px-6 py-2',
              selectedOption == 'pickup'
                ? 'bg-white rounded-full text-black shadow-md border-black/20'
                : 'border-transparent',
            ]"
            @click="selectedOption = 'pickup'"
          >
            Pick-up
          </button>
        </div>
      </div>

      <div
        class="flex items-center justify-between py-3 px-6 border-b border-gray-200 bg-white font-manrope text-md"
      >
        <div class="flex items-center">
          <UIcon
            name="i-material-symbols-location-on-outline"
            class="text-gray-800 text-xl mr-4"
          />
          <p class="text-black text-sm">Atuwase, Room 5</p>
        </div>

        <div
          class="flex items-center p-1 rounded-full bg-primary_light cursor-pointer"
        >
          <UIcon
            name="i-material-symbols-keyboard-arrow-down"
            class="text-primary text-xl"
          />
        </div>
      </div>

      <div
        class="flex items-center justify-between py-3 px-6 border-b border-gray-200 bg-white font-manrope"
      >
        <div class="flex items-center">
          <UIcon
            name="i-material-symbols-call"
            class="text-gray-800 text-xl mr-4"
          />
          <p class="text-black tracking-wider text-sm">08112985079</p>
        </div>
        <UIcon
          name="i-material-symbols-edit-sharp"
          class="text-gray-600 text-xl"
        />
      </div>
    </div>

    <!-- Swipe text -->
    <div
      class="bg-gray-100 text-center text-gray-600 p-4 text-sm tracking-wide"
    >
      <p>Swipe items left to edit or delete</p>
    </div>

    <div>
      <div v-for="cartArray in finalCart" :key="cartArray.vendorName">
        <div class="px-6 py-3 border-b border-gray-200 bg-white">
          <h3 class="font-bold tracking-wide text-black text-sm">
            {{ cartArray.vendorName }}
          </h3>
        </div>

        <div v-for="item in cartArray.cart">
          <CartProductCard
            :productName="item.name"
            :quantity="item.quantity"
            :price="item.price"
          />
        </div>
      </div>
    </div>

    <!-- <div
      class="flex items-center justify-between py-4 px-6 border-y-1 border-gray-200 bg-white text-sm"
    >
      <p class="text-gray-600 text-sm">Add referral or discount code</p>
      <UIcon
        name="i-material-symbols-chevron-right-rounded"
        class="text-gray-600 text-xl"
      />
    </div> -->

    <div
      class="py-5 px-6 bg-white font-manrope tracking-wide text-gray-500 space-y-2 text-sm"
    >
      <div class="flex items-center justify-between">
        <h1>Subtotal</h1>
        <span>&#8358;{{ subTotal.toLocaleString() }}</span>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <h1 class="mr-1">Delivery fee</h1>
          <UIcon name="i-material-symbols-help" class="text-xl" />
        </div>
        <span>&#8358;{{ deliveryFee.toLocaleString() }}</span>
      </div>

      <div class="flex items-center justify-between">
        <h1>Discount</h1>
        <span>&#8358;{{ discount.toLocaleString() }}</span>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <h1 class="mr-1">Service fee</h1>
          <UIcon name="i-material-symbols-help" class="text-xl" />
        </div>
        <span>&#8358;{{ serviceFee.toLocaleString() }}</span>
      </div>
    </div>

    <div
      class="px-6 py-3 sticky bottom-0 bg-white flex flex-col gap-2 border-t-1 border-t-gray-200"
    >
      <div class="flex items-center justify-between font-manrope">
        <p>Order total</p>
        <span class="tracking-wide"
          >&#8358;{{ totalOrderAmount.toLocaleString() }}</span
        >
      </div>
      <div>
        <button
          class="bg-gradient-to-r from-green-500 to-green-600 text-white uppercase py-2 w-full rounded-md cursor-pointer tracking-wide text-sm"
          @click="checkAndConfirm"
        >
          Confirm Order
        </button>
      </div>
    </div>
  </section>
  <UModal
    v-model:open="openModal"
    class="bg-white pb-4"
    title="Action Required"
  >
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
import { onMounted, ref } from "vue";
import { useCartStore } from "@/stores/cartStore";
import { useUserStore } from "@/stores/userStore";

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const cartStore = useCartStore();
const { cart, totalCartPrice } = storeToRefs(cartStore);

// Default selected option
const selectedOption = ref("delivery");

const finalCart = ref([]);
const items = ref(0);

const subTotal = ref(0);
const deliveryFee = ref(500);
const discount = ref(0);
const serviceFee = ref(200);
const totalOrderAmount = ref(0);

const openModal = ref(false);

const checkAndConfirm = () => {
  if (!user?.value) {
    openModal.value = true;
  }
};

onMounted(() => {
  if (cart && cart?.value.length > 0) {
    totalOrderAmount.value = 0;

    cart.value.forEach((item) => {
      // Determines the amount of items in cart
      items.value += item.quantity;

      subTotal.value = totalCartPrice.value;

      totalOrderAmount.value =
        subTotal.value + deliveryFee.value + serviceFee.value - discount.value;
    });

    const groupedCart = cart.value.reduce((acc, item) => {
      if (item.quantity > 0) {
        // Exclude orders where quantity is 0
        if (!acc[item.vendorId]) {
          acc[item.vendorId] = { vendorName: item.vendorName, cart: [] };
        }
        acc[item.vendorId].cart.push(item);
      }
      return acc;
    }, {});

    finalCart.value = Object.values(groupedCart).filter(
      (vendor) => vendor.cart.length > 0
    );
  }
});

// Clearing orders
const clearCart = () => {
  cartStore.setCart([]);
};
</script>
