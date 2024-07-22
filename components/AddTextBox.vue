<script setup lang="ts">
import { defineProps, reactive } from 'vue';


const props = defineProps({
    sessionId: Number,
    showTextBox: Boolean,
});


const noteData = reactive({
    sessionId: props.sessionId,
    note: '',
});


async function putNote(noteData) {
await $fetch("/api/session/note",{
    method: "PUT",
    body: noteData
})
}


let showTextBox = false;


function saveNote() {
    // Call API to save noteData.note for the sessionId
    putNote({
        sessionId: props.sessionId,
        note: noteData.note,
    });
    showTextBox = false; // Hide the text box after saving
}


function cancelNote() {
    showTextBox = false; // Hide the text box without saving
}


</script>


<template>
<div v-if="showTextBox" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white p-6 rounded-lg w-3/4">
    <textarea
        class="w-full h-40 p-2 border rounded"
        placeholder="Enter your notes..."
        v-model.trim="noteData.note"
    ></textarea>
    <div class="flex justify-end mt-3">
        <button
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        @click="saveNote"
        >
        Save
        </button>
        <button
        class="ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
        @click="cancelNote"
        >
        Cancel
        </button>
    </div>
    </div>
</div>
</template>
