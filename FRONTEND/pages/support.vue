<template>
  <section class="px-6 pt-8 pb-4">
    <div class="flex items-center">
      <UIcon
        name="i-material-symbols-arrow-back"
        size="30"
        class="text-primary cursor-pointer"
        @click.prevent="navigateTo('/feedback')"
      />
      <h1 class="text-center w-[100%] uppercase">Contact Support</h1>
    </div>
  </section>

  <section class="px-6">
    <div class="flex flex-col items-center justify-center">
      <div>
        <Media src="/support.jpg" class="w-50" />
      </div>
      <p class="p-2 text-center">
        Let us know your issue by selecting any of your preferred choice of
        communication below
      </p>
    </div>
  </section>

  <section class="mt-4 pb-10">
    <div v-for="(supportEl, index) in supportArray" :key="index">
      <SupportMeans
        :iconName="supportEl.iconName"
        :text="supportEl.text"
        :supportAction="supportEl.supportAction"
      />
    </div>
  </section>
</template>

<script setup>
const supportArray = ref([
  {
    iconName: "i-material-symbols-light-mail-outline",
    text: "Email Us",
    supportAction: "email",
  },
  {
    iconName: "i-formkit-whatsapp",
    text: "Chat on WhatsApp",
    supportAction: "whatsappChat",
  },
  {
    iconName: "i-material-symbols-call",
    text: "Call Us",
    supportAction: "call",
  },
  {
    iconName: "i-material-symbols-contact-support-outline",
    text: "Help with an order",
    supportAction: "orderHelp",
  },
]);
</script>
