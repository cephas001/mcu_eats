<template>
  <section class="p-5">
    <UInput
      icon="i-material-symbols-search-rounded"
      size="lg"
      variant="outline"
      placeholder="Search..."
      class="w-full"
      readonly
      :ui="{ base: 'bg-transparent text-black rounded-full' }"
      @click.prevent="navigateTo('/search')"
    />
  </section>

  <div class="px-6 pt-2">
    <!-- Header -->
    <header class="text-center mb-6">
      <h1 class="text-3xl font-bold text-black mb-1">
        {{ profile.data.vendorName }}
      </h1>
      <p class="text-sm text-gray-800 italic">
        {{ profile.data.vendorType }} • {{ profile.data.category }}
      </p>
      <p class="mt-2 text-sm">
        Status:
        <span :class="statusColor(profile.data.verificationStatus)">
          {{ profile.data.verificationStatus }}
        </span>
      </p>
    </header>

    <!-- Order Status -->
    <section class="grid grid-cols-1 gap-4 mb-10 mt-5">
      <div class="bg-primary/5 shadow-md p-6 rounded flex justify-between">
        <div>
          <p class="text-sm text-gray-900 font-bold mb-5">Pending Orders</p>
          <p class="text-2xl font-bold text-black">
            {{ profile.data.pendingOrders.length }}
          </p>
        </div>
        <div class="bg-primary_light/40 h-fit pt-2 pb-1 px-2 rounded-md">
          <UIcon
            name="i-material-symbols-hourglass-empty-rounded"
            class="text-primary text-xl"
          />
        </div>
      </div>

      <div class="bg-primary/5 shadow-md p-6 rounded flex justify-between">
        <div>
          <p class="text-sm text-gray-900 font-bold mb-5">Active Orders</p>
          <p class="text-2xl font-bold text-black">
            {{ profile.data.activeOrders.length }}
          </p>
        </div>
        <div class="bg-primary_light/40 h-fit pt-2 pb-1 px-2 rounded-md">
          <UIcon
            name="i-material-symbols-delivery-truck-speed-outline-rounded"
            class="text-primary text-xl"
          />
        </div>
      </div>

      <div class="bg-primary/5 shadow-md p-6 rounded flex justify-between">
        <div>
          <p class="text-sm text-gray-900 font-bold mb-5">Completed Orders</p>
          <p class="text-2xl font-bold text-black">
            {{ profile.data.completedOrders.length }}
          </p>
        </div>
        <div class="bg-primary_light/40 h-fit pt-2 pb-1 px-2 rounded-md">
          <UIcon
            name="i-material-symbols-check-circle-outline-rounded"
            class="text-primary text-xl"
          />
        </div>
      </div>

      <div class="bg-primary/5 shadow-md p-6 rounded flex justify-between">
        <div>
          <p class="text-sm text-gray-900 font-bold mb-5">Productivity</p>
          <p class="text-2xl font-bold text-black">76%</p>
        </div>
        <div class="bg-primary_light/40 h-fit pt-2 pb-1 px-2 rounded-md">
          <UIcon
            name="i-material-symbols-percent-rounded"
            class="text-primary text-xl"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";

definePageMeta({
  middleware: ["check-user-and-profiles"],
  specificUserType: ["vendor"],
});

const profile = ref({
  id: "VND2025",
  type: "vendor",
  userId: "user_456",
  createdAt: new Date(),
  updatedAt: new Date(),
  data: {
    vendorName: "Mama Ada Kitchen",
    vendorType: "restaurant",
    description: "Delicious home-style meals served fresh daily.",
    businessNumber: "08012345678",
    businessEmail: "mamaada@food.ng",
    category: "swallow and more",
    takingOrders: true,
    openingTime: "08:00",
    closingTime: "20:00",
    address: "Block 5, Unity Hostel, Lagos",
    verificationStatus: "approved",
    location: {
      latitude: 6.5244,
      longitude: 3.3792,
    },
    accountDetails: {
      bankName: "Access Bank",
      accountNumber: "1234567890",
      accountName: "Ada Nwoke",
    },
    products: [
      {
        id: "p1",
        name: "Egusi Soup",
        description: "Rich and spicy melon seed soup.",
        price: 1200,
        productType: "main course",
      },
      {
        id: "p2",
        name: "Jollof Rice",
        description: "Classic Nigerian jollof with chicken.",
        price: 1000,
        productType: "main course",
      },
    ],
    pendingOrders: [{ id: 1 }],
    activeOrders: [{ id: 2 }, { id: 3 }],
    completedOrders: [{ id: 4 }, { id: 5 }],
  },
});

function statusColor(status) {
  return {
    approved: "text-green-600 font-semibold",
    pending: "text-yellow-500 font-semibold",
    rejected: "text-red-500 font-semibold",
  }[status];
}

function editProfile() {
  alert("Navigating to edit profile...");
}

function logout() {
  alert("Logging out...");
}
</script>
