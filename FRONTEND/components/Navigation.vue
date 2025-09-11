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
          @click="setNavigationItems"
        />
      </UDropdownMenu>
    </div>
  </div>

  <SelectProfileModal />
</template>

<script setup>
import { navigateTo } from "nuxt/app";
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import { useProfileStore } from "@/stores/profileStore";
import { useCartStore } from "@/stores/cartStore";
import { useMessagesStore } from "@/stores/messagesStore";
import { storeToRefs } from "pinia";
import { getRedirectUrlFromSelectedProfile } from "@/utils/getRedirectUrlFromSelectedProfile";

const cartStore = useCartStore();
const { cart } = storeToRefs(cartStore);

const route = useRoute();
const userStore = useUserStore();

const profileStore = useProfileStore();
const { showSelectProfileModal } = storeToRefs(profileStore);

const messagesStore = useMessagesStore();

const navigationItems = ref([
  [
    {
      label: "loading details...",
      to: "#",
      icon: "i-material-symbols-hourglass-bottom-rounded",
      color: "info",
    },
  ],
]);

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

const refineMessages = (messages) => {
  const formattedMessages = messages.map((message) => {
    return {
      label: message.message,
      icon: "i-lucide-mail",
      disabled: false,
      color: "info",
    };
  });
  return formattedMessages;
};

const setUserNavigationItems = (user, selectedProfile) => {
  const redirectTo = getRedirectUrlFromSelectedProfile(selectedProfile);

  const messages = messagesStore.getMessages();

  navigationItems.value = [
    [
      {
        label: `${user.name}`,
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
        to: `/?redirectTo=${redirectTo ? redirectTo : "consumer"}`,
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
        icon: "i-material-symbols-published-with-changes",
        color: "info",
        onSelect: () => {
          showSelectProfileModal.value = true;
        },
      },
      {
        label: "Create Profile",
        icon: "i-material-symbols-badge",
        color: "info",
        to: "/auth/profile",
      },
    ],
    ...(messages?.length > 0
      ? [
          [
            {
              label: `Messages (${messages?.length})`,
              icon: "i-lucide-message-square",
              children: [refineMessages(messages)],
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
        label: "Logout",
        color: "error",
        icon: "i-lucide-log-out",
        kbds: ["shift", "meta", "q"],
        to: "/auth/logout?redirectToLogin=true",
      },
    ],
  ];
};

const addToNavigationItems = (position, items) => {
  if (position > navigationItems?.value?.length - 1) {
    if (Array.isArray(items)) {
      navigationItems.value = [...navigationItems.value, items];
      return;
    }
    navigationItems.value = [...navigationItems.value, [items]];

    return;
  }

  navigationItems.value = navigationItems.value.map((array, index) => {
    if (index == position) {
      if (Array.isArray(items)) {
        return [...array, ...items];
      }
      return [...array, items];
    }
    return array;
  });
};

const appendProfileSpecificRoutes = (selectedProfile) => {
  if (selectedProfile?.type == "consumer") {
    addToNavigationItems(1, [
      {
        label: `View Cart (${totalCartSize()})`,
        icon: "i-material-symbols-garden-cart-outline-sharp",
        to: "/cart",
        color: "info",
      },
      {
        label: "Orders",
        icon: "i-material-symbols-quick-reorder",
        to: "/orders",
        color: "info",
      },
    ]);
    return;
  }

  if (selectedProfile?.type == "vendor") {
    addToNavigationItems(1, [
      {
        label: "Manage Products",
        icon: "i-material-symbols-list-alt-outline-rounded",
        to: "/vendor/products",
        color: "info",
      },
      {
        label: "Business Details",
        icon: "i-material-symbols-business-center-outline-rounded",
        to: "/vendor/details",
        color: "info",
      },
    ]);
    return;
  }

  if (selectedProfile?.type == "delivery_person") {
    addToNavigationItems(1, [
      {
        label: "Wallet",
        icon: "i-material-symbols-light:account-balance-wallet",
        to: "/delivery-person/wallet",
        color: "info",
      },

      // {
      //   label: "Profile Settings",
      //   icon: "i-material-symbols-light:room-preferences",
      //   to: "/delivery-person/deliverySettings",
      //   color: "info",
      // },
    ]);
  }
};

const setGuestNavigationItems = () => {
  const messages = messagesStore.getMessages();
  navigationItems.value = [
    [
      {
        label: "Guest",
        avatar: {
          src: "avatars/avatar2.jpg",
        },
        to: "#",
      },
    ],
    [
      {
        label: "Home",
        icon: "i-material-symbols-house-rounded",
        to: `/consumer`,
        color: "info",
      },
      {
        label: `View Cart (${totalCartSize()})`,
        icon: "i-material-symbols-garden-cart-outline-sharp",
        to: "/cart",
        color: "info",
      },
    ],
    ...(messages?.length > 0
      ? [
          [
            {
              label: `Messages (${messages?.length})`,
              icon: "i-lucide-message-square",
              children: [refineMessages(messages)],
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
};

const setNavigationItems = () => {
  try {
    const user = userStore.getUser();
    const profiles = profileStore.getProfiles();

    const selectedProfile = profileStore.getSelectedProfile();

    if (user && profiles) {
      setUserNavigationItems(user, selectedProfile);

      appendProfileSpecificRoutes(selectedProfile);
    } else {
      setGuestNavigationItems();
    }
  } catch (error) {
    console.log(error);
  }
};
</script>
