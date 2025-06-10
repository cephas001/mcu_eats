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
          favouriteOrNot(vendor._id) ? '' : '-outline'
        }`"
        class="text-white absolute top-5 right-15 font-bold text-3xl"
        :class="
          favouriteOrNot(vendor._id) ? 'animate-[var(--animate-pingOnce)]' : ''
        "
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
    <TypesSelector :types="vendor.types" />
  </section>

  <h1
    v-if="!fetchingData"
    class="px-5 py-5 text-sm font-manrope bg-gray-100 tracking-wider"
  >
    {{ selectedType.name }}
  </h1>
  <section v-if="!fetchingData" class="px-5 pb-15 relative">
    <div
      class="py-5 border-b-1 border-gray-100"
      v-for="product in filteredProducts"
      :key="product._id"
    >
      <Product :product :vendorId="vendor._id" :vendorName="vendor.name" />
    </div>

    <ViewCartButton />
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
import { useOrderStore } from "@/stores/orderStore";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/userStore";
import { useCartStore } from "@/stores/cartStore";

const cartStore = useCartStore();
const { cart } = storeToRefs(cartStore);

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const { favouriteOrNot, favouriteVendor } = userStore;
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
const watchedVendor = computed(() => vendor.value);

const orderStore = useOrderStore();
const { viewOrdersBtn, selectedType } = storeToRefs(orderStore);

// To filter products based on selected type
const filteredProducts = computed(() => {
  return vendor.value.products.filter((product) => {
    if (product.type == selectedType.value.name) {
      return true;
    } else {
      return false;
    }
  });
});

// To display vieworders button if at least one product is added to cart and remove if no product is added to cart
watch(
  watchedVendor,
  (newValue) => {
    if (newValue.products.find((product) => product.count > 0)) {
      viewOrdersBtn.value = true;
    }
  },
  { deep: true }
);

onMounted(async () => {
  try {
    if (!vendor.value) {
      const found = vendorStore.findVendorById(id);
      if (!found) {
        await vendorStore.fetchVendorById(id);
      }
    }
    // Initializes Vendor the types of products a vendor offers to an empty array
    vendor.value.types = [];

    vendor.value.products.forEach((product, index) => {
      // Checks if a cart is in localstorage and uses the presaved order quantity for the product count
      if (cart.value.length > 0) {
        cart.value.forEach((item) => {
          if (item._id == product._id && item.vendorId == vendor.value._id) {
            product["count"] = item.quantity;
          } else {
            if (product["count"]) {
              return;
            } else {
              product["count"] = 0;
            }
          }
        });
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
        selectedType.value = type;
      } else {
        // Sets the default selected value to the first vendor type
        selectedType.value = vendor.value.types[0];
      }
    } else {
      // Sets the default selected value to the first vendor type
      selectedType.value = vendor.value.types[0];
    }

    // Checks if a user exists before attempting to check if a user has favourited certain products
    if (!user?.value?._id) {
      const response = await userStore.fetchUserDetails();
    }

    if (user.value) {
      if (user?.value?.favouriteProducts.length == 0) {
        vendor.value.products = vendor.value.products.map((product) => {
          return { ...product, favourited: false };
        });
      } else {
        const filteredProducts = user.value.favouriteProducts.filter(
          (product) => {
            if (product.vendor == vendor.value._id) {
              return true;
            } else {
              return false;
            }
          }
        );
        vendor.value.products = vendor.value.products.map((product) => {
          const productFound = filteredProducts.find((favouriteProduct) => {
            return favouriteProduct.productId === product._id;
          });
          if (productFound) {
            return { ...product, favourited: true };
          } else {
            return { ...product, favourited: false };
          }
        });
      }
    }
  } catch (error) {
    console.error("Error fetching vendor:", error);
  } finally {
    fetchingData.value = false;
  }
});
</script>
