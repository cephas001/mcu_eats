<template>
  <section class="p-10 flex flex-col justify-center text-center">
    <div class="mb-5">
      <img src="@/assets/images/no_order.png" alt="No Order Image" />
    </div>
    <div class="font-montserrat p-3">
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
</template>
