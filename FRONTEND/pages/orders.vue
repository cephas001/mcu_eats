<template>
  <section
    class="h-[70vh] p-10 flex flex-col justify-center items-center text-center"
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

  <section v-if="true">
    <div
      class="flex items-center justify-around px-7 py-3 z-1000 bg-white sticky top-0 text-md"
    >
      <div class="flex flex-col items-center font-manrope">
        <h1 class="font-semibold">Orders</h1>
        <p class="text-gray-800 text-sm">2 vendors, 2 items</p>
      </div>

      <div>
        <button class="text-red-500 text-sm">Clear</button>
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
      <p>Swipe items to edit or delete</p>
    </div>

    <div class="bg-gray-200">
      <div class="font-manrope mb-1">
        <div class="px-6 py-4 border-b border-gray-200 bg-white">
          <h3 class="font-bold text-black">Stomach Option</h3>
        </div>

        <div
          class="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white"
        >
          <div class="flex items-center">
            <span class="text-primary font-semibold text-sm mr-8">1x</span>
            <p class="font-semibold">Jollof Rice</p>
          </div>
          <p>&#8358;200</p>
        </div>
      </div>

      <div class="font-manrope">
        <div class="px-6 py-4 border-b border-gray-200 bg-white">
          <h3 class="font-bold text-black">Ateez Foods</h3>
        </div>

        <div
          class="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white"
        >
          <div class="flex items-center">
            <span class="text-primary font-semibold text-sm mr-8">1x</span>
            <p class="font-semibold">Jollof Rice</p>
          </div>
          <p>&#8358;200</p>
        </div>
      </div>
    </div>

    <div
      class="flex items-center justify-between py-4 px-6 border-y-1 border-gray-200 bg-white"
    >
      <p class="font-light text-sm">Add referral or discount code</p>
      <UIcon
        name="i-material-symbols-chevron-right-rounded"
        class="text-gray-600 text-xl"
      />
    </div>

    <div
      class="py-5 px-6 border-t-5 border-gray-200 bg-white font-manrope tracking-wide text-gray-500 space-y-2 text-sm"
    >
      <div class="flex items-center justify-between">
        <h1>Subtotal</h1>
        <span>&#8358;30,000</span>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <h1 class="mr-1">Delivery fee</h1>
          <UIcon name="i-material-symbols-help" class="text-xl" />
        </div>
        <span>&#8358;500</span>
      </div>

      <div class="flex items-center justify-between">
        <h1>Discount</h1>
        <span>&#8358;0</span>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <h1 class="mr-1">Service fee</h1>
          <UIcon name="i-material-symbols-help" class="text-xl" />
        </div>
        <span>&#8358;900</span>
      </div>
    </div>

    <div
      class="container sticky bottom-0 px-6 py-3 bg-white flex flex-col gap-2 border-t-1 border-t-gray-200 font-manrope"
    >
      <div class="flex items-center justify-between">
        <p>Order total</p>
        <span class="tracking-wide">&#8358;31,400</span>
      </div>
      <div>
        <button
          class="bg-gradient-to-r from-green-600 to-green-400 text-white py-2 w-full rounded-md cursor-pointer mb-5"
        >
          Confirm Order
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";

// Default selected option
const selectedOption = ref("delivery");
</script>
