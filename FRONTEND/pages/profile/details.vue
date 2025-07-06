<template>
  <ProfilePageHeader
    text="My details"
    classList="mb-4 px-6 pt-8 pb-4"
    v-if="!verificationSent"
  />

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
    <!-- Verification link success message -->
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

  <PopOverSection
    :expandSection
    :subSectionsList
    :sectionToExpand
    @closeSection="expandSection = false"
    @formSubmitted="submitForm"
  >
    <template v-slot:formfields_name>
      <div>
        <FormField
          labelText="First Name"
          placeholder="First"
          name="firstName"
          type="text"
          :state="formState"
          @update="formState.first = $event"
        />
      </div>
      <div>
        <FormField
          labelText="Last Name"
          placeholder="Last"
          name="lastName"
          type="text"
          :state="formState"
          @update="formState.last = $event"
        />
      </div>
    </template>

    <template v-slot:formfields_phoneNumber>
      <div>
        <FormField
          labelText="Phone Number"
          placeholder="Your Phone Number"
          name="phoneNumber"
          inputMode="numeric"
          type="text"
          :state="formState"
          @update="formState.phoneNumber = $event"
        />
      </div>
    </template>

    <template v-slot:formfields_verifyEmail>
      <div>
        <div class="mb-4">
          <label for="verifyEmail">Verify email address</label>
        </div>

        <FormField
          labelText="Email"
          placeholder="Email"
          name="email"
          type="email"
          :state="formState"
          @update="formState.email = $event"
        />
      </div>
    </template>
  </PopOverSection>

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
import { useCookie } from "nuxt/app";
import { useLogInStore } from "@/stores/logInStore";
import { storeToRefs } from "pinia";
import { useFormValidationMethods } from "@/composables/formValidation";
import { computed } from "vue";

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
const subSectionsList = ref([
  {
    title: "Edit name",
    name: "name",
  },
  {
    title: "Phone Number",
    name: "phoneNumber",
  },
  {
    title: "Verify email",
    name: "verifyEmail",
  },
]);

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

const submitForm = async (event) => {
  if (event == "name") {
    await changeName();
    return;
  }
  if (event == "phoneNumber") {
    await changeNumber();
    return;
  }
  if (event == "verifyEmail") {
    await verifyEmail();
    return;
  }
};

onMounted(async () => {
  try {
    if (!user?.value || !loggedIn?.value) {
      await userStore.fetchUserDetails(false, true);
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
