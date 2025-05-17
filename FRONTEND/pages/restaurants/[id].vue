<template>
  <section>
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
      <div><Media :src="restaurant.image" /></div>
      <UIcon
        :name="`i-material-symbols-favorite${
          restaurant.favourite ? '' : '-outline'
        }`"
        class="text-white absolute top-5 right-15 font-bold text-3xl"
        :class="restaurant.favourite ? 'animate-[var(--animate-pingOnce)]' : ''"
        @click="restaurant.favourite = !restaurant.favourite"
      />
      <UIcon
        name="i-material-symbols-share"
        class="text-3xl absolute top-5 right-5 text-white"
      />
    </div>
    <div class="p-5 pb-3 relative">
      <div class="absolute right-10 top-[-35px]">
        <!-- avatar -->
        <img src="@/assets/images/avatar.jpg" class="w-[70px] rounded-full" />
      </div>
      <h1 class="tracking-wide font-semibold mb-1">{{ restaurant.name }}</h1>
      <p class="text-gray-500 text-sm mb-1">{{ restaurant.description }}</p>
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

  <section class="px-5 py-3 border-y-1 border-y-gray-300">
    <div class="flex gap-4 overflow-x-scroll hide-scrollbar">
      <h1
        v-for="(type, index) in types"
        :key="index"
        class="text-gray-900 text-sm whitespace-nowrap py-1 px-3 rounded-full cursor-pointer"
        :class="[type.selected ? 'bg-primary_light' : '']"
        @click="select(type.id)"
      >
        {{ type.name }}
      </h1>
    </div>
  </section>

  <h1 class="px-5 py-5 text-sm font-manrope bg-gray-100 tracking-wider">
    {{ selectedType.name }}
  </h1>
  <section class="px-5 pt-3 pb-18 relative">
    <div class="py-5 border-b-1 border-gray-100" v-for="food in filteredFoodItems" :key="food">
      <h1 class="mb-4" >{{ food.name }}</h1>
        <p class="text-gray-600 text-sm">
          {{ food.description }}
        </p>
        <p class="text-sm font-bold tracking-wider font-manrope">&#8358;{{ food.price.toLocaleString() }}</p>
        <div class="flex w-fit rounded-md gap-1 pt-3 text-xl">
          <div class="bg-primary_light rounded-full p-1 flex items-center">
            <Icon name="i-material-symbols-add-2-rounded" @click="increase(food)"/>
          </div>
          <div class="bg-primary_light rounded-full p-1 flex items-center">
            <Icon name="i-lucide-minus" @click="decrease(food)" />
          </div>
          <input type="text" disabled class="w-[50px] ml-3 font-manrope" :class="[food.count < 1 ? 'hidden' : 'visible']" v-model="food.count"></input>
        </div>
    </div>
    <div class="">

    </div>
    <div class="fixed font-manrope bottom-3 left-5 right-5 bg-primary p-2 mb-5 rounded-md text-white" v-if="viewOrdersBtn">
      <button class="w-full relative">View Orders <span class="absolute right-2">&#8358;{{ totalPrice.toLocaleString() }}</span></button>
    </div>
  </section>
</template>

<script setup>
import { computed, watch } from "vue";

const route = useRoute();
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
const viewOrdersBtn = ref(false);
const totalPrice = ref(0);

const id = route.params.id;

const restaurant = restaurants.value[id - 1];

const filteredFoodItems = computed(() => {
  return foodItems.value.filter((food) => {
    if(selectedType.value.name == food.type) {
      return true
    }
    return false;
  })
});

// const filterFoodTypes = computed(() => {
//   const newArr = foodItems.value.filter((food) => {
//     types.value.forEach(type => {
//     console.log(type.name, food.type == type.name,  food.type)
//       if(food.type == type.name) return true;
//       return false;
//     });    
//   })

//   console.log(newArr);
//   return [];
// });

const types = ref([
  {
    id: 1,
    name: "Rice Dishes",
    selected: true,
  },
  {
    id: Math.random(),
    name: "Protein",
    selected: false
  },
  {
    id: 2,
    name: "Soups",
    selected: false,
  },

  {
    id: 3,
    name: "Pasta",
    selected: false,
  },

  {
    id: 4,
    name: "Cocktails",
    selected: false,
  },
  {
    id: 5,
    name: "Snacks",
    selected: false,
  },
  {
    id: 6,
    name: "Drinks",
    selected: false,
  },
]);

const select = (id) => {
  types.value.map((type) => {
    if (id !== type.id) {
      return (type.selected = false);
    }
    return (type.selected = true);
  });
};

const selectedType = ref(types.value[0]);

const increase = (food) => {
  food.count++;
  totalPrice.value = totalPrice.value + food.price;
}

const decrease = (food) => {
  if(food.count == 0) {
    return;
  }
  food.count--;
  totalPrice.value = totalPrice.value - food.price;
}
watch(
  types.value,
  (newTypes) => {
    selectedType.value = newTypes.filter((item) => {
      if (item.selected) return true;
    })[0];
  },
  { deep: true }
);

const foodItems = ref([
  {
    id: 1,
    name: "Smokey Jollof Rice",
    description: "Delicious party style smokey jollof rice",
    price: 3900,
    type: "Rice Dishes",
    restaurant: "Stomach Option",
    count: 0
  },
  {
    id: 2,
    name: "Original Fried Rice",
    description: "Classic, original & rich naija fried rice",
    price: 3650,
    type: "Rice Dishes",
    restaurant: "Stomach Option",
    count: 0
  },
  {
    id: 3,
    name: "Village Rice",
    description: "Native style rice with bits of beef, fish & kpomo",
    price: 4000,
    type: "Rice Dishes",
    restaurant: "Stomach Option",
    count: 0
  },
  {
    id: 4,
    name: "Stewed Fried Chicken",
    description: "Fried chicken in stew.",
    price: 3950,
    type: "Protein",
    restaurant: "Stomach Option",
    count: 0
  },
  {
    id: 5,
    name: "Stewed Fried Beef",
    description: "Fried beef in stew",
    price: 3400,
    type: "Protein",
    restaurant: "Stomach Option",
    count: 0
  },
  {
    id: 5,
    name: "Peppered Turkey",
    description: "Peppered Turkey",
    price: 7500,
    type: "Protein",
    restaurant: "Stomach Option",
    count: 0
  },
  {
    id: 6,
    name: "Peppered Gizzard",
    description: "Peppered gizzard piecies",
    price: 1750,
    type: "Protein",
    restaurant: "Stomach Option",
    count: 0
  },
]);

watch(foodItems.value, (newFoodItems) => {
  var updatedFood = newFoodItems.filter((food) => {
    if(food.count > 0) return true; 
  })
  
  if(updatedFood.length > 0) {
    viewOrdersBtn.value = true;
  } else {
    viewOrdersBtn.value = false;
  }
})
</script>
