<template>
  <UModal
    v-model:open="showErrorModal"
    class="bg-white pb-4"
    title="An error occurred"
    :dismissible
    @close:prevent="emit('modalCloseAttempt')"
  >
    <template #content>
      <div class="px-5 py-10">
        <h1 class="mt-2 tracking-wide flex flex-col gap-2">
          <span
            >{{ action }} was successful, but an error occurred while trying to
            save your data locally.
          </span>
          <span>This might result in more frequent network calls.</span>
        </h1>
        <div class="mt-3 flex gap-2" v-if="showButtons">
          <button
            @click="emit('firstButtonClick')"
            class="bg-black text-white text-sm tracking-wider py-2 px-3 rounded-md"
          >
            {{ firstButtonText }}
          </button>
          <button
            @click="emit('secondButtonClick')"
            class="bg-black text-white text-sm tracking-wider p-2 rounded-md"
            v-if="showSecondButton"
          >
            {{ secondButtonText }}
          </button>
        </div>
      </div>
    </template>
  </UModal>
</template>

<script setup>
const emit = defineEmits([
  "firstButtonClick",
  "secondButtonClick",
  "modalCloseAttempt",
]);

const showErrorModal = true;

const props = defineProps({
  action: {
    type: String,
    required: true,
  },
  showSecondButton: {
    type: Boolean,
    default: true,
  },
  secondButtonText: {
    type: String,
    default: "Retry",
  },
  firstButtonText: {
    type: String,
    default: "Proceed",
  },
  showButtons: {
    type: Boolean,
    default: true,
  },
  dismissible: {
    type: Boolean,
    default: true,
  },
});
</script>
