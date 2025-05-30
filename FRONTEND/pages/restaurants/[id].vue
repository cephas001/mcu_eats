<template>
  <section v-if="!fetchingData">
    <div class="relative">
      <div
        class="absolute top-[15px] left-5 bg-primary p-1 flex items-center rounded-full z-150"
      >
        <UIcon
          name="i-material-symbols-arrow-back"
          class="text-3xl text-white"
          @click="navigateTo('/')"
        />
      </div>
      <div><Media src="/restaurant/food1.jpg" /></div>
      <UIcon
        :name="`i-material-symbols-favorite${
          vendor.favourite ? '' : '-outline'
        }`"
        class="text-white absolute top-5 right-15 font-bold text-3xl"
        :class="vendor.favourite ? 'animate-[var(--animate-pingOnce)]' : ''"
        @click="vendor.favourite = !vendor.favourite"
      />
      <UIcon
        name="i-material-symbols-share"
        class="text-3xl absolute top-5 right-5 text-white"
      />
    </div>
    <div class="p-5 pb-3 relative">
      <div class="absolute right-10 top-[-35px]">
        <!-- avatar -->
        <img
          src="@/assets/images/avatars/avatar.jpg"
          class="w-[70px] rounded-full"
        />
      </div>
      <h1 class="tracking-wide font-semibold mb-1">{{ vendor.name }}</h1>
      <p class="text-gray-500 text-sm mb-1">{{ vendor.description }}</p>
      <p
        class="text-sm flex items-center gap-2 text-gray-500 font-manrope font-semibold"
      >
        <UIcon
          name="i-material-symbols-kid-star-sharp"
          class="text-yellow-500"
        />5.0 Excellent (20+)
      </p>
      <p class="flex items-center gap-4">
        <UIcon name="i-material-symbols-search" class="text-gray-500" />
        <UInput
          size="xl"
          variant="ghost"
          placeholder="Search menu items"
          :ui="{
            base: 'rounded-none text-sm pl-0 hover:bg-transparent cursor-pointer focus:bg-transparent focus:text-black',
          }"
        />
      </p>
    </div>
  </section>

  <section v-if="!fetchingData" class="px-5 py-3 border-y-1 border-y-gray-300">
    <TypesSelector :types="vendor.types" />
  </section>

  <h1
    v-if="!fetchingData"
    class="px-5 py-5 text-sm font-manrope bg-gray-100 tracking-wider"
  >
    {{ selectedType.name }}
  </h1>
  <section v-if="!fetchingData" class="px-5 pb-15 relative">
    <div
      class="py-5 border-b-1 border-gray-100"
      v-for="product in filteredProducts"
      :key="product._id"
    >
      <Product :product :vendorId="vendor._id" :vendorName="vendor.name" />
    </div>

    <ViewOrdersButton />
  </section>

  <LoadingIconLarge :loading="fetchingData" />
</template>

<script setup>
import { computed, onMounted, watch, ref, watchEffect } from "vue";
import { useVendorStore } from "@/stores/vendorStore";
import { useOrderStore } from "@/stores/orderStore";
import { storeToRefs } from "pinia";

const fetchingData = ref(true);

const route = useRoute();
const vendorStore = useVendorStore();
const orderStore = useOrderStore();
const { totalPrice, viewOrdersBtn, selectedType } = storeToRefs(orderStore);
const { vendor } = storeToRefs(vendorStore);
const watchedVendor = computed(() => vendor.value);

const id = route.params.id;

const filteredProducts = computed(() => {
  return vendor.value.products.filter((product) => {
    if (product.type == selectedType.value.name) {
      return true;
    } else {
      return false;
    }
  });
});

watch(
  watchedVendor,
  (newValue) => {
    if (newValue.products.find((product) => product.count > 0)) {
      viewOrdersBtn.value = true;
    }
  },
  { deep: true }
);

onMounted(async () => {
  // Checks if an order is already stored in localstorage and shows the view orders button
  const ordersPreSaved = localStorage.getItem("orders");
  const ordersPreSavedValue = JSON.parse(ordersPreSaved);

  if (ordersPreSaved) {
    viewOrdersBtn.value = true;
    ordersPreSavedValue.forEach((order) => {
      totalPrice.value = totalPrice.value + order.price * order.quantity;
    });
  }

  try {
    await vendorStore.fetchVendorById(id);
    if (vendor) {
      vendor.value.types = [];
      vendor.value.products.forEach((product, index) => {
        // Checks if an order is alredy in localstorage and uses the presaved order quantity for the product count
        if (ordersPreSaved) {
          ordersPreSavedValue.forEach((order) => {
            if (order._id == product._id) {
              product["count"] = order.quantity;
            } else {
              product["count"] = 0;
            }
          });
        } else {
          product["count"] = 0;
        }

        const objectToAdd = {
          id: Date.now().toString(36) + Math.random().toString(36).substring(2),
          name: product.type,
          selected: index === 0,
        };

        // Check if the vendor product type already exists before adding
        if (!vendor.value.types.some((type) => type.name === product.type)) {
          vendor.value.types.push(objectToAdd);
        }
      });

      // Sets the selected value to the first vendor type
      selectedType.value = vendor.value.types[0];
    }
  } catch (error) {
    console.error("Error fetching vendor:", error);
  } finally {
    fetchingData.value = false;
  }
});
</script>
