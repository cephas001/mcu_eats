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

const cartStore = useCartStore();
const { cart } = storeToRefs(cartStore);

const userStore = useUserStore();
const { user, loggedIn } = storeToRefs(userStore);

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

const fetchDetails = async () => {
  try {
    if (!user.value) {
      await userStore.fetchUserDetails();
    }
    if (loggedIn?.value) {
      navigationItems.value = [
        [
          {
            label: `${user?.value?.firstName + " " + user?.value?.lastName}`,
            avatar: {
              src: `${
                user?.value?.picture
                  ? user?.value?.picture
                  : "avatars/avatar2.jpg"
              }`,
            },
            to: "/profile",
          },
          {
            label: `${
              user?.value?.hostel +
              ". Room " +
              user?.value?.roomNumber.toString()
            }`,
            icon: "i-material-symbols-pin-drop",
            type: "label",
            color: "info",
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
            label: "Switch Role",
            icon: "i-lucide-user",
            children: [
              [
                {
                  label: "Consumer",
                  icon: "i-lucide-user",
                  disabled: Boolean(
                    `${user?.value?.role == "Consumer" ? true : false}`
                  ),
                  color: "info",
                },
                {
                  label: "Delivery",
                  icon: "i-material-symbols-delivery-truck-speed",
                  disabled: Boolean(
                    `${user?.value?.role == "Delivery" ? true : false}`
                  ),
                  color: "info",
                },
              ],
            ],
          },
          {
            label: "Change location",
            icon: "i-material-symbols-edit-location-sharp",
            color: "info",
          },
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
            to: "/logout",
          },
        ],
      ];
    } else {
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
          {
            label: "Favourites",
            icon: "i-material-symbols-favorite",
            color: "info",
            to: "/profile/favourites",
          },
        ],
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
            to: "/login",
          },
        ],
      ];
    }
  } catch (error) {
    console.error("Error fetching user:", error);
  }
};
</script>
