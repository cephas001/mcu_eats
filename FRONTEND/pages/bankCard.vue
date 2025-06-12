<template>
    <section class="min-h-screen bg-white">
        <header class="header flex justify-end px-6 py-3">
                <UIcon
                    name="i-material-symbols-light-close"
                    class="text-red-600 w-8 h-8 mt-3 cursor-pointer"
                    @click="navigateTo('/Checkout')"
                />
        </header>

        <!-- Logo and email -->
        <div class="logo-email flex items-center justify-around">
            <div>
                <img src="/mcu_eats_logo_.png" alt="Logo Image" class="w-[100px]">
            </div>

            <div class="flex flex-col">
                <p class="text-sm text-gray-600">okodughapeter85@gmail.com</p>
                <span class="text-black font-bold">NGN {{ totalOrderAmount.toLocaleString() }}</span>
            </div>
        </div>

        <!-- Form field for card details-->
    <div class="card-container mt-4">
      <div class="card flex-grow flex items-center justify-center p-6">
        <p class="font-manrope">Enter your card details for payment</p>
      </div>
        <form class="flex flex-col items-center justify-center">
          <div class="flex relative space-x-4 mb-4 w-3/4">
            <input 
              type="number" 
              class="w-full px-4 py-3 border focus:border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="CARD NUMBER"
            >
             <UIcon
                name="i-material-symbols-light-add-card"
                class="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-600 w-6 h-6"
              />
          </div>
          <!-- Expiry dates and cvv -->
          <div class="flex gap-4 w-3/4">
            <div class="relative flex-1">
              <input 
                type="text"
                inputmode="numeric" 
                class="w-full px-4 py-3 border focus:border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="MM/YY"
                v-model="expiryDate"
                @input = "formatExpiryDate"
                maxlength="5"
              >

            </div>

            <div class="relative flex-1">
              <input 
                type="password" 
                inputmode="numeric"
                class="w-full px-4 py-3 border focus:border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="CVV"
                maxlength="3"
              >

            </div>
             
          </div>
        </form>

        <!-- Payment Button -->
      <div class="btn-container flex flex-col items-center justify-center mt-4">
        <button
        class="bg-gradient-to-r from-green-500 to-green-600 text-white uppercase py-2 w-3/4 rounded-md cursor-pointer font-manrope"
        > Pay &#8358; {{ totalOrderAmount.toLocaleString() }}
       </button>

       <div class="container flex items-center justify-center mt-4">
          <div class="flex items-center gap-1">
            <UIcon
              name="i-material-symbols-light-lock"
              class="text-black text-xl w-5 h-5"
            />
            <span>Secured by</span> 
            <span class="font-semibold">FlutterWave</span>
          </div>
        </div>
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


const navigateToCheckOut = () => {
  const router = useRouter();
  router.push('/Checkout')
}

const expiryDate = ref("");
const formatExpiryDate = (event) => {
  let value = event.target.value.replace(/[^0-9]/g, "");
  // Format as MM/YY
  if(value.length > 2) {
    value = `${value.slice(0, 2) }/${value.slice(2, 4)}`;
  }
  expiryDate.value = value;
  
  
}


</script>