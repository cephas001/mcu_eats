<template>
  <tbody class="text-center">
    <tr
      class="border-b border-gray-300"
      v-for="(product, index) in products"
      @click="navigateTo(`/vendor/products/${product.id}`)"
    >
      <td class="py-3 pr-4 flex justify-center">
        <UCheckbox class="" color="primary" />
      </td>
      <td class="py-3 pr-4">{{ index + 1 }}</td>
      <td class="py-3 pr-4 font-medium truncate">
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
            {{  product?.category  }}
        </span>
      </td>
    </tr>
  </tbody>
</template>

<script setup>
const props = defineProps({
  products: {
    type: Array,
    required: true,
  },
});
</script>
