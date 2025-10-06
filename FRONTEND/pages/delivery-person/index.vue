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
  <div class="max-w-4xl mx-auto pt-2 px-6">
    <!-- Header -->
    <header class="text-center mb-6">
      <div class="flex justify-between items-center">
        <div class="text-left">
          <h1 class="text-2xl font-bold text-black mb-2">
            {{ deliveryPersonProfile?.username }}
          </h1>
          <div class="flex items-center gap-2">
            <span class="text-gray-500">Status:</span>
            <select
              v-model="status"
              class="text-sm border rounded px-2 py-1"
              :class="
                status === 'Available'
                  ? 'text-green-600 border-green-600'
                  : 'text-red-700 border-red-700'
              "
            >
              <option value="Available">Available</option>
              <option value="Unavailable">Unavailable</option>
            </select>
          </div>
        </div>
        <img src="@/assets/images/Delivery.jpg" class="w-20 rounded-full" />
      </div>
    </header>

    <!-- Profile Overview -->
    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
      <div class="bg-blue-50 p-4 rounded-lg shadow-md flex justify-between">
        <div>
          <h2 class="text-lg font-semibold text-gray-800">Active Deliveries</h2>
          <p class="text-2xl">
            {{ profile?.data?.activeDeliveries?.length || 0 }}
          </p>
          <p class="text-xs text-gray-600 mt-1">Currently on route</p>
        </div>
        <div class="bg-blue-100 h-fit pt-2 pb-1 px-2 rounded-md">
          <UIcon
            name="i-material-symbols-light:delivery-truck-speed"
            class="text-black w-6 h-6"
          />
        </div>
      </div>

      <!-- Today's Earnings -->
      <div class="bg-green-50 p-4 rounded-lg shadow-md flex justify-between">
        <div>
          <h2 class="text-lg font-semibold text-gray-800">Today's Earnings</h2>
          <p class="text-2xl">₦{{ profile?.data?.todayEarnings || 0 }}</p>
          <p class="text-xs text-gray-600 mt-1">
            From {{ profile?.data?.todayDeliveries || 0 }} deliveries
          </p>
        </div>
        <div class="bg-green-100 h-fit pt-2 pb-1 px-2 rounded-md">
          <UIcon
            name="i-material-symbols-attach-money"
            class="text-green-600 w-6 h-6"
          />
        </div>
      </div>

      <!-- Ratings -->
      <div class="bg-yellow-50 p-4 rounded-lg shadow-md flex justify-between">
        <div>
          <h2 class="text-lg font-semibold text-gray-800">Rating</h2>
          <p class="text-2xl">{{ profile?.data?.rating || 4.8 }}</p>
          <p class="text-xs text-gray-600 mt-1">
            {{ profile?.data?.totalReviews || 0 }} reviews
          </p>
        </div>
        <div class="bg-yellow-100 h-fit pt-2 pb-1 px-2 rounded-md">
          <UIcon
            name="i-material-symbols-star"
            class="text-yellow-600 w-6 h-6"
          />
        </div>
      </div>

      <!-- Completed Deliveries -->
      <div class="bg-purple-50 p-4 rounded-lg shadow-md flex justify-between">
        <div>
          <h2 class="text-lg font-semibold text-gray-800">Completed Today</h2>
          <p class="text-2xl">{{ profile?.data?.completedToday || 0 }}</p>
          <p class="text-xs text-gray-600 mt-1">Succesfully Delivered</p>
        </div>
        <div class="bg-purple-100 h-fit pt-2 pb-1 px-2 rounded-md">
          <UIcon
            name="i-material-symbols-check-circle"
            class="text-purple-600 w-6 h-6"
          />
        </div>
      </div>

      <!-- Online Hours -->
      <div class="bg-orange-50 p-4 rounded-lg shadow-md flex justify-between">
        <div>
          <h2 class="text-lg font-semibold text-gray-800">Active Hours</h2>
          <p class="text-2xl">
            {{ profile?.data?.onlineHours || "0h:00m:00s" }}
          </p>
          <p class="text-xs text-gray-600 mt-1">Today's shift</p>
        </div>
        <div class="bg-orange-100 h-fit pt-2 pb-1 px-2 rounded-md">
          <UIcon
            name="i-material-symbols-light:alarm-on-rounded"
            class="text-orange-600 w-6 h-6"
          />
        </div>
      </div>

      <!-- Pending Pickups -->
      <div class="bg-red-50 p-4 rounded-lg shadow-md flex justify-between">
        <div>
          <h2 class="text-lg font-semibold text-gray-800">Pending Pickups</h2>
          <p class="text-2xl">
            {{ profile?.data?.pendingPickups?.length || 0 }}
          </p>
          <p class="text-xs text-gray-600 mt-1">Ready for collection</p>
        </div>
        <div class="bg-red-100 h-fit pt-2 pb-1 px-2 rounded-md">
          <UIcon
            name="i-material-symbols-inventory-2"
            class="text-red-600 w-6 h-6"
          />
        </div>
      </div>
    </section>

    <!-- Current Delivery Status -->
    <section class="mt-8">
      <div class="bg-gray-50 shadow-md p-6 rounded-lg mb-6">
        <h3 class="text-lg font-bold text-gray-900 mb-4">Current Delivery</h3>
        <div v-if="profile?.data?.currentDelivery" class="space-y-3">
          <div class="flex justify-between items-center">
            <span class="text-gray-600">Order ID:</span>
            <span class="font-medium"
              >#{{ profile?.data?.currentDelivery?.orderId || 432436 }}</span
            >
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-600">Customer:</span>
            <span class="font-medium">{{
              profile?.data?.currentDelivery?.customerName || "Okodugha Peter"
            }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-600">Address:</span>
            <span class="font-medium">{{
              profile?.data?.currentDelivery?.deliveryAddress ||
              "Room 5 Atuwatse Hostel"
            }}</span>
          </div>
        </div>
        <div v-else class="text-center font-manrope text-gray-500 py-4">
          No active delivery at the moment
        </div>
      </div>
    </section>

    <!-- Actions -->
    <div class="grid gap-4">
      <NuxtLink
        to="/orders"
        class="bg-primary text-white p-4 rounded-lg transition-colors text-center"
      >
        <div class="flex justify-center items-center gap-2">
          <UIcon name="i-material-symbols-local-shipping" class="w-6 h-6" />
        </div>
        <span>View Orders</span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useProfileStore } from "@/stores/profileStore";

definePageMeta({
  middleware: ["check-user-and-profiles", "check-selected-profile"],
  specificUserType: ["delivery_person"],
});
const profileStore = useProfileStore();
const deliveryPersonProfile = ref(null);

const status = ref("Available");
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

onMounted(() => {
  const profile = profileStore.getProfile("delivery_person");
  deliveryPersonProfile.value = profile;
  console.log(deliveryPersonProfile.value);
});
</script>
