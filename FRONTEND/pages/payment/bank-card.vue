<template>
  <section class="px-4 min-h-screen bg-white">
    <header class="header flex justify-end mt-7">
      <UIcon
        name="i-material-symbols-arrow-back"
        size="30"
        class="text-primary cursor-pointer"
        @click.prevent="$router.back()"
      />
    </header>

    <!-- Logo and email -->
    <div class="logo-email flex items-center justify-around mt-4">
      <Media src="/background_theme_image.png" class="w-[90px]" />

      <div class="pl-2 flex flex-col text-right">
        <p class="text-sm text-gray-600">okodughapeter85@gmail.com</p>
        <p class="text-black">
          <span class="text-gray-600">Pay </span>
          <span class="font-bold">
            NGN {{ totalOrderAmount.toLocaleString() }}</span
          >
        </p>
      </div>
    </div>

    <!-- Form For Card Details-->
    <div class="card-container mt-10">
      <p class="mb-6 text-sm text-center">Enter your card details to pay</p>

      <UForm class="mb-5 flex flex-col gap-3" :state="cardFormState">
        <FormField
          placeholder="Card Number"
          name="cardNumber"
          type="number"
          inputMode="numeric"
          trailingIcon="i-material-symbols-light-add-card"
          :state="cardFormState"
          @update="cardFormState.cardNumber = $event"
        />
        <div class="flex gap-2">
          <FormField
            placeholder="MM/YY"
            name="cardExpiryDate"
            type="text"
            inputMode="numeric"
            :state="cardFormState"
            @update="cardFormState.cardExpiryDate = $event"
          />
          <FormField
            placeholder="CVV"
            name="password"
            type="password"
            inputMode="numeric"
            :state="cardFormState"
            maxLength="3"
            @update="cardFormState.cardCVV = $event"
          />
        </div>
        <button
          class="bg-gradient-to-r from-green-500 to-green-600 text-white uppercase py-3 w-full rounded-md cursor-pointer tracking-wide text-md"
        >
          Pay &#8358; {{ totalOrderAmount.toLocaleString() }}
        </button>
      </UForm>
    </div>

    <div class="flex justify-center items-center gap-1">
      <UIcon
        name="i-material-symbols-light-lock"
        class="text-black text-xl w-5 h-5"
      />
      <span>Secured by</span>
      <span class="font-semibold">FlutterWave</span>
    </div>
  </section>
</template>
<script setup>
import { useCardStore } from "@/stores/cardStore";
import { useCartStore } from "@/stores/cartStore";
import { storeToRefs } from "pinia";

const cartStore = useCartStore();
const { totalOrderAmount } = storeToRefs(cartStore);

const cardStore = useCardStore();
const { cardFormState } = cardStore;
</script>
