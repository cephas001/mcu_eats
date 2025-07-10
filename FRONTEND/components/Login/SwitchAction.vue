<template>
  <div class="mt-6">
    <p
      class="text-center tracking-wide font-manrope"
      :class="[page == 'SignUpPage' ? 'flex flex-col' : '']"
    >
      {{ page == "SignUpPage" ? "Already have an account?" : "No account? " }}
      <NuxtLink class="text-primary font-bold" @click="toggleAction">{{
        page == "SignUpPage" ? "Login here" : "Signup here"
      }}</NuxtLink>
    </p>
  </div>
</template>

<script setup>
import { navigateTo } from "nuxt/app";

const props = defineProps({
  page: {
    type: String,
  },
});

const toggleAction = async () => {
  if (props.page == "SignUpPage") {
    return await navigateTo("/auth/login");
  }
  await navigateTo("/auth/signup");
};
</script>
