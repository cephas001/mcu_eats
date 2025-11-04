<template>
  <UModal
    v-model:open="showWarningModal"
    :close="false"
    :title="`${warningModalTitle || 'Warning'}`"
    :ui="{
      content: 'bg-white text-black font-manrope',
      title: 'text-red-700  text-sm font-manrope font-bold tracking-wide',
      description: 'text-black',
    }"
  >
    <template #body>
      <div class="">
        <p class="leading-relaxed tracking-wide text-md">
          {{
            text ||
            "This action may not be reversible. Please confirm before proceeding."
          }}
        </p>
      </div></template
    >

    <template #footer>
      <div class="flex justify-end gap-2">
        <UButton
          color="neutral"
          label="Cancel"
          @click="closeWarningModalAndEmit"
          class="px-5 py-2 rounded-lg border border-black bg-gray-200 text-black hover:bg-[#F0F0EB] transition-all duration-200 font-manrope tracking-wide"
        />
        <UButton
          label="Proceed"
          @click="executeAction"
          class="px-5 py-2 rounded-lg text-white font-medium shadow-md hover:shadow-lg transition-all duration-200 bg-[#9F7240] hover:bg-[#8C6438] font-manrope tracking-wide"
        />
      </div>
    </template>
  </UModal>
</template>

<script setup>
import { useGlobalStore } from "@/stores/globalStore";
import { ref } from "vue";

const emit = defineEmits(["proceed"]);

const globalStore = useGlobalStore();
const { closeWarningModal } = globalStore;
const { showWarningModal, warningModalTitle } = storeToRefs(globalStore);

const props = defineProps({
  text: {
    type: String,
  },
  action: {
    type: Function,
  },
});

const closeWarningModalAndEmit = () => {
  closeWarningModal();
  emit("close", true);
};

const executeAction = async () => {
  closeWarningModal();
  await props.action();
};
</script>
