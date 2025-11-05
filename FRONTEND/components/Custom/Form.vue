<template>
  <UForm :class="`mb-2 flex flex-col gap-3 ${classList}`" :state="formState">
    <div v-for="formField in formFieldsSchema" :key="formField.name">
      <FormField
        :labelText="formField.label"
        :placeholder="formField.placeholder"
        :name="formField.name"
        :type="formField.type"
        :inputMode="formField.inputMode"
        :state="formState"
        :items="formState[formField.listVariableName]"
        :fileUpload="formField.fileUpload"
        :acceptFormats="formField.acceptFormats"
        :description="formField.description"
        :required="formField.required"
        :trailingIcon="formField.trailingIcon"
        :showLabelText="formField.showLabelText"
        @update="formState[formField.valueVariableName] = $event"
        v-if="
          !formField.dependentFieldName ||
          formState[formField.dependentFieldName]
        "
      />
    </div>

    <SubmitButton
      @click="emits('formSubmit', true)"
      :text="submitButtonText"
      v-if="!hideSubmitButton"
    />
  </UForm>
</template>

<script setup>
const emits = defineEmits(["formSubmit"]);

const props = defineProps({
  formFieldsSchema: {
    type: Array,
    required: true,
  },
  formState: {
    type: Object,
    required: true,
  },
  submitButtonText: {
    type: String,
  },
  classList: {
    type: String,
    default: "",
  },
  hideSubmitButton: {
    type: Boolean,
    default: false,
  },
});
</script>
