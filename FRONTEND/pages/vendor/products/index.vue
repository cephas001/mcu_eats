<template>
  <!-- Product Listings -->
  <section class="mt-15 px-6 pb-2" v-if="renderInDOM">
    <h1 class="text-2xl font-bold text-black mb-6 text-center tracking-wide">
      Products
    </h1>

    <ProductsPageSearchBarAndActions
      @addProductButtonClicked="showAddProductForm = !showAddProductForm"
      @archivedProductButtonClicked="archiveProducts"
      @deleteProductButtonClicked="deleteProductsShowWarning"
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

  <section class="overflow-x-auto mt-3 px-6 min-h-[50vh]" v-if="renderInDOM">
    <ProductsTable :products />
  </section>

  <!-- Add Product Modal -->
  <ProductsCreationModal @createProduct="createProduct" v-if="renderInDOM" />

  <LoadingIconCustom
    :loading="creatingProduct || deletingProduct || archivingProduct"
  />

  <WarningModal :text="warningModalText" :action v-if="renderInDOM" />
</template>

<script setup>
import { useGlobalStore } from "@/stores/globalStore";
import { useProfileStore } from "@/stores/profileStore";
import { useProductStore } from "@/stores/productStore";
import { useAuthStore } from "@/stores/authStore";
import { useNuxtApp } from "nuxt/app";
import { computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { handleProductCreationErrors } from "@/composables/auth/handleProductCreationError";

const globalStore = useGlobalStore();
const { warningModalText } = storeToRefs(globalStore);
const { openWarningModal, setWarningModalText, setWarningModalTitle } =
  globalStore;

const { clearError } = useAuthStore();
const productStore = useProductStore();
const {
  productsForm,
  productsFilterForm,
  setProducts,
  deleteProduct,
  deleteProducts,
} = productStore;
const {
  showAddProductForm,
  productCreationError,
  products,
  checkedProductsRecord,
} = storeToRefs(productStore);

const profileStore = useProfileStore();

const creatingProduct = ref(false);
const deletingProduct = ref(false);
const archivingProduct = ref(false);

const renderInDOM = computed(() => {
  return (
    !creatingProduct.value && !deletingProduct.value && !archivingProduct.value
  );
});

const { $productApiService } = useNuxtApp();

const action = ref(null);

definePageMeta({
  middleware: ["check-user-and-profiles", "check-selected-profile"],
  specificUserType: ["vendor"],
});

const toast = useToast();

const showToast = ({ title, description, duration, backgroundStyle }) => {
  toast.add({
    title,
    description,
    duration,
    color: "primary",
    ui: {
      wrapper: `${backgroundStyle}`,
      root: `${backgroundStyle} text-white rounded-lg shadow-lg p-4`,
    },
  });
};

const setModalValuesAndOpen = (title, text) => {
  setWarningModalTitle(title);
  setWarningModalText(text);
  openWarningModal();
};

const archiveProducts = () => {
  setModalValuesAndOpen(
    "Archive Products",
    "Are you sure you want to archive the selected products?"
  );
  console.log("Archiving products...");
};

const deleteProductsExecution = async () => {
  try {
    deletingProduct.value = true;

    const vendor = profileStore.getProfile("vendor");

    if (!vendor) throw new Error("No vendor profile found");

    if (checkedProductsRecord.value.length == 0) return;

    if (checkedProductsRecord.value.length == 1) {
      const response = await $productApiService.deleteProduct(
        vendor.id,
        checkedProductsRecord.value[0]
      );

      console.log(response);

      if (response.deleted && response.unlinked) {
        deleteProduct(checkedProductsRecord.value[0]);
        checkedProductsRecord.value = [];

        showToast({
          title: "Product Deleted",
          description: "The product has been deleted successfully.",
          duration: 3000,
          backgroundStyle: "bg-black",
        });
      }
    } else {
      const response = await $productApiService.deleteProducts(
        vendor.id,
        checkedProductsRecord.value
      );
      console.log(response);
      if (response.deletedCount == checkedProductsRecord.value.length) {
        deleteProducts(checkedProductsRecord.value);
        checkedProductsRecord.value = [];

        showToast({
          title: "Product Deleted",
          description: "The products have been deleted successfully.",
          duration: 3000,
          backgroundStyle: "bg-black",
        });
      } else {
        showToast({
          title: "Error Deleting Selected Products",
          description: "Please refresh.",
          duration: 5000,
          backgroundStyle: "bg-black",
        });
      }
    }
  } catch (error) {
    console.log(error);
    showToast({
      title: "Error Deleting",
      description:
        "An error occurred while trying to delete. Please try again.",
      duration: 3000,
      backgroundStyle: "bg-black",
    });
    console.log(error);
  } finally {
    deletingProduct.value = false;
  }
};

const deleteProductsShowWarning = async () => {
  setModalValuesAndOpen(
    "Delete Products",
    "Are you sure you want to delete the selected products?"
  );

  action.value = deleteProductsExecution;
};

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

    setProducts();

    showAddProductForm.value = false;

    showToast({
      title: "Product Created",
      description: "The product has been created successfully.",
      duration: 3000,
      backgroundStyle: "bg-black",
    });

    clearError();
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
