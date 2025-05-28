<template>
  <div
    class="flex items-center justify-between py-2 border-b border-gray-200 bg-white mt-3"
    @click="performAction"
  >
    <div class="flex items-center">
      <UIcon :name="iconName" class="text-primary text-2xl mr-4" />
      <div>
        <span class="text-black font-bold"> {{ text }}</span>
      </div>
    </div>

    <div class="flex items-center p-1 cursor-pointer">
      <UIcon
        name="i-material-symbols-arrow-right"
        class="text-black text-xl w-7 h-7"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  iconName: {
    type: String,
  },
  text: {
    type: String,
    required: true,
  },
  supportAction: {
    type: String,
  },
});

const performAction = () => {
  var phoneNumber = "+2348112985079";
  if (props.supportAction == "email") {
    const email = "mcueats1@gmail.com";
    const subject = encodeURIComponent("Application Feedback");

    window.location.href = `mailto:${email}?subject=${subject}`;
  }
  if (props.supportAction == "call") {
    window.location.href = `tel:${phoneNumber}`;
  }
  if (props.supportAction == "whatsappChat") {
    const message = encodeURIComponent("Application Feedback: ");
    window.location.href = `https://wa.me/${phoneNumber}?text=${message}`;
  }
  if (props.supportAction == "orderHelp") {
    const message = encodeURIComponent("Order Problem: ");
    window.location.href = `https://wa.me/${phoneNumber}?text=${message}`;
  }
};
</script>
