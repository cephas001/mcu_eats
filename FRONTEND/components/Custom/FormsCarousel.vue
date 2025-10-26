<template>
  <UCarousel ref="carousel" v-slot="{ item, index }" :items="formFieldsSchemas">
    <CustomForm
      :formFieldsSchema="item"
      :formState="correspondingFormStates[index]"
      @formSubmit="checkIndexAndEmit(index)"
      :submitButtonText="correspondingSubmitButtonTexts[index]"
    />
    <SubmitButton
      @click="goToPrevious"
      v-if="!hideBackButton || index > 0"
      text="Back"
    />
  </UCarousel>
</template>

<script setup>
// This component is a simple wrapper around a carousel of forms.
// It accepts an array of form schemas and corresponding form states and manages the navigation between them.

const carousel = useTemplateRef("carousel");
const activeIndex = ref(0);

const onClickPrev = () => {
  activeIndex.value--;
};

const onClickNext = () => {
  activeIndex.value++;
};

const select = (index) => {
  activeIndex.value = index;

  carousel.value?.emblaApi?.scrollTo(index);
};

const goToPrevious = () => {
  if (activeIndex.value > 0) {
    onClickPrev();
    select(activeIndex.value);
  }
};

const props = defineProps({
  formFieldsSchemas: {
    type: Array,
    required: true,
  },
  correspondingFormStates: {
    type: Array,
    required: true,
  },
  correspondingSubmitButtonTexts: {
    type: Array,
    required: false,
    default: () => [],
  },
  defaultSubmitBehaviour: {
    type: Boolean,
    default: true,
  },
  hideBackButton: {
    type: Boolean,
    default: false,
  },
});

const goToNext = () => {
  if (activeIndex.value < props.formFieldsSchemas.length - 1) {
    onClickNext();
    select(activeIndex.value);
  }
};

const checkIndexAndEmit = (index) => {
  if (!props.defaultSubmitBehaviour) {
    emits("formSubmit", index);
  }

  if (index == props.formFieldsSchemas.length - 1) {
    emits("formSubmit", index);
  } else {
    goToNext();
  }
};

const emits = defineEmits(["formSubmit"]);
</script>
