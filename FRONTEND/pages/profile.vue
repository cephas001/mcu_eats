<template>
  <section v-if="!loadingUser" class="px-6 pt-20 pb-25">
    <div class="w-full text-right">
      <h1>Peter Okodugha</h1>
      <p>@peter100056</p>
    </div>

    <div class="mt-10">
      <!-- DETAILS -->
      <div class="flex items-center" @click="navigateTo('/profileDetails')">
        <div
          class="bg-gray-300 flex items-center rounded-full text-center p-1 mr-5"
        >
          <UIcon
            name="i-material-symbols-person-2-outline"
            class="text-xl self-center"
          />
        </div>
        <h1 class="flex gap-5 items-center text-sm tracking-wide">
          My details
          <span
            class="bg-primary text-white px-4 py-1 rounded-full text-[10px] tracking-wide"
            >Verify email</span
          >
        </h1>
        <UIcon
          name="i-material-symbols-light-chevron-right"
          class="text-2xl self-center font-bold ml-auto"
        />
      </div>
      <!-- SAVED ADDRESSES -->
      <div class="mt-7 flex items-center" @click="navigateTo('/addresses')">
        <div
          class="bg-gray-300 flex items-center rounded-full text-center p-1 mr-5"
        >
          <UIcon
            name="i-material-symbols-light-location-on-outline-rounded"
            class="text-xl self-center font-bold"
          />
        </div>
        <h1 class="text-sm tracking-wide">Saved addresses</h1>
        <UIcon
          name="i-material-symbols-light-chevron-right"
          class="text-2xl self-center font-bold ml-auto"
        />
      </div>
      <!-- FAVOURITES -->
      <div class="mt-7 flex items-center" @click="navigateTo('/favourites')">
        <div
          class="bg-gray-300 flex items-center rounded-full text-center p-1 mr-5"
        >
          <UIcon
            name="i-material-symbols-favorite-outline"
            class="text-lg self-center"
          />
        </div>
        <h1 class="text-sm tracking-wide">Favourites</h1>
        <UIcon
          name="i-material-symbols-light-chevron-right"
          class="text-2xl self-center font-bold ml-auto"
        />
      </div>
      <!-- ITEM SUGGESTIONS -->
      <div class="mt-7 flex items-center">
        <div
          class="bg-gray-300 flex items-center rounded-full text-center p-1 mr-5"
        >
          <UIcon
            name="i-material-symbols-garden-cart-outline-sharp"
            class="text-lg self-center"
          />
        </div>
        <h1 class="text-sm tracking-wide">Item suggestions</h1>
        <UIcon
          name="i-material-symbols-light-chevron-right"
          class="text-2xl self-center font-bold ml-auto"
        />
      </div>
      <!-- SAVED NOTES -->
      <div class="mt-7 flex items-center" @click="navigateTo('/notes')">
        <div
          class="bg-gray-300 flex items-center rounded-full text-center p-1 mr-5"
        >
          <UIcon
            name="i-material-symbols-light-chat-outline-rounded"
            class="text-lg self-center"
          />
        </div>
        <h1 class="text-sm tracking-wide">Saved notes</h1>
        <UIcon
          name="i-material-symbols-light-chevron-right"
          class="text-2xl self-center font-bold ml-auto"
        />
      </div>
      <!-- HELP/FEEDBACK -->
      <div class="mt-7 flex items-center" @click="navigateTo('/feedback')">
        <div
          class="bg-gray-300 flex items-center rounded-full text-center p-1 mr-5"
        >
          <UIcon
            name="i-material-symbols-light-help-outline"
            class="text-lg self-center"
          />
        </div>
        <h1 class="text-sm tracking-wide">Help / Feedback</h1>
        <UIcon
          name="i-material-symbols-light-chevron-right"
          class="text-2xl self-center font-bold ml-auto"
        />
      </div>
    </div>
  </section>
  <LoadingIconLarge :loading="loadingUser" />
</template>

<script setup>
import { useUserStore } from "@/stores/userStore";
import { navigateTo } from "nuxt/app";
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const loadingUser = ref(false);

// onMounted(async () => {
//   try {
//     await userStore.fetchUserDetails();
//   } catch (error) {
//     console.log(error);
//   } finally {
//     loadingUser.value = false;
//   }
// });
</script>
