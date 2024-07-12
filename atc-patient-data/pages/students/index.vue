<script setup>

const employeeId = 1;
const employeeRole = 'Admin'; // update to get if the users is admin - TESTING - TESTING - TESTING

const studentId = null;
const studentFirst = '';
const studentLast = '';

const { data: allUsers } = await useFetch('/api/user/StudentSearchAll?employeeId=1'); // update to be the to have correct query parameters - TESTING - TESTING - TESTING

function createStudentClick() {
    window.location.href = "http://localhost:3000/students"; // update to go to create student - TESTING - TESTING - TESTING
}

function viewStudentClick(id) {
    window.location.href = "http://localhost:3000/students"; // update to go to selected student - TESTING - TESTING - TESTING
}

function onSubmit(){

}

</script>



<template>
    <!-- create user student button -->
    <div v-if="employeeRole=='Admin'">
      <button
      title="Create Student"
      @click="createStudentClick()"
      >
        Create Student
      </button>
    </div>
  
    <!-- search by id -->
    <div v-if="studentFirst=='' && studentLast==''">
      <!-- form -->
      <form class="search-form" @submit.prevent="onSubmit">
        <h3>Search Students by ID</h3>

        <label for="id">ID</label>
        <input id="id" v-model.trim="studentId">

        <button type="submit" title="Search">
          Search
        </button>
      </form>

      <!-- StudentSearchId api -->

      <!-- display result (button) -->
    </div>
  
    <!-- search by name -->
    <div v-if="studentId==null">
      <!-- form --> 
      <form class="search-form" @submit.prevent="onSubmit">
        <h3>Search Students by Name</h3>

        <label for="first-name">First Name</label>
        <input id="first-name" v-model.trim="studentFirst">

        <label for="last-name">First Name</label>
        <input id="last-name" v-model.trim="studentLast">

        <button type="submit" title="Search">
          Search
        </button>
      </form>

      <!-- StudentSearchName api -->

      <!-- display result (button) -->
    </div>
  
    <!-- display all users -->
    <div v-if="studentId==null && studentFirst=='' && studentLast==''">
      <h3>All Students</h3>
      <!-- StudentSearchAll api -->
      <!-- display result (button) -->
      <div class="search-results">
        <ul>
            <li v-for="user in allUsers" :key="user.id">
              <button
                title="Select Student"
                @click="viewStudentClick(user.id)"
              >
                {{ user.id }} {{ user.firstName }} {{ user.lastName }} {{ user.StudentProfile.dob }} <!-- {{ user.StudentProfile.Sessions }} display num essions? -->
              </button>
            </li>
        </ul>
      </div>
    </div>
  
  </template>
  