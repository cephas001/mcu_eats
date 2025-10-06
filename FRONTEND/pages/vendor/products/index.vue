<template>
  <!-- Product Listings -->
  <section class="mt-15 px-6 pb-2" v-if="!creatingProduct">
    <h1 class="text-2xl font-bold text-black mb-6 text-center tracking-wide">
      Products
    </h1>

    <ProductsPageSearchBarAndActions
      @addProductButtonClicked="showAddProductForm = !showAddProductForm"
    />

    <p
      class="text-sm text-gray-600 flex items-center gap-1 font-manrope italic tracking-wide"
    >
      <UIcon name="i-material-symbols-info-outline-rounded" class="text-xl" />
      Click on a product to view or edit it's full details
    </p>
  </section>

  <section
    class="overflow-x-auto mt-3 px-6 min-h-[50vh]"
    v-if="!creatingProduct"
  >
    <ProductsTable :products />
  </section>

  <!-- Add Product Modal -->
  <ProductsCreationModal
    @createProduct="createProduct"
    v-if="!creatingProduct"
  />

  <LoadingIconCustom :loading="creatingProduct" />
</template>

<script setup>
import { updateUserProfile } from "@/composables/auth/updateUserProfile";
import { useProfileStore } from "@/stores/profileStore";
import { navigateTo, useNuxtApp } from "nuxt/app";
import { onMounted } from "vue";

definePageMeta({
  middleware: ["check-user-and-profiles", "check-selected-profile"],
  specificUserType: ["vendor"],
});

const profileStore = useProfileStore();

const creatingProduct = ref(false);
const products = ref([]);

const allProducts = ref([]);
const archivedProducts = ref([]);
const unarchivedProducts = ref([]);

const { $productApiService } = useNuxtApp();

const showAddProductForm = ref(false);

const createProduct = async () => {
  try {
    creatingProduct.value = true;
    const { updatedVendor, createdProduct, createdProductId } =
      $productApiService.createProduct({
        name: productsForm.name,
        description: productsForm.description,
        price: productsForm.price,
      });
    setProducts();
    showAddProductForm.value = false;
  } catch (error) {
    console.log(error);
  } finally {
    creatingProduct.value = false;
  }
};

const setProducts = async () => {
  const vendorProfile = profileStore.getProfile("vendor");

  if (!vendorProfile) return;

  const vendorProducts = await $productApiService.getAllVendorProducts(
    vendorProfile.id
  );

  if (!vendorProducts) {
    return navigateTo("/?redirectTo='/vendor/products'");
  }

  archivedProducts.value = vendorProducts.archivedProducts;
  unarchivedProducts.value = vendorProducts.unarchivedProducts;
  allProducts.value = vendorProducts.allProducts;
};

onMounted(() => {
  setProducts();
});
</script>
