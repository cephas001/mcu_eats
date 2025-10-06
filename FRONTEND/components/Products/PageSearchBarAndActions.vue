<template>
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
      @click.prevent="navigateTo('/general/search')"
      @keydown.enter.prevent="navigateTo('/general/search')"
    />
    <div class="flex justify-between items-center">
      <UButton
        icon="i-material-symbols-add"
        color="primary"
        type="button"
        class="shrink-0 w-fit text-white tracking-wide"
        @click="emit('addProductButtonClicked', true)"
      >
        Add Product
      </UButton>
      <div class="flex items-center gap-1 relative">
        <UIcon
          name="i-material-symbols-archive-outline-rounded"
          class="text-black text-2xl"
        >
        </UIcon>
        <UIcon name="i-material-symbols-delete" class="text-red-600 text-2xl">
        </UIcon>
        <UIcon
          name="material-symbols-filter-alt-outline"
          class="text-black text-2xl"
        >
        </UIcon>
      </div>
    </div>
    <div>
      <CustomForm
        :formFieldsSchema="productsFilterFormSchema"
        :formState="productsFilterForm"
        :hideSubmitButton="true"
      />
    </div>
  </div>
</template>

<script setup>
import { useProductStore } from "~/stores/productStore";
const productStore = useProductStore();
const { productsFilterForm, productsFilterFormSchema } = productStore;
const emit = defineEmits(["addProductButtonClicked"]);
</script>
