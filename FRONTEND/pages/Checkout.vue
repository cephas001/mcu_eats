<template>
  <section class="min-h-screen bg-gray-200">
    <!-- Header Markup -->
    <header
      class="favourites-header px-6 z-1000 bg-white sticky top-0 text-md border-b-15 border-gray-200"
    >
      <div class="flex items-center justify-between px-7 py-3 bg-white text-md">
          <div>
              <UIcon
              name="i-material-symbols-light-arrow-back"
              class="text-red-600 w-8 h-8 mr-4 mt-2"
              @click="navigateTo('/orders')"
              />
            </div>
            <div class="flex-grow flex flex-col items-center font-manrope">
                <h1 class="font-semibold">Checkout</h1>
                <p class="text-gray-800 text-sm">
                    {{ finalOrders.length }} vendor{{ finalOrders.length > 1 ? "s":"" }}, {{ items }} items
                </p>
            </div>
        </div>
     
    </header>
<!--  Body markup -->
<div>
      <div
        class="flex items-center justify-between py-3 px-6 border-b border-gray-200 bg-white font-manrope text-md"
      >
        <div class="flex items-center">
          <UIcon
            name="i-material-symbols-light-calendar-month-outline-sharp"
            class="text-gray-800 text-xl mr-4"
          />
          <p class="text-black text-sm">{Date and Time}</p>
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
      </div>

      <div
        class="flex items-center justify-between py-3 px-6 border-b-20 border-gray-200 bg-white font-manrope"
      >
        <div class="flex items-center">
          <UIcon
            name="i-material-symbols-call"
            class="text-gray-800 text-xl mr-4"
          />
          <p class="text-black tracking-wider text-sm">08112985079</p>
        </div>
    </div>

    <div
        class="flex items-center justify-between py-3 px-6 border-b border-gray-200 bg-white font-manrope text-md"
      >
        <div class="flex items-center"
         @click=""
        >
          <UIcon
            name="i-material-symbols-light-comment"
            class="text-gray-800 text-xl mr-4"
          />
          <p class="text-black text-sm">Add note for delivery personel</p>
        </div>
      </div>

      <div
        class="flex items-center justify-between py-4 px-8 font-manrope text-md"
      >
        <div class="flex items-center">
  
          <p class="text-black font-bold">Payment</p>
        </div>
      </div>
      
    <div
        class="flex items-center justify-between py-3 px-6 border-b border-gray-200 bg-white font-manrope"
        >
        <div class="flex items-center">
          <UIcon
            name="i-material-symbols-light-add-2"
            class="text-green-800 w-7 h-7 mr-4"
          />
          <button class="text-green-800 tracking-wider font-bold"
          @click="navigateToBankCard"
          >Add bank card</button>
        </div>
    </div>

    <div
        class="flex items-center justify-between py-7 px-6 bg-white font-manrope"
      >
        <div class="flex items-center">
          <UIcon
            name="i-material-symbols-light-check-circle-rounded"
            class="text-gray-800 text-xl mr-4"
          />
          <p class="text-gray-800 tracking-wider text-sm">Pay with transfer</p>
          <div class="absolute right-9">
            <label>
              <input type="radio" value="Pay with transfer" v-model="selectedOptionTransfer" style="height: 20px; width: 20px;" />
            </label>
          </div>
        </div>
      </div>

       <!-- Warning Note -->
       <div class="flex items-center justify-between py-4 px-12 text-md">
         
         <div v-if="selectedOptionTransfer === 'Pay with transfer'" class="text-red-600 text-center" style="white-space: normal; overflow-wrap: break-word;">
           <UIcon
             name="i-material-symbols-light-info"
             class="text-black text-xl mr-2"
           />
             Please ensure you complete the transfer within 15 minutes to avoid order cancellation.
         </div>
       </div>

       <!-- Button Markup -->
      <div
      class="px-10 py-7 sticky bottom-0 bg-white flex flex-col top-[calc(100vh-120px)] gap-2 border-t-1 border-t-gray-200"
      >
     
      <div class="flex items-center justify-between">
        <p>Amount due</p>
        <span class="tracking-wide"
          >&#8358;{{ totalOrderAmount.toLocaleString() }}</span
        >
      </div>
      <div>
        <button
          class="bg-gradient-to-r from-green-500 to-green-600 text-white uppercase py-2 w-full rounded-md cursor-pointer tracking-wide"
          @click="handleCheckOut"
        >
          Complete Order
        </button>
      </div>
    </div>

  </div>
  </section>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useOrderStore } from "@/stores/orderStore";
// import { useToast } from "vue-toastification"

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

// Navigate to add card
const navigateToBankCard = () => {
  const router = useRouter();
  router.push('/bankCard')
}

const selectedOptionTransfer = ref("");
const router = useRouter();
// const toast = useToast();

const handleCheckOut = () => {
  if(selectedOptionTransfer.value === "Pay with transfer") {
    router.push("/transfer");
  }
}


</script>