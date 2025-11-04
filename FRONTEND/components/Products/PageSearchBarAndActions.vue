<template>
  <div class="flex gap-4 flex-col mb-4 relative">
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
          @click="emit('archivedProductButtonClicked', true)"
        >
        </UIcon>
        <UIcon
          name="i-material-symbols-delete"
          class="text-red-600 text-2xl"
          @click="emit('deleteProductButtonClicked', true)"
        >
        </UIcon>
        <UIcon
          name="material-symbols-filter-alt-outline"
          class="text-black text-2xl"
          @click="showDropdown = !showDropdown"
        >
        </UIcon>
      </div>
    </div>
    <div
      class="absolute right-0 top-full w-35 bg-white"
      v-if="showDropdown"
      ref="target"
    >
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
import { onClickOutside } from "@vueuse/core";

const productStore = useProductStore();
const { productsFilterForm, productsFilterFormSchema } = productStore;

const emit = defineEmits([
  "addProductButtonClicked",
  "archivedProductButtonClicked",
  "deleteProductButtonClicked",
]);
const showDropdown = ref(false);

const target = ref(null);
onClickOutside(target, () => {
  showDropdown.value = false;
});
</script>
