<template>
  <!-- Product Listings -->
  <section class="mb-10">
    <h2 class="text-xl font-semibold text-gray-800 mb-4">Products</h2>
    <ul v-if="profile.data.products.length" class="grid grid-cols-2 gap-4">
      <li
        v-for="product in profile.data.products"
        :key="product.id"
        class="border border-gray-200 rounded-lg p-4 bg-white shadow-sm"
      >
        <h3 class="font-bold text-gray-700">{{ product.name }}</h3>
        <p class="text-sm text-gray-500">
          {{ product.description || "No description" }}
        </p>
        <p class="text-sm text-gray-600 mt-1">
          Type: {{ product.productType }}
        </p>
        <p class="text-sm text-green-600 font-semibold mt-2">
          ₦{{ product.price.toFixed(2) }}
        </p>
      </li>
    </ul>
    <p v-else class="text-gray-500">No products listed yet.</p>
  </section>
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
