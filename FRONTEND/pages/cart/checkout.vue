<template>
  <!-- Header -->
  <CartHeader text="Checkout" />

  <section>
    <!-- Delivery Details -->
    <UCollapsible
      class="py-2 px-4 bg-white font-manrope tracking-wide text-gray-500 text-sm border-y-1 border-y-gray-200"
      v-model:open="open"
    >
      <UButton
        class="group text-black font-poppins font-bold mb-0"
        label="Delivery details (please confirm)"
        color="neutral"
        variant="ghost"
        trailing-icon="i-lucide-chevron-down"
        :ui="{
          trailingIcon:
            'group-data-[state=open]:rotate-180 transition-transform duration-200',
        }"
        block
      />
      <template #content>
        <CartDeliveryDetails
          :text="`${formattedDate} - ${formattedTime}`"
          firstIcon="i-material-symbols-light-calendar-month-outline-sharp"
        />

        <CartDeliveryDetails
          text="Atuwase, Room 5"
          firstIcon="i-material-symbols-location-on-outline"
        />

        <CartDeliveryDetails
          text="08112985079"
          firstIcon="i-material-symbols-call"
        />
      </template>
    </UCollapsible>
    <!-- Add Note -->
    <div
      class="flex items-center justify-between py-3 px-6 border-b border-gray-200 bg-white font-manrope text-md"
    >
      <div class="flex items-center">
        <UIcon
          name="i-material-symbols-chat-outline"
          class="text-primary text-xl mr-4"
        />
        <p class="text-black text-sm">Add note for delivery personel</p>
      </div>
    </div>
  </section>

  <section>
    <p
      class="text-black font-bold py-3 px-6 text-sm bg-gray-100 font-manrope tracking-wide"
    >
      Payment
    </p>
    <!-- Bank Card -->
    <div
      class="flex items-center py-3 px-6 border-b border-gray-200 font-manrope text-sm font-bold text-green-800"
    >
      <UIcon name="i-material-symbols-add-2" class="text-xl mr-4" />
      <button class="tracking-wider" @click="navigateToBankCard">
        Add bank card
      </button>
    </div>
    <!-- Transfer -->
    <div
      class="flex items-center justify-between py-3 px-6 font-manrope text-green-800"
      :class="[selectedOptionTransfer ? 'border-b border-b-gray-200' : '']"
    >
      <div class="flex items-center">
        <UIcon
          name="i-material-symbols-send-outline-rounded"
          class="text-xl mr-4 -rotate-45 mb-1"
        />
        <p class="font-bold tracking-wider text-sm">Pay with transfer</p>
      </div>
      <UCheckbox
        v-model="selectedOptionTransfer"
        variant="outline"
        color="green"
      />
    </div>
    <!-- Transfer Warning Note -->
    <div
      class="py-4 px-6 text-red-600 flex items-center gap-2"
      v-if="selectedOptionTransfer"
    >
      <UIcon
        name="i-material-symbols-info-outline-rounded"
        class="text-black text-3xl ml-1"
      />
      <p class="text-sm italic">
        Please ensure you complete the transfer within 15 minutes to avoid order
        cancellation.
      </p>
    </div>
  </section>

  <div
    class="px-6 pt-5 sticky bottom-0 bg-white flex flex-col gap-2 border-t-1 border-t-gray-200"
  >
    <div class="flex items-center justify-between font-manrope font-semibold">
      <p class="uppercase">Amount Due</p>
      <span class="tracking-wide"
        >&#8358;{{ totalOrderAmount.toLocaleString() }}</span
      >
    </div>
    <div class="mt-1">
      <button
        class="bg-gradient-to-r from-green-500 to-green-600 text-white uppercase py-3 w-full rounded-md cursor-pointer tracking-wide text-md"
        @click="handleCheckOut"
      >
        Complete Order
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useCartStore } from "@/stores/cartStore";
import { useUserStore } from "@/stores/userStore";
import { navigateTo } from "nuxt/app";

definePageMeta({
  middleware: ["check-user-and-profiles"],
  allowAnonymous: true,
});

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const cartStore = useCartStore();
const { totalOrderAmount } = storeToRefs(cartStore);

const formattedDate = ref("");
const formattedTime = ref("");

const open = ref(true);

const navigateToBankCard = async () => {
  await navigateTo("/payment/bank-card");
};

const selectedOptionTransfer = ref(false);

const handleCheckOut = async () => {
  if (selectedOptionTransfer.value) {
    await navigateTo("/payment/transfer");
  } else {
    return;
  }
};

onMounted(() => {
  formattedDate.value = useDateFormat(useNow(), "DD/MM/YY").value;
  formattedTime.value = useDateFormat(useNow(), "HH:mm").value;
});
</script>
