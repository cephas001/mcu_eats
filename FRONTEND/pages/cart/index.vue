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
    <CartHeader text="Cart" :deleteIcon="true" />

    <!-- Delivery and Pickup buttons -->
    <div
      class="p-5 border-b-1 border-t-1 border-t-gray-200 border-b-gray-200 tracking-tight"
    >
      <div class="flex items-center bg-gray-200 w-full rounded-full">
        <ToggleButton
          text="Delivery"
          :selectedOption
          @update:selectedOption="selectedOption = $event"
        />

        <ToggleButton
          text="Pick-up"
          :selectedOption
          @update:selectedOption="selectedOption = $event"
        />
      </div>
    </div>

    <!-- Delivery details -->
    <div>
      <UCollapsible
        class="py-2 px-4 bg-white font-manrope tracking-wide text-gray-500 space-y-2 text-sm"
      >
        <UButton
          class="group text-black font-poppins font-bold"
          label="Delivery details (please confirm)"
          color="neutral"
          variant="ghost"
          trailing-icon="i-lucide-chevron-down"
          :ui="{
            trailingIcon:
              'group-data-[state=open]:rotate-180 transition-transform duration-200',
          }"
          block
        />
        <template #content>
          <CartDeliveryDetails
            text="Atuwase, Room 5"
            firstIcon="i-material-symbols-location-on-outline"
            secondIcon="i-material-symbols-keyboard-arrow-down"
          />

          <CartDeliveryDetails
            text="08112985079"
            firstIcon="i-material-symbols-call"
            secondIcon="i-material-symbols-edit-sharp"
          />
        </template>
      </UCollapsible>
    </div>

    <!-- Swipe instructions -->
    <div
      class="bg-gray-100 border-t-gray-200 border-t-1 text-center text-gray-600 p-3 text-sm tracking-wide"
    >
      <p>Swipe items left to edit or delete</p>
    </div>

    <!-- Vendor and Products -->
    <div>
      <div v-for="cartArray in finalCart" :key="cartArray.vendorName">
        <div class="px-6 py-4 border-t-gray-200 border-t-1">
          <h3 class="font-bold text-primary uppercase tracking-wide text-sm">
            {{ cartArray.vendorName }}
          </h3>
        </div>

        <div v-for="item in cartArray.cart">
          <CartProduct :product="item" @delete="handleDelete" />
        </div>
      </div>
    </div>

    <!-- Price Breakdown -->
    <UCollapsible
      class="py-2 px-4 bg-white font-manrope tracking-wide text-gray-600 space-y-2 text-sm border-t-1 border-gray-200"
    >
      <UButton
        class="group text-black font-bold"
        label="Price breakdown"
        color="neutral"
        variant="ghost"
        trailing-icon="i-lucide-chevron-down"
        :ui="{
          trailingIcon:
            'group-data-[state=open]:rotate-180 transition-transform duration-200',
        }"
        block
      />
      <template #content>
        <div class="px-3">
          <CartPriceBreakdown text="Subtotal" :price="subTotal" />
          <CartPriceBreakdown
            text="Delivery fee"
            :price="deliveryFee"
            :explanation="true"
          />
          <CartPriceBreakdown text="Discount" :price="discount" />
          <CartPriceBreakdown
            text="Service fee"
            :price="serviceFee"
            :explanation="true"
          />
        </div>
      </template>
    </UCollapsible>

    <!-- Order Total and Confirm Order -->
    <div
      class="px-6 pt-5 sticky bottom-0 bg-white flex flex-col gap-2 border-t-1 border-t-gray-200"
    >
      <div class="flex items-center justify-between font-manrope font-semibold">
        <p class="uppercase">Order Total</p>
        <span class="tracking-wide"
          >&#8358;{{ totalOrderAmount.toLocaleString() }}</span
        >
      </div>
      <div class="mt-1">
        <button
          class="bg-gradient-to-r from-green-500 to-green-600 text-white uppercase py-3 w-full rounded-md cursor-pointer tracking-wide text-md"
          @click="checkAndConfirm"
        >
          Confirm Order
        </button>
      </div>
    </div>
  </section>

  <!-- Modal for login prompt -->
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

definePageMeta({
  middleware: ["check-user-and-profiles"],
  allowAnonymous: true,
  specificUserType: ["consumer"],
});

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const cartStore = useCartStore();
const {
  cart,
  finalCart,
  subTotal,
  totalOrderAmount,
  discount,
  serviceFee,
  deliveryFee,
} = storeToRefs(cartStore);

// Default selected option
const selectedOption = ref("Delivery");

const openModal = ref(false);

const checkAndConfirm = () => {
  if (!user?.value) {
    openModal.value = true;
  } else {
    navigateTo("/cart/checkout");
  }
};

const handleDelete = async (product) => {
  await cartStore.deleteFromCart(product);
  await cartStore.getCartValues();
  await cartStore.computeTotalCartPrice();
  loadFinalCartValue();
};

const loadFinalCartValue = () => {
  if (cart && cart?.value.length > 0) {
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
};

onMounted(async () => {
  await cartStore.getCartValues();
  await cartStore.computeTotalCartPrice();
  loadFinalCartValue();
});
</script>
