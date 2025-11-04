import { defineStore } from "pinia";
import { ref } from "vue";

export const useGlobalStore = defineStore("global", () => {
  const showWarningModal = ref(false);
  const warningModalText = ref("");
  const warningModalTitle = ref("");

  const toggleWarningModal = () => {
    showWarningModal.value = !showWarningModal.value;
  };

  const closeWarningModal = () => {
    showWarningModal.value = false;
  };

  const openWarningModal = () => {
    showWarningModal.value = true;
  };

  const setWarningModalText = (text) => {
    warningModalText.value = text;
  };

  const setWarningModalTitle = (title) => {
    warningModalTitle.value = title;
  };

  return {
    showWarningModal,
    toggleWarningModal,
    closeWarningModal,
    openWarningModal,
    warningModalText,
    setWarningModalText,
    warningModalTitle,
    setWarningModalTitle,
  };
});
