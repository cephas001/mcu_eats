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
    <div>
      <UIcon name="i-material-symbols-close" />
      <h1>Orders</h1>
      <p>2 vendors, 2 items</p>

      <button>Delete all</button>
    </div>

    <div>
      <div>
        <div>Delivery</div>
        <div>Pick-up</div>
      </div>

      <div>
        <UIcon name="i-material-symbols-location-on-outline" />
        <p>Atuwase, Room 5</p>
        <UIcon name="i-material-symbols-keyboard-arrow-down" />
      </div>

      <div>
        <UIcon name="i-material-symbols-call" />
        <p>08112985079</p>
        <UIcon name="i-material-symbols-edit-sharp" />
      </div>
    </div>

    <div>
      <p>Swipe items to edit or delete</p>
      <div>
        <h1>Stomach Option</h1>

        <div>
          <span>1x</span>
          <p>10 Kilo Grilled Giant</p>
          <p>&#8358;15,000.00</p>
        </div>
      </div>

      <div>
        <h1>Abula Junction</h1>

        <div>
          <span>1x</span>
          <p>Smokey jollof rice and stewed fried chicken and plantain</p>
          <p>&#8358;7,350.00</p>
        </div>
      </div>
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
