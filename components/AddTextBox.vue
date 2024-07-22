<script setup>
import { ref, defineProps, defineEmits, reactive, watch } from 'vue';
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";

const createNoteModalOpen = ref(false);

const props = defineProps({
  isOpen: Boolean,
  sessionId: Number,
});

const emit = defineEmits(["closeModal", "submit"]);

const noteData = reactive({
  sessionId: props.sessionId,
  note: '',
});

watch(noteData, () => {
  console.log("noteData", noteData);
});

async function putNote(noteData) {
  await $fetch("/api/session/note", {
    method: "PUT",
    body: noteData,
  });
}

function saveNote() {
  putNote({
    sessionId: props.sessionId,
    note: noteData.note,
  });
  createNoteModalOpen.value = false; // Hide the modal after saving
}

function cancelNote() {
  createNoteModalOpen.value = false; // Hide the modal without saving
}

function emitSubmit() {
  saveNote();
  emit('submit');
}

function emitClose() {
  cancelNote();
  emit('closeModal');
}

</script>


<template>
    <TransitionRoot appear :show="isOpen" as="template">
      <Dialog as="div" @close="emitClose" class="relative z-10">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/25" />
        </TransitionChild>
        <div class="fixed inset-0">
          <div class="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel class="w-full max-w-md transform rounded bg-white p-6 text-left transition-all">
                <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                  Create Note
                </DialogTitle>
                <div>
                  <label>Note</label>
                  <textarea v-model="noteData.note" class="w-full mt-2 p-2 border border-gray-300 rounded-md" />
                </div>
                <div class="flex w-full p-3 justify-center">
                  <button
                    type="button"
                    class="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                    @click="emitSubmit"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    class="ml-2 inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                    @click="emitClose"
                  >
                    Cancel
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </template>