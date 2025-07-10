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
const props = defineProps({
  page: {
    type: String,
  },
});

const toggleAction = () => {
  console.log("toggled");
};
</script>
