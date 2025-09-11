<template>
  <!-- Product Listings -->
  <section class="mt-15 px-6 pb-2">
    <h1 class="text-2xl font-bold text-black mb-6 text-center tracking-wide">
      Products
    </h1>
    <div class="flex gap-4 flex-col mb-4">
      <UInput
        icon="i-material-symbols-search-rounded"
        size="lg"
        variant="outline"
        placeholder="Search products..."
        class="w-full sm:max-w-md"
        readonly
        :ui="{
          base: 'bg-transparent text-black rounded-full cursor-pointer',
        }"
        @click.prevent="navigateTo('/search')"
        @keydown.enter.prevent="navigateTo('/search')"
      />
      <div class="flex justify-between items-center">
        <UButton
          icon="i-material-symbols-add"
          color="primary"
          type="button"
          class="shrink-0 w-fit text-white tracking-wide"
          @click="showAddProductForm = true"
        >
          Add Product
        </UButton>
        <div class="flex items-center gap-1">
          <UIcon
            name="i-material-symbols-archive-outline-rounded"
            class="text-black text-2xl"
          >
          </UIcon>
          <UIcon name="i-material-symbols-delete" class="text-red-600 text-2xl">
          </UIcon>
        </div>
      </div>
    </div>
    <p
      class="text-sm text-gray-600 flex items-center gap-1 font-manrope italic tracking-wide"
    >
      <UIcon name="i-material-symbols-info-outline-rounded" class="text-xl" />
      Click on a product to view or edit it's full details
    </p>
  </section>

  <section class="overflow-x-auto mt-3 px-6 min-h-[50vh]">
    <table class="min-w-full text-sm font-manrope">
      <thead>
        <tr class="text-center text-black border-b border-gray-300">
          <th class="py-2 pr-4">Select</th>
          <th class="py-2 pr-4">Name</th>
          <th class="py-2 pr-4">Price</th>
          <th class="py-2">Stock</th>
        </tr>
      </thead>

      <tbody class="text-center">
        <tr class="border-b border-gray-300">
          <td class="py-3 pr-4 flex justify-center">
            <UCheckbox class="" color="primary" />
          </td>

          <td class="py-3 pr-4 font-medium">Bread</td>

          <td class="py-3 pr-4">
            <span class="whitespace-nowrap tabular-nums"> ₦1,100 </span>
          </td>

          <td class="py-3">
            <span class="whitespace-nowrap tabular-nums"> 6 </span>
          </td>
        </tr>
        <!-- <tr v-if="!filtered.length">
            <td colspan="7" class="py-6 text-center text-gray-500">
              No products found.
            </td>
          </tr> -->
      </tbody>
    </table>
  </section>

  <!-- Add Product Modal -->
  <UModal
    v-model:open="showAddProductForm"
    class="bg-background text-black pb-4 font-manrope"
    title="Add a product"
    description="Fill the form below to add a new product"
    color="neutral"
    :close="{
      color: 'primary',
      variant: 'outline',
      class: 'rounded-full',
    }"
    :ui="{
      content: 'text-black',
      title: 'text-black',
      description: 'text-black',
    }"
  >
    <template #body>
      <CustomForm
        :formFieldsSchema="productsFormSchema"
        :formState="productsForm"
        submitButtonText="Add Product"
        @formSubmit="addProduct"
      />
    </template>
  </UModal>
</template>

<script setup>
import { updateUserProfile } from "@/composables/auth/updateUserProfile";
import { useProfileStore } from "@/stores/profileStore";

definePageMeta({
  middleware: ["check-user-and-profiles", "check-selected-profile"],
  specificUserType: ["vendor"],
});

const profileStore = useProfileStore();

const productsForm = reactive({
  name: undefined,
  description: undefined,
  price: undefined,
  quantityAvailable: undefined,
  productType: undefined,
  productTypeList: ["Food", "Beverage", "Snack", "Other"],
});

const productsFormSchema = ref([
  {
    label: "Product Name",
    placeholder: "A short but descriptive name",
    name: "name",
    type: "text",
    valueVariableName: "name",
  },
  {
    label: "Description",
    placeholder: "A brief description of the product",
    name: "description",
    type: "text",
    valueVariableName: "description",
  },
  {
    label: "Price (₦)",
    placeholder: "Price in Naira",
    name: "price",
    type: "number",
    valueVariableName: "price",
  },
  {
    label: "Quantity Available",
    placeholder: "Number of items available in stock",
    name: "quantityAvailable",
    type: "number",
    valueVariableName: "quantityAvailable",
  },
  {
    label: "Product Type",
    placeholder: "e.g Food, Beverage, Snack etc.",
    name: "productType",
    type: "select",
    valueVariableName: "productType",
    listVariableName: "productTypeList",
  },
]);

const showAddProductForm = ref(false);

const addProduct = async () => {
  try {
    const vendorProfile = profileStore.getProfile("vendor");
    if (!vendorProfile || !vendorProfile?.id) {
      return navigateTo("/");
    }
    const profile = await updateUserProfile({
      profileType: "vendor",
      profileId: vendorProfile.id,
      data: {
        products: [
          {
            name: productsForm.name?.trim(),
            description: productsForm.description?.trim(),
            price: productsForm.price,
            quantityAvailable: productsForm.quantityAvailable,
            productType: productsForm.productType,
          },
        ],
      },
    });
    console.log(profile);
  } catch (error) {
    console.log(error);
  }
};
</script>
