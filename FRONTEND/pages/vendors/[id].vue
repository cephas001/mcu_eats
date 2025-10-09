<template>
  <section v-if="!fetchingVendor">
    <VendorImageIconBanner />

    <VendorDetails
      :vendorName="vendor.vendorName"
      :description="vendor.description"
    />

    <p class="flex items-center gap-4 px-5 pb-3">
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
  </section>

  <section
    v-if="!fetchingVendor"
    class="px-5 py-3 border-y-1 border-y-gray-300"
  >
    <VendorProductTypesSelector :types="vendor.productTypes" />
  </section>

  <h1
    v-if="!fetchingVendor"
    class="px-5 py-5 text-sm font-manrope bg-gray-100 tracking-wider"
  >
    {{ selectedProductType.name }}
  </h1>

  <section v-if="!fetchingVendor" class="px-5 pb-15 relative">
    <VendorProducts
      :products="filteredProducts"
      :vendorName="vendor.vendorName"
      :vendorId="vendor.id"
      :productFetchErrorMessage
    />
  </section>

  <LoadingIconCustom :loading="fetchingVendor" />

  <UnauthorizedLoginPrompt />
</template>

<script setup>
import { computed, onMounted, watch, ref, provide } from "vue";
import { useVendorStore } from "@/stores/vendorStore";
import { storeToRefs } from "pinia";
import { navigateTo, useNuxtApp } from "nuxt/app";

definePageMeta({
  middleware: ["check-user-and-profiles"],
  specificUserType: ["consumer"],
  allowAnonymous: true,
});

const { $productApiService } = useNuxtApp();

// To toggle loading icon
const fetchingVendor = ref(true);
const productFetchErrorMessage = ref("");
const route = useRoute();

const vendorStore = useVendorStore();
const { vendor } = storeToRefs(vendorStore);

const { selectedProductType } = storeToRefs(vendorStore);

const products = ref([]);

// To filter products based on selected type
const filteredProducts = computed(() => {
  return products.value.filter((product) => {
    if (
      !selectedProductType.value.name ||
      selectedProductType.value.name == "All"
    ) {
      return true;
    }

    if (product.category == selectedProductType.value.name) {
      return true;
    } else {
      return false;
    }
  });
});

onMounted(async () => {
  const id = route.params.id;
  const foundVendor = vendorStore.findVendorById(id);

  if (!foundVendor) return navigateTo("/");

  try {
    const fetchedProducts = await $productApiService.getProductsByVendor(
      foundVendor.id
    );

    if (fetchedProducts.length == 0) {
      console.log("here");
      vendorStore.setVendor(foundVendor);
      products.value = [];
      fetchingVendor.value = false;
      return;
    }

    let productTypes = [];
    productTypes = fetchedProducts.map((product, index) => {
      return {
        id: product.id,
        name: product.category,
      };
    });

    productTypes = productTypes.filter(
      (type, index, self) =>
        index === self.findIndex((t) => t.name === type.name)
    );

    productTypes.unshift({ id: 0, name: "All", selected: true });

    vendorStore.setVendor({ ...foundVendor, productTypes });

    products.value = fetchedProducts;
  } catch (error) {
    productFetchErrorMessage.value =
      "An error occurred while trying to get products";
  }

  fetchingVendor.value = false;
});
</script>
