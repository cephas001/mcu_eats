<template>
  <div class="max-w-5xl mx-auto p-6 font-sans">
    <!-- Header -->
    <header class="text-center mb-6">
      <h1 class="text-3xl font-bold text-gray-800">
        {{ profile.data.vendorName }}
      </h1>
      <p class="text-sm text-gray-500 italic">
        {{ profile.data.vendorType }} • {{ profile.data.category }}
      </p>
      <p class="mt-2 text-sm">
        Status:
        <span :class="statusColor(profile.data.verificationStatus)">
          {{ profile.data.verificationStatus }}
        </span>
      </p>
    </header>

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

    <!-- Order Stats -->
    <section class="grid grid-cols-3 gap-4 mb-10">
      <div class="bg-gray-100 p-4 rounded text-center">
        <p class="text-xl font-bold text-blue-600">
          {{ profile.data.pendingOrders.length }}
        </p>
        <p class="text-sm text-gray-600">Pending Orders</p>
      </div>
      <div class="bg-gray-100 p-4 rounded text-center">
        <p class="text-xl font-bold text-yellow-600">
          {{ profile.data.activeOrders.length }}
        </p>
        <p class="text-sm text-gray-600">Active Orders</p>
      </div>
      <div class="bg-gray-100 p-4 rounded text-center">
        <p class="text-xl font-bold text-green-600">
          {{ profile.data.completedOrders.length }}
        </p>
        <p class="text-sm text-gray-600">Completed Orders</p>
      </div>
    </section>

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

    <!-- Optional Location -->
    <section v-if="profile.data.location" class="mb-10">
      <h2 class="text-lg font-semibold text-gray-700 mb-2">Location</h2>
      <p class="text-sm text-gray-600">
        Latitude: {{ profile.data.location.latitude }}, Longitude:
        {{ profile.data.location.longitude }}
      </p>
    </section>

    <!-- Optional Account Details -->
    <section v-if="profile.data.accountDetails" class="mb-10">
      <h2 class="text-lg font-semibold text-gray-700 mb-2">Account Details</h2>
      <ul class="text-sm text-gray-600 space-y-1">
        <li>
          <strong>Bank:</strong> {{ profile.data.accountDetails.bankName }}
        </li>
        <li>
          <strong>Account No:</strong>
          {{ profile.data.accountDetails.accountNumber }}
        </li>
        <li>
          <strong>Account Name:</strong>
          {{ profile.data.accountDetails.accountName }}
        </li>
      </ul>
    </section>

    <!-- Footer Actions -->
    <footer class="flex justify-end gap-4 mt-6">
      <button
        @click="editProfile"
        class="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
      >
        Edit Profile
      </button>
      <button
        @click="logout"
        class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Log Out
      </button>
    </footer>
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
