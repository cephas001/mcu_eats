<template>
  <ProfilePageHeader text="FAVOURITES" />

  <header
    class="z-1000 sticky top-0 text-md shadow-md pt-4 bg-white"
    v-if="!fetchingData"
  >
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
    v-if="
      (!user || favouriteVendors.length == 0) &&
      activeTabFav == 'Vendors' &&
      !fetchingData
    "
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
    v-if="
      activeTabFav == 'Vendors' && favouriteVendors.length > 0 && !fetchingData
    "
    class="min-h-[90vh] px-6 pt-8"
  >
    <div
      v-for="vendor in favouriteVendors"
      :key="vendor._id"
      class="rounded-md shadow-md text-sm mb-7 cursor-pointer hover:shadow-lg focus:shadow-lg"
    >
      <VendorCard :vendor="vendor" :favouriteIds="favouriteVendorIds" />
    </div>
  </section>

  <section
    class="min-h-[80vh]"
    v-if="
      (!user || favouriteProducts.length == 0) &&
      activeTabFav == 'Products' &&
      !fetchingData
    "
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
    v-if="
      activeTabFav == 'Products' &&
      favouriteProducts.length > 0 &&
      !fetchingData
    "
    class="min-h-[90vh] px-6 pt-6"
  >
    <div
      v-for="product in favouriteProducts"
      :key="product._id"
      class="py-5 border-b-1 border-gray-100"
    >
      <VendorProduct
        :product
        :favouritePage="true"
        @unfavourite="removeProduct"
      />
    </div>
  </section>

  <LoadingIconLarge :loading="fetchingData" />
</template>

<script setup>
import { navigateTo } from "nuxt/app";
import { useUserStore } from "@/stores/userStore";
import { useVendorStore } from "@/stores/vendorStore";
import { onMounted } from "vue";
import { parseArrays } from "@/utils/parseArrays";

definePageMeta({
  middleware: ["check-user-and-profiles"],
  allowAnonymous: true,
});

const fetchingData = ref(true);

const vendorStore = useVendorStore();
const { vendors } = storeToRefs(vendorStore);
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const tabs = ["Vendors", "Products"];
const activeTabFav = useLocalStorage("activeTabFav", ref("Vendors"));

const products = ref([]);

const favouriteVendorIds = ref([]);

const favouriteVendors = ref([]);
const favouriteProducts = ref([]);

const removeProduct = (id) => {
  products.value = products.value.filter((product) => {
    if (product._id != id) {
      return true;
    }
  });
};

onMounted(async () => {
  try {
    if (!vendors.value) {
      await vendorStore.fetchVendors();
    }

    if (!user.value) {
      await userStore.fetchUserDetails();
    }

    const indexedDBFavouriteVendors = await db.favouriteVendors.toArray();
    const indexedDBFavouriteProducts = await db.favouriteProducts.toArray();

    if (indexedDBFavouriteVendors?.length > 0) {
      favouriteVendors.value = parseArrays(indexedDBFavouriteVendors);
      favouriteProducts.value = parseArrays(indexedDBFavouriteProducts);

      favouriteVendorIds.value = favouriteVendors.value.map(
        (vendor) => vendor._id
      );
    }
  } catch (error) {
    console.error("Error fetching favourites:", error);
  } finally {
    fetchingData.value = false;
  }
});
</script>
