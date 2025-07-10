<template>
  <LoadingIconLarge
    :loading="true"
    imageSrc="/Pulse@1x-1.0s-200px-200px.svg"
    class="animate-none"
  />
</template>

<script setup>
import { useUserStore } from "@/stores/userStore";
import { db } from "@/utils/db";

const userStore = useUserStore();
const router = useRouter();
const route = useRoute();
onMounted(async () => {
  try {
    const response = await $fetch("/api/logout");

    if (response.message == "Logged out") {
      userStore.setUser(null);
      db.user.clear(); // Clear IndexedDB user data
      db.favouriteVendors.clear(); // Clear IndexedDB favourite vendors
      db.favouriteProducts.clear(); // Clear IndexedDB favourite products
      db.cart.clear(); // Clear IndexedDB cart data

      if (route.query.redirect) {
        await navigateTo("/login");
      } else {
        await router.back();
      }
    } else {
      throw new Error("An error occurred");
    }
  } catch (error) {
    console.log(error);
  }
});
</script>
