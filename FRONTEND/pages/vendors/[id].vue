<template>
  <section v-if="!fetchingData">
    <div class="relative">
      <div
        class="absolute top-[15px] left-5 bg-primary p-1 flex items-center rounded-full z-150"
      >
        <UIcon
          name="i-material-symbols-arrow-back"
          class="text-3xl text-white"
          @click="$router.back()"
        />
      </div>
      <div><Media src="/restaurant/food1.jpg" /></div>
      <UIcon
        :name="`i-material-symbols-favorite${
          vendorFavourited ? '' : '-outline'
        }`"
        class="text-white absolute top-5 right-15 font-bold text-3xl"
        @click="favouriteVendorComponent(vendor._id)"
      />
      <UIcon
        name="i-material-symbols-share"
        class="text-3xl absolute top-5 right-5 text-white"
      />
    </div>
    <div class="p-5 pb-3 relative">
      <div class="absolute right-10 top-[-35px]">
        <!-- avatar -->
        <img
          src="@/assets/images/avatars/avatar.jpg"
          class="w-[70px] rounded-full"
        />
      </div>
      <h1 class="tracking-wide font-semibold mb-1">{{ vendor.name }}</h1>
      <p class="text-gray-500 text-sm mb-1">{{ vendor.description }}</p>
      <p
        class="text-sm flex items-center gap-2 text-gray-500 font-manrope font-semibold"
      >
        <UIcon
          name="i-material-symbols-kid-star-sharp"
          class="text-yellow-500"
        />5.0 Excellent (20+)
      </p>
      <p class="flex items-center gap-4">
        <UIcon name="i-material-symbols-search" class="text-gray-500" />
        <UInput
          size="xl"
          variant="ghost"
          placeholder="Search menu items"
          :ui="{
            base: 'rounded-none text-sm pl-0 hover:bg-transparent cursor-pointer focus:bg-transparent focus:text-black',
          }"
        />
      </p>
    </div>
  </section>

  <section v-if="!fetchingData" class="px-5 py-3 border-y-1 border-y-gray-300">
    <VendorProductTypesSelector :types="vendor.types" />
  </section>

  <h1
    v-if="!fetchingData"
    class="px-5 py-5 text-sm font-manrope bg-gray-100 tracking-wider"
  >
    {{ selectedProductType.name }}
  </h1>
  <section v-if="!fetchingData" class="px-5 pb-15 relative">
    <div
      class="py-5 border-b-1 border-gray-100"
      v-for="product in filteredProducts"
      :key="product._id"
    >
      <VendorProduct
        :product
        :vendorId="vendor._id"
        :vendorName="vendor.name"
      />
    </div>

    <CartOpenButton />
  </section>

  <LoadingIconLarge :loading="fetchingData" />

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
import { computed, onMounted, watch, ref } from "vue";
import { useVendorStore } from "@/stores/vendorStore";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/userStore";
import { useCartStore } from "@/stores/cartStore";
import { navigateTo } from "nuxt/app";
import {
  returnFavouriteVendorIds,
  returnFavouriteProductIds,
} from "@/composables/returnFavouriteIds";

const cartStore = useCartStore();
const { cart } = storeToRefs(cartStore);

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const { favouriteVendor } = userStore;
const open = ref(false);

const favouriteVendorComponent = (id) => {
  const token = useCookie("auth_token");
  if (!token.value || token.value == "") {
    open.value = true;
    return;
  }
  favouriteVendor(id);
};

// To toggle loading icon
const fetchingData = ref(true);

const route = useRoute();
const id = route.params.id;

const vendorStore = useVendorStore();
const { vendor } = storeToRefs(vendorStore);
const vendorFavourited = ref(false);

const { selectedProductType } = storeToRefs(vendorStore);

// To filter products based on selected type
const filteredProducts = computed(() => {
  return vendor.value.products.filter((product) => {
    if (product.type == selectedProductType.value.name) {
      return true;
    } else {
      return false;
    }
  });
});

onMounted(async () => {
  try {
    const found = await vendorStore.findVendorById(id);
    if (!found) {
      const fetched = await vendorStore.fetchVendorById(id);
      if (!fetched) {
        await navigateTo("/");
        return;
      }
    }

    const { favouriteProductIds } = await returnFavouriteProductIds();
    const { favouriteVendorIds } = await returnFavouriteVendorIds();

    if (favouriteVendorIds.includes(vendor.value._id)) {
      vendorFavourited.value = true;
    }

    // Initializes the types of products a vendor offers
    vendor.value.types = [];

    cartStore.getCartValues();
    cartStore.computeTotalCartPrice();

    vendor.value.products.forEach((product, index) => {
      // Checks if a product is favourited by the user
      if (favouriteProductIds.includes(product._id)) {
        product.favourited = true;
      } else {
        product.favourited = false;
      }

      // Checks if a product is in cart and using the quantity already store for the product count
      const productInCart = cart?.value?.find((item) => {
        return item._id == product._id;
      });

      if (productInCart) {
        product["count"] = productInCart.quantity;
      } else {
        product["count"] = 0;
      }

      // New product type object
      const objectToAdd = {
        id: Date.now().toString(36) + Math.random().toString(36).substring(2),
        name: product.type,
        selected: index === 0,
      };

      // Check if a vendor product type already exists before adding to the array of vendor product types
      if (!vendor.value.types.some((type) => type.name === product.type)) {
        vendor.value.types.push(objectToAdd);
      }
    });

    if (route.query.type !== "") {
      const type = vendor.value.types.find((type) => {
        return type.name === route.query.type;
      });
      if (type) {
        vendor.value.types[0].selected = false;
        type.selected = true;
        selectedProductType.value = type;
      } else {
        // Sets the default selected value to the first vendor type
        selectedProductType.value = vendor.value.types[0];
      }
    } else {
      // Sets the default selected value to the first vendor type
      selectedProductType.value = vendor.value.types[0];
    }
  } catch (error) {
    console.error("Error fetching vendor:", error);
  } finally {
    fetchingData.value = false;
  }
});
</script>
