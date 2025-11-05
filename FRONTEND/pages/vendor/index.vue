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
      <div class="flex justify-between items-center">
        <div class="text-left">
          <h1 class="text-2xl font-bold text-black mb-2">
            {{ vendorProfile?.vendorName }}
          </h1>
          <p class="mb-2">{{ vendorProfile?.description }}</p>
          <div class="flex items-center gap-2">
            <span class="text-sm text-gray-500">Status:</span>
            <select
              v-model="status"
              class="text-sm border rounded px-2 py-1"
              :class="
                status === 'Open'
                  ? 'text-green-600 border-green-600'
                  : 'text-red-600 border-red-600'
              "
            >
              <option value="Open">Opened</option>
              <option value="Closed">Closed</option>
              <option value="Busy">Busy</option>
            </select>
          </div>
        </div>
        <img src="@/assets/images/vendor.jpg" class="w-20 rounded-full" />
      </div>
    </header>

    <!-- Active Orders -->
    <section class="grid grid-cols-1 md:grid-cols-2 md:grid-cols-3 gap-4 mt-5">
      <div class="bg-blue-50 shadow-md p-4 rounded-lg flex justify-between">
        <div>
          <p class="text-lg text-gray-800 font-semibold">Active Orders</p>
          <p class="text-2xl font-bold text-black">0</p>
        </div>
        <div class="bg-blue-100 h-fit pt-2 pb-1 px-2 rounded-md">
          <UIcon
            name="i-material-symbols-hourglass-empty-rounded"
            class="text-blue-600 w-6"
          />
        </div>
      </div>

      <!-- Today's Revenue -->
      <div class="bg-green-50 shadow-md p-4 rounded-lg flex justify-between">
        <div>
          <p class="text-lg text-gray-800 font-semibold mb-5">
            Today's Revenue
          </p>
          <p class="text-2xl font-bold text-black">₦0</p>
          <p class="text-xs mt-1 text-gray-600">0 orders</p>
        </div>
        <div class="bg-green-100 h-fit pt-2 pb-1 px-2 rounded-md">
          <UIcon
            name="i-material-symbols-attach-money"
            class="text-green-600 w-6 h-6"
          />
        </div>
      </div>

      <!-- Customer Rating -->
      <div class="bg-yellow-50 shadow-md p-4 rounded-lg flex justify-between">
        <div>
          <p class="text-lg text-gray-800 font-semibold">Rating</p>
          <p class="text-2xl font-bold text-black">0</p>
          <p class="text-xs mt-1 text-gray-600">0 reviews</p>
        </div>
        <div class="bg-yellow-100 h-fit pt-2 pb-1 px-2 rounded-md">
          <UIcon
            name="i-material-symbols-star"
            class="text-yellow-600 w-6 h-6"
          />
        </div>
      </div>

      <!-- Completed Orders -->
      <div class="bg-purple-50 shadow-md p-4 rounded-lg flex justify-between">
        <div>
          <p class="text-lg text-gray-800 font-semibold">Today</p>
          <p class="text-2xl font-bold text-black">0</p>
          <p class="text-xs mt-1 text-gray-600">Succesfully fulfilled</p>
        </div>
        <div class="bg-purple-100 h-fit pt-2 pb-1 px-2 rounded-md">
          <UIcon
            name="i-material-symbols-check-circle"
            class="text-purple-600 w-6 h-6"
          />
        </div>
      </div>

      <!-- Pending Deliveries -->
      <div class="bg-orange-50 shadow-md p-4 rounded-lg flex justify-between">
        <div>
          <p class="text-lg text-gray-800 font-semibold">Pending Delivery</p>
          <p class="text-2xl font-bold text-black">0</p>
          <p class="text-xs mt-1 text-gray-600">Ready for Pickup</p>
        </div>
        <div class="bg-orange-100 h-fit pt-2 pb-1 px-2 rounded-md">
          <UIcon
            name="i-material-symbols-local-shipping"
            class="text-orange-600 w-6 h-6"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useProfileStore } from "@/stores/profileStore";
import { onMounted, ref } from "vue";

definePageMeta({
  middleware: ["check-user-and-profiles", "check-selected-profile"],
  specificUserType: ["vendor"],
});

const profileStore = useProfileStore();
const vendorProfile = ref(null);

const status = ref("Closed");

onMounted(() => {
  const profile = profileStore.getProfile("vendor");
  vendorProfile.value = profile;
});
</script>
