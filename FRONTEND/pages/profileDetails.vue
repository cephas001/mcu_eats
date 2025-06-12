<template>
  <section class="px-6 mt-6 mb-8" v-if="!verificationSent">
    <div class="flex items-center">
      <UIcon
        name="i-material-symbols-arrow-back"
        size="30"
        class="text-primary cursor-pointer"
        @click.prevent="navigateTo('/profile')"
      />
      <h1 class="text-center w-[100%] tracking-wider">My details</h1>
    </div>
  </section>

  <section
    class="relative min-h-[80vh] pb-5"
    v-if="!loadingUser && !sendingEmail"
  >
    <!-- Name -->
    <ProfileDetailsCard
      text="Name"
      :subtext="user?.firstName + ' ' + user?.lastName"
      :edit="true"
      iconName="i-material-symbols-light-person-outline"
      @click="expand('name')"
    />
    <!-- Username -->
    <ProfileDetailsCard
      text="Username"
      :subtext="user?.username ? '@' + user?.username : 'NOT SET'"
      iconName="i-material-symbols-light-person-outline"
    />
    <!-- Phone Number -->
    <ProfileDetailsCard
      text="Phone Number"
      :edit="true"
      :subtext="computedPhoneNumber"
      iconName="i-material-symbols-call"
      @click="expand('phoneNumber')"
    />
    <!-- Email -->
    <ProfileDetailsCard
      :text="user?.verifiedEmail ? 'Email (verified)' : 'Email (unverified)'"
      :edit="true"
      :subtext="user?.email"
      iconName="i-material-symbols-light-mail-outline"
      @click="expand('verifyEmail')"
    />
    <!-- Gender -->
    <ProfileDetailsCard
      text="Gender"
      :subtext="user?.gender"
      iconName="i-material-symbols-supervisor-account-outline"
    />

    <div
      class="bg-white absolute inset-0 px-6 flex text-center justify-center flex-col"
      v-if="verificationSent"
    >
      <p class="text-sm font-semibold mb-5 tracking-wide">Success</p>
      <p class="text-sm leading-5">
        A verification link has been sent to
        <span class="font-semibold">{{ formState.email }}</span>
      </p>

      <button
        class="px-7 py-3 tracking-wide text-sm bg-primary rounded-2xl w-fit mx-auto mt-5 text-white"
        @click="verificationSent = false"
      >
        Ok
      </button>
    </div>
  </section>

  <section
    class="absolute inset-0 h-0 transform font-manrope"
    @click.self="expandSection = false"
    :class="[
      expandSection
        ? 'translate-y-0 opacity-100 h-[100vh] bg-black/20'
        : 'translate-y-20 opacity-0',
    ]"
  >
    <!-- Edit Name -->
    <div
      v-if="sectionToExpand == 'name'"
      class="bg-white pt-6 px-7 pb-4 flex flex-col absolute bottom-0 left-0 right-0"
    >
      <div class="w-full">
        <div class="mb-6">
          <h1
            class="text-center w-[100%] font-manrope font-bold tracking-wider"
          >
            Edit name
          </h1>
        </div>
        <form class="flex gap-3 flex-col">
          <div>
            <CustomFormField
              labelText="First Name"
              placeholder="First"
              name="firstName"
              type="text"
              :state="formState"
              @update="formState.first = $event"
            />
          </div>
          <div>
            <CustomFormField
              labelText="Last Name"
              placeholder="Last"
              name="lastName"
              type="text"
              :state="formState"
              @update="formState.last = $event"
            />
          </div>
          <div>
            <button
              class="bg-primary w-full rounded-md p-2 text-white"
              @click.prevent="changeName"
            >
              Change
            </button>
          </div>
        </form>
      </div>
    </div>
    <!-- Edit Phone Number -->
    <div
      v-if="sectionToExpand == 'phoneNumber'"
      class="bg-white pt-6 px-7 pb-4 flex flex-col absolute bottom-0 left-0 right-0"
    >
      <div class="w-full">
        <div class="mb-6">
          <h1
            class="text-center w-[100%] font-manrope font-bold tracking-wider"
          >
            Phone Number
          </h1>
        </div>
        <form class="flex gap-3 flex-col">
          <div>
            <CustomFormField
              labelText="Phone Number"
              placeholder="Your Phone Number"
              name="phoneNumber"
              type="text"
              :state="formState"
              @update="formState.phoneNumber = $event"
            />
          </div>
          <div>
            <button
              class="bg-primary w-full rounded-md p-2 text-white"
              @click.prevent="changeNumber"
            >
              Change
            </button>
          </div>
        </form>
      </div>
    </div>
    <!-- Verify Email -->
    <div
      v-if="sectionToExpand == 'verifyEmail'"
      class="bg-white pt-6 px-7 pb-4 flex flex-col absolute bottom-0 left-0 right-0"
    >
      <div class="w-full">
        <div class="mb-6">
          <h1
            class="text-center w-[100%] font-manrope font-bold tracking-wider"
          >
            Verify email
          </h1>
        </div>
        <form class="flex gap-3 flex-col">
          <div>
            <div class="mb-4">
              <label for="verifyEmail">Verify email address</label>
            </div>

            <CustomFormField
              labelText="Email"
              placeholder="Email"
              name="email"
              type="email"
              :state="formState"
              @update="formState.email = $event"
            />
          </div>
          <div>
            <button
              class="bg-primary w-full rounded-md p-2 text-white"
              @click.prevent="verifyEmail"
            >
              Verify Email
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>

  <LoadingIconLarge
    :loading="loadingUser"
    imageSrc="/Pulse@1x-1.0s-200px-200px.svg"
    class="animate-none"
  />
  <LoadingIconLarge
    :loading="sendingEmail"
    imageSrc="/Pulse@1x-1.0s-200px-200px.svg"
    class="animate-none"
  />
</template>

<script setup>
import { useUserStore } from "@/stores/userStore";
import { navigateTo, useCookie } from "nuxt/app";
import { useLogInStore } from "@/stores/logInStore";
import { storeToRefs } from "pinia";
import { useFormValidationMethods } from "@/composables/formValidation";
import { computed } from "vue";
import { useRequestURL } from "#app";
import { useRoute } from "vue-router";
const route = useRoute();

const {
  checkFormEmail,
  checkFormFirstName,
  checkFormLastName,
  checkPhoneNumber,
} = useFormValidationMethods();

const userStore = useUserStore();
const { user, loggedIn } = storeToRefs(userStore);

const logInStore = useLogInStore();
const { formState } = useLogInStore();
const { error } = storeToRefs(logInStore);
const loadingUser = ref(true);

const expandSection = ref(false);

const sectionToExpand = ref("");

const changeName = async () => {
  checkFormFirstName();
  checkFormLastName();

  if (error.value.errorMessage !== "") {
    // If form field validation fails
    return;
  } else {
    await userStore.updateUser({
      firstName: formState.firstName,
      lastName: formState.lastName,
    });
    expandSection.value = false;
  }
};
const changeNumber = async () => {
  checkPhoneNumber();

  if (error.value.errorMessage !== "") {
    // If form field validation fails
    return;
  } else {
    await userStore.updateUser({ phoneNumber: formState.phoneNumber });
    expandSection.value = false;
  }
};

const sendingEmail = ref(false);
const verificationSent = ref(false);
const verifyEmail = async () => {
  checkFormEmail();

  if (error.value.errorMessage !== "") {
    // If form field validation fails
    return;
  } else {
    sendingEmail.value = true;
    expandSection.value = false;
    try {
      const token = useCookie("auth_token");
      const config = useRuntimeConfig();

      const fullUrl = route.fullPath;

      const response = await $fetch(
        `${config.public.apiBaseUrl}/users/verifyEmail/${user.value._id}`,
        {
          method: "POST",
          body: {
            email: formState.email,
            fullName: formState.firstName + " " + formState.lastName,
            url: fullUrl,
          },
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        }
      );
      console.log(response);
      if (response.sent) {
        sendingEmail.value = false;
        verificationSent.value = true;
      }
    } catch (error) {
      console.log(error);
    } finally {
      sendingEmail.value = false;
    }
  }
};

const expand = (sectionToExpandText) => {
  logInStore.clearError();
  if (sectionToExpandText == "verifyEmail") {
    if (user?.value.verifiedEmail) {
      return;
    }
  }
  sectionToExpand.value = sectionToExpandText;
  expandSection.value = true;
};

const computedPhoneNumber = computed(() => {
  if (user?.value?.phoneNumber) {
    if (user?.value?.phoneNumber.toString().startsWith("234")) {
      return "+" + user?.value?.phoneNumber.toString();
    } else {
      return "0" + user?.value?.phoneNumber.toString();
    }
  } else {
    return "NOT SET";
  }
});

onMounted(async () => {
  try {
    if (!user?.value || !loggedIn?.value) {
      const response = await userStore.fetchUserDetails();
      if (response == "no token") {
        await navigateTo("/login");
        return;
      }
      if (!loggedIn?.value) {
        await navigateTo("/login");
        return;
      }
    } else {
      loadingUser.value = false;
    }
    formState.firstName = user?.value?.firstName;
    formState.lastName = user?.value?.lastName;
    formState.phoneNumber = user?.value?.phoneNumber;
    formState.email = user?.value?.email;
  } catch (error) {
    console.log(error);
  } finally {
    loadingUser.value = false;
  }
});
</script>
