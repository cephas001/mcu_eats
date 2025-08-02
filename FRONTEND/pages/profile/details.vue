<template>
  <ProfilePageHeader
    text="General details"
    classList="mb-4 px-6 pt-8 pb-4"
    v-if="
      !loadingUser && !verificationSent && !updatingUser && !verificationNotSent
    "
  />

  <section
    class="relative min-h-[80vh] pb-5"
    v-if="!loadingUser && !sendingEmail && !updatingUser"
  >
    <!-- Name -->
    <ProfileDetailsCard
      text="Name"
      :subtext="user?.name"
      :edit="true"
      iconName="i-material-symbols-light-person-outline"
      @click="expand('name')"
    />
    <!-- Phone Number -->
    <ProfileDetailsCard
      text="Phone Number"
      :edit="true"
      :subtext="user?.phoneNumber"
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
    <!-- Status -->
    <ProfileDetailsCard
      text="Account status"
      :subtext="user?.status.toUpperCase()"
      iconName="i-material-symbols-account-box-outline"
    />

    <!-- Verification link success message -->
    <div
      class="bg-white absolute inset-0 px-6 flex text-center justify-center flex-col"
      v-if="verificationSent"
    >
      <p class="text-sm font-semibold mb-5 tracking-wide">Success</p>
      <div class="text-sm leading-5">
        A verification link has been sent to
        <span class="font-semibold">{{ loginForm.email }}</span>
        <p class="mt-2">Please click the link to verify your email address</p>
      </div>

      <button
        class="px-7 py-3 tracking-wide text-sm bg-primary rounded-2xl w-fit mx-auto mt-3 text-white"
        @click="verificationSent = false"
      >
        Ok
      </button>
    </div>

    <!-- Verification link failure -->
    <div
      class="bg-white absolute inset-0 px-6 flex text-center justify-center flex-col"
      v-if="verificationNotSent"
    >
      <p class="text-sm font-semibold mb-5 tracking-wide text-red-700">
        Failure
      </p>
      <p class="text-sm leading-5 px-4">
        Failed to send verification link. Please try again later.
      </p>

      <button
        class="px-5 py-3 tracking-wide text-sm bg-primary rounded-2xl w-fit mx-auto mt-3 text-white"
        @click="verificationNotSent = false"
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
    v-if="!updatingUser"
  >
    <template v-slot:formfields_name>
      <div>
        <FormField
          labelText="Name"
          placeholder="First"
          name="name"
          type="text"
          :state="registrationForm"
          @update="registrationForm.name = $event"
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
          :state="registrationForm"
          @update="registrationForm.phoneNumber = $event"
        />
      </div>
    </template>

    <template v-slot:formfields_verifyEmail>
      <div>
        <FormField
          labelText="Email"
          placeholder="Email"
          name="email"
          type="email"
          :state="loginForm"
          @update="loginForm.email = $event"
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
    :loading="sendingEmail || updatingUser"
    imageSrc="/Pulse@1x-1.0s-200px-200px.svg"
    class="animate-none"
  />
</template>

<script setup>
import { useUserStore } from "@/stores/userStore";
import { useLogInStore } from "@/stores/logInStore";
import { storeToRefs } from "pinia";

definePageMeta({
  middleware: ["check-user-and-profiles"],
});

const { $expressAuthBackendService } = useNuxtApp();

const route = useRoute();

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const { clearError, displayError } = useLogInStore();
const { registrationForm, loginForm } = useLogInStore();
const loadingUser = ref(true);
const updatingUser = ref(false);

const expandSection = ref(false);
const sectionToExpand = ref("");
const subSectionsList = ref([
  {
    title: "Edit name",
    name: "name",
    buttonText: "Change Name",
  },
  {
    title: "Phone Number",
    name: "phoneNumber",
    buttonText: "Change Phone Number",
  },
  {
    title: "Verify email",
    name: "verifyEmail",
    buttonText: "Send verification link",
  },
]);

const changeName = async () => {
  try {
    await userStore.updateUser(user.value.id, {
      ...user.value,
      name: registrationForm.name,
    });
    expandSection.value = false;
  } catch (error) {
    throw error;
  }
};

const changeNumber = async () => {
  try {
    await userStore.updateUser(user.value.id, {
      ...user.value,
      phoneNumber: registrationForm.phoneNumber,
    });
    expandSection.value = false;
  } catch (error) {
    throw error;
  }
};

const sendingEmail = ref(false);
const verificationSent = ref(false);
const verificationNotSent = ref(false);
const verifyEmail = async () => {
  sendingEmail.value = true;
  expandSection.value = false;
  try {
    const urlFrom = route.fullPath;
    const userId = user.value.id;
    const sent = await $expressAuthBackendService.verifyEmail(urlFrom, userId);
    if (!sent) {
      verificationNotSent.value = true;
      return;
    }
    verificationSent.value = true;
  } catch (error) {
    console.log(error);
  } finally {
    sendingEmail.value = false;
  }
};

const expand = (sectionToExpandText) => {
  clearError();
  if (sectionToExpandText == "verifyEmail") {
    if (user?.value.verifiedEmail) {
      return;
    }
  }
  sectionToExpand.value = sectionToExpandText;
  expandSection.value = true;
};

const submitForm = async (event) => {
  try {
    updatingUser.value = true;
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
  } catch (error) {
    console.log(error);
    if (error.type == "ValidationError") {
      if (error.errorList) {
        const { inputName, errorMessage } = error.errorList[0];
        displayError(errorMessage, inputName);
      } else {
        displayError(error.message, error.inputName);
      }

      return;
    }

    if (error.type == "UserExistenceError") {
      return await navigateTo("/auth/register");
    }

    if (error.type == "InvalidTokenError") {
      return await navigateTo("/auth/login");
    }

    if (error.type == "UnexpectedError") {
      console.log(error);
    }
  } finally {
    updatingUser.value = false;
  }
};

onMounted(async () => {
  try {
    loadingUser.value = true;
    const user = await userStore.getUser();

    registrationForm.name = user.name;
    registrationForm.phoneNumber = user.phoneNumber;
    loginForm.email = user.email;

    if (!user) {
      return await navigateTo("/");
    }
  } catch (error) {
    console.log(error);
    return await navigateTo("/");
  }

  loadingUser.value = false;
});
</script>
