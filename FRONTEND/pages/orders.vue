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

  <section>
    <div
      class="flex justify-between items-center p-5 border-b border-gray-200 bg-white shadow-md"
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
          <button class="text-xl font-bold px-4 py-2 rounded-md">
            Delivery
          </button>

          <button class="px-4 py-2 rounded-md font-medium">Pick-up</button>
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
        <UIcon
          name="i-material-symbols-keyboard-arrow-down"
          class="text-red-500 w-10 h-10 p-2 rounded-full transition cursor-pointer"
        />
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

    <div class="flex items-center justify-center p-5 b">
      <p class="text-gray-600">Swipe items to edit or delete</p>
    </div>
    <div>
      <h1>Stomach Option</h1>

      <div>
        <span>1x</span>
        <p>10 Kilo Grilled Giant</p>
        <p>&#8358;15,000.00</p>
      </div>
    </div>

    <div>
      <span>1x</span>
      <p>Smokey jollof rice and stewed fried chicken and plantain</p>
      <p>&#8358;7,350.00</p>
    </div>

    <div>
      <p>
        Add referral or discount code
        <UIcon name="i-material-symbols-chevron-right-rounded" />
      </p>
    </div>

    <div>
      <h1>Subtotal <span>&#8358;22,350</span></h1>
      <p>
        Delivery fee <UIcon name="i-material-symbols-help" /><span
          >&#8358;500</span
        >
      </p>
      <p>
        Service fee <UIcon name="i-material-symbols-help" />
        <span>&#8358;900</span>
      </p>
    </div>

    <div>
      <p>Order total</p>
    </div>

    <button>Confirm order</button>
  </section>
</template>
