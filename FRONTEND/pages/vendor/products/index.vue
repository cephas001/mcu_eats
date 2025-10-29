<template>
  <!-- Product Listings -->
  <section class="mt-15 px-6 pb-2" v-if="!creatingProduct">
    <h1 class="text-2xl font-bold text-black mb-6 text-center tracking-wide">
      Products
    </h1>

    <ProductsPageSearchBarAndActions
      @addProductButtonClicked="showAddProductForm = !showAddProductForm"
    />

    <FormErrorMessage
      :errorMessage="productCreationError"
      classList="text-center mb-4"
      v-if="productCreationError"
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
import { useProductStore } from "@/stores/productStore";
import { navigateTo, useNuxtApp } from "nuxt/app";
import { computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { handleProductCreationErrors } from "@/composables/auth/handleProductCreationError";

definePageMeta({
  middleware: ["check-user-and-profiles", "check-selected-profile"],
  specificUserType: ["vendor"],
});

const productStore = useProductStore();
const { productsForm, productsFilterForm, setProducts } = productStore;
const { showAddProductForm, productCreationError, products } =
  storeToRefs(productStore);

const profileStore = useProfileStore();

const creatingProduct = ref(false);

const { $productApiService } = useNuxtApp();

const createProduct = async () => {
  try {
    creatingProduct.value = true;

    const vendor = profileStore.getProfile("vendor");

    if (!vendor) throw new Error("No vendor profile found");

    const formData = new FormData();
    formData.append("vendorId", vendor.id);

    const productToSend = {
      name: productsForm.name,
      description: productsForm.description,
      price: productsForm.price,
      category: productsForm.category,
      isAvailable: isAvailable.value,
      vendorId: vendor.id,
    };
    formData.append("productData", JSON.stringify(productToSend));

    formData.append("productImage", productsForm.productImageFile);

    const { updatedVendor, createdProduct, createdProductId } =
      await $productApiService.createProduct(formData);

    console.log({ updatedVendor, createdProduct, createdProductId });

    setProducts();
    showAddProductForm.value = false;
  } catch (error) {
    handleProductCreationErrors(error);
    console.log(error);
  } finally {
    creatingProduct.value = false;
  }
};

const isAvailable = computed(() => {
  if (productsForm.available == "Yes") {
    return true;
  } else if (productsForm.available == "No") {
    return false;
  }
  return null;
});

watch(
  productsFilterForm,
  (newValue) => {
    productStore.filterProducts(newValue.productState);
  },
  { deep: true }
);

onMounted(() => {
  setProducts();
});
</script>
