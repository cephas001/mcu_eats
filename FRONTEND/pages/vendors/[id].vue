<template>
  <section v-if="!fetchingVendor">
    <VendorBannerImageAndIcons :imageUrl="vendor.bannerImage" />

    <VendorDetails
      :vendorName="vendor.vendorName"
      :description="vendor.description"
    />

    <VendorSearchFeature />
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

  <section v-if="!fetchingVendor" class="px-3 pb-10 relative pt-5">
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
import { computed, onMounted } from "vue";
import { useVendorStore } from "@/stores/vendorStore";
import { storeToRefs } from "pinia";
import { navigateTo, useNuxtApp } from "nuxt/app";

definePageMeta({
  middleware: ["check-user-and-profiles"],
  specificUserType: ["consumer", "vendor"],
  allowAnonymous: true,
});

const { $productApiService, $vendorApiService } = useNuxtApp();

const fetchingVendor = ref(true);
const productFetchErrorMessage = ref("");
const route = useRoute();

const vendorStore = useVendorStore();
const { vendor } = storeToRefs(vendorStore);

const { selectedProductType } = storeToRefs(vendorStore);

const products = ref([]);

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

const setProductTypes = (fetchedProducts) => {
  let productTypes = [];

  if (fetchedProducts.length == 0) {
    (productTypes = [{ id: 0, name: "All", selected: true }]),
      (products.value = []);
    return productTypes;
  }

  productTypes = fetchedProducts.map((product, index) => {
    return {
      id: product.id,
      name: product.category,
    };
  });

  productTypes = productTypes.filter(
    (type, index, self) => index === self.findIndex((t) => t.name === type.name)
  );

  productTypes.unshift({ id: 0, name: "All", selected: true });

  return productTypes;
};

const addPropertiesToProducts = (fetchedProducts, propertiesToSet) => {
  return fetchedProducts.map((product) => ({
    ...product,
    ...propertiesToSet,
  }));
};

const fetchVendorFromStoreOrApi = async (id) => {
  let foundVendor = null;

  foundVendor = vendorStore.findVendorById(id);

  if (foundVendor) return foundVendor;

  try {
    foundVendor = await $vendorApiService.getVendorById(id);
  } catch (error) {
    throw error;
  }

  return foundVendor;
};

onMounted(async () => {
  const id = route.params.id;

  let vendor = null;

  try {
    vendor = await fetchVendorFromStoreOrApi(id);

    if (!vendor) {
      return navigateTo("/");
    }
  } catch (error) {
    console.error("Error fetching vendor:", error);

    return navigateTo("/");
  }

  try {
    const fetchedProducts = await $productApiService.getProductsByVendor(
      vendor.id
    );

    const productTypes = setProductTypes(fetchedProducts);

    products.value = addPropertiesToProducts(fetchedProducts, {
      vendorId: vendor.id,
      vendorName: vendor.name,
      count: 0,
    });

    vendorStore.setVendor({ ...vendor, productTypes });
  } catch (error) {
    productFetchErrorMessage.value =
      "An error occurred while trying to get products";
  } finally {
    fetchingVendor.value = false;
  }
});
</script>
