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
      <CustomFormsCarousel
        :formFieldsSchemas="[productsFormSchema1, productsFormSchema2]"
        :correspondingFormStates="[productsForm, productsForm]"
        :correspondingSubmitButtonTexts="['Next: Product Image', 'Add Product']"
        @formSubmit="emit('createProduct', true)"
      />
    </template>
  </UModal>
</template>

<script setup>
import { useProductStore } from "@/stores/productStore";
import { watch } from "vue";
import { storeToRefs } from "pinia";

const productStore = useProductStore();
const { productsForm } = productStore;
const { showAddProductForm } = storeToRefs(productStore);

const show = ref(false);
const emit = defineEmits(["createProduct"]);

const productsFormSchema1 = ref([
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
  // {
  //   label: "Is this product a combo?",
  //   placeholder: "A combo is a combination of several products you offer",
  //   name: "description",
  //   type: "text",
  //   valueVariableName: "description",
  // },
  {
    label: "Price (₦) Per Unit",
    placeholder: "Price in Naira",
    name: "price",
    type: "number",
    valueVariableName: "price",
  },
  // {
  //   label: "Quantity Available",
  //   placeholder: "Number of items available in stock",
  //   name: "quantityAvailable",
  //   type: "number",
  //   valueVariableName: "quantityAvailable",
  // },
  {
    label: "Product Category",
    placeholder: "e.g Food, Beverage, Snack etc.",
    name: "category",
    type: "select",
    valueVariableName: "category",
    listVariableName: "productCategoryList",
  },
  {
    label: "Is this product available?",
    placeholder: "Is this product available for purchase?",
    name: "isAvailable",
    type: "select",
    valueVariableName: "available",
    listVariableName: "isAvailableList",
  },
]);

const productsFormSchema2 = ref([
  {
    label: "Product Image",
    name: "productImage",
    valueVariableName: "productImageFile",
    fileUpload: true,
    acceptFormats: "image/*",
    description: "SVG, PNG, JPG or GIF",
    trailingIcon: "i-material-symbols-add-photo-alternate-outline",
    required: false,
  },
]);
</script>
