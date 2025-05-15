<template>
  <div class="bg-black px-2 py-6 flex items-center justify-around">
    <div>
      <img src="/mcu_eats_logo_.png" alt="Logo Image" class="w-[150px]" />
    </div>
    <div class="flex items-center">
      <UDropdownMenu arrow :items="items" size="lg">
        <UButton
          icon="i-material-symbols-menu"
          color="primary"
          variant="ghost"
          size="xl"
          class="cursor-pointer bg-primary/15"
        />
      </UDropdownMenu>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DropdownMenuItem } from "@nuxt/ui";
import { ref } from "vue";

const items = ref<DropdownMenuItem[][]>([
  [
    {
      label: "Paul Peter",
      avatar: {
        src: "https://github.com/benjamincanac.png",
      },
    },
  ],
  [
    {
      label: "Atuwase Room 5",
      icon: "i-material-symbols-pin-drop",
      type: "label",
    },
  ],
  [
    {
      label: "Home",
      icon: "i-material-symbols-house-rounded",
      to: "/",
    },
    {
      label: "View Orders (0)",
      icon: "i-material-symbols-garden-cart-outline-sharp",
      to: "/orders",
    },
  ],
  [
    {
      label: "Switch Role",
      icon: "i-lucide-user",
      children: [
        [
          {
            label: "Consumer",
            icon: "i-lucide-user",
            disabled: true,
          },
          {
            label: "Delivery",
            icon: "i-material-symbols-delivery-truck-speed",
          },
        ],
      ],
    },
    {
      label: "Change location",
      icon: "i-material-symbols-edit-location-sharp",
    },
  ],
  [
    {
      label: "Support",
      icon: "i-material-symbols-question-mark-rounded",
    },
    {
      label: "Logout",
      color: "error",
      icon: "i-lucide-log-out",
      kbds: ["shift", "meta", "q"],
    },
  ],
]);
</script>
