<script setup>
import {
  ArrowLeftIcon,
  ChevronDoubleDownIcon,
  PencilSquareIcon,
  XMarkIcon,
} from "@heroicons/vue/24/outline";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";

// const showTextBox = ref(false)

const route = useRoute();
const studentId = route.params.studentId;
const sessionId = route.params.sessionId;
const searchTerm = ref("");
const toggleAll = ref(false);
const save = ref(0); // just increment to emit saveData from all behaviors
const submit = ref(false);
const noteModalOpen = ref(false);

const student = await useFetch("/api/user/get/student", {
  query: {
    id: studentId,
  },
});

const retrievedNote = await useFetch("/api/session/get/note", {
  query: {
    sessionId: sessionId,
  },
});
const localNote = ref(retrievedNote.data.value.body.note);

const noteData = reactive({
  sessionId: sessionId,
  note: localNote,
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

function navigateBack() {
  navigateTo({ path: "/students/student-profile/" + studentId });
}

function toggleAllBehaviors() {
  toggleAll.value = !toggleAll.value;
}

async function saveData(behaviorID, sessionID, data) {
  // console.log(
  //   "Behavior ID:",
  //   behaviorId,
  //   "Session ID:",
  //   sessionId,
  //   "Data:",
  //   data,
  //   "Do Submit:",
  //   doSubmit
  // );
  console.log("-----------------");
  console.log("behaviorId:", behaviorID);
  console.log("sessionId:", sessionID);
  console.log("data:", data);
  console.log("-----------------");
  await $fetch("/api/behavior-data/save", {
    method: "PUT",
    body: {
      behaviorID: Number(behaviorID),
      sessionID: Number(sessionID),
      data,
    },
  });
}

function openNoteModal() {
  retrievedNote.refresh();
  localNote.value = retrievedNote.data.value.body.note;
  noteModalOpen.value = true;
}

function closeNoteModal() {
  noteModalOpen.value = false;
  retrievedNote.refresh();
  localNote.value = retrievedNote.data.value.body.note;
}

async function saveNote() {
  await $fetch("/api/session/put/note", {
    method: "PUT",
    body: noteData,
  });
  closeNoteModal();
}
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
        <button v-on:click="openNoteModal" title="Add Note">
          <div
            class="flex border p-2 space-x-2 font-thin hover:font-semibold rounded hover:border-gray-500 hover:bg-gray-100"
          >
            <span class="uppercase">Note</span>
            <PencilSquareIcon class="w-6 h-6" />
          </div>
        </button>
        <div>
          <TransitionRoot appear :show="noteModalOpen" as="template">
            <Dialog as="div" @close="closeNoteModal" class="relative z-10">
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
                <div
                  class="flex min-h-full items-center justify-center p-4 text-center"
                >
                  <TransitionChild
                    as="template"
                    enter="duration-300 ease-out"
                    enter-from="opacity-0 scale-95"
                    enter-to="opacity-100 scale-100"
                    leave="duration-200 ease-in"
                    leave-from="opacity-100 scale-100"
                    leave-to="opacity-0 scale-95"
                  >
                    <DialogPanel
                      class="w-full max-w-md transform rounded bg-white p-6 text-left transition-all"
                    >
                      <div class="flex w-full justify-between items-center">
                        <DialogTitle
                          as="h3"
                          class="text-lg font-medium leading-6 text-gray-900"
                        >
                          Note
                        </DialogTitle>
                        <button @click="closeNoteModal">
                          <div
                            class="border p-2 rounded hover:border-gray-500 hover:bg-gray-100"
                          >
                            <XMarkIcon class="h-6 w-6" />
                          </div>
                        </button>
                      </div>
                      <div>
                        <textarea
                          v-model="localNote"
                          class="min-h-80 w-full mt-2 p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div class="flex w-full p-3 justify-center">
                        <button
                          type="button"
                          class="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                          @click="saveNote"
                        >
                          Save
                        </button>
                      </div>
                    </DialogPanel>
                  </TransitionChild>
                </div>
              </div>
            </Dialog>
          </TransitionRoot>
        </div>
      </div>
      <div class="lg:grid lg:grid-cols-2 lg:gap-3">
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
            :sessionID="Number(sessionId)"
            :behaviorID="Number(behavior.id)"
            :type="behavior.type"
            :array-count="Number(behavior.arrayCount)"
            :doSave="Number(save)"
            class="flex p-3 mt-2 rounded border-2 border-gray-200 bg-gray-500 text-white overflow-auto max-h-80"
            @saveData="(data) => saveData(behavior.id, sessionId, data)"
          />
        </details>
      </div>
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
