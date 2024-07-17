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

</script>

<template>
  <div>Profile of student {{ route.params.id }}</div>
</template>
