<script setup>
import {
  ArrowLeftIcon,
  ChevronDoubleDownIcon,
} from "@heroicons/vue/24/outline";

const showTextBox = ref(false)

const route = useRoute();
const studentId = route.params.studentId;
const sessionId = route.params.sessionId;
const searchTerm = ref("");
const toggleAll = ref(false);
const createNoteModalOpen = ref(false);

function openModal() {
  createNoteModalOpen.value = true;
  console.log("modal opened");
}

function closeModal() {
  createNoteModalOpen.value = false;
  console.log("modal closed");
}

const student = await useFetch("/api/user/get/student", {
  query: {
    id: studentId,
  },
});

const behaviors = await useFetch("/api/behavior/get/plural", {
  query: {
    id: studentId,
    searchTerm: searchTerm,
    archived: false,
  },
});

const currSession = await useFetch("/api/session/singular/retrieve", {
  query: {
    sessionId: sessionId,
  },
});

const currSessionDate = new Date(
  currSession.data.value.body.createdAt
).toDateString();
const currSessionTime = new Date(
  currSession.data.value.body.createdAt
).toLocaleTimeString();
console.log("currSessionDate", currSessionDate);


console.log("behaviors in session", behaviors);


console.log("student in session", student);


console.log("currSession in session", currSession);


function navigateBack() {
  navigateTo({ path: "/students/student-profile/" + studentId });
}


function toggleAllBehaviors() {
  toggleAll.value = !toggleAll.value;
}


watch(searchTerm, (newVal) => {
  console.log("behaviors", behaviors);
});
</script>

<template>
  <div class="flex flex-col p-3">
    <div class="flex items-center">
      <button
        class="p-2 rounded text-gray-400 border-2 hover:border-black hover:text-black"
        @click="navigateBack"
      >
        <ArrowLeftIcon class="h-6 w-6" />
      </button>
      <div class="flex items-center justify-between w-full">
        <h1 class="text-2xl font-semibold ml-3 space-x-2">
          <span>{{ student && student.data.value.firstName }}</span>
          <span>{{ student && student.data.value.lastName }}</span>
          <span class="font-thin">
            {{ currSessionDate }} - {{ currSessionTime }}
          </span>
        </h1>
        <button
          v-if="!toggleAll"
          class="p-2 rounded text-gray-400 border-2 hover:border-black hover:text-black"
          @click="toggleAllBehaviors"
        >
          <ChevronDoubleDownIcon class="h-6 w-6" />
        </button>
        <button
          v-else
          class="p-2 rounded text-gray-400 border-2 hover:border-black hover:text-black"
          @click="toggleAllBehaviors"
        >
          <ChevronDoubleDownIcon class="h-6 w-6 transform rotate-180" />
        </button>
      </div>
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
        <button v-on:click="openModal" title="Add Note">
          <div class="border p-2 rounded hover:border-gray-500 hover:bg-gray-100">
            <PlusCircleIcon class="h-6 w-6" />
          </div>
        </button>
        <AddTextBox
          :isOpen="createNoteModalOpen"
          :sessionId="sessionId"
          @close-modal="closeModal"
        />
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
  </div>
</template>


