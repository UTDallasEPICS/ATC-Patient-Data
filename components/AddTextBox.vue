<script setup lang="ts">
import { reactive, ref } from 'vue';

// Define props
const props = defineProps({
    sessionId: Number
});

// Reactive state for note data
const noteData = reactive({
    note: "",
}) as {
    note: string;
};

// State to control the visibility of the modal
const showModal = ref(false);

// Function to open the modal
function openModal() {
    showModal.value = true;
}

// Function to close the modal
function closeModal() {
    showModal.value = false;
    noteData.note = ""; // Reset the note text
}

// Function to save the note
async function saveNote() {
    try {
        await $fetch("/api/session/note", {
            method: "PUT",
            body: noteData
        });
        console.log("Note saved:", noteData.note);
        closeModal();
    } catch (error) {
        console.error("Error saving note:", error);
    }
}
</script>

<template>
  <div class="flex flex-col p-3">
    <div class="flex items-center">
      <!-- Existing buttons and functionality -->
    </div>
    <div
      class="mt-3 p-3 rounded border-2 border-gray-900 h-[calc(100vh-11rem)] overflow-auto"
    >
      <div class="flex">
        <input
          class="border rounded grow p-2 m-2 shadow text-center hover:border-gray-500 focus:bg-gray-100 outline-none focus:border-gray-700 w-[calc(100%-1.5rem)]"
          placeholder="Search Behaviors"
          v-model.trim="searchTerm"
        />
        <button
          class="uppercase font-semibold rounded border border-gray-900 p-3 hover:bg-gray-200 focus:bg-gray-300"
          @click="openModal"
        >
          Add Notes
        </button>
      </div>
      <details
        class="p-2 rounded border bg-gray-200 m-3 cursor-default"
        v-for="behavior in behaviors.data.value.body"
        :key="behavior.id"
        :open="toggleAll"
      >
        <summary class="cursor-pointer">
          <div
            class="flex flex-col border rounded border-gray-100 bg-gray-100 p-2 overflow-auto max-h-[5rem]"
          >
            <span>{{ behavior.title }}</span>
            <span>{{ behavior.desc }}</span>
          </div>
        </summary>
        <SessionData
          :type="behavior.type"
          :array-count="behavior.arrayCount"
          class="flex p-3 mt-2 rounded border-2 border-gray-200 bg-gray-500 text-white overflow-auto max-h-80"
        />
      </details>
      <div v-if="behaviors.data.value.body.length === 0">
        <div
          class="flex p-3 border-2 justify-center items-center m-2 bg-gray-100 rounded"
        >
          <h1 class="">No Behaviors Found</h1>
        </div>
      </div>
    </div>
    <!-- Modal for adding notes -->
    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-6 rounded shadow-md w-1/3">
        <h2 class="text-xl font-semibold mb-4">Add Note</h2>
        <textarea v-model="noteData.note" class="w-full p-2 border rounded" rows="5"></textarea>
        <div class="flex justify-end mt-4">
          <button @click="closeModal" class="px-4 py-2 bg-gray-200 rounded mr-2">Cancel</button>
          <button @click="saveNote" class="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>
