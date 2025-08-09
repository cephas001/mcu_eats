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
    <!-- Business Info -->
    <section class="grid grid-cols-2 gap-6 mb-8">
      <div class="bg-white p-4 rounded shadow">
        <h2 class="text-lg font-semibold text-gray-700 mb-2">
          Business Details
        </h2>
        <ul class="text-sm text-gray-600 space-y-1">
          <li><strong>Phone:</strong> {{ profile.data.businessNumber }}</li>
          <li>
            <strong>Email:</strong> {{ profile.data.businessEmail || "N/A" }}
          </li>
          <li><strong>Address:</strong> {{ profile.data.address }}</li>
          <li><strong>Open:</strong> {{ profile.data.openingTime }}</li>
          <li><strong>Close:</strong> {{ profile.data.closingTime }}</li>
          <li>
            <strong>Taking Orders:</strong>
            <span
              :class="
                profile.data.takingOrders ? 'text-green-600' : 'text-red-500'
              "
            >
              {{ profile.data.takingOrders ? "Yes" : "No" }}
            </span>
          </li>
        </ul>
      </div>
      <div class="bg-white p-4 rounded shadow">
        <h2 class="text-lg font-semibold text-gray-700 mb-2">About</h2>
        <p class="text-sm text-gray-600">{{ profile.data.description }}</p>
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
</script>
