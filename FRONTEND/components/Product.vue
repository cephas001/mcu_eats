<template>
    <h1 class="mb-4" >{{ product.name }}</h1>
    <p class="text-gray-600 text-sm">
        {{ product.description }}
    </p>
    <p class="text-sm font-bold tracking-wider font-manrope">
        &#8358;{{ product.price.toLocaleString() }}
    </p>
    <div class="flex w-fit rounded-md gap-1 pt-3 text-xl">
        <div class="bg-primary_light rounded-full p-1 flex items-center">
            <Icon name="i-material-symbols-add-2-rounded" @click="update(product, 'increase')"/>
        </div>
        <div class="bg-primary_light rounded-full p-1 flex items-center">
            <Icon name="i-lucide-minus" @click="update(product, 'decrease')" />
        </div>
        <input type="text" disabled class="w-[50px] ml-3 font-manrope" :class="[product.count < 1 ? 'hidden' : 'visible']" v-model="product.count"></input>
    </div>
</template>

<script setup>
import { defineProps } from "vue";
import { updateInLocalStorage, deleteFromLocalStorage } from "@/utils/localStorage";
import { useOrderStore } from "@/stores/orderStore";
const orderStore = useOrderStore();
const { totalPrice, viewOrdersBtn } = storeToRefs(orderStore);

const props = defineProps({
  product: {
    type: Object,
    required: true
  }, 
  vendorName: {
    type: String, 
    required: true
  }, 
  vendorId: {
    type: String, 
    required: true
  }
})

const update = (product, operation) => {
  if(operation == "increase") {
    product.count++;
    totalPrice.value = totalPrice.value + product.price;
  } else {
    if(product.count == 0) {
      deleteFromLocalStorage("orders", product._id)
      return;
    }
    product.count--;
    totalPrice.value = totalPrice.value - product.price;
  }
  updateInLocalStorage(
    "orders", 
    {
      vendorId: props.vendorId,
      vendorName: props.vendorName,
      quantity: product.count,
      price: product.price,
      name: product.name,
      _id: product._id,
    },
    "quantity", 
    product.count)
};

</script>