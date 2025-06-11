<template>
  <section class="px-6 mt-6 mb-8">
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

  <section class="min-h-[80vh] pb-5" v-if="!loadingUser">
    <!-- Name -->
    <ProfileDetailsCard
      text="Name"
      :subtext="user.firstName + ' ' + user.lastName"
      :edit="true"
      iconName="i-material-symbols-light-person-outline"
      @click="expand('name')"
    />
    <!-- Username -->
    <ProfileDetailsCard
      text="Username"
      :subtext="user.username ? '@' + user.username : 'NOT SET'"
      iconName="i-material-symbols-light-person-outline"
    />
    <!-- Phone Number -->
    <ProfileDetailsCard
      text="Phone Number"
      :edit="true"
      :subtext="user.phoneNumber ? user.phoneNumber : 'NOT SET'"
      iconName="i-material-symbols-call"
      @click="expand('phoneNumber')"
    />
    <!-- Email -->
    <ProfileDetailsCard
      :text="user.verifiedEmail ? 'Email (verified)' : 'Email (unverified)'"
      :edit="true"
      :subtext="user.email"
      iconName="i-material-symbols-light-mail-outline"
      @click="expand('verifyEmail')"
    />
    <!-- Gender -->
    <ProfileDetailsCard
      text="Gender"
      :subtext="user.gender"
      iconName="i-material-symbols-supervisor-account-outline"
    />
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
              @update="additionalFormState.phoneNumber = $event"
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
</template>

<script setup>
import { useUserStore } from "@/stores/userStore";
import { navigateTo } from "nuxt/app";
import { useLogInStore } from "@/stores/logInStore";
import { storeToRefs } from "pinia";
import { useFormValidationMethods } from "@/composables/formValidation";

const {
  checkFormEmail,
  checkFormFirstName,
  checkFormLastName,
  checkPhoneNumber,
} = useFormValidationMethods();

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const logInStore = useLogInStore();
const { formState, additionalFormState } = useLogInStore();
const { error } = storeToRefs(logInStore);
const loadingUser = ref(true);

const expandSection = ref(false);

const firstNameToChange = ref("");
const lastNameToChange = ref("");
const numberToChange = ref("");
const emailToVerify = ref("");
const sectionToExpand = ref("");

const changeName = () => {
  checkFormFirstName();
  checkFormLastName();

  if (error.value.errorMessage !== "") {
    // If form field validation fails
    return;
  } else {
    console.log("submit");
  }
};
const changeNumber = () => {
  checkPhoneNumber();

  if (error.value.errorMessage !== "") {
    // If form field validation fails
    return;
  } else {
    console.log("submit");
  }
};
const verifyEmail = () => {
  checkFormEmail();

  if (error.value.errorMessage !== "") {
    // If form field validation fails
    return;
  } else {
    console.log("submit");
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

onMounted(async () => {
  try {
    if (user.value == {}) {
      await userStore.fetchUserDetails();
    } else {
      loadingUser.value = false;
    }
    formState.firstName = user?.value?.firstName;
    formState.lastName = user?.value?.lastName;
    formState.phoneNumber =
      "+234" + user?.value?.phoneNumber ? user?.value?.phoneNumber : "";
    formState.email = user?.value?.email;
  } catch (error) {
    console.log(error);
  } finally {
    loadingUser.value = false;
  }
});
</script>
