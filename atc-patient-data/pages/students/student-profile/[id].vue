<script setup lang="ts">
const route = useRoute();
console.log("route", route.params.id);

/*
  Import two compoents (create two files inside of components folder)
    1. sessions
      a. pass id
        i. api for getting student's sessions
    2. program
      a. pass id
        i. api for getting student's behaviors

*/

const user = useFetch(`/api/user/get/student/${route.params.id}`);

const openSession = ref(true);
const openProgram = ref(false);

function toggleOpenSession() {
  openSession.value = true;
  openProgram.value = false;
}

function toggleOpenProgram() {
  openSession.value = false;
  openProgram.value = true;
}
</script>

<template>
  <!-- <div>Profile of student {{ route.params.id }}</div> -->
  <div class="flex flex-col h-[calc(100vh-5rem)] p-2">
    <div class="flex space-x-1 border border-black rounded-t-lg bg-gray-300">
      <button
        class="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-t-lg"
        @click="toggleOpenSession"
      >
        Sessions
      </button>
      <button
        class="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-t-lg"
        @click="toggleOpenProgram"
      >
        Program
      </button>
    </div>
    <div class="h-full border border-black rounded-b-lg">
      <Session v-if="openSession" />
      <Program v-if="openProgram" />
    </div>
  </div>
</template>
