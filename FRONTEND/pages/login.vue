<template>
  <section class="py-5 px-6">
    <div class="text-center mt-10 mb-8">
      <h1 class="font-bold text-2xl mb-3">Welcome</h1>
      <p class="text-md font-manrope tracking-tight">
        Continue with one of the following options
      </p>
    </div>

    <div class="mb-5 flex flex-col gap-3">
      <div>
        <label for="number" class="font-manrope font-semibold"
          >Matric Number</label
        >
        <UInput
          placeholder="Matric Number"
          variant="outline"
          :ui="{ base: 'bg-transparent text-black p-4' }"
          class="mt-1 w-full"
          type="number"
        />
      </div>
      <div v-if="signup">
        <label for="name" class="font-manrope font-semibold">Full Name</label>
        <div class="flex gap-2">
          <UInput
            placeholder="First"
            variant="outline"
            :ui="{ base: 'bg-transparent text-black p-4' }"
            class="mt-1 w-full"
          />
          <UInput
            placeholder="Last"
            variant="outline"
            :ui="{ base: 'bg-transparent text-black p-4' }"
            class="mt-1 w-full"
          />
        </div>
      </div>
      <div>
        <label for="password" class="font-manrope font-semibold"
          >Password</label
        >
        <UInput
          v-model="password"
          placeholder="Password"
          :type="show ? 'text' : 'password'"
          :ui="{ trailing: 'pe-2', base: 'bg-transparent text-black p-4' }"
          class="mt-1 w-full"
        >
          <template #trailing>
            <UButton
              color="primary"
              variant="link"
              size="md"
              :icon="show ? 'i-lucide-eye-off' : 'i-lucide-eye'"
              :aria-label="show ? 'Hide password' : 'Show password'"
              :aria-pressed="show"
              aria-controls="password"
              @click="show = !show"
            />
          </template>
        </UInput>
      </div>
      <div v-if="signup">
        <label for="confirm_password" class="font-manrope font-semibold"
          >Confirm Password</label
        >
        <UInput
          v-model="password"
          placeholder="Confirm Password"
          :type="show ? 'text' : 'password'"
          :ui="{ trailing: 'pe-2', base: 'bg-transparent text-black p-4' }"
          class="mt-1 w-full"
        >
          <template #trailing>
            <UButton
              color="primary"
              variant="link"
              size="md"
              :icon="show ? 'i-lucide-eye-off' : 'i-lucide-eye'"
              :aria-label="show ? 'Hide password' : 'Show password'"
              :aria-pressed="show"
              aria-controls="password"
              @click="show = !show"
            />
          </template>
        </UInput>
      </div>
      <div>
        <Button
          class="text-white bg-primary rounded-md p-3 w-full text-center text-md"
          >{{ signup ? "Sign Up" : "Log In" }}</Button
        >
      </div>
    </div>

    <div class="mt-8 text-sm font-manrope tracking-tight">
      <p>
        This site is protected by reCAPTCHA and the Google
        <NuxtLink class="text-primary">Privacy Policy</NuxtLink> and
        <NuxtLink class="text-primary">Terms of Service</NuxtLink> apply
      </p>
    </div>

    <div class="mt-6 text-center">
      <p class="text-gray-600 mb-2">or with</p>
      <button
        class="flex border-1 border-gray-200 p-4 rounded-full w-full items-center justify-center gap-2 mb-3 font-semibold focus:bg-gray-100"
      >
        <img
          src="@/assets/images/google.73c708cb.svg"
          alt="Google Icon"
        />Google
      </button>
      <button
        class="flex border-1 border-gray-200 p-4 rounded-full w-full items-center justify-center gap-2 mb-3 font-semibold focus:bg-gray-100"
      >
        <img
          src="@/assets/images/facebook.e4480188.svg"
          alt="Facebook Icon"
        />Facebook
      </button>
    </div>

    <div class="mt-6">
      <p
        class="text-center tracking-wide font-manrope"
        :class="[signup ? 'flex flex-col' : '']"
      >
        {{ signup ? "Already have an account?" : "No account? " }}
        <NuxtLink class="text-primary font-bold" @click="toggleAction">{{
          signup ? "Login here" : "Signup here"
        }}</NuxtLink>
      </p>
    </div>

    <div class="mt-8 text-gray-600 text-center font-manrope" v-if="signup">
      <p>
        By creating an account, you automatically accept our
        <NuxtLink to="/" class="font-poppins text-primary"
          >Terms of service</NuxtLink
        >,
        <NuxtLink class="font-poppins text-primary">Privacy Policy</NuxtLink>
        and
        <NuxtLink class="font-poppins text-primary">Cookies Policy</NuxtLink>
      </p>
    </div>
  </section>
</template>

<script setup>
const show = ref(false);
const { y } = useScroll(window);
const password = ref("");
const signup = ref(false);

const toggleAction = () => {
  y.value = 0;
  signup.value = !signup.value;
};
</script>
