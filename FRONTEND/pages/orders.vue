<template>
  <section
    class="p-10 flex flex-col justify-center items-center text-center"
    v-if="false"
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

  <section class="bg-gray-100">
    <div
      class="flex justify-between items-center p-5 border-b-10 border-gray-200 bg-white sticky top-0"
    >
      <UIcon
        name="i-material-symbols-close"
        class="text-red-600 cursor-pointer w-10 h-10 p-2 rounded"
      />

      <div class="flex flex-col items-center">
        <h1 class="text-2xl font-bold">Orders</h1>
        <p class="text-gray-400">2 vendors, 2 items</p>
      </div>

      <button class="text-gray-400">Delete all</button>
    </div>

    <div>

      <div
        class="flex items-center justify-center bg-white p-5 border-b border-gray-200"
      >
        <div class="flex items-center space-x-4">
          <button 
            :class="[
             'font-bold px-6 py-2 rounded-full transition-all duration-300 ease-in-out transform',
              selectedOption === 'delivery' ? 'bg-white text-black' : 'bg-gray-100 text-black'
              ]"
              @click="selectedOption = 'delivery'"
              >
            Delivery
          </button>

          <button 
            :class="[
             'font-bold px-6 py-2 rounded-full transition-all duration-300 ease-in-out transform',
              selectedOption === 'pickup' ? 'bg-white text-black' : 'bg-gray-100 text-black'
              ]"
              @click="selectedOption = 'pickup'"
              >
            Pick-up
          </button>
        </div>
      </div>

      <div
        class="flex items-center justify-between p-5 border-b border-gray-200 bg-white"
      >
        <div class="flex items-center space-x-2">
          <UIcon
            name="i-material-symbols-location-on-outline"
            class="text-gray-600 text-xl w-5 h-5"
          />
          <p class="font-bold text-black">Atuwase, Room 5</p>
        </div>
        <div class="background flex items-center justify center w-10 h-10 p-2 rounded-full bg-red-100 cursor-pointer">
          <UIcon
            name="i-material-symbols-keyboard-arrow-down"
            class="text-red-500 w-8 h-8 cursor-pointer"
          />
        </div>
      </div>

      <div
        class="flex items-center justify-between p-5 border-b border-gray-200 bg-white"
      >
        <div class="flex items-center space-x-2">
          <UIcon
            name="i-material-symbols-call"
            class="text-gray-600 text-xl w-5 h-5"
          />
          <p class="font-bold text-black">08112985079</p>
        </div>
        <UIcon
          name="i-material-symbols-edit-sharp"
          class="text-gray-600 text-xl w-5 h-5"
        />
      </div>
    </div>

    <div class="flex items-center justify-center p-5">
      <p class="text-gray-600">Swipe items to edit or delete</p>
    </div>


    <div>
        <div class="p-5 border-b border-gray-200 bg-white">
          <h3 class="font-bold text-black">Stomach Option</h3>
        </div>
    

      <div class="flex items-center justify-between p-5 border-b border-gray-200 bg-white">
        <span class="text-red-600 cursor-pointer w-10 h-10 p-2">1x</span>
        <p class="font-bold">10 Kilo Grilled Giant</p>
        <p>&#8358;15,000.00</p>
      </div>
    </div>

     <div class="flex items-center justify-between p-5 border-b border-gray-200 bg-white">
        <span class="text-red-600 cursor-pointer w-10 h-10 p-2">1x</span>
        <p class="font-bold">10 Kilo Grilled Giant</p>
        <p>&#8358;15,000.00</p>
      </div>

   
    <div class="flex items-center justify-between p-4 border-t-16 border-b-16 border-gray-200 bg-white">
      <p class="text-gray-400 font-light">Add referral or discount code</p>
      <UIcon name="i-material-symbols-chevron-right-rounded" class="text-gray-600 text-xl w-5 h-5" />
    </div>
   

    <div class="p-5 border-b-20 border-gray-200 bg-white">
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h1 class="text-gray-400 text-xl font-light">Subtotal</h1>
          <span class="text-gray-400 font-light">&#8358;30,000</span>
        </div>
  
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <h1 class="text-gray-400 text-xl font-light">Delivery fee</h1><UIcon name="i-material-symbols-help" class="w-5 h-5 text-gray-400"/>
          </div>
          <span class="text-gray-400 font-light">&#8358;500</span>
        </div>
  
        <div class="flex items-center justify-between">
          <h1 class="text-gray-400 text-xl font-light">Discount</h1>
          <span class="text-gray-400 font-light">&#8358;0</span>
        </div>
  
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2">
             <h1 class="text-gray-400 text-xl font-light">Service fee</h1><UIcon name="i-material-symbols-help" class="w-5 h-5 text-gray-400 font-light" />
            </div>
            <span class="text-gray-400 font-light">&#8358;900</span>
        </div>
      </div>
    </div>

    <div class="container sticky bottom-0 p-6 border-gray-200 bg-white space-y-2">
      <div class="flex items-center justify-between">
        <p class="font-light text-xl">Order total</p>
        <span class="text-gray-400 font-light">&#8358;31,400</span>
      </div>
      <div class="btn-container flex items-center">
          <button class="bg-gradient-to-r from-green-600 to-green-400 text-white py-3 w-full rounded-full cursor-pointer">Confirm Order</button>
      </div>
    </div>

  </section>
</template>

<script setup>
import { ref } from 'vue';

// Default selected option
const selectedOption = ref('delivery');

//Function to handle option selection
const handleOptionSelect = (option) => {
  selectedOption.value = option;
}

</script>