<template>
  <section
    class="h-[70vh] p-10 flex flex-col justify-center items-center text-center"
    v-if="!ordersPresentInLocalStorage"
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

  <section v-if="ordersPresentInLocalStorage">
    <div class="flex items-center justify-around px-7 py-3 bg-white text-md">
      <div class="flex flex-col items-center font-manrope">
        <h1 class="font-semibold">Orders</h1>
        <p class="text-gray-800 text-sm">
          {{ finalOrders.length }} vendor{{
            finalOrders.length > 1 ? "s" : ""
          }}, {{ items }} items
        </p>
      </div>

      <div>
        <button class="text-red-500 text-sm"
        @click="clearOrders"
        >Clear</button>
      </div>
    </div>

    <div>
      <div
        class="flex items-center justify-center p-5 border-b-2 border-t-5 border-t-gray-200 border-b-gray-200 tracking-tight"
      >
        <div class="flex items-center bg-gray-200 w-full rounded-full">
          <button
            class="w-[50%] bg-transparent text-gray-900 border-1"
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
            class="w-[50%] bg-transparent text-gray-800 border-1"
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

    <div
      class="bg-gray-100 text-center text-gray-600 p-4 text-sm tracking-wide"
    >
      <p>Swipe items left to edit or delete</p>
    </div>

    <div>
      <div v-for="orderArray in finalOrders" :key="orderArray.vendorName">
        <div class="px-6 py-3 border-b border-gray-200 bg-white">
          <h3 class="font-bold tracking-wide text-black text-sm">
            {{ orderArray.vendorName }}
          </h3>
        </div>

        <div v-for="order in orderArray.orders">
          <OrderProductCard
            :productName="order.name"
            :quantity="order.quantity"
            :price="order.price"
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
      <div class="flex items-center justify-between">
        <p>Order total</p>
        <span class="tracking-wide"
          >&#8358;{{ totalOrderAmount.toLocaleString() }}</span
        >
      </div>
      <div>
        <button
          class="bg-gradient-to-r from-green-500 to-green-600 text-white uppercase py-2 w-full rounded-md cursor-pointer tracking-wide"
          @click="navigateToCheckOut"
        >
          Confirm Order
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useOrderStore } from "@/stores/orderStore";

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





// Clearing orders
const clearOrders = () => {
  localStorage.removeItem('orders');
  ordersPresentInLocalStorage.value = false
  finalOrders.value = [];
  items.value = 0;
  subTotal.value = 0;
  totalOrderAmount.value = 0;
  totalPrice.value = 0;

}

// Navigate to Check Out page
const navigateToCheckOut = () => {
  const router = useRouter();
  router.push('/Checkout');
};


</script>
