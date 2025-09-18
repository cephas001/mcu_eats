<template>
  <section v-if="!fetchingVendor">
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

  <section
    v-if="!fetchingVendor"
    class="px-5 py-3 border-y-1 border-y-gray-300"
  >
    <VendorProductTypesSelector :types="vendor.productTypes" />
  </section>

  <h1
    v-if="!fetchingVendor"
    class="px-5 py-5 text-sm font-manrope bg-gray-100 tracking-wider"
  >
    {{ selectedProductType.name }}
  </h1>
  <section v-if="!fetchingVendor" class="px-5 pb-15 relative">
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

  <LoadingIconCustom :loading="fetchingVendor" />

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

definePageMeta({
  middleware: ["check-user-and-profiles"],
  specificUserType: ["consumer"],
  allowAnonymous: true,
});

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
const fetchingVendor = ref(true);

const route = useRoute();

const vendorStore = useVendorStore();
const { vendor, vendors } = storeToRefs(vendorStore);
const vendorFavourited = ref(false);

const { selectedProductType } = storeToRefs(vendorStore);

// To filter products based on selected type
const filteredProducts = computed(() => {
  return vendor.value.products.filter((product) => {
    if (
      !selectedProductType.value.name ||
      selectedProductType.value.name == "All"
    ) {
      console.log(product);
      return true;
    }

    if (product.productType == selectedProductType.value.name) {
      return true;
    } else {
      return false;
    }
  });
});

onMounted(() => {
  const id = route.params.id;
  const foundVendor = vendorStore.findVendorById(id);

  if (!foundVendor) return navigateTo("/");

  foundVendor.productTypes = [];
  let count = 0;
  if (foundVendor.products?.length > 0) {
    foundVendor.productTypes = foundVendor.products.map((product, index) => {
      count = index + count;
      return {
        id: Date.now().toString(36) + Math.random().toString(36).substring(2),
        name: index === 0 ? "All" : product.productType,
        selected: index === 0,
      };
    });
  }
  vendorStore.setVendor(foundVendor);
  fetchingVendor.value = false;
});
</script>
