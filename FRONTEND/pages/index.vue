<template>
  <section
    class="p-5"
    v-if="restaurants.length > 0 || shops.length > 0 || retailers.length > 0"
  >
    <UInput
      icon="i-material-symbols-search-rounded"
      size="lg"
      variant="outline"
      placeholder="What are you craving for?"
      class="w-full"
      readonly
      :ui="{ base: 'bg-transparent text-black rounded-full' }"
      @click.prevent="navigateTo('/search')"
    />
  </section>

  <section class="p-5" v-if="restaurants.length > 0">
    <h1 class="font-semibold mb-5 tracking-wide text-lg">Restaurants</h1>

    <UCarousel
      v-slot="{ item }"
      :items="restaurants"
      dots
      class="rounded-md shadow-md text-sm mb-5 cursor-pointer hover:shadow-lg focus:shadow-lg"
    >
      <div class="relative">
        <div
          class="bg-primary w-fit py-1 px-2 rounded-r-full absolute top-10 left-[-4px] text-white text-sm z-100"
        >
          {{ item.category }}
        </div>
        <Media
          :src="item.image"
          class="rounded-t-md"
          @click.self="openRestaurant(item.id, item.open)"
        />
        <!-- icon to favorite would be to the top right -->
        <UIcon
          :name="`i-material-symbols-favorite${
            item.favourite ? '' : '-outline'
          }`"
          class="text-black absolute z-100 top-3 right-3 font-bold text-3xl"
          :class="item.favourite ? 'animate-[var(--animate-pingOnce)]' : ''"
          @click.self="favouriteRestaurant(item.id)"
        />
        <div
          class="bg-black/50 absolute inset-0 flex flex-col items-center justify-center gap-5 text-white text-lg"
          v-if="!item.open"
        >
          <p class="font-semibold">Closed</p>

          <p>Opens at 7:00am</p>
        </div>
      </div>

      <div
        class="py-3 pl-5 flex justify-left items-center"
        @click="openRestaurant(item.id)"
      >
        <div>
          <!-- avatar -->
          <img
            src="@/assets/images/avatars/avatar.jpg"
            class="w-[40px] rounded-full"
          />
        </div>
        <div class="ml-2 w-[70%]">
          <h1 class="font-semibold tracking-wide">{{ item.name }}</h1>
          <p
            class="text-gray-700 text-sm whitespace-nowrap overflow-hidden text-ellipsis"
          >
            {{ item.description }}
          </p>
        </div>
      </div>
    </UCarousel>
  </section>

  <section class="p-5" v-if="shops.length > 0">
    <h1 class="font-semibold mb-5 tracking-wide text-lg">Shops</h1>

    <UCarousel
      v-slot="{ item }"
      :items="shops"
      dots
      class="rounded-md shadow-md text-sm mb-5 cursor-pointer hover:shadow-lg focus:shadow-lg"
    >
      <div class="relative">
        <div
          class="bg-primary w-fit py-1 px-2 rounded-r-full absolute top-10 left-[-4px] text-white text-sm z-100"
        >
          {{ item.category }}
        </div>
        <Media
          :src="item.image"
          class="rounded-t-md"
          @click.self="openRestaurant(item.id, item.open)"
        />
        <!-- icon to favorite would be to the top right -->
        <UIcon
          :name="`i-material-symbols-favorite${
            item.favourite ? '' : '-outline'
          }`"
          class="text-black absolute z-100 top-3 right-3 font-bold text-3xl"
          :class="item.favourite ? 'animate-[var(--animate-pingOnce)]' : ''"
          @click.self="favouriteRestaurant(item.id)"
        />
        <div
          class="bg-black/50 absolute inset-0 flex flex-col items-center justify-center gap-5 text-white text-lg"
          v-if="!item.open"
        >
          <p class="font-semibold">Closed</p>

          <p>Opens at 7:00am</p>
        </div>
      </div>

      <div
        class="py-3 pl-5 flex justify-left items-center"
        @click="openRestaurant(item.id)"
      >
        <div>
          <!-- avatar -->
          <img
            src="@/assets/images/avatars/avatar.jpg"
            class="w-[40px] rounded-full"
          />
        </div>
        <div class="ml-2 w-[70%]">
          <h1 class="font-semibold tracking-wide">{{ item.name }}</h1>
          <p
            class="text-gray-700 text-sm whitespace-nowrap overflow-hidden text-ellipsis"
          >
            {{ item.description }}
          </p>
        </div>
      </div>
    </UCarousel>
  </section>

  <section class="p-5" v-if="retailers.length > 0">
    <h1 class="font-semibold mb-5 tracking-wide text-lg">Retailers</h1>

    <UCarousel
      v-slot="{ item }"
      :items="retailers"
      dots
      class="rounded-md shadow-md text-sm mb-5 cursor-pointer hover:shadow-lg focus:shadow-lg"
    >
      <div class="relative">
        <div
          class="bg-primary w-fit py-1 px-2 rounded-r-full absolute top-10 left-[-4px] text-white text-sm z-100"
        >
          {{ item.category }}
        </div>
        <Media
          :src="item.image"
          class="rounded-t-md"
          @click.self="openRestaurant(item.id, item.open)"
        />
        <!-- icon to favorite would be to the top right -->
        <UIcon
          :name="`i-material-symbols-favorite${
            item.favourite ? '' : '-outline'
          }`"
          class="text-black absolute z-100 top-3 right-3 font-bold text-3xl"
          :class="item.favourite ? 'animate-[var(--animate-pingOnce)]' : ''"
          @click.self="favouriteRestaurant(item.id)"
        />
        <div
          class="bg-black/50 absolute inset-0 flex flex-col items-center justify-center gap-5 text-white text-lg"
          v-if="!item.open"
        >
          <p class="font-semibold">Closed</p>

          <p>Opens at 7:00am</p>
        </div>
      </div>

      <div
        class="py-3 pl-5 flex justify-left items-center"
        @click="openRestaurant(item.id)"
      >
        <div>
          <!-- avatar -->
          <img
            src="@/assets/images/avatars/avatar.jpg"
            class="w-[40px] rounded-full"
          />
        </div>
        <div class="ml-2 w-[70%]">
          <h1 class="font-semibold tracking-wide">{{ item.name }}</h1>
          <p
            class="text-gray-700 text-sm whitespace-nowrap overflow-hidden text-ellipsis"
          >
            {{ item.description }}
          </p>
        </div>
      </div>
    </UCarousel>
  </section>

  <section
    class="bg-transparent h-[80vh] overflow-hidden flex flex-col items-center justify-center"
    v-if="restaurants.length == 0"
  >
    <img src="/loading2.png" class="animate-pulse" />
  </section>
</template>

<script setup>
import { onMounted } from "vue";
const restaurants = ref([]);
const shops = ref([]);
const retailers = ref([]);

const fetchRestaurants = async () => {
  restaurants.value = await $fetch("api/restaurants");
};

const fetchShops = async () => {
  shops.value = await $fetch("api/shops");
};

const fetchRetailers = async () => {
  retailers.value = await $fetch("api/retailers");
};

const favouriteRestaurant = async (restaurantId) => {
  return;

  const response = await $fetch("api/usersRestaurantFavourites", {
    method: "PUT",
    body: { userId: "1", restaurantId },
  });
};

const openRestaurant = (id, open) => {
  return;
  if (open) {
    navigateTo(`/restaurants/${id}`);
  }
};

onMounted(() => {
  fetchRestaurants();
  fetchShops();
  fetchRetailers();
});
</script>
