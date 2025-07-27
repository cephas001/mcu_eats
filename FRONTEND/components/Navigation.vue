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
import { navigateTo, useNuxtApp } from "nuxt/app";
import { ref } from "vue";

import { useUserStore } from "@/stores/userStore";
import { useProfileStore } from "@/stores/profileStore";
import { useCartStore } from "@/stores/cartStore";
import { useMessagesStore } from "@/stores/messagesStore";
import { storeToRefs } from "pinia";

const cartStore = useCartStore();
const { cart } = storeToRefs(cartStore);

const userStore = useUserStore();

const profileStore = useProfileStore();

const messagesStore = useMessagesStore();
const { messages, messagesTypes } = storeToRefs(messagesStore);

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

const setUserNavigationItems = (user) => {
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
        color: "info",
        to: "/general/select-profile",
      },
    ],
    ...(messages.value?.length > 0
      ? [
          [
            {
              label: `Messages (${messages.length})`,
              icon: "i-lucide-message-square",
              children: [refineMessages(messages.value)],
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
        to: "/auth/logout",
      },
    ],
  ];
};

const setGuestNavigationItems = () => {
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
    ...(messages.value?.length > 0
      ? [
          [
            {
              label: `Messages (${messages.value.length})`,
              icon: "i-lucide-message-square",
              children: [refineMessages(messages.value)],
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

const fetchDetails = async () => {
  const messageType = messagesTypes.value[0];

  const {
    $getUserUseCase,
    $getProfilesUseCase,
    $storeUserUseCase,
    $storeProfilesUseCase,
    $expressAuthBackendService,
    $expressUserBackendService,
  } = useNuxtApp();

  const authenticationMessages = messagesStore.getMessages(messageType);

  if (authenticationMessages.length > 0) return;

  if (userStore.checkGuest()) {
    setGuestNavigationItems();
    return;
  }

  try {
    const user = userStore.getUser();
    const profiles = profileStore.getProfiles();

    if (user && profiles) {
      setUserNavigationItems(user);
      return;
    }
  } catch (error) {
    console.log(error);
  }

  try {
    const user = await $getUserUseCase();
    const profiles = await $getProfilesUseCase();

    if (user && profiles) {
      userStore.setUser(user);
      profileStore.setProfiles(profiles);
      setUserNavigationItems(user);
      return;
    }
  } catch (error) {
    console.log(error);
  }

  var fetchedUser = null;
  var fetchedProfiles = null;
  var fetchedAndStored = false;

  try {
    fetchedUser = await $expressAuthBackendService.login();

    if (fetchedUser) {
      const profiledIds = fetchedUser.profiles.map(
        (profile) => profile.profileId
      );

      fetchedProfiles = await $expressUserBackendService.getProfilesData(
        profiledIds
      );

      if (fetchedProfiles) {
        userStore.setUser(fetchedUser);
        profileStore.setProfiles(fetchedProfiles);
        setUserNavigationItems(fetchedUser);

        fetchedAndStored = true;
      }
    }
  } catch (error) {
    if (error.type == "ValidationError" || error.type == "UnexpectedError") {
      userStore.setGuest(true);
    }

    if (error.type == "InvalidTokenError") {
      messagesStore.addMessage({
        type: messageType,
        message: "Please login",
      });
    }

    if (error.type == "UserExistenceError") {
      messagesStore.addMessage({
        type: messageType,
        message: "Please login to finish registration",
      });
    }

    if (error.type == "ProfileExistenceError") {
      messagesStore.addMessage({
        type: messageType,
        message: "Please login to finish registration",
      });
    }

    if (error.type == "UnexpectedError") {
      messagesStore.addMessage({
        type: messageType,
        message: "Please retry login",
      });
    }
  }

  try {
    if (fetchedAndStored) {
      await $storeUserUseCase(fetchedUser);
      await $storeProfilesUseCase(fetchedProfiles);

      return;
    }
  } catch (error) {
    console.log(error);
  }

  setGuestNavigationItems();
};
</script>
