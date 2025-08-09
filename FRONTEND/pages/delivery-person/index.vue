<template>
  <div class="max-w-4xl mx-auto pt-10 px-6 font-manrope">
    <!-- Header -->
    <header class="text-center mb-6">
      <h1 class="text-2xl font-bold text-black mb-2">
        Welcome, <br />Okodugha Peter
      </h1>
      <p class="text-sm text-gray-500">
        Status:
        <span :class="true ? 'text-success' : 'text-red-700'">
          {{ true ? "Available" : "Unavailable" }}
        </span>
      </p>
      <button>Change</button>
    </header>

    <!-- Profile Overview -->
    <section class="grid grid-cols-2 gap-6 mb-8">
      <div class="bg-white p-4 rounded shadow">
        <h2 class="text-lg font-semibold text-gray-700 mb-2">Academic Info</h2>
        <ul class="text-sm text-gray-600 space-y-1">
          <li><strong>College:</strong> {{ profile.data.college }}</li>
          <li><strong>Department:</strong> {{ profile.data.department }}</li>
          <li><strong>Matric No:</strong> {{ profile.data.matricNumber }}</li>
        </ul>
      </div>
      <div class="bg-white p-4 rounded shadow">
        <h2 class="text-lg font-semibold text-gray-700 mb-2">Hostel Info</h2>
        <ul class="text-sm text-gray-600 space-y-1">
          <li><strong>Hostel:</strong> {{ profile.data.hostel }}</li>
          <li><strong>Room:</strong> {{ profile.data.roomNumber }}</li>
        </ul>
      </div>
    </section>

    <!-- Delivery Stats -->
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

    <!-- Performance & Penalties -->
    <section class="grid grid-cols-2 gap-6 mb-10">
      <div class="bg-white p-4 rounded shadow text-center">
        <p class="text-lg font-semibold text-gray-700">Avg. Delivery Time</p>
        <p class="text-2xl text-indigo-600">
          {{ profile.data.averageDeliveryTime }} min
        </p>
      </div>
      <div class="bg-white p-4 rounded shadow text-center">
        <p class="text-lg font-semibold text-gray-700">Penalty Points</p>
        <p class="text-2xl text-red-500">{{ profile.data.penaltyPoints }}</p>
      </div>
    </section>

    <!-- Optional Location -->
    <section v-if="profile.data.location" class="mb-10">
      <h2 class="text-lg font-semibold text-gray-700 mb-2">Current Location</h2>
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
    <footer class="flex justify-between">
      <button
        @click="navigateToMap"
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        View Delivery Map
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
  middleware: ["check-user-and-profiles", "check-selected-profile"],
  specificUserType: ["delivery_person"],
});

// Simulated profile object using your schema
const profile = ref({
  id: "DP2025",
  type: "delivery_person",
  userId: "user_123",
  createdAt: new Date(),
  updatedAt: new Date(),
  data: {
    username: "peter_okoye",
    gender: "male",
    hostel: "Unity Hall",
    roomNumber: "B12",
    college: "Engineering",
    department: "Mechanical Engineering",
    matricNumber: "2020123456",
    available: true,
    penaltyPoints: 2,
    averageDeliveryTime: 18,
    location: {
      latitude: 6.5244,
      longitude: 3.3792,
    },
    accountDetails: {
      bankName: "GTBank",
      accountNumber: "0123456789",
      accountName: "Peter Okoye",
    },
    pendingOrders: [{ id: 1 }, { id: 2 }],
    activeOrders: [{ id: 3 }],
    completedOrders: [{ id: 4 }, { id: 5 }, { id: 6 }],
  },
});

function navigateToMap() {
  alert("Navigating to delivery map...");
}

function logout() {
  alert("Logging out...");
}
</script>
