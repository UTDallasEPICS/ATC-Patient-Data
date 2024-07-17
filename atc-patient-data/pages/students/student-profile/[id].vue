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

const toggle = ref(false);

function togg() {
  toggle.value = !toggle.value;
}
</script>

<template>
  <!-- <div>Profile of student {{ route.params.id }}</div> -->
  <button
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    @click="togg"
  >
    Sessions
  </button>
  <button
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    @click="togg"
  >
    Program
  </button>
  <Session v-if="!toggle" />
  <Program v-if="toggle" />
</template>
