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

const openSession = ref(false);
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
  <button
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    @click="toggleOpenSession"
  >
    Sessions
  </button>
  <button
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    @click="toggleOpenProgram"
  >
    Program
  </button>
  <Session v-if="openSession" />
  <Program v-if="openProgram" />
</template>
