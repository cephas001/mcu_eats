<template>
  <section v-if="!fetchingData">
    <div class="relative">
      <div
        class="absolute top-[15px] left-5 bg-primary p-1 flex items-center rounded-full z-150"
      >
        <UIcon
          name="i-material-symbols-arrow-back"
          class="text-3xl text-white"
          @click="navigateTo('/')"
        />
      </div>
      <div><Media src="/restaurant/food1.jpg" /></div>
      <UIcon
        :name="`i-material-symbols-favorite${
          vendor.favourite ? '' : '-outline'
        }`"
        class="text-white absolute top-5 right-15 font-bold text-3xl"
        :class="vendor.favourite ? 'animate-[var(--animate-pingOnce)]' : ''"
        @click="vendor.favourite = !vendor.favourite"
      />
      <UIcon
        name="i-material-symbols-share"
        class="text-3xl absolute top-5 right-5 text-white"
      />
    </div>
    <div class="p-5 pb-3 relative">
      <div class="absolute right-10 top-[-35px]">
        <!-- avatar -->
        <img src="@/assets/images/avatars/avatar.jpg" class="w-[70px] rounded-full" />
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
    <div class="flex gap-4 overflow-x-scroll hide-scrollbar">
      <h1
        v-for="(type, index) in vendor.types"
        :key="index"
        class="text-gray-900 text-sm whitespace-nowrap py-1 px-3 rounded-full cursor-pointer"
        :class="[type.selected ? 'bg-primary_light' : '']"
        @click="select(type.id)"
      >
        {{ type.name }}
      </h1>
    </div>
  </section>

  <h1 v-if="!fetchingData" class="px-5 py-5 text-sm font-manrope bg-gray-100 tracking-wider">
    {{ selectedType.name}}
  </h1>
  <section v-if="!fetchingData" class="px-5 pb-15 relative">
    <div class="py-5 border-b-1 border-gray-100" v-for="product in filteredProducts" :key="product._id">
      <h1 class="mb-4" >{{ product.name }}</h1>
        <p class="text-gray-600 text-sm">
          {{ product.description }}
        </p>
        <p class="text-sm font-bold tracking-wider font-manrope">&#8358;{{ product.price.toLocaleString() }}</p>
        <div class="flex w-fit rounded-md gap-1 pt-3 text-xl">
          <div class="bg-primary_light rounded-full p-1 flex items-center">
            <Icon name="i-material-symbols-add-2-rounded" @click="increase(product)"/>
          </div>
          <div class="bg-primary_light rounded-full p-1 flex items-center">
            <Icon name="i-lucide-minus" @click="decrease(product)" />
          </div>
          <input type="text" disabled class="w-[50px] ml-3 font-manrope" :class="[product.count < 1 ? 'hidden' : 'visible']" v-model="product.count"></input>
        </div>
    </div>
    <div class="absolute font-manrope bottom-0 left-5 right-5 bg-primary p-2 rounded-md text-white" v-if="viewOrdersBtn">
      <button class="w-full relative">View Orders <span class="absolute right-2">&#8358;{{ totalPrice.toLocaleString() }}</span></button>
    </div>
  </section>

  <LoadingIconLarge :loading="fetchingData" />
</template>

<script setup>
import { computed, onMounted, watch } from "vue";
import { useVendorStore } from "@/stores/vendorStore";
import { storeToRefs } from "pinia";
import { updateLocalStorageOrders } from "@/utils/updateLocalStorageOrders";

const route = useRoute();
const vendorStore = useVendorStore();
const { vendor } = storeToRefs(vendorStore);
const watchedVendor = computed(() => vendor.value);
const selectedType = ref({});

const viewOrdersBtn = ref(false);

const totalPrice = ref(0);

const id = route.params.id;
const type = route.query.type;

const orders = ref([]);

const filteredProducts = computed(() => {
  return vendor.value.products.filter((product) => {
    if(product.type == selectedType.value.name) {
      return true
    } else {
      return false;
    }
  })
});

const select = (id) => {
  vendor.value.types.map((type) => {
    if (id !== type.id) {
      return type.selected = false;
    }
    selectedType.value = type;
    return type.selected = true
  });
  
};

const increase = (product) => {
  console.log(product)
  product.count++;
  totalPrice.value = totalPrice.value + product.price;
  updateLocalStorageOrders(product, {name: vendor.value.name, _id: vendor.value._id},"increase")
}

const decrease = (product) => {
  if(product.count == 0) {
    return;
  }
  product.count--;
  totalPrice.value = totalPrice.value - product.price;
  updateLocalStorageOrders(product, {name: vendor.value.name, _id: vendor.value._id}, "decrease")
}

const fetchingData = ref(true);

watch(watchedVendor, (newValue, oldValue) => {
  if(newValue.products.find((product) => product.count > 0)) {
    viewOrdersBtn.value = true;
  }
}, {deep: true})

onMounted(async () => {
  const ordersPreSaved = localStorage.getItem("orders");
  if(ordersPreSaved) {
    viewOrdersBtn.value = true;
    const ordersPreSavedValue = JSON.parse(ordersPreSaved);
    ordersPreSavedValue.forEach(order => {
      totalPrice.value = totalPrice.value + (order.price * order.quantity);
    })
  }
  fetchingData.value = true;
  try {
    await vendorStore.fetchVendorById(id);
    if(vendor) {
      vendor.value.types = [];
      vendor.value.products.forEach((product, index) => {
        product["count"] = 0;

        const objectToAdd = {
          id: Date.now().toString(36) + Math.random().toString(36).substring(2),
          name: product.type,
          selected: index === 0
        };

        // Check if the type already exists before adding
        if (!vendor.value.types.some((type) => type.name === product.type)) {
          vendor.value.types.push(objectToAdd);
        }
      });
      selectedType.value = vendor.value.types[0];
    }
  } catch (error) {
    console.error("Error fetching vendor:", error);
  } finally {
    fetchingData.value = false;
  }
})
</script>
