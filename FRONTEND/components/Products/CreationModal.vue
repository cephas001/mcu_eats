<template>
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
        @click="emit('createProduct', true)"
      />
    </template>
  </UModal>
</template>

<script setup>
import { useProductStore } from "@/stores/productStore";

const productStore = useProductStore();
const { productsForm } = productStore;

const showAddProductForm = ref(false);
const emit = defineEmits(["createProduct"]);

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
    label: "Is this product a combo?",
    placeholder: "A combo is a combination of several products you offer",
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
</script>
