console.log(this.$route)

<script setup>
//test
const route = useRoute();
const queryParams = route.query;
const studentId = queryParams.id;
const { data: student } = await useFetch('/api/user/StudentProfile.get.ts', { query: { studentId: studentId }});

</script>





<template>
<h3>Student Profile Page</h3>

<div> {{ props }} </div>

<!--test-->
<div>
    {{ student }} 
</div>


</template>
  