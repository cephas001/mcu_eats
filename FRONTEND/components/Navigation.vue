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

const userStore = useUserStore();
const { user, loggedIn } = storeToRefs(userStore);

const navigationItems = ref([]);

const getNoOfOrders = () => {
  var noOfOrders = 0;
  if (process.client) {
    const orders = JSON.parse(localStorage.getItem("orders"));
    if (orders && orders.length > 0) {
      orders.forEach((order) => {
        // Determines the amount of items in cart
        noOfOrders += order.quantity;
      });
      return noOfOrders;
    } else {
      return 0;
    }
  }
};

const fetchDetails = async () => {
  try {
    await userStore.fetchUserDetails();
    navigationItems.value = [
      [
        {
          label: `${[
            loggedIn.value
              ? user.value.firstName + " " + user.value.lastName
              : "Guest",
          ]}`,
          avatar: {
            src: `${
              user.value.picture ? user.value.picture : "avatars/avatar2.jpg"
            }`,
          },
          to: `${user.value.firstName ? "/profile" : "/"}`,
        },
        {
          label: `${
            loggedIn.value
              ? `${
                  user.value.hostel +
                  ". Room " +
                  user.value.roomNumber.toString()
                }`
              : "SET LOCATION"
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
          label: `View Orders (0)`,
          icon: "i-material-symbols-garden-cart-outline-sharp",
          to: "/orders",
          color: "info",
        },
        {
          label: "Favourites",
          icon: "i-material-symbols-favorite",
          color: "info",
          to: "/favourites",
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
                  `${user.value.role == "Consumer" ? true : false}`
                ),
                color: "info",
              },
              {
                label: "Delivery",
                icon: "i-material-symbols-delivery-truck-speed",
                disabled: Boolean(
                  `${user.value.role == "Delivery" ? true : false}`
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
          to: "/support",
        },
        {
          label: `${loggedIn.value ? "Logout" : "Login"}`,
          color: `${loggedIn.value ? "error" : "primary"}`,
          icon: `${loggedIn.value ? "i-lucide-log-out" : "i-lucide-log-in"}`,
          kbds: ["shift", "meta", "q"],
          to: `${loggedIn.value ? "/logout" : "/login"}`,
        },
      ],
    ];
  } catch (error) {
    console.error("Error fetching user:", error);
  }
};
</script>
