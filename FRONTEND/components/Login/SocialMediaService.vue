<template>
  <div class="mt-6 text-center">
    <p class="text-gray-600 mb-2">or with</p>

    <LoginSocialServiceButton
      :imgSrc="GoogleIcon"
      alt="Google Icon"
      text="Google"
    />

    <LoginSocialServiceButton
      :imgSrc="FacebookIcon"
      alt="Facebook Icon"
      text="Facebook"
    />
  </div>
</template>

<script setup>
import GoogleIcon from "@/assets/images/google.73c708cb.svg";
import FacebookIcon from "@/assets/images/facebook.e4480188.svg";

const googleSignIn = () => {
  console.log("Implement");
};

const facebookSignIn = () => {
  console.log("Implement");
};
</script>
