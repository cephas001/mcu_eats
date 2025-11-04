<template>
  <tbody class="text-center">
    <tr class="border-b border-gray-300" v-for="(product, index) in products">
      <td class="py-3 pr-4 flex justify-center">
        <UCheckbox
          class=""
          color="primary"
          v-model="product.checked"
          @change="recordProductId(product)"
        />
      </td>
      <td class="py-3 pr-4">{{ index + 1 }}</td>
      <td
        class="py-3 pr-4 font-medium truncate"
        @click="navigateTo(`/vendor/products/${product.id}`)"
      >
        {{ product?.name }}
      </td>

      <td class="py-3 pr-4">
        <span class="whitespace-nowrap tabular-nums">
          ₦{{ product?.price?.toLocaleString() }}
        </span>
      </td>

      <td class="py-3">
        <span class="whitespace-nowrap tabular-nums">
          <!-- {{ product?.quantityAvailable }} -->
          {{ product?.category }}
        </span>
      </td>
    </tr>
  </tbody>
</template>

<script setup>
import { useProductStore } from "@/stores/productStore";
import { storeToRefs } from "pinia";

const productStore = useProductStore();
const { checkedProductsRecord } = storeToRefs(productStore);

const value = ref(false);

const recordProductId = (product) => {
  if (product.checked) {
    checkedProductsRecord.value.push(product.id);
  } else {
    const index = checkedProductsRecord.value.indexOf(product.id);
    if (index > -1) {
      checkedProductsRecord.value.splice(index, 1);
    }
  }

  console.log("Checked Products Record:", checkedProductsRecord.value);
};

const props = defineProps({
  products: {
    type: Array,
    required: true,
  },
});

console.log(props.products);
</script>
