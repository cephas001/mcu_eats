<template>
  <section class="p-5">
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

  <section class="p-5">
    <h1 class="font-semibold mb-5 tracking-wide text-lg">Restaurants</h1>

    <div
      class="rounded-md shadow-md text-sm mb-5 cursor-pointer hover:shadow-lg focus:shadow-lg"
      v-for="restaurant in restaurants"
      :key="restaurant.id"
      @click="openRestaurant(restaurant.id, restaurant.open)"
    >
      <div class="relative">
        <div
          class="bg-primary w-fit py-1 px-2 rounded-r-full absolute top-10 left-[-4px] text-white text-sm z-100"
        >
          {{ restaurant.category }}
        </div>
        <Media :src="restaurant.image" class="rounded-t-md" />
        <!-- icon to favorite would be to the top right -->
        <UIcon
          :name="`i-material-symbols-favorite${
            restaurant.favourite ? '' : '-outline'
          }`"
          class="text-black absolute top-3 right-3 font-bold text-3xl"
          :class="
            restaurant.favourite ? 'animate-[var(--animate-pingOnce)]' : ''
          "
          @click="restaurant.favourite = !restaurant.favourite"
        />
        <div
          class="bg-black/50 absolute inset-0 flex flex-col items-center justify-center gap-5 text-white text-lg"
          v-if="!restaurant.open"
        >
          <p class="font-semibold">Closed</p>

          <p>Opens at 7:00am</p>
        </div>
      </div>

      <div class="py-3 pl-5 flex justify-left items-center">
        <div>
          <!-- avatar -->
          <img src="@/assets/images/avatar.jpg" class="w-[40px] rounded-full" />
        </div>
        <div class="ml-2 w-[70%]">
          <h1 class="font-semibold tracking-wide">{{ restaurant.name }}</h1>
          <p
            class="text-gray-700 text-sm whitespace-nowrap overflow-hidden text-ellipsis"
          >
            {{ restaurant.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const restaurants = ref([
  {
    id: 1,
    image: "/food1.jpg",
    favourite: false,
    name: "Stomach Option",
    description: "A flavour packed experience...",
    category: "Quick Meals",
    open: true,
  },
  {
    id: 2,
    image: "/food4.jpg",
    favourite: false,
    name: "Zoe Aroma Kitchens",
    description: "A flavour packed experience...",
    category: "Quick Meals",
    open: true,
  },
  {
    id: 3,
    image: "/food3.jpg",
    favourite: false,
    name: "Abula Joint",
    description: "Hot amala and more...",
    category: "Swallow and More",
    open: false,
  },
  {
    id: 4,
    image: "/food4.jpg",
    favourite: false,
    name: "Ateez Foods",
    description: "Tasty foods. Affordable rates...",
    category: "Quick Meals",
    open: true,
  },
  {
    id: 5,
    image: "/food5.jpg",
    favourite: false,
    name: "MCU Bakery",
    description: "A flavour packed experience...",
    category: "Pastries",
    open: false,
  },
  {
    id: 6,
    image: "/food5.jpg",
    favourite: false,
    name: "Bros John's",
    description: "A flavour packed experience...",
    category: "Snacks and Grills",
    open: true,
  },
]);

const route = useRoute();
const openRestaurant = (id, open) => {
  if (open) {
    navigateTo(`/restaurants/${id}`);
  }
};
</script>
