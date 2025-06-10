<template>
  <section class="px-6 pt-6 pb-2">
    <div class="flex items-center">
      <UIcon
        name="i-material-symbols-arrow-back"
        size="30"
        class="text-primary cursor-pointer"
        @click.prevent="$router.back()"
      />
      <h1 class="text-center w-[100%] uppercase">Favourites</h1>
    </div>
  </section>

  <header class="z-1000 sticky top-0 text-md shadow-md pt-4 bg-white">
    <div class="flex items-center justify-center w-full">
      <button
        v-for="tab in tabs"
        :key="tab"
        class="pb-3 px-1 text-sm relative w-full"
        @click="activeTabFav = tab"
      >
        {{ tab }}

        <span
          v-if="activeTabFav === tab"
          class="absolute bottom-0 top-8 left-0 right-0 h-0.5 bg-primary animate-underline"
        />
      </button>
    </div>
  </header>

  <section
    class="min-h-[80vh]"
    v-if="!user || user?.favouriteVendors?.length == 0"
  >
    <div class="container relative min-h-[calc(80vh-100px)]">
      <div
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <div class="flex flex-col items-center justify-center">
          <UIcon
            name="i-material-symbols-light-favorite"
            class="text-gray-400 w-25 h-25"
          />
          <p class="text-center whitespace-nowrap text-sm">
            You have no favourites yet
          </p>
          <div class="mt-5">
            <button
              class="px-6 py-2 cursor-pointer text-white bg-primary rounded-md text-sm"
              @click="navigateTo('/')"
            >
              Explore Vendors
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section
    v-if="activeTabFav == 'Vendors' && user?.favouriteVendors?.length > 0"
    class="min-h-[90vh] px-6 pt-8"
  >
    <div
      v-for="vendorObject in user.favouriteVendors"
      :key="vendorObject._id"
      class="rounded-md shadow-md text-sm mb-7 cursor-pointer hover:shadow-lg focus:shadow-lg"
    >
      <VendorCard :vendor="vendorObject.vendor" />
    </div>
  </section>

  <section
    class="min-h-[80vh]"
    v-if="!user || user?.favouriteProducts?.length == 0"
  >
    <div class="container relative min-h-[calc(80vh-100px)]">
      <div
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <div class="flex flex-col items-center justify-center">
          <UIcon
            name="i-material-symbols-light-favorite"
            class="text-gray-400 w-25 h-25"
          />
          <p class="text-center whitespace-nowrap text-sm">
            You have no favourites yet
          </p>
          <div class="mt-5">
            <button
              class="px-6 py-2 cursor-pointer text-white bg-primary rounded-md text-sm"
              @click="navigateTo('/')"
            >
              Explore Products
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section
    v-if="activeTabFav == 'Products' && user?.favouriteProducts?.length > 0"
    class="min-h-[90vh] px-6 pt-6"
  >
    <div
      v-for="product in products"
      :key="product._id"
      class="py-5 border-b-1 border-gray-100"
    >
      <Product
        :product
        :favouritePage="true"
        :vendorName="product.vendorName"
        :vendorId="product.vendorId"
        :vendorOpeningTime="product.vendorOpeningTime"
        :vendorClosingTime="product.vendorClosingTime"
        :vendorTakingOrders="product.vendorTakingOrders"
        @unfavourite="removeProduct"
      />
    </div>
  </section>
</template>

<script setup>
import { navigateTo } from "nuxt/app";
import { useUserStore } from "@/stores/userStore";
import { useVendorStore } from "@/stores/vendorStore";
import { onMounted } from "vue";

const vendorStore = useVendorStore();
const { restaurants, retailers, shops } = storeToRefs(vendorStore);
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const tabs = ["Vendors", "Products"];
const activeTabFav = useLocalStorage("activeTabFav", ref("Vendors"));

const products = ref([]);

const removeProduct = (id) => {
  products.value = products.value.filter((product) => {
    if (product._id != id) {
      return true;
    }
  });
};

onMounted(async () => {
  if (!restaurants.value) {
    await vendorStore.fetchVendors();
  }

  if (!user.value) {
    await userStore.fetchUserDetails();
  }

  const vendors = [...restaurants.value, ...retailers.value, ...shops.value];
  user?.value?.favouriteProducts.forEach((product) => {
    const vendor = vendors.find((vendor) => {
      return vendor._id === product.vendor;
    });
    if (vendor) {
      const foundProduct = vendor.products.find((fproduct) => {
        return fproduct._id === product.productId;
      });
      foundProduct["favourited"] = true;
      foundProduct["vendorName"] = vendor.name;
      foundProduct["vendorId"] = vendor._id;
      foundProduct["vendorOpeningTime"] = vendor.opening_time;
      foundProduct["vendorClosingTime"] = vendor.closing_time;
      foundProduct["vendorTakingOrders"] = vendor.taking_orders;
      products.value = [...products.value, foundProduct];
    }
  });
  console.log(products.value);
});
</script>
