<template>
  <div class="bg-black px-2 py-6 flex items-center justify-around">
    <div>
      <img
        src="/mcu_eats_logo_.png"
        alt="Logo Image"
        class="w-[150px] cursor-pointer"
        @click="navigateTo('/')"
      />
    </div>
    <div class="flex items-center">
      <UDropdownMenu
        arrow
        :items="navigationItems"
        size="lg"
        :ui="{
          content: 'bg-black',
          label: 'text-primary_light',
          item: 'text-primary_light',
        }"
      >
        <UButton
          icon="i-material-symbols-menu"
          color="primary"
          variant="ghost"
          size="xl"
          class="cursor-pointer bg-primary/15 text-primary_light"
          @click="fetchDetails"
        />
      </UDropdownMenu>
    </div>
  </div>
</template>

<script setup>
import { navigateTo } from "nuxt/app";
import { ref } from "vue";
import { useUserStore } from "@/stores/userStore";
import { useCartStore } from "@/stores/cartStore";

const {
  $useLoginUserWithEmailAndPasswordUseCase,
  $expressAuthBackendService,
  $expressUserBackendService,
  $useIndexedDBUserRepo,
  $useIndexedDBProfileRepo,
  $useIndexedDBMessageRepo,
} = useNuxtApp();

const cartStore = useCartStore();
const { cart } = storeToRefs(cartStore);

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const navigationItems = ref([]);

const totalCartSize = () => {
  var total = 0;
  if (cart?.value.length > 0) {
    cart.value.forEach((item) => {
      total += item.quantity;
    });
    return total;
  } else {
    return 0;
  }
};

const totalMessages = async () => {
  const messages = await $useIndexedDBMessageRepo.getMessages();
  const messageToBeReturned = messages.map((message) => {
    return {
      label: message.message + " - " + message.createdAt,
      icon: "i-lucide-mail",
      disabled: false,
      color: "info",
    };
  });
  return messageToBeReturned;
};

const fetchDetails = async () => {
  const messages = await totalMessages();
  try {
    if (!user.value) {
      await userStore.getUser();
    }
    navigationItems.value = [
      [
        {
          label: `${user.value.name}`,
          avatar: {
            src: "avatars/avatar2.jpg",
          },
          to: "/profile",
        },
      ],
      [
        {
          label: "Home",
          icon: "i-material-symbols-house-rounded",
          to: "/",
          color: "info",
        },
        {
          label: `View Cart (${totalCartSize()})`,
          icon: "i-material-symbols-garden-cart-outline-sharp",
          to: "/cart",
          color: "info",
        },
        {
          label: "Favourites",
          icon: "i-material-symbols-favorite",
          color: "info",
          to: "/profile/favourites",
        },
      ],
      [
        {
          label: "Switch Profile",
          icon: "i-lucide-user",
          children: [
            [
              {
                label: "Consumer",
                icon: "i-lucide-user",
                disabled: false,
                color: "info",
              },
              {
                label: "Delivery",
                icon: "i-material-symbols-delivery-truck-speed",
                disabled: false,
                color: "info",
              },
            ],
          ],
        },
        ...(messages.length > 0
          ? [
              [
                {
                  label: `Messages (${messages.length})`,
                  icon: "i-lucide-message-square",
                  children: [messages],
                },
              ],
            ]
          : []),
      ],
      [
        {
          label: "Support",
          icon: "i-material-symbols-question-mark-rounded",
          color: "info",
          to: "/profile/support",
        },
        {
          label: "Logout",
          color: "error",
          icon: "i-lucide-log-out",
          kbds: ["shift", "meta", "q"],
          to: "/auth/logout",
        },
      ],
    ];
  } catch (error) {
    if (error.type == "InvalidTokenError") {
      await $useIndexedDBMessageRepo.clearMessages();
      await $useIndexedDBMessageRepo.saveMessage("Please login");
    }

    if (error.type == "UserExistenceError") {
      await $useIndexedDBMessageRepo.clearMessages();
      await $useIndexedDBMessageRepo.saveMessage(
        "Login to create a user account"
      );
    }

    if (error.type == "ProfileExistenceError") {
      await $useIndexedDBMessageRepo.clearMessages();
      await $useIndexedDBMessageRepo.saveMessage("Login to create a profile");
    }

    navigationItems.value = [
      [
        {
          label: "Guest",
          avatar: {
            src: "avatars/avatar2.jpg",
          },
          to: "/",
        },
      ],
      [
        {
          label: "Home",
          icon: "i-material-symbols-house-rounded",
          to: "/",
          color: "info",
        },
        {
          label: `View Cart (${totalCartSize()})`,
          icon: "i-material-symbols-garden-cart-outline-sharp",
          to: "/cart",
          color: "info",
        },
      ],
      ...(messages.length > 0
        ? [
            [
              {
                label: `Messages (${messages.length})`,
                icon: "i-lucide-message-square",
                children: [messages],
              },
            ],
          ]
        : []),
      [
        {
          label: "Support",
          icon: "i-material-symbols-question-mark-rounded",
          color: "info",
          to: "/profile/support",
        },
        {
          label: "Login",
          color: "primary",
          icon: "i-lucide-log-in",
          kbds: ["shift", "meta", "q"],
          to: "/auth/login",
        },
      ],
    ];
  }
};
</script>
