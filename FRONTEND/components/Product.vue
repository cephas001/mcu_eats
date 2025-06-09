<template>
  <div class="relative">
    <h1 class="mb-4">{{ product.name }}</h1>
    <p class="text-gray-600 text-sm">
      {{ product.description }}
    </p>
    <p class="text-sm font-bold tracking-wider font-manrope">
      &#8358;{{ product.price.toLocaleString() }}
    </p>
    <div class="flex w-fit rounded-md gap-1 pt-3 text-xl">
      <div class="bg-primary_light rounded-full p-1 flex items-center">
        <UIcon
          name="i-material-symbols-add-2-rounded"
          @click="update(product, 'increase')"
        />
      </div>
      <div class="bg-primary_light rounded-full p-1 flex items-center">
        <UIcon
          name="i-material-symbols-remove"
          @click="update(product, 'decrease')"
        />
      </div>
      <input
        type="text"
        disabled
        class="w-[50px] ml-3 font-manrope"
        :class="[product.count < 1 ? 'hidden' : 'visible']"
        v-model="product.count"
      />
    </div>
    <UIcon
      :name="`i-material-symbols-favorite${
        product.favourited ? '' : '-outline'
      }`"
      class="text-black absolute right-0 top-0 font-bold text-3xl"
      :class="product.favourited ? 'animate-[var(--animate-pingOnce)]' : ''"
      @click="favouriteProduct"
    />
  </div>
  <UModal v-model:open="open" class="bg-white pb-4" title="Action Required">
    <template #content>
      <div class="text-center px-5 py-10">
        <h1 class="mt-2 tracking-wide text-lg">Login to complete action</h1>
        <div class="mt-3">
          <NuxtLink
            to="/login"
            class="bg-black text-white text-sm tracking-wider p-2 rounded-md"
            >Proceed</NuxtLink
          >
        </div>
      </div>
    </template>
  </UModal>
</template>

<script setup>
import { defineProps } from "vue";
import {
  updateInLocalStorage,
  deleteFromLocalStorage,
} from "@/utils/localStorage";
import { useOrderStore } from "@/stores/orderStore";
import { useUserStore } from "@/stores/userStore";
const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const { setUser } = userStore;
const orderStore = useOrderStore();
const { totalPrice } = storeToRefs(orderStore);

const open = ref(false);

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
  vendorName: {
    type: String,
    required: true,
  },
  vendorId: {
    type: String,
    required: true,
  },
});

const update = (product, operation) => {
  if (operation == "increase") {
    product.count++;
    totalPrice.value = totalPrice.value + product.price;
  } else {
    if (product.count == 0) {
      deleteFromLocalStorage("orders", product._id);
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
    product.count
  );
};

const favouriteProduct = async () => {
  const token = useCookie("auth_token");
  if (!token.value || token.value == "") {
    open.value = true;
    return;
  }
  const config = useRuntimeConfig();
  try {
    if (!user.value._id) {
      await fetchUserDetails();
      if (!user.value._id) {
        showModal.value = true;
        return;
      }
    }

    var backendResponse = ref(null);
    if (props.product.favourited) {
      backendResponse.value = await $fetch(
        `${config.public.apiBaseUrl}/users/favourites/${user.value._id}`,
        {
          method: "PUT",
          body: {
            removeFavouriteProduct: true,
            productId: props.product._id,
          },
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        }
      );
      props.product.favourited = false;
    } else {
      backendResponse.value = await $fetch(
        `${config.public.apiBaseUrl}/users/favourites/${user.value._id}`,
        {
          method: "PUT",
          body: {
            favouriteProducts: [
              ...user.value.favouriteProducts,
              { vendor: props.vendorId, productId: props.product._id },
            ],
          },
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        }
      );
      props.product.favourited = true;
    }

    if (backendResponse.value.user) {
      setUser(backendResponse.value.user);
    }
  } catch (error) {
    console.log(error);
  }
};
</script>
