<template>
  <section
    class="absolute inset-0 h-0 transform font-manrope"
    @click.self="emitCloseSection"
    :class="[
      expandSection
        ? 'translate-y-0 opacity-100 h-[100vh] bg-black/20'
        : 'translate-y-20 opacity-0',
    ]"
  >
    <!-- Sub Section List -->
    <div v-for="section in subSectionsList" :key="section.title">
      <div
        v-if="sectionToExpand == section.name"
        class="bg-white pt-6 px-7 pb-4 flex flex-col absolute bottom-0 left-0 right-0"
      >
        <div class="w-full">
          <div class="mb-6" v-if="section.title">
            <h1
              class="text-center w-[100%] font-manrope font-bold tracking-wider"
            >
              {{ section.title }}
            </h1>
          </div>
          <form class="flex gap-3 flex-col">
            <slot :name="`formfields_${section.name}`"></slot>
            <div>
              <button
                class="bg-primary w-full rounded-md p-2 text-white"
                @click.prevent="handleAction"
              >
                {{ section.buttonText ? section.buttonText : "Change" }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { defineProps } from "vue";
const props = defineProps({
  expandSection: {
    type: Boolean,
    required: true,
  },
  subSectionsList: {
    type: Array,
    required: true,
  },
  sectionToExpand: {
    type: String,
  },
});

const emit = defineEmits(["closeSection", "formSubmitted"]);

const emitCloseSection = () => {
  emit("closeSection", true);
};
const handleAction = () => {
  emit("formSubmitted", props.sectionToExpand);
};
</script>
