<template>
  <ProfilePageHeader text="Addresses" />

  <!-- Selected Address -->
  <section class="mt-5">
    <div class="px-6 flex items-center justify-between">
      <h1 class="font-bold font-manrope text-sm">Selected Address</h1>
      <p class="text-green-700 text-sm" @click="expandSection = true">Change</p>
    </div>

    <AddressDetailsCard
      :tag="selectedAddress?.tag"
      :address="selectedAddress?.address"
      :showSelected="false"
      :showEdit="false"
      classList="px-6 py-4 border-y-1 border-y-gray-300 mt-5"
    />
  </section>

  <!-- Saved Addresses -->
  <section class="mt-5 min-h-[60vh]">
    <div
      class="px-6 flex items-center justify-between pb-4 border-b-1 border-b-gray-300"
    >
      <h1 class="font-bold font-manrope text-sm">Saved Addresses</h1>
    </div>
    <div v-for="address in totalSavedAddresses" :key="address._id">
      <AddressDetailsCard
        :tag="address.tag"
        :address="address.address"
        classList="px-6 py-4 border-b-1 border-b-gray-300 "
        :iconName="
          address.tag == 'College'
            ? 'i-material-symbols-school-outline-rounded'
            : 'i-material-symbols-location-on-outline-rounded'
        "
        :showSelected="false"
      />
    </div>
  </section>

  <PopOverSection
    :expandSection
    :subSectionsList
    :sectionToExpand
    @closeSection="expandSection = false"
    @formSubmitted=""
  >
    <template v-slot:formfields_address>
      <div class="flex items-center bg-gray-200 w-full rounded-full mb-2">
        <ToggleButton
          text="Delivery"
          :selectedOption
          @update:selectedOption="selectedOption = $event"
        />

        <ToggleButton
          text="Pick-up"
          :selectedOption
          @update:selectedOption="selectedOption = $event"
        />
      </div>

      <div
        class="flex items-center py-3 border-y border-gray-200 font-manrope font-bold text-green-800"
      >
        <UIcon name="i-material-symbols-add-2" class="text-lg mr-2" />
        <button class="tracking-wider text-sm">New address</button>
      </div>
      <div v-for="address in filteredAddresses" :key="address._id">
        <AddressDetailsCard
          :tag="address.tag"
          :address="address.address"
          classList=" border-b-1 border-b-gray-300 "
          :iconName="
            address.tag == 'College'
              ? 'i-material-symbols-school-outline-rounded'
              : 'i-material-symbols-location-on-outline-rounded'
          "
          :showEdit="false"
          :showSelected="address.address ? true : false"
        />
      </div>
    </template>
  </PopOverSection>

  <LoadingIconLarge
    :loading="loadingUser"
    imageSrc="/Pulse@1x-1.0s-200px-200px.svg"
    class="animate-none"
  />

  <UModal v-model:open="open" class="bg-white pb-4" title="Action Required">
    <!-- Form to add new address -->
    <template #content v-if="false">
      <div class="px-5 py-10">
        <div>
          <FormField
            labelText="Address"
            placeholder="Address"
            name="address"
            type="text"
            :state="addressFormState"
            @update="addressFormState.address = $event"
          />
        </div>
        <button
          class="text-white rounded-md p-3 mt-3 w-full text-center text-md bg-primary"
        >
          Add
        </button>
      </div>
    </template>

    <!-- Form to change Room Number and Hostel -->
    <template #content v-if="showEditHostelModal">
      <div class="px-5 py-10">
        <!-- HOSTEL SELECT FIELD -->
        <div class="mb-3">
          <FormField
            labelText="Hostel"
            name="hostel"
            type="select"
            :state="additionalFormState"
            :items="additionalFormState.hostelList"
            @update="additionalFormState.hostelValue = $event"
          />
        </div>
        <!-- ROOM NUMBER FIELD -->
        <div>
          <FormField
            labelText="Room number"
            placeholder="Your Room Number"
            name="roomNumber"
            type="number"
            inputMode="numeric"
            :state="additionalFormState"
            @update="additionalFormState.roomNumber = $event"
          />
        </div>
        <button
          class="text-white rounded-md p-3 mt-3 w-full text-center text-md bg-primary"
          @click="changeHostelDetails"
        >
          Add
        </button>
      </div>
    </template>
  </UModal>
</template>

<script setup>
import { useUserStore } from "@/stores/userStore";
import { onMounted } from "vue";
import { useLogInStore } from "@/stores/logInStore";
import { useFormValidationMethods } from "@/composables/formValidation";

definePageMeta({
  middleware: ["check-user-and-profiles"],
  specificType: ["consumer", "vendor"],
});

const userStore = useUserStore();
const { addressFormState } = userStore;
const { user, loggedIn } = storeToRefs(userStore);

const loadingUser = ref(true);
const totalSavedAddresses = ref([]);
const selectedAddress = useLocalStorage("selectedAddress", ref({}));
const filteredAddresses = computed(() => {
  return totalSavedAddresses.value.filter((address) => {
    if (address._id == selectedAddress.value._id) {
      return false;
    } else {
      return true;
    }
  });
});

const { additionalFormState } = useLogInStore();

const { checkRoomNumber } = useFormValidationMethods();

const expandSection = ref(false);
const sectionToExpand = ref("address");
const subSectionsList = ref([
  {
    name: "address",
    buttonText: "Confirm",
  },
]);

const showEditHostelModal = ref(false);
const showAddAddressModal = ref(false);

const open = ref(false);

const selectedOption = ref("Delivery");

// TO EDIT ROOM NUMBER AND HOSTEL, PUT REQUEST TO USER ROOM NUMBER AND HOSTEL FIELD
const changeHostelDetails = async () => {
  checkRoomNumber();
  if (error.value.errorMessage !== "") {
    // If form field validation fails
    return;
  } else {
    await userStore.updateUser({
      roomNumber: additionalFormState.roomNumber,
      hostel: additionalFormState.hostelValue,
    });
  }
};

// TO EDIT/ADD ANY OTHER FIELD, PUT REQUEST TO USER ADDRESSES/TAG/ADDRESS
const addAddress = async (tag, address) => {
  try {
    const token = useCookie("auth_token");
    const config = useRuntimeConfig();
    if (token.value || user?.value) {
      const response = await $fetch(
        `${config.public.apiBaseUrl}/users/${user.value._id}`,
        {
          method: "PUT",
          body: {
            addresses: [...user.value.addresses, { tag, address }],
          },
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        }
      );
      if (response.update) {
        userStore.setUser(response.user);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteAddress = async (address) => {
  try {
    const token = useCookie("auth_token");
    const config = useRuntimeConfig();
    if (token.value || user?.value) {
      const response = await $fetch(
        `${config.public.apiBaseUrl}/users/${user.value._id}`,
        {
          method: "PUT",
          body: {
            removeAddress: true,
            addressId: address._id,
          },
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        }
      );
      if (response.update) {
        userStore.setUser(response.user);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const editAddress = async (address, newAddressText) => {
  try {
    const token = useCookie("auth_token");
    const config = useRuntimeConfig();

    const updatedAddresses = user.value.addresses.map((Maddress) => {
      if (Maddress._id == address._id) {
        return { ...Maddress, address: newAddressText };
      } else {
        return { ...Maddress };
      }
    });

    if (token.value || user?.value) {
      const response = await $fetch(
        `${config.public.apiBaseUrl}/users/${user.value._id}`,
        {
          method: "PUT",
          body: {
            addresses: [updatedAddresses],
          },
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        }
      );
      if (response.update) {
        userStore.setUser(response.user);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

// TO ADD A NEW ADDRESS, PUT REQUEST TO USER ADDRESSES/'OTHER'/ADDRESS

onMounted(async () => {
  totalSavedAddresses.value = [
    { id: "1", tag: "Current Location", address: "Abula Spot" },
    {
      id: "2",
      tag: "Hostel",
      address: `${user?.value.hostel}, Room ${user?.value.roomNumber}`,
    },
    ...user?.value.addresses,
  ];
  selectedAddress.value = totalSavedAddresses.value[0];
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
});
</script>
