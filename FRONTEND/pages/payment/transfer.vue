<template>
  <section class="min-h-screen">
    <!-- Header items -->
    <header>
      <div class="flex items-center justify-around px-7 py-5">
        <UIcon
          name="i-material-symbols-light-close"
          class="text-red-500 w-8 h-8"
          @click="$router.back()"
        />

        <h2 class="text-black font-manrope font-bold">Pay with transfer</h2>

        <div>
          <button class="text-gray-600 text-sm" @click="navigateTo('/support')">
            Help
          </button>
        </div>
      </div>
    </header>

    <!-- Bank icon markup -->
    <div class="container flex items-center justify-around mt-8">
      <div class="bankOne w-16 h-16 rounded-full shadow-md"></div>

      <div class="bankOne w-16 h-16 rounded-full shadow-md"></div>

      <div class="bankOne w-16 h-16 rounded-full shadow-sm py-2 bg-gray-200">
        <div class="flex flex-col items-center">
          <UIcon
            name="i-material-symbols-light-add-2"
            class="text-primary w-6 h-6"
          />
          <p class="font-manrope text-primary font-bold">more</p>
        </div>
      </div>
    </div>

    <!-- Payment Selection Markup -->
    <div class="container flex flex-col items-center justify-around mt-8">
      <!-- <p>
              Pay &#8358;{{ totalOrderAmount.toLocaleString() }} to 
            </p> -->
      <div class="mt-2">
        <span> Select a bank </span>
      </div>
    </div>

    <!-- Payment Selection Markup -->
    <div class="container flex flex-col items-center mt-8 space-y-4">
      <p class="font-bold">Instant payment notification</p>
      <span class="font-manrope text-gray-500 font-light"
        >Urgent payment needed?
      </span>

      <div class="flex items-center">
        <UIcon
          name="i-material-symbols-light-credit-card-outline"
          class="text-green-800 w-7 h-7 mr-4"
        />
        <button
          class="text-green-800 font-manrope font-bold cursor-pointer"
          @click="navigateToSavedCards"
        >
          Pay with card
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useOrderStore } from "@/stores/orderStore";
import { navigateTo } from "nuxt/app";

definePageMeta({
  middleware: ["check-user-and-profiles"],
});

// Default selected option
const selectedOption = ref("delivery");

const finalOrders = ref([]);
const items = ref(0);

const ordersPresentInLocalStorage = ref(false);

const orderStore = useOrderStore();
const { totalPrice } = storeToRefs(orderStore);

const subTotal = ref(0);
const deliveryFee = ref(500);
const discount = ref(0);
const serviceFee = ref(200);
const totalOrderAmount = ref(0);

onMounted(() => {
  const orders = JSON.parse(localStorage.getItem("orders"));

  if (orders && orders.length > 0) {
    // To toggle the two sections
    ordersPresentInLocalStorage.value = true;

    // To prevent multiple inaccurate additions
    totalOrderAmount.value = 0;
    totalPrice.value = 0;

    orders.forEach((order) => {
      // Determines the amount of items in cart
      items.value += order.quantity;

      // Calculate the total price of items in cart
      totalPrice.value += order.price * order.quantity;

      subTotal.value = totalPrice.value;

      totalOrderAmount.value =
        subTotal.value + deliveryFee.value + serviceFee.value - discount.value;
    });

    const groupedOrders = orders.reduce((acc, order) => {
      if (order.quantity > 0) {
        // Exclude orders where quantity is 0
        if (!acc[order.vendorId]) {
          acc[order.vendorId] = { vendorName: order.vendorName, orders: [] };
        }
        acc[order.vendorId].orders.push(order);
      }
      return acc;
    }, {});

    finalOrders.value = Object.values(groupedOrders).filter(
      (vendor) => vendor.orders.length > 0
    );
  }
});

const navigateToSavedCards = async () => {
  await navigateTo("/payment/saved-cards");
};
</script>
