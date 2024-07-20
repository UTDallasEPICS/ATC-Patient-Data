<script setup>
import { ArrowLeftIcon } from "@heroicons/vue/24/outline";

const route = useRoute();
const studentId = route.params.studentId;
const sessionId = route.params.sessionId;
const searchTerm = ref("");

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
console.log("currSessionDate", currSessionDate);

console.log("behaviors in session", behaviors);

console.log("student in session", student);

console.log("currSession in session", currSession);

function navigateBack() {
  navigateTo({ path: "/students/student-profile/" + studentId });
}
</script>

<template>
  <div class="flex flex-col p-3">
    <div class="flex justify-start items-center">
      <button
        class="p-2 rounded text-gray-400 border-2 hover:border-black hover:text-black"
        @click="navigateBack"
      >
        <ArrowLeftIcon class="h-6 w-6" />
      </button>
      <h1 class="text-2xl font-semibold ml-3 space-x-2">
        <span>{{ student && student.data.value.firstName }}</span>
        <span>{{ student && student.data.value.lastName }}</span>
        <span class="font-thin">{{ currSessionDate }}</span>
      </h1>
    </div>
    <div
      class="m-3 p-3 rounded border-2 border-gray-900 h-[calc(100vh-11rem)] overflow-auto"
    >
      <input
        class="border rounded grow p-2 m-2 shadow text-center hover:border-gray-500 focus:bg-gray-100 outline-none focus:border-gray-700 w-[calc(100%-1.5rem)]"
        placeholder="Search Behaviors"
        v-model.trim="searchTerm"
      />
      <details
        class="p-2 rounded border bg-gray-200 m-3"
        v-for="behavior in behaviors.data.value.body"
        :key="behavior.id"
      >
        <summary>
          <div
            class="flex flex-col border rounded border-gray-100 bg-gray-100 p-2 overflow-auto max-h-[5rem]"
          >
            <span>{{ behavior.title }}</span>
            <span>{{ behavior.desc }}</span>
          </div>
        </summary>
        <div
          class="flex p-3 mt-2 rounded border-2 border-gray-200 bg-gray-500 text-white overflow-auto max-h-80"
        >
          asdfadfafd
        </div>
      </details>
    </div>
  </div>
</template>
