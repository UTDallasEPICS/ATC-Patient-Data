<script setup lang="ts">
const route = useRoute();
console.log("route", route.params.id);
</script>

<template>
  <div>Profile of student {{ route.params.id }}</div>
</template>
