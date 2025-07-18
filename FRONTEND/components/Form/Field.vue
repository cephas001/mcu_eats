<template>
  <UFormField required>
    <label class="font-manrope font-semibold" v-if="labelText">{{
      labelText
    }}</label>

    <UInput
      v-if="type !== 'select'"
      :placeholder
      :name="name.trim()"
      :trailing-icon="trailingIcon"
      variant="outline"
      :ui="{ base: 'bg-transparent text-black p-4' }"
      :class="`mt-1 w-full focus:bg-transparent ${inputClassList}`"
      :type="computedType"
      v-model="state[`${name}`]"
      validate-on="change"
      :maxlength="maxLength"
      :inputmode="inputMode"
      @input="updateValue"
      @change="clearError"
    >
      <template
        #trailing
        v-if="name == 'password' || name == 'confirmPassword'"
      >
        <UButton
          color="primary"
          variant="link"
          size="md"
          :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
          :aria-label="showPassword ? 'Hide password' : 'Show password'"
          :aria-pressed="showPassword"
          aria-controls="password"
          @click="showPassword = !showPassword"
        /> </template
    ></UInput>
    <USelect
      v-model="state[`${name}`]"
      v-if="type == 'select'"
      :items="items"
      :placeholder
      :name="name.trim()"
      variant="outline"
      :ui="{ base: 'bg-transparent text-black p-4' }"
      class="mt-1 w-full focus:bg-transparent"
      validate-on="change"
      @change="updateValue"
    ></USelect>
    <FormErrorMessage
      :errorMessage="error.errorMessage"
      :errorList="error.errorList"
      v-if="error.inputName == name"
    />
  </UFormField>
</template>

<script setup>
import { defineProps, defineEmits, computed } from "vue";
import { useLogInStore } from "@/stores/logInStore";

const { clearError } = useLogInStore();
const logInStore = useLogInStore();

const { error } = storeToRefs(logInStore);

const showPassword = ref(false);

const props = defineProps({
  placeholder: {
    type: String,
  },
  labelText: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
  },
  state: {
    type: Object,
  },
  items: {
    type: Array,
    required: false,
  },
  trailingIcon: {
    type: String,
    default: "",
  },
  maxLength: {
    type: String,
    default: "524288",
  },
  inputMode: {
    type: String,
    default: "",
  },
  inputClassList: {
    type: String,
    default: "",
  },
});

const computedType = computed(() => {
  // Toggles showing the password for password fields and renders other types
  if (props.type == "password") {
    if (showPassword.value) {
      return "text";
    } else {
      return props.type;
    }
  } else {
    return props.type;
  }
});

const emit = defineEmits(["update"]);

// Clears an error on input entry and updates the value of the formfield in state
const updateValue = (event) => {
  if (props.name == "cardExpiryDate") {
    let value = event.target.value.replace(/[^0-9]/g, "");
    // Format as MM/YY
    if (value.length > 2) {
      value = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
    }
    event.target.value = value;
    emit("update", value);
    return;
  }
  const value =
    props.type == "select" ? props.state[`${props.name}`] : event.target.value;
  if (props.type !== "select") {
    event.target.value = value;
  }
  clearError();
  emit("update", value);
};
</script>
